import { useState, useEffect } from 'react'
import axios from 'axios';
import '../../styles/Administrator/Users.css';
import DataTable from 'react-data-table-component';
import { Switch } from 'antd';
import Model from 'react-modal';
// Model.setAppElement('#root');
import { toast } from 'react-hot-toast';

import {
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
} from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';

function CheckPassword(password, cf_password, wrongPassword) {
    if (cf_password !== password && cf_password) {
        wrongPassword.textContent = '(*) Wrong password confirmation';
        wrongPassword.style.display = 'inline';
    } else {
        wrongPassword.style.display = 'none';
    }
}

function CheckSignUpUsername(username, errorSignUpUsername) {
    const regex = /[!@#$%^&*(),.?":{}|<>+=;']/;
    if (regex.test(username)) {
        errorSignUpUsername.textContent = "(*) Username mustn't consist special character: /[!@#$%^&*(),.?:{}|<>]/";
        errorSignUpUsername.style.display = 'inline';
    } else {
        errorSignUpUsername.style.display = 'none';
    }
}

function Users() {
    const [open, setOpen] = useState(true);

    const [data, setData] = useState([])
    const [records, setRecords] = useState([]);

    const [selectedUser, setSelectedUser] = useState([]);
    const [confirmed, setConfirmed] = useState(false);
    const [openModel, setOpenModel] = useState(false);
    const [openConfirmDialog, setConfirmDialog] = useState(false);


    const [username, setUsername] = useState('');
    const [startingSalary, setStartingSalary] = useState(0);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                let responseCustomers = await axios.get('http://localhost:4000/customers');
                let responseMerchants = await axios.get('http://localhost:4000/merchants');
                let responseSales = await axios.get('http://localhost:4000/admin/getsales');


                if (!responseCustomers.data.success || !responseMerchants.data.success || !responseSales.data.success) {
                    console.error("Fail to fetch data");
                }
                let customers = responseCustomers.data.customers;
                let merchants = responseMerchants.data.merchants;
                let sales = responseSales.data.sales;
                customers.forEach((cust) => {
                    cust.role = 'customer'
                    if (!cust.purchases) {
                        cust.purchases = 0;
                    }
                    cust.salary = "none";
                    if (!cust.banned) {
                        cust.banned = false;
                    }

                    if (sales) {
                        sales.forEach((val) => {
                            if (val.userId === cust.userId) {
                                cust.purchases += 1;
                            }
                        })
                    }
                })
                merchants.forEach((merch) => {
                    merch.role = 'merchant'
                    if (!merch.salary) {
                        merch.salary = 0;
                    }
                    merch.purchases = "none";
                    if (!merch.banned) {
                        merch.banned = false;
                    }
                })
                let initial_data = merchants.concat(customers)
                setData(initial_data);
                setRecords(initial_data)

            } catch (errors) {
                console.error('Error:', errors);
            }
        };

        fetchData();
    }, [open]);


    const handleOpen = () => {
        setOpen(!open);
    }

    const handleRemoveRow = async (userId, role) => {
        await axios
            .post('http://localhost:4000/admin/removeuser', {
                userId: userId,
                role: role
            })
            .then((response) => {
                if (response.data.success) {
                    toast.success(response.data.message);
                    setData((prevData) => prevData.filter((row) => row.userId !== userId || row.role !== role));
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    useEffect(() => {
        if (!openConfirmDialog && confirmed && selectedUser) {
            handleRemoveRow(selectedUser[0], selectedUser[1]);
        }
    }, [openConfirmDialog, confirmed, selectedUser]);


    const handleRemoveClick = async (userId, role) => {
        setSelectedUser([userId, role]);
        setConfirmed(false);
        setConfirmDialog(true);
    }

    // const handleMangeUser = async (userId, role) => {
    //     setSelectedUser([userId, role]);
    //     setConfirmDialog(true);
    // }

    const handleFilter = (event) => {
        const newData = data.filter(row => {
            return row.username.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setRecords(newData)
    }

    const handleSubmit = async (event, msg) => {
        event.preventDefault();
        await axios
            .post('http://localhost:4000/admin/signupmerchant', {
                username: username,
                password: password,
                salary: startingSalary
            })
            .then((response) => {
                if (response.data.success) {
                    handleOpen();
                    toast.success(response.data.message, {
                        position: "bottom-center"
                    });
                } else {
                    msg.textContent = response.data.message;
                    msg.style.display = 'inline';
                    console.log(response.data.message);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleSwitch = async (userId, role) => {
        await axios
            .post('http://localhost:4000/admin/banunbanuser', {
                userId: userId,
                role: role
            })
            .then((response) => {
                // if (response.data.success) {
                //     handleOpen();
                // } 
                if (!response.data.success) {
                    toast.error(response.data.message);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const columns = [
        {
            name: 'Username',
            selector: row => row.username,
            sortable: true,
            width: '14%',
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
            width: '22%',
        },
        {
            name: 'Purchases',
            selector: row => row.purchases,
            sortable: true,
            width: '14%'
        },
        {
            name: 'Salary',
            selector: row => row.salary,
            sortable: true,
            width: '14%'
        },
        {
            name: 'Role',
            selector: row => row.role,
            sortable: true,
            center: true,
            width: '10%'
        },
        {
            name: 'Status',
            cell: (row) => (
                <Switch
                    defaultChecked={!row.banned}
                    checkedChildren="Active"
                    unCheckedChildren="Banned"
                    onChange={() => handleSwitch(row.userId, row.role)}
                />
            ),
            center: true,
            width: '12%'
        },
        // {
        //     name: 'Details',
        //     cell: (row) => (
        //         <IconButton
        //             onClick={() => handleMangeUser(row.id)}
        //         >
        //             <EditIcon color="success" />
        //         </IconButton>
        //     ),
        //     center: true,
        //     width: '8%'
        // },
        {
            name: 'Remove',
            cell: (row) => (
                <IconButton
                    onClick={() => handleRemoveClick(row.userId, row.role)}
                >
                    <CancelIcon color="error" />
                </IconButton>
            ),
            center: true,
            width: '9%'
        }
    ];

    const customStyles = {
        headCells: {
            style: {
                fontSize: '17px', // Adjust the font size as needed
                fontWeight: 'bold'
            },
        },
        cells: {
            style: {
                fontSize: '16px', // Adjust the font size as needed
            }
        },
        rows: {
            style: {
                '&:hover': {
                    background: '#f4f4f4'
                },
            }
        }
    };

    return (
        <div className='ad_Users_Tab'>
            <div className='Users_Tab'>
                <div className='introduction-users-tabs'>
                    <h1>User Management</h1>
                </div>
                <div className='box-user-manage'>
                    <div className='user-manage-elements'>
                        <h2 className='h2-user-list'>Search User Here</h2>
                        <div className='box-input'>
                            <input
                                className='input-user'
                                type='text'
                                placeholder='Search username...'
                                onChange={handleFilter}
                            ></input>
                            <i className='fas fa-search'></i>
                        </div>
                        <button className='btn-add-merchant' onClick={() => setOpenModel(true)}>Create Merchant<i class="fa-solid fa-plus"></i></button>

                        <Dialog
                            open={openConfirmDialog}
                            onClose={() => setConfirmDialog(false)}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {`Do you really want to delete this account?`}
                            </DialogTitle>
                            <DialogContent>

                                <DialogContentText id="alert-dialog-description">
                                    Please confirm your action and note that this process is irreversible.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setConfirmDialog(false)} autoFocus>No</Button>
                                <Button onClick={() => { setConfirmed(true); setConfirmDialog(false) }}>
                                    Yes
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <Model
                            isOpen={openModel}
                            on
                            onRequestClose={() => setOpenModel(false)}
                            style={{
                                overlay: {
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // background overlay color
                                },
                                content: {
                                    width: '50%',
                                    height: '70%',
                                    margin: 'auto', // center the modal
                                    borderRadius: '20px'
                                },
                            }}
                            ariaHideApp={false}
                        >
                            <form className='form-create-merchant' onSubmit={(event) => handleSubmit(event, document.getElementById('errorSignUp'))}>
                                <h2>Create Merchant</h2>
                                <input name='merchant-username'
                                    type="text"
                                    placeholder='Username'
                                    required
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                        CheckSignUpUsername(e.target.value, document.getElementById('errorSignUpUsername'))
                                    }}
                                />
                                <span id='errorSignUpUsername' className='signUp-error-message'></span>

                                <input type='number' placeholder='Starting salary' required min="0" step="100" onChange={(e) => setStartingSalary(e.target.value)} />

                                <input
                                    type='password'
                                    placeholder='Password'
                                    required onChange={(e) => {
                                        setPassword(e.target.value)
                                        CheckPassword(e.target.value, confirmPassword, document.getElementById('wrongPassword'))
                                    }}
                                />

                                <input
                                    type='password'
                                    placeholder='Confirm password'
                                    required
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value)
                                        CheckPassword(password, e.target.value, document.getElementById('wrongPassword'))
                                    }}
                                />

                                <span id='wrongPassword' className='wrongPassword-message'></span>

                                <span id='errorSignUp' className='signUp-error-message'></span>

                                <button type="submit" className='btn-add-merchant-popup'>Create</button>
                            </form>
                        </Model>

                    </div>

                    <div className='user-management-table'>
                        <DataTable
                            columns={columns}
                            data={records}
                            selectableRows
                            fixedHeader
                            pagination
                            className='users-table'
                            customStyles={customStyles}
                        ></DataTable>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Users;