import React from 'react';
import '../../styles/Customer/OrderStatus.css';

function OrderStatus({ deliveryInfo }) {
    return (
        <div className="track-order-container">
            <h2>Track Your Order</h2>
            <div className="order-details">
                <h3>Order Details</h3>
                <p>
                    {/* <strong>Order ID:</strong> {orderDetails.orderId} */}
                </p>
                {/* Add more order details based on your data */}
            </div>

            <div className="delivery-info">
                <h3>Delivery Information</h3>
                <p>
                    <strong>Full Name:</strong> {deliveryInfo.fullName}
                </p>
                <p>
                    <strong>Address:</strong> {deliveryInfo.address}
                </p>
                <p>
                    <strong>Phone Number:</strong> {deliveryInfo.phoneNumber}
                </p>
                {/* Add more delivery information based on your data */}
            </div>

            <div className="delivery-progress">
                <h3>Delivery Progress</h3>
            </div>
        </div>
    );
}

export default OrderStatus;
