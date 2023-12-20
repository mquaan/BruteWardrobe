import React, { useState } from 'react'
import '../../styles/Administrator/Users.css';
import DataTable from 'react-data-table-component';
import {Space, Switch} from 'antd';
import Model from 'react-modal';


function Users() {
    const columns = [
        {
            name: 'Username',
            selector: row => row.username,
            sortable: true
        },
        {
            name: 'Email',
            selector: row => row.email,
        },
        {
            name: 'Purchases',
            selector: row => row.purchases,
            sortable: true 
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true 
        },
        {
            name: 'Role',
            selector: row => row.role,
            sortable: true
        },
        {
            name: 'Remove',
            cell: (row) => (
                <img
                    src='../assets/features/delete.png'
                    style={{width: '23px', height: '23px', marginLeft:'28px', cursor: 'pointer'}}
                    // onClick={() => handleRemoveRow(row.id)}
                ></img>
            ),
        }
    ];
    
    const data = [
        {
            id: 1,
            username: 'datne',
            email: 'datne@gmailcom',
            purchases: 30,
            status: <Switch
                    defaultChecked={true}
                    checkedChildren="Online"
                    unCheckedChildren= "Offline"/>,
            role: 'Merchant'
        },
        {
            id: 2,
            username: 'siphu',
            email: 'siphu@gmailcom',
            purchases: 28,
            status: <Switch
                    defaultChecked={true}
                    checkedChildren="Online"
                    unCheckedChildren= "Offline"/>,
            role: 'Customer'
        },
        {
            id: 3,
            username: 'tuliwin',
            email: 'liwin@gmailcom',
            purchases: 25,
            status: <Switch
                    defaultChecked={false}
                    checkedChildren="Online"
                    unCheckedChildren= "Offline"/>,
            role: 'Merchant'
        },
        {
            id: 4,
            username: 'hphat',
            email: 'hphat@gmailcom',
            purchases: 20,
            status: <Switch
                    defaultChecked={true}
                    checkedChildren="Online"
                    unCheckedChildren= "Offline"/>,
            role: 'Merchant'
        },
        {
            id: 5,
            username: 'minhquaan',
            email: 'mtotheq@gmailcom',
            purchases: 17,
            status: <Switch
                    defaultChecked={true}
                    checkedChildren="Online"
                    unCheckedChildren= "Offline"/>,
            role: 'Customer'
        },
        {
            id: 6,
            username: 'tdphong',
            email: 'tdphong@gmailcom',
            purchases: 29,
            status: <Switch
                    defaultChecked={false}
                    checkedChildren="Online"
                    unCheckedChildren= "Offline"/>,
            role: 'Customer'
        },
        {
            id: 7,
            username: 'aaasd',
            email: 'adds@gmailcom',
            purchases: 30,
            status: <Switch
                    defaultChecked={true}
                    checkedChildren="Online"
                    unCheckedChildren= "Offline"/>,
            role: 'Merchant'
        },
        {
            id: 8,
            username: 'ghughu122',
            email: 'ghughu122@gmailcom',
            purchases: 28,
            status: <Switch
                    defaultChecked={true}
                    checkedChildren="Online"
                    unCheckedChildren= "Offline"/>,
            role: 'Customer'
        },
        {
            id: 9,
            username: 'tassajds',
            email: 'tassajds@gmailcom',
            purchases: 25,
            status: <Switch
                    defaultChecked={false}
                    checkedChildren="Online"
                    unCheckedChildren= "Offline"/>,
            role: 'Merchant'
        },
        {
            id: 10,
            username: 'ppoias123',
            email: 'ppoias123@gmailcom',
            purchases: 20,
            status: <Switch
                    defaultChecked={true}
                    checkedChildren="Online"
                    unCheckedChildren= "Offline"/>,
            role: 'Merchant'
        },
        {
            id: 11,
            username: 'minhquaan323344',
            email: 'minhquaan323344@gmailcom',
            purchases: 17,
            status: <Switch
                    defaultChecked={true}
                    checkedChildren="Online"
                    unCheckedChildren= "Offline"/>,
            role: 'Customer'
        },
        {
            id: 12,
            username: 'tdphong12323',
            email: 'tdphong12323@gmailcom',
            purchases: 29,
            status: <Switch
                    defaultChecked={false}
                    checkedChildren="Online"
                    unCheckedChildren= "Offline"/>,
            role: 'Customer'
        }
    ];

    const handleRemoveRow = (id) => {
        // setTableData((prevData) => prevData.filter((row) => row.id !== id));
    };

    const [records, setRecords] = useState(data);

    function handleFilter(event){
        const newData = data.filter(row => {
            return row.username.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setRecords(newData)
    }

    const customStyles = {
        headCells: {
            style:{
                fontSize: '19px', // Adjust the font size as needed
                fontWeight: 'bold'
            },
        },
        cells: {
            style:{
                fontSize: '16px', // Adjust the font size as needed
            }
        },
        rows:{
            style:{
                '&:hover': {
                    background: '#f4f4f4'
                },
            }
        }
    };
    
    const  [visible, setvisible] = useState(false)

    return(
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
                        <button className='btn-add-merchant' onClick={()=>setvisible(true)}>Create Merchant<i class="fa-solid fa-plus"></i></button>
                        <Model isOpen={visible} on onRequestClose={()=>setvisible(false)}
                            style={{
                                overlay: {
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // background overlay color
                                },
                                content: {
                                    width: '30%', // adjust the width as needed
                                    height: '45%', // adjust the height as needed
                                    margin: 'auto', // center the modal
                                    borderRadius: '20px'
                                    
                                },
                            }}>
                            <form className='form-create-merchant'>
                                <h2>Create Merchant</h2>
                                <input name='merchant-username' type="text" placeholder='Username' required/>
                                <input type='password' placeholder='Password' required/>
                                <input type='email'placeholder='Email' required/>
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
