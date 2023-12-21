import React, { useState } from 'react';
import '../../styles/Customer/Checkout.css';
import { products } from '../../helpers/product_list';
import { useNavigate } from 'react-router-dom';

function Checkout({ cartItems, setCartItems, deliveryInfo, setDeliveryInfo }) {
  const navigate = useNavigate();
  const handlePaymentMethod = (method) => {
    // Handle payment method selection (e.g., update state)
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo((deliveryInfo) => ({ ...deliveryInfo, [name]: value }));
  };
  
  const handlePlaceOrder = () => {
    if (
      deliveryInfo.fullName &&
      deliveryInfo.address &&
      deliveryInfo.phoneNumber &&
      document.querySelector('input[name="paymenMethod"]:checked') 
    ) {
      // alert('Order placed successfully!');
      navigate('/order-status');
      // setCartItems([]); 
    } else {
      alert('Please fill in all required information.');
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="checkout-container">
      <section id="delivery-info">
        <h2>Delivery Information</h2>
        <form>
          <div className="form-group">
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={deliveryInfo.fullName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <textarea
              id="address"
              name="address"
              value={deliveryInfo.address}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={deliveryInfo.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>
        </form>
      </section>

      <section id="order-summary">
        <h2>Order Summary</h2>
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
            {cartItems.map((item) => (
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
      </section>

      <section id="payment-method">
        <h2>Payment Method</h2>
        <div className="payment-options">
          <label htmlFor="paymenMethod">Cash on Delivery</label>
          <input 
                type="radio"
                name="paymenMethod"
                value="cash"
                onChange={() => handlePaymentMethod('cash')}
                required
          />
          <label htmlFor="paymenMethod">Banking</label>
          <input 
                type="radio"
                name="paymenMethod"
                value="banking"
                onChange={() => handlePaymentMethod('banking')}
                required
          />
        </div>
      </section>
        <button className="place-order-btn" onClick={handlePlaceOrder}>
          Place Order
        </button>
    </div>
  );
}

export default Checkout;
