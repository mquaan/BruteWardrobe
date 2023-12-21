  import React, { useState } from 'react';
  import { products } from '../../helpers/product_list';
  import '../../styles/Customer/Cart.css'
  import { Link } from 'react-router-dom';

  function Cart({ cartItems, setCartItems}) { 
    const [updatedCartItems, setUpdatedCartItems] = useState(cartItems);

    const handleQuantityChange = (index, newQuantity) => {
      const updatedCart = [...updatedCartItems];
      updatedCart[index].quantity = newQuantity;
      setUpdatedCartItems(updatedCart);
    };

    const handleIncrement = (index) => {
      const newQuantity = updatedCartItems[index].quantity + 1;
      if (newQuantity >= 1 && newQuantity <= 10) {
        handleQuantityChange(index, newQuantity);
      }
    };

    const handleDecrement = (index) => {
      const newQuantity = updatedCartItems[index].quantity - 1;
      if (newQuantity >= 1 && newQuantity <= 10) {
        handleQuantityChange(index, newQuantity);
      }
    };

    const handleRemove = (index) => {
      const updatedCart = cartItems.filter((item, i) => i !== index);
      setCartItems(updatedCart);
    };

    const calculateTotalPrice = () => {
      return updatedCartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };
    return (
      <div>
        <section id="cart" className="">
          <table width="100%">
            <thead>
              <tr>
                <td>Product</td>
                <td>Image</td>
                <td>Size</td>
                <td>Quantity</td>
                <td>Price</td>
                <td>Remove</td>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={`${item.productIndex}-${item.selectedSize}`}>
                  <td>{products[item.productIndex - 1].name}</td>
                  <td>
                    <img src={products[item.productIndex - 1].imgURLs[0]} alt={`Product ${item.productIndex}`} />
                  </td>
                  <td>{item.selectedSize}</td>
                  <td>
                    <div>
                      <button onClick={() => handleDecrement(index)}>
                        <span><i className="fa-solid fa-minus"></i></span>
                      </button>
                      <input
                        type="number"
                        aria-live="polite"
                        data-bs-step="counter"
                        value={item.quantity}
                        min="0"
                        max="10"
                        step="1"
                        data-bs-round="0"
                        aria-label="Quantity selector"
                        readOnly
                      />
                      <button onClick={() => handleIncrement(index)}>
                        <span><i class="fa-solid fa-plus"></i></span>
                      </button>
                    </div>
                  </td>
                  <td>${item.price * item.quantity}</td>
                  <td>
                    <button className="remove" onClick={() => handleRemove(index)}>
                      <i className="far fa-times-circle"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section id="cart-proceed">
          <div id="total">
            <table>
              <tr>
                <td><strong>Total</strong></td>
                <td><strong>${calculateTotalPrice()}</strong></td>
              </tr>
            </table>
            <Link to="/checkout">
            <button className="checkout">Proceed to checkout</button>
            </Link>
          </div>
        </section>

      </div>
    );
  }
  export default Cart