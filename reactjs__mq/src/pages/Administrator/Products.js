import React, { useState } from 'react'
import '../../styles/Administrator/Products.css';
import DataTable from 'react-data-table-component';
import {Space, Switch} from 'antd';
import Model from 'react-modal';

function Products() {
    
    const columns = [
        {
            name: 'Product\'s Name',
            selector: row => row.productName,
            sortable: true
        },
        {
            name: 'Merchant\'s Name',
            selector: row => row.merchantName,
            sortable: true
        },
        {
            name: 'Total Sales',
            selector: row => row.totalSales,
            sortable: true 
        },
        {
            name: 'Purchased',
            selector: row => row.purchased,
            sortable: true 
        },
        {
            name: 'Available',
            selector: row => row.available,
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
            productName: 'Essential T-Shirt',
            merchantName: 'Gareth Bale',
            totalSales: '$879',
            purchased: 14.225,
            available: <Switch
                    defaultChecked={true}
                    checkedChildren="In Stock"
                    unCheckedChildren= "Out Of Stock"/>,
        },
        {
            id: 2,
            productName: 'Addidas Paints',
            merchantName: 'Pogba',
            totalSales: '$810',
            purchased: 14.222,
            available: <Switch
                    defaultChecked={true}
                    checkedChildren="In Stock"
                    unCheckedChildren= "Out Of Stock"/>,
        },
        {
            id: 3,
            productName: 'Addidas Paints',
            merchantName: 'Bruno Fernardes',
            totalSales: '$579',
            purchased: 15.333,
            available: <Switch
                    defaultChecked={false}
                    checkedChildren="In Stock"
                    unCheckedChildren= "Out Of Stock"/>,
        },
        {
            id: 4,
            productName: 'Lacoste Jeans',
            merchantName: 'Harry Maguire',
            totalSales: '$789',
            purchased: 14.765,
            available: <Switch
                    defaultChecked={true}
                    checkedChildren="In Stock"
                    unCheckedChildren= "Out Of Stock"/>,
        },
        {
            id: 5,
            productName: 'Nike Hoodies',
            merchantName: 'Lukaku',
            totalSales: '$678',
            purchased: 15.334,
            available: <Switch
                    defaultChecked={true}
                    checkedChildren="In Stock"
                    unCheckedChildren= "Out Of Stock"/>,
        },
        {
            id: 6,
            productName: 'Levent T-Shirt',
            merchantName: 'Onana',
            totalSales: '$565',
            purchased: 12.654,
            available: <Switch
                    defaultChecked={true}
                    checkedChildren="In Stock"
                    unCheckedChildren= "Out Of Stock"/>,
        },
        {
            id: 7,
            productName: 'Lacoste Polo',
            merchantName: 'Gareth Bale',
            totalSales: '$657',
            purchased: 14.225,
            available: <Switch
                    defaultChecked={true}
                    checkedChildren="In Stock"
                    unCheckedChildren= "Out Of Stock"/>,
        },
        {
            id: 8,
            productName: 'Hawaii Shorts',
            merchantName: 'Pogba',
            totalSales: '$789',
            purchased: 22.545,
            available: <Switch
                    defaultChecked={true}
                    checkedChildren="In Stock"
                    unCheckedChildren= "Out Of Stock"/>,
        },
        {
            id: 9,
            productName: 'Addidas Polo',
            merchantName: 'Bruno Fernardes',
            totalSales: '$887',
            purchased: 15.333,
            available: <Switch
                    defaultChecked={false}
                    checkedChildren="In Stock"
                    unCheckedChildren= "Out Of Stock"/>,
        },
        {
            id: 10,
            productName: 'Lacoste Shirt',
            merchantName: 'Messi',
            totalSales: '$668',
            purchased: 15.231,
            available: <Switch
                    defaultChecked={true}
                    checkedChildren="In Stock"
                    unCheckedChildren= "Out Of Stock"/>,
        },
        {
            id: 11,
            productName: 'Nike Hoodies',
            merchantName: 'Lukaku',
            totalSales: '$678',
            purchased: 15.334,
            available: <Switch
                    defaultChecked={true}
                    checkedChildren="In Stock"
                    unCheckedChildren= "Out Of Stock"/>,
        },
        {
            id: 12,
            productName: 'Levent Shorts',
            merchantName: 'De Gea',
            totalSales: '$345',
            purchased: 16.231,
            available: <Switch
                    defaultChecked={true}
                    checkedChildren="In Stock"
                    unCheckedChildren= "Out Of Stock"/>,
        },
    ]
 
    const [records, setRecords] = useState(data);
    

    function handleFilter(event){
        const newData = data.filter(row => {
            return row.productName.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setRecords(newData)
    }

    const customStyles = {
        headCells: {
            style:{
                fontSize: '17px', // Adjust the font size as needed
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
    
    return(
        <div className='ad_Products_Tab'>
            <div className='Products_Tab'>
                <div className='introduction-products-tab'>
                    <h1>Product Management</h1>
                </div>
                <div className='box-products-manage'>
                    <div className='products-manage-elements'>
                        <h2 className='h2-products-list'>Search Product Here</h2>
                        <div className='box-input'>
                            <input 
                                className='input-products' 
                                type='text' 
                                placeholder='Search product name...'
                                onChange={handleFilter}
                            ></input>
                            <i className='fas fa-search'></i>
                        </div>
                    </div>

                    <div className='products-management-table'>
                        <DataTable
                            columns={columns}
                            data={records}
                            selectableRows
                            fixedHeader
                            pagination
                            className='products-table'
                            customStyles={customStyles}
                        ></DataTable>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products;
