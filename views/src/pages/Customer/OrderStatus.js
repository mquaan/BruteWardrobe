import React from 'react';
import '../../styles/Customer/OrderStatus.css';
import { products } from '../../helpers/product_list';
// import { customers } from '../../helpers/customer_list';

function OrderStatus({ deliveryInfo, orderedProducts, orderStatus }) {
    const calculateTotalPrice = () => {
        return orderedProducts.reduce((total, item) => total + item.price * item.quantity, 0);
      };
      const renderSteps = () => {
        const steps = [
            { title: 'Processing', icon: 'fa-bars-progress' },
            { title: 'Confirmed', icon: 'fa-clipboard-check' },
            { title: 'Shipping', icon: 'fa-truck-fast' },
            { title: 'Delivered', icon: 'fa-person-circle-check' },
            { title: 'Completed', icon: 'fa-circle-check' },
        ];
    
        const getStatusIndex = () => {
            switch (orderStatus) {
                case 'Processing':
                    return 0;
                case 'Confirmed':
                    return 1;
                case 'Shipping':
                    return 2;
                case 'Delivered':
                    return 3;
                case 'Completed':
                    return 4;
                default:
                    return 0;
            }
        };
    
        const statusIndex = getStatusIndex();
    
        return steps.map((step, index) => (
            <div key={index} className={`step ${index <= statusIndex ? 'completed' : ''}`}>
                <div className="step-icon-wrap">
                    <div className="step-icon"><i className={`fa-solid ${step.icon}`}></i></div>
                </div>
                <h4 className="step-title">{step.title}</h4>
            </div>
        ));
    };
    
    return (
        <div className="track-order-container">
            <h2>Track Your Order</h2>
            <div className="order-details">
                <h3>Order Details</h3>
                <table>
                    <thead>
                        <tr>
                        <th>Product</th>
                        <th>Image</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderedProducts.map((item) => (
                        <tr key={`${item.productIndex}-${item.selectedSize}`}>
                            <td>{products[item.productIndex - 1].name}</td>
                            <td><img src={products[item.productIndex - 1].imgURLs[0]} alt={`Product ${item.productIndex}`} /></td>
                            <td>{item.quantity}</td>
                            <td>${item.price * item.quantity}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                <div className="total-price">
                    <strong>Total:</strong> ${calculateTotalPrice()}
                </div>
            </div>

            <div className="delivery-info">
                <h3>Delivery Information</h3>
                <p>
                    <strong>Full name:</strong> {deliveryInfo.fullName}
                </p>
                <p>
                    <strong>Address:</strong> {deliveryInfo.address}
                </p>
                <p>
                    <strong>Phone number:</strong> {deliveryInfo.phoneNumber}
                </p>
                <p>
                    <strong>Payment method:</strong> {deliveryInfo.paymentMethod}
                </p>
            </div>
                            
            <div className="delivery-progress">
                <h3>Delivery Progress</h3>
                <div className="card-body">
                    <div className="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
                        {renderSteps()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderStatus;
