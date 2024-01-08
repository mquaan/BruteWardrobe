// import { useState, useEffect } from 'react'
// import axios from 'axios';
// import '../../styles/Administrator/Users.css';
// import DataTable from 'react-data-table-component';
// import { Space, Switch } from 'antd';
// import Modal from 'react-modal';
// Modal.setAppElement('#root');

// import {
//     IconButton
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import CancelIcon from '@mui/icons-material/Cancel';

// function CheckPassword(password, cf_password, wrongPassword) {
//     if (cf_password !== password && cf_password) {
//         wrongPassword.textContent = '(*) Wrong password confirmation';
//         wrongPassword.style.display = 'inline';
//     } else {
//         wrongPassword.style.display = 'none';
//     }
// }

// function CheckSignUpUsername(username, errorSignUpUsername) {
//     const regex = /[!@#$%^&*(),.?":{}|<>+=;']/;
//     if (regex.test(username)) {
//         errorSignUpUsername.textContent = "(*) Username mustn't consist special character: /[!@#$%^&*(),.?:{}|<>]/";
//         errorSignUpUsername.style.display = 'inline';
//     } else {
//         errorSignUpUsername.style.display = 'none';
//     }
// }

// function Users() {
//     const columns = [
//         {
//             name: 'Username',
//             selector: row => row.username,
//             sortable: true
//         },
//         {
//             name: 'Email',
//             selector: row => row.email,
//         },
//         {
//             name: 'Purchases',
//             selector: row => row.purchases,
//             sortable: true
//         },
//         {
//             name: 'Salary',
//             selector: row => row.salary,
//             sortable: true
//         },
//         {
//             name: 'Status',
//             selector: row => row.status,
//             sortable: true,
//             center: true
//         },
//         {
//             name: 'Role',
//             selector: row => row.role,
//             sortable: true,
//             center: true
//         },
//         {
//             name: 'Manage',
//             cell: (row) => (
//                 <IconButton
//                 // onClick={() => handleMangeUser(row.id)}
//                 >
//                     <EditIcon color="success" />
//                 </IconButton>
//             ),
//             center: true
//         },
//         {
//             name: 'Remove',
//             cell: (row) => (
//                 <IconButton
//                     onClick={() => handleRemoveRow(row.id)}
//                 >
//                     <CancelIcon color="error" />
//                 </IconButton>
//             ),
//             center: true
//         }
//     ];

//     const customStyles = {
//         headCells: {
//             style: {
//                 fontSize: '19px', // Adjust the font size as needed
//                 fontWeight: 'bold'
//             },
//         },
//         cells: {
//             style: {
//                 fontSize: '16px', // Adjust the font size as needed
//             }
//         },
//         rows: {
//             style: {
//                 '&:hover': {
//                     background: '#f4f4f4'
//                 },
//             }
//         }
//     };

//     const [open, setOpen] = useState(true);

//     const [data, setData] = useState([])
//     const [records, setRecords] = useState([]);

//     const [openModel, setOpenModel] = useState(false);

//     const [username, setUsername] = useState('');
//     const [startingSalary, setStartingSalary] = useState(0);
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 let responseCustomers = await axios.get('http://localhost:4000/customers');
//                 let responseMerchants = await axios.get('http://localhost:4000/merchants');

//                 if (!responseCustomers.data.success || !responseMerchants.data.success) {
//                     console.error("Fail to fetch data");
//                 }
//                 let customers = responseCustomers.data.customers;
//                 let merchants = responseMerchants.data.merchants;
//                 customers.forEach((cust) => {
//                     cust.role = 'Customer'
//                     if (!cust.purchases) {
//                         cust.purchases = 0;
//                     }
//                     cust.salary = 0;
//                     if (!cust.active) {
//                         cust.active = true;
//                     }
//                     cust.status = <Switch
//                         defaultChecked={cust.active}
//                         checkedChildren="Active"
//                         unCheckedChildren="Banned"
//                     />
//                 })
//                 merchants.forEach((merch) => {
//                     merch.role = 'Merchant'
//                     if (!merch.salary) {
//                         merch.salary = 0;
//                     }
//                     merch.purchases = 0;
//                     if (!merch.active) {
//                         merch.active = true;
//                     }
//                     merch.status = <Switch
//                         defaultChecked={merch.active}
//                         checkedChildren="Active"
//                         unCheckedChildren="Banned"
//                     />
//                 })

//                 setData(customers.concat(merchants));

//             } catch (errors) {
//                 console.error('Error:', errors);
//             }
//         };

//         fetchData();
//     }, [open]);

//     useEffect(() => {
//         setRecords(data)
//     }, [data])

//     const handleOpen = () => {
//         setOpen(!open);
//     }

//     const handleRemoveRow = (userId) => {
//         setData((prevData) => prevData.filter((row) => row.userId !== userId));
//     };

//     const handleFilter = (event) => {
//         const newData = data.filter(row => {
//             return row.username.toLowerCase().includes(event.target.value.toLowerCase())
//         })
//         setRecords(newData)
//     }

//     const handleSubmit = async (event, msg) => {
//         event.preventDefault();
//         await axios
//             .post('http://localhost:4000/admin/signupmerchant', { username, salary, password })
//             .then((response) => {
//                 if (response.data.success) {

//                     handleOpen();
//                 } else {
//                     msg.textContent = response.data.message;
//                     msg.style.display = 'inline';
//                     console.log(response.data.message);
//                 }
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     };

//     return (
//         <div className='ad_Users_Tab'>
//             <div className='Users_Tab'>
//                 <div className='introduction-users-tabs'>
//                     <h1>User Management</h1>
//                 </div>
//                 <div className='box-user-manage'>
//                     <div className='user-manage-elements'>
//                         <h2 className='h2-user-list'>Search User Here</h2>
//                         <div className='box-input'>
//                             <input
//                                 className='input-user'
//                                 type='text'
//                                 placeholder='Search username...'
//                                 onChange={handleFilter}
//                             ></input>
//                             <i className='fas fa-search'></i>
//                         </div>
//                         <button className='btn-add-merchant' onClick={() => setOpenModel(true)}>Create Merchant<i class="fa-solid fa-plus"></i></button>
//                         <Modal isOpen={openModel} on onRequestClose={() => setOpenModel(false)}
//                             style={{
//                                 overlay: {
//                                     backgroundColor: 'rgba(0, 0, 0, 0.5)', // background overlay color
//                                 },
//                                 content: {
//                                     width: '50%',
//                                     height: '70%',
//                                     margin: 'auto', // center the modal
//                                     borderRadius: '20px'
//                                 },
//                             }}>
//                             <form className='form-create-merchant' onSubmit={(event) => handleSubmit(event, document.getElementById('errorSignIn'))}>
//                                 <h2>Create Merchant</h2>
//                                 <input name='merchant-username'
//                                     type="text"
//                                     placeholder='Username'
//                                     required
//                                     onChange={(e) => {
//                                         setUsername(e.target.value);
//                                         CheckSignUpUsername(e.target.value, document.getElementById('errorSignUpUsername'))
//                                     }}
//                                 />
//                                 <span id='errorSignUpUsername' className='signUp-error-message'></span>

//                                 <input type='number' placeholder='Starting salary' required min="0" step="100" onChange={(e) => setStartingSalary(e.target.value)} />

//                                 <input
//                                     type='password'
//                                     placeholder='Password'
//                                     required onChange={(e) => {
//                                         setPassword(e.target.value)
//                                         CheckPassword(e.target.value, confirmPassword, document.getElementById('wrongPassword'))
//                                     }}
//                                 />

//                                 <input
//                                     type='password'
//                                     placeholder='Confirm password'
//                                     required
//                                     onChange={(e) => {
//                                         setConfirmPassword(e.target.value)
//                                         CheckPassword(password, e.target.value, document.getElementById('wrongPassword'))
//                                     }}
//                                 />

//                                 <span id='wrongPassword' className='wrongPassword-message'></span>

//                                 <span id='errorSignUp' className='signUp-error-message'></span>

//                                 <button type="submit" className='btn-add-merchant-popup'>Create</button>
//                             </form>
//                         </Modal>

//                     </div>

//                     <div className='user-management-table'>
//                         <DataTable
//                             columns={columns}
//                             data={records}
//                             selectableRows
//                             fixedHeader
//                             pagination
//                             className='users-table'
//                             customStyles={customStyles}
//                         ></DataTable>

//                     </div>

//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Users;
