import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    Tooltip
} from '@mui/material';


import {
    Person as PersonIcon,
    ShoppingCart as ShoppingCartIcon,
    ExpandLess,
    ExpandMore
} from '@mui/icons-material';

import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


const shortFormat = {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric'
}

const longFormat = {
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
                    {cart.map((item, proIndex) => {
                        if (!item.product) {
                            return <></>
                        }
                        return (
                            <TableRow
                                key={proIndex}
                                // sx={{
                                //     '& td': { border: 0 },
                                //     '& th': { border: 0 },


                                //     // '&:last-child td, &:last-child th': { border: 0 }
                                // }}
                            >
                                <TableCell component="th" scope="row" align="center">
                                    {item.product.name}
                                </TableCell>
                                <TableCell component="th" align="center" style={{ display: 'flex', justifyContent: 'center' }}>
                                    <img src={item.product.imgURLs[0]} alt={`Product ${item.productId}`} style={{ maxWidth: '100px' }} />
                                </TableCell>
                                <TableCell component="th" align="center">{item.size}</TableCell>
                                <TableCell component="th" align="center">{item.quantity}</TableCell>
                            </TableRow>
                        )

                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function MerchantOrders({ open, handleOpen, token }) {
    const decodeToken = decodeURIComponent(
        atob(token.split('.')[1].replace('-', '+').replace('_', '/'))
            .split('')
            .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
            .join('')
    );
    const userId = JSON.parse(decodeToken).user.userId;

    const [products, setProducts] = useState([]);
    const [shoppings, setShoppings] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [updatedCustomers, setUpdatedCustomers] = useState([]);


    // const [cancelReason, setReason] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [open1s, setOpen1s] = useState([]);
    const [open2s, setOpen2s] = useState([]);
    const [openModal, setOpenModal] = useState([]);
    const [statuses, setStatus] = useState([]);
    const [openDialog, setOpenDialog] = useState([]);
    const [canceled, setCanceled] = useState([]);

    const customerPerPage = 5;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseProducts = await axios.get('http://localhost:4000/products');
                const responseShoppings = await axios.get('http://localhost:4000/shoppings');
                const responseCustomers = await axios.get('http://localhost:4000/customers');

                if (!responseProducts.data.success || !responseShoppings.data.success || !responseCustomers.data.success) {
                    console.error("Fail to fetch data");
                }
                setProducts(responseProducts.data.products);
                setShoppings(responseShoppings.data.shoppings);
                setCustomers(responseCustomers.data.customers);
            } catch (errors) {
                console.error('Error:', errors);
            }
        };

        fetchData();
    }, [open]);

    function initStates() {
        setOpen1s(Array(updatedCustomers.length).fill(false));
        setOpen2s(updatedCustomers.map((customer) => Array(customer.shopping.orderList.length).fill(false)));
        setOpenModal(updatedCustomers.map((customer) => Array(customer.shopping.orderList.length).fill(false)));
        setStatus(updatedCustomers.map((customer) => customer.shopping.orderList.map((order) => order.orderStatus)));
        setOpenDialog(updatedCustomers.map((customer) => Array(customer.shopping.orderList.length).fill(false)));
        setCanceled(updatedCustomers.map((customer) => Array(customer.shopping.orderList.length).fill(false)));
    }

    useEffect(() => {
        let filteredShoppings = shoppings.filter((value) => value.orderList && value.orderList.length !== 0);
        // link to shopping
        let with_shopping = customers.map((value) => {
            let foundShopping = filteredShoppings.find((sval) => value.shoppingId === sval.shoppingId);
            if (!foundShopping) return null;
            // link to product name
            foundShopping.orderList.forEach((ord) => {
                ord.cart.forEach((ell) => {
                    ell.product = products.find((pr) => pr.productId === ell.productId)
                })
                if (ord.dateCreated)
                    ord.dateCreated = new Date(ord.dateCreated);
                if (ord.dateShipped && ord.dateShipped !== 'none')
                    ord.dateShipped = new Date(ord.dateShipped);
            })
            return { ...value, shopping: foundShopping };
        }).filter(Boolean);

        setUpdatedCustomers(with_shopping);
        initStates();
    }, [customers, products, shoppings])

    // useEffect(() => {
    //     initStates();
    // }, [currentPage]);


    const startIndex = (currentPage - 1) * customerPerPage;
    const endIndex = startIndex + customerPerPage;
    const totalPages = Math.ceil(updatedCustomers.length / customerPerPage);
    const displayedCustomers = updatedCustomers.slice(startIndex, endIndex);


    const goToPage = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'auto' });
    };

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
    const handleOpenModal = (custIndex, orderIndex) => {
        const newOpenModal = [...openModal];
        newOpenModal[custIndex][orderIndex] = true;
        setOpenModal(newOpenModal);
    };
    const handleCloseModal = (custIndex, orderIndex) => {
        const newOpenModal = [...openModal];
        newOpenModal[custIndex][orderIndex] = false;
        setOpenModal(newOpenModal);
    };

    // order status change
    const handleStatusChange = async (event, order, custIndex, orderIndex) => {
        if (event.target.value === order.orderStatus) {
            return;
        }
        const newStatus = [...statuses];
        const status = event.target.value; // Get the new status from the event object

        newStatus[custIndex][orderIndex] = status; // Update the specific status
        setStatus(newStatus);

        order.orderStatus = status;
        if (status === 'Delivered' || status === 'Completed') {
            if (!order.dateShipped || order.dateShipped === 'none') {
                order.dateShipped = new Date();
            }
        }
        else {
            if (order.dateShipped && order.dateShipped !== 'none') {
                order.dateShipped = 'none';
            }
        }

        const respone = await axios.post('http://localhost:4000/merchant/editorderstatus', {
            userId: userId,
            shoppingId: updatedCustomers[custIndex].shoppingId,
            orderId: order.orderId,
            newStatus: order.orderStatus,
            newdateShipped: order.dateShipped,
        });
        if (!respone.data.success) {
            console.log('Failed to update order status! Please try again later.')
        }
    };

    // cancel order
    const handleOpenDialog = (custIndex, orderIndex) => {
        const newDialog = [...openDialog];
        newDialog[custIndex][orderIndex] = true;
        setOpenDialog(newDialog);
    };
    const handleCloseDialog = (custIndex, orderIndex) => {
        const newDialog = [...openDialog];
        newDialog[custIndex][orderIndex] = false;
        setOpenDialog(newDialog);
    };

    // dialog
    const handleCancelOrder = async (order, custIndex, orderIndex) => {
        const newCanceled = [...canceled];

        newCanceled[custIndex][orderIndex] = true; // Update the specific status
        setCanceled(newCanceled);
        handleCloseDialog(custIndex, orderIndex);

        const respone = await axios.post('http://localhost:4000/merchant/cancelorder', {
            shoppingId: updatedCustomers[custIndex].shoppingId,
            orderId: order.orderId
        });
        if (respone.data.success) {
            // reorder order's index
            if (orderIndex !== updatedCustomers[custIndex].shopping.orderList.length - 1) { // if not last
                let newUpdatedCustomers = [...updatedCustomers]
                // mark instead of delete to prevent reload page (use state change)
                newUpdatedCustomers[custIndex].shopping.orderList[orderIndex].orderId = -1;
                let indexCount = 0;
                newUpdatedCustomers[custIndex].shopping.orderList.forEach((oord) => {
                    if (oord.orderId !== -1) {
                        oord.orderId = indexCount;
                        indexCount += 1;
                    }
                });
                setUpdatedCustomers(newUpdatedCustomers)
            }
        }
        else {
            console.log('Failed to cancel the order! Please try again later.')
        }
    };

    return (
        <div>
            <List
                sx={{
                    width: '100%',
                    bgcolor: 'background.paper'
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justifyContent="flex-start"
                        columns={18}
                    >
                        <Grid item xs justifyContent="flex-start">
                            <ListSubheader component="div" id="nested-list-subheader">
                                Manage customers' orders
                            </ListSubheader>
                        </Grid>
                        <Grid item xs={2}>
                            <Tooltip title="Go to previous page">
                                <IconButton
                                    onClick={() => {
                                        if (currentPage !== 1)
                                            goToPage(currentPage - 1)
                                    }}
                                >
                                    <ArrowBackIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Go to next page">
                                <IconButton
                                    onClick={() => {
                                        if (currentPage !== totalPages)
                                            goToPage(currentPage + 1)
                                    }}
                                >
                                    <ArrowForwardIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={1}>
                            <Tooltip title="Refresh & Collapse All">
                                <IconButton
                                    onClick={() => handleOpen()}

                                // setOpen2s(updatedCustomers.map((customer) => Array(customer.shopping.orderList.length).fill(false)));
                                // setOpen1s(Array(updatedCustomers.length).fill(false));
                                >
                                    <RefreshIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                }
            >
                {displayedCustomers.map((customer, custIndex) => {
                    custIndex += (currentPage - 1) * customerPerPage;
                    if (!canceled[custIndex] || canceled[custIndex].every((ord) => ord)) {
                        return (<></>);
                    }
                    return (
                        <Box sx={{
                            border: '1px solid #3f51b5',
                            borderRadius: '10px',
                            marginBottom: '10px',
                            marginLeft: '20px',
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
                                                    sx={{ pr: 4 }}
                                                >
                                                    <Grid item xs>
                                                        <ListItemButton sx={{ pl: 4 }} onClick={() => handleClick2(custIndex, orderIndex)}>
                                                            <ListItemIcon>
                                                                <ShoppingCartIcon />
                                                            </ListItemIcon>
                                                            <ListItemText primary={`Order ID: ${order.orderId} | Date:  ${order.dateCreated ? order.dateCreated.toLocaleString('en-US', shortFormat) : "Undefined"} | Status: ${order.orderStatus}`} />
                                                            {open2s[custIndex][orderIndex] ? <ExpandLess size="small" /> : <ExpandMore size="small" />}
                                                        </ListItemButton>
                                                    </Grid>
                                                    <Grid item xs={1}>
                                                        <Tooltip title="Edit">
                                                            <IconButton
                                                                color="success"
                                                                size="small"
                                                                aria-label="Edit"
                                                                onClick={() => handleOpenModal(custIndex, orderIndex)}
                                                            >
                                                                <EditIcon />
                                                            </IconButton>
                                                        </Tooltip>

                                                    </Grid>
                                                    <Grid item xs={1}>
                                                        <Tooltip title="Cancel">
                                                            <IconButton
                                                                color="error"
                                                                size="small"
                                                                aria-label="Cancel"
                                                                onClick={() => handleOpenDialog(custIndex, orderIndex)}
                                                            >
                                                                <CancelIcon />
                                                            </IconButton>
                                                        </Tooltip>

                                                    </Grid>
                                                </Grid>
                                                <Modal
                                                    open={openModal[custIndex][orderIndex]}
                                                    onClose={() => handleCloseModal(custIndex, orderIndex)}
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
                                                            {`Order ID: ${order.orderId} by Customer: ${customer.username}`}
                                                        </Typography>
                                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                            {`Date Created: ${order.dateCreated ? order.dateCreated.toLocaleString('en-US', longFormat) : "Undefined"}`}
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
                                                        {(order.dateShipped && order.dateShipped !== 'none') && (
                                                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                                {`Date shipped: ${order.dateShipped.toLocaleString('en-US', longFormat)}`}
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
                                                        {`Do you really want to cancel the order ${order.orderId} by ${customer.username}?`}
                                                    </DialogTitle>
                                                    <DialogContent>
                                                        {/* <TextField
                                                            id="standard-basic"
                                                            label="Reason"
                                                            variant="standard"
                                                            value={cancelReason}
                                                            fullWidth
                                                            onChange={(e) => setReason(e.target.value)}
                                                            required
                                                        />
                                                        <div style={{ marginBottom: '16px' }} /> */}

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
                                                {order.cart.productList.map((product, productId) => {
                                                    return (
                                                        <>
                                                            <ListItemButton sx={{ pl: 8 }}>
                                                                <ListItemIcon>
                                                                    <LocalMallIcon />
                                                                </ListItemIcon>
                                                                <ListItemText primary={`Product: ${order.cart.quantityList[productId]} * ${products[product].type} `} />
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
            </List >

            <section id='pagination' className='section-p1'>
                {/* Previous button */}
                {currentPage > 1 && (
                    <button onClick={() => goToPage(currentPage - 1)}>
                        <i className='fal fa-long-arrow-alt-left'></i>
                    </button>
                )}

                {/* Create buttons dynamically based on the number of pages */}
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index + 1} onClick={() => goToPage(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
                        {index + 1}
                    </button>
                ))}

                {/* Next button */}
                {currentPage < totalPages && (
                    <button onClick={() => goToPage(currentPage + 1)}>
                        <i className='fal fa-long-arrow-alt-right'></i>
                    </button>
                )}
            </section>

        </div >
    );

}
export default MerchantOrders;