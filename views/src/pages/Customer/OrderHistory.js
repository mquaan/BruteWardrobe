import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/Customer/OrderList.css';

function getUserId(token) {
    const decodeToken = decodeURIComponent(
        atob(token.split('.')[1].replace('-', '+').replace('_', '/'))
            .split('')
            .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
            .join('')
    );
    return JSON.parse(decodeToken).user.userId;
}

function OrderHistory({ token }) {
    const [userId, setUserId] = useState('');

    const [orderList, setOrderList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 2;

    useEffect(() => {
        const fetchData = async () => {
            try {
                let uid = await getUserId(token);
                setUserId(uid);
                await axios.post('http://localhost:4000/customer/getorderlist', { userId: uid }).then((response) => {
                    if (response.data.success) {
                        console.log(response.data.orderList);
                        setOrderList(response.data.orderList);
                    }
                });
            } catch (errors) {
                console.error('Error:', errors);
            }
        };
        fetchData();
    }, [userId]);

    const unconfirmedOrders = orderList.filter(order => order.orderStatus === "Completed");
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = unconfirmedOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    const renderOrders = () => {
        return unconfirmedOrders.length === 0 ? (
            <section className='orderlist-header'>
                <h2>There are no orders yet!</h2>
                <h3>
                    Click <Link to='/shop'>here</Link> to buy products.
                </h3>
            </section>
        ) : (
            currentOrders.map((order, orderIndex) => (
                <div key={orderIndex} className="order-box">
                    <h3>Order #{order.orderId}</h3>
                    <table>
                        <thead>
                            <tr>
                                <td>Product</td>
                                <td>Image</td>
                                <td>Size</td>
                                <td>Quantity</td>
                                <td>Price</td>
                                <td>Status</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {order.cart.map((item, itemIndex) => (
                                <tr key={itemIndex}>
                                    <td>{item.name}</td>
                                    <td><img src={item.image} alt="" /></td>
                                    <td>{item.size}</td>
                                    <td>{item.quantity}</td>
                                    <td>{Intl.NumberFormat('en-DE').format(item.price * item.quantity)} VND</td>
                                    <td>{ order.orderStatus }</td>
                                    <td><Link to={`/product-detail/${item.productId}` }>Buy again</Link></td> 
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))
        );
    };


    const renderPageNumbers = () => {
        if (unconfirmedOrders.length === 0) {
            return null; 
        }

        const totalPageNumbers = Math.ceil(unconfirmedOrders.length / ordersPerPage);

        const maxDisplayedPages = 2;
        const startPage = Math.max(1, currentPage - Math.floor(maxDisplayedPages / 2));
        const endPage = Math.min(totalPageNumbers, startPage + maxDisplayedPages - 1);

        return (
            <section id='pagination' className='section-p1'>
                {currentPage > 1 && (
                    <button onClick={() => setCurrentPage(currentPage - 1)}>
                        <i className='fal fa-long-arrow-alt-left'></i>
                    </button>
                )}

                {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                    <button
                        key={startPage + index}
                        onClick={() => setCurrentPage(startPage + index)}
                        className={currentPage === startPage + index ? 'active' : ''}
                    >
                        {startPage + index}
                    </button>
                ))}

                {currentPage < totalPageNumbers && (
                    <button onClick={() => setCurrentPage(currentPage + 1)}>
                        <i className='fal fa-long-arrow-alt-right'></i>
                    </button>
                )}
            </section>
        );
    };

    return (
        <div>
            <section id='order-list'>{renderOrders()}</section>
            <section id='pagination'>
                <div>{renderPageNumbers()}</div>
            </section>
        </div>
    );
}

export default OrderHistory;
