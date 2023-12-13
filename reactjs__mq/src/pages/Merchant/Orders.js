import React, { useState } from 'react';
import '../../styles/Merchant/Orders.css';
import { products } from '../../helpers/product_list';
import { customers } from '../../helpers/customer_list';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal';

function Product({ handleOpen, handleProductModal, product }) {
    return (
        <div
            className='pro'
            onClick={() => {
                handleProductModal(product);
                handleOpen();
            }}
        >
            <img className='image' src={product.image} alt='' />
            <div className='des'>
                <h5>{product.type}</h5>
                <div className='star'>
                    <i className='fas fa-star'></i>
                    <i className='fas fa-star'></i>
                    <i className='fas fa-star'></i>
                    <i className='fas fa-star'></i>
                    <i className='fas fa-star'></i>
                </div>
                <h4>{product.price} VND</h4>
            </div>
            <div>
                <i className='fa-solid fa-pen edit'></i>
            </div>
        </div>
    );
}

function Order({ handleOpen, handleOrderModal, order}) {
    let productListt = order.productList;
    for (let i = 0; i < productListt.length; i++) {
        productListt[i] = products[i];
    }
    return (
        <div
            className='pro'
            onClick={() => {
                handleOrderModal(order);
                handleOpen();
            }}
        >
            <section className='order section-p3'>
                <h5>{order.orderStatus}</h5>
                <h5>{order.dateCreated}</h5>
                <h5>{order.paymentInfo}</h5>
                <h5>{order.deliverInfo}</h5>
                <div className='pro-container'>
                    {productListt.map((product, index) => (
                        <Product handleOpen={handleOpen} handleProductModal={handleProductModal} product={product} />
                    ))}
                </div>
            </section>
        </div>
    );
}

function Customer({ handleOpen, handleCustomerModal, customer }) {
    return (
        <div
            className='pro'
            onClick={() => {
                handleCustomerModal(customer);
                handleOpen();
            }}
        >
            <section className='customer section-p2'>
                <h5>{customer.username}</h5>
                <div className='pro-container'>
                    {customer.shopping.orderList.map((order, index) => (
                        <Order handleOpen={handleOpen} handleOrderModal={handleOrderModal} order={order} />
                    ))}
                </div>
            </section>
        </div>
    );
}

function MerchantOrders({ handleOpen, handleProductModal }) {
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

    return (
        <div>
            <section className='customer section-p1'>
                <div className='pro-container'>
                    {displayedCustomers.map((customer, index) => (
                        <Customer handleOpen={handleOpen} handleCustomerModal={handleCustomerModal} customer={customer} />
                    ))}
                </div>
            </section>

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
        </div>
    );
}

export default MerchantOrders;
