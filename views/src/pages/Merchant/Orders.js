import React, { useState } from 'react';

import {
    ListSubheader,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    Box,
    IconButton,
    Button,
    Grid,
    Typography,
    Modal,
    Select,
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';


import {
    Person as PersonIcon,
    ShoppingCart as ShoppingCartIcon,
    ExpandLess,
    ExpandMore
} from '@mui/icons-material';

import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';

import { products } from '../../helpers/product_list';
import { customers } from '../../helpers/customer_list';

const options = {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric'
};

function MerchantCart({ cart }) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="Customer's order">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Product name</TableCell>
                        <TableCell align="center">Image</TableCell>
                        <TableCell align="center">Size</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cart.productList.map((item, proIndex) => (
                        <TableRow
                            key={proIndex}
                            sx={{ '& td': { border: 0 },
                            '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" align="center">
                                {products[item].name}
                            </TableCell>
                            <TableCell component="th" align="center" style={{ display: 'flex', justifyContent: 'center' }}>
                                <img src={products[item].imageURLs[0]} alt={`Product ${item}`} style={{ maxWidth: '100px' }} />
                            </TableCell>
                            <TableCell component="th" align="center">{cart.sizeList[proIndex]}</TableCell>
                            <TableCell component="th" align="center">{cart.quantityList[proIndex]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

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

    // drop button 
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

    // edit button
    const [openModal, setopenModal] = useState(displayedCustomers.map(customer => Array(customer.shopping.orderList.length).fill(false)));
    const handleOpen = (custIndex, orderIndex) => {
        const newOpenMoal = [...openModal];
        newOpenMoal[custIndex][orderIndex] = !newOpenMoal[custIndex][orderIndex];
        setopenModal(newOpenMoal);
    };
    const handleClose = (custIndex, orderIndex) => {
        const newOpenMoal = [...openModal];
        newOpenMoal[custIndex][orderIndex] = !newOpenMoal[custIndex][orderIndex];
        setopenModal(newOpenMoal);
    };

    // order
    const [statuses, setStatus] = useState(displayedCustomers.map(customer => customer.shopping.orderList.map(order => order.orderStatus)));

    const handleStatusChange = (event, order, custIndex, orderIndex) => {
        const newStatus = [...statuses];
        const status = event.target.value; // Get the new status from the event object

        newStatus[custIndex][orderIndex] = status; // Update the specific status
        setStatus(newStatus);

        order.orderStatus = status;
        if (status === 'Delivered') {
            order.dateShipped = new Date();
        }
    };

    // cancel order
    const [openDialog, setopenDialog] = useState(displayedCustomers.map(customer => Array(customer.shopping.orderList.length).fill(false)));
    const handleOpenDialog = (custIndex, orderIndex) => {
        const newDialog = [...openDialog];
        newDialog[custIndex][orderIndex] = !newDialog[custIndex][orderIndex];
        setopenDialog(newDialog);
    };
    const handleCloseDialog = (custIndex, orderIndex) => {
        const newDialog = [...openDialog];
        newDialog[custIndex][orderIndex] = !newDialog[custIndex][orderIndex];
        setopenDialog(newDialog);
    };

    // dialog
    const [canceled, setCancel] = useState(displayedCustomers.map(customer => Array(customer.shopping.orderList.length).fill(false)))

    const handleCancelOrder = (order, custIndex, orderIndex) => {
        const newCanceled = [...canceled];

        newCanceled[custIndex][orderIndex] = true; // Update the specific status
        setCancel(newCanceled);
        handleCloseDialog(custIndex, orderIndex);
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
                    Customers' orders
                </ListSubheader>
            }
        >
            {displayedCustomers.map((customer, custIndex) => {
                if (canceled[custIndex].every((ord) => ord)) {
                    return (<></>);
                }
                return (
                    <Box sx={{
                        border: '1px solid #3f51b5',
                        borderRadius: '10px',
                        marginBottom: '10px',
                        marginRight: '20px'
                    }}>
                        <ListItemButton onClick={() => handleClick1(custIndex)}>
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary={`Username: ${customer.username}`} />
                            {open1s[custIndex] ? <ExpandLess size="small" /> : <ExpandMore size="small" />}
                        </ListItemButton>
                        <Collapse in={open1s[custIndex]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {customer.shopping.orderList.map((order, orderIndex) => {
                                    if (canceled[custIndex][orderIndex]) {
                                        return (<></>);
                                    }
                                    return (
                                        <>
                                            <Grid
                                                container
                                                direction="row"
                                                alignItems="center"
                                                justifyContent="center"
                                                columns={28}
                                            >
                                                <Grid item xs>
                                                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleClick2(custIndex, orderIndex)}>
                                                        <ListItemIcon>
                                                            <ShoppingCartIcon />
                                                        </ListItemIcon>
                                                        <ListItemText primary={`Order ID: ${order.orderID}, Date:  ${order.dateCreated.toLocaleString('en-US', options)}, Status: ${order.orderStatus}`} />
                                                        {open2s[custIndex][orderIndex] ? <ExpandLess size="small" /> : <ExpandMore size="small" />}
                                                    </ListItemButton>
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <IconButton
                                                        color="success"
                                                        size="small"
                                                        aria-label="Edit"
                                                        onClick={() => handleOpen(custIndex, orderIndex)}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <IconButton
                                                        color="error"
                                                        size="small"
                                                        aria-label="Cancel"
                                                        onClick={() => handleOpenDialog(custIndex, orderIndex)}
                                                    >
                                                        <CancelIcon />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                            <Modal
                                                open={openModal[custIndex][orderIndex]}
                                                onClose={() => handleClose(custIndex, orderIndex)}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                    bgcolor: 'background.paper',
                                                    border: '2px solid #000',
                                                    boxShadow: 24,
                                                    p: 4,
                                                }}>
                                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                                        {`Order ID: ${order.orderID}`}
                                                    </Typography>
                                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                        {`Date Created: ${order.dateCreated.toLocaleString('en-US', options)}`}
                                                    </Typography>
                                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                        Order Status:
                                                        <Select
                                                            value={statuses[custIndex][orderIndex]}
                                                            onChange={(e) => handleStatusChange(e, order, custIndex, orderIndex)}
                                                        >
                                                            <MenuItem value="Processing">Processing</MenuItem>
                                                            <MenuItem value="Confirmed">Confirmed</MenuItem>
                                                            <MenuItem value="Shipping">Shipping</MenuItem>
                                                            <MenuItem value="Delivered">Delivered</MenuItem>
                                                            <MenuItem value="Completed">Completed</MenuItem>
                                                        </Select>
                                                    </Typography>
                                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                        {`Payment Info: ${order.paymentInfo}`}
                                                    </Typography>
                                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                        {`Delivery Info: ${order.deliverInfo}`}
                                                    </Typography>
                                                    {(order.orderStatus === 'Delivered' || order.orderStatus === 'Completed') && (
                                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                            {`Date shipped: ${order.dateShipped.toLocaleString('en-US', options)}`}
                                                        </Typography>
                                                    )}

                                                </Box>
                                            </Modal>
                                            <Dialog
                                                open={openDialog[custIndex][orderIndex]}
                                                onClose={() => handleCloseDialog(custIndex, orderIndex)}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                            >
                                                <DialogTitle id="alert-dialog-title">
                                                    {`Do you really want to cancel the order ${order.orderID} by ${customer.username}?`}
                                                </DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                        This action will remove the customer's order. Please confirm your action and note that this process is irreversible.
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={() => handleCloseDialog(custIndex, orderIndex)} autoFocus>No</Button>
                                                    <Button onClick={() => handleCancelOrder(order, custIndex, orderIndex)}>
                                                        Yes
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                            <Collapse in={open2s[custIndex][orderIndex]} timeout="auto" unmountOnExit>
                                                {/* <List component="div" disablePadding>
                                                    {order.cart.productList.map((product, productIndex) => {
                                                        return (
                                                            <>
                                                                <ListItemButton sx={{ pl: 8 }}>
                                                                    <ListItemIcon>
                                                                        <LocalMallIcon />
                                                                    </ListItemIcon>
                                                                    <ListItemText primary={`Product: ${order.cart.quantityList[productIndex]} * ${products[product].type} `} />
                                                                </ListItemButton>
                                                            </>
                                                        );
                                                    })}
                                                </List> */}
                                                <Box sx={{
                                                    marginTop: '5px',
                                                    marginBottom: '20px',
                                                    marginRight: '20px',
                                                    pl: 8
                                                }}>
                                                    {<MerchantCart cart={order.cart} />}
                                                </Box>
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