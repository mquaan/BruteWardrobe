import React from 'react';
import '../../styles/Customer/OrderStatus.css';
import { products } from '../../helpers/product_list';

function OrderStatus({ deliveryInfo, orderedProducts }) {
    const calculateTotalPrice = () => {
        return orderedProducts.reduce((total, item) => total + item.price * item.quantity, 0);
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
                            <td><img src={products[item.productIndex - 1].image} alt={`Product ${item.productIndex}`} /></td>
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
            </div>
        </div>
    );
}

export default OrderStatus;
