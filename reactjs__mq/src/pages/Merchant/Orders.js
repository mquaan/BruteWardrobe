import React, { useState, useEffect } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';

import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

import '../../styles/Merchant/Orders.css';
import { products } from '../../helpers/product_list';
import { customers } from '../../helpers/customer_list';
import { Link } from 'react-router-dom';

const options = { year: 'numeric', month: 'long', day: 'numeric' };


function MerchantOrders() {
    const customerPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * customerPerPage;
    const endIndex = startIndex + customerPerPage;
    const totalPages = Math.ceil(customers.length / customerPerPage);
    const displayedCustomers = customers.slice(startIndex, endIndex);
    const goToPage = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'auto' });
    };
    // Initialize an array of states for each customer
    const [open1s, setOpen1s] = useState(Array(displayedCustomers.length).fill(false));

    // Initialize an array of states for each order of each customer
    const [open2s, setOpen2s] = useState(displayedCustomers.map(customer => Array(customer.shopping.orderList.length).fill(false)));

    const handleClick1 = (index) => {
        const newOpen1s = [...open1s];
        newOpen1s[index] = !newOpen1s[index];
        setOpen1s(newOpen1s);
    };

    const handleClick2 = (custIndex, orderIndex) => {
        const newOpen2s = [...open2s];
        newOpen2s[custIndex][orderIndex] = !newOpen2s[custIndex][orderIndex];
        setOpen2s(newOpen2s);
    };

    return (
        <List
        sx={{ 
            width: '100%',
            bgcolor: 'background.paper',
            
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
            <ListSubheader component="div" id="nested-list-subheader">
                Customers
            </ListSubheader>
        }
        >
            {displayedCustomers.map((customer, custIndex) => {
                return (
                    <Box sx={{ 
                        border: '1px solid #3f51b5', 
                        borderRadius: '10px', 
                        marginBottom: '10px',
                        marginRight: '40px',

                    }}>
                        <ListItemButton onClick={() => handleClick1(custIndex)}>
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary={`Username: ${customer.username}`} />
                            {open1s[custIndex] ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open1s[custIndex]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {customer.shopping.orderList.map((order, orderIndex) => {
                                    return (
                                        <>
                                            <Button variant="contained" color="primary" onClick={() => viewOrderDetails(order)}>
                                                View Full Details
                                            </Button>
                                            <ListItemButton sx={{ pl: 4 }} onClick={() => handleClick2(custIndex, orderIndex)}>
                                                <ListItemIcon>
                                                    <ShoppingCartIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={`Order ID: ${order.orderID}, Date:  ${order.dateCreated.toLocaleString('en-US', options)}, Status: ${order.orderStatus}`} />
                                                {open2s[custIndex][orderIndex] ? <ExpandLess /> : <ExpandMore />}
                                            </ListItemButton>
                                            <Collapse in={open2s[custIndex][orderIndex]} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                    {order.productList.map((product, productIndex) => {
                                                        return (
                                                            <>
                                                                <ListItemButton sx={{ pl: 8 }}>
                                                                    <ListItemIcon>
                                                                        <LocalMallIcon />
                                                                    </ListItemIcon>
                                                                    <ListItemText primary={`Product: ${order.quantityList[productIndex]} * ${products[product].name} `} />
                                                                </ListItemButton>
                                                            </>
                                                        );
                                                    })}
                                                </List>
                                            </Collapse>
                                        </>
                                    );
                                })}
                            </List>
                        </Collapse>
                    </Box>
                );
            })}
        </List>
    );
}
export default MerchantOrders;

//     <section id='pagination' className='section-p1'>
//         {/* Previous button */}
//         {currentPage > 1 && (
//             <button onClick={() => goToPage(currentPage - 1)}>
//                 <i className='fal fa-long-arrow-alt-left'></i>
//             </button>
//         )}

//         {/* Create buttons dynamically based on the number of pages */}
//         {Array.from({ length: totalPages }, (_, index) => (
//             <button key={index + 1} onClick={() => goToPage(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
//                 {index + 1}
//             </button>
//         ))}

//         {/* Next button */}
//         {currentPage < totalPages && (
//             <button onClick={() => goToPage(currentPage + 1)}>
//                 <i className='fal fa-long-arrow-alt-right'></i>
//             </button>
//         )}
//     </section>