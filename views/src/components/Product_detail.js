import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/Product_detail.css';
import { products } from '../helpers/product_list';
import Modal from 'react-modal';

function Description({ isLoggedIn, product, productIndex, addToCart }) { 
    const { name, price, star, image, sub_p1, sub_p2, sub_p3, sub_p4, type, ...productDetails } = product[productIndex - 1];
    const [quantity, setQuantity] = React.useState(0);
    const [selectedSize, setSelectedSize] = React.useState('');
    const [showModal, setShowModal] = useState(false);
    
    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value, 10);
        setQuantity(newQuantity);
        if (!isNaN(newQuantity)) {
            if (newQuantity < 0) 
                setQuantity(0);
            else if (newQuantity > 10)
                setQuantity(10);
            else
                setQuantity(newQuantity);
        }
    }

    const handleInputBlur = () => {
        if (isNaN(quantity)) {
        setQuantity(0);
        }
    }

    const handleSizeChange = (event) => {
        setSelectedSize(event.target.value);
    };
    
    const handleAddToCart = () => {
        if (isLoggedIn) {
            if (selectedSize && quantity > 0) {
                addToCart({
                    productIndex,
                    quantity,
                    selectedSize,
                });
                setSelectedSize('');
                setQuantity(0);
            }
        } else {
            setShowModal(true);
        }
      };

      const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          border: '1px solid #ccc',
          borderRadius: '8px',
          maxWidth: '400px',
          padding: '20px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        },
      };
      
    return (
        <div className="single-pro-details">
            <h4>{name}</h4>
            <h2>${price}</h2>
            <select value={selectedSize} onChange={handleSizeChange}> 
                <option>Select Size</option>
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
                <option>2XL</option>
            </select>
            <input type="number" value={quantity} onBlur={handleInputBlur} onChange={handleQuantityChange}/>
            <button className="normal" onClick={handleAddToCart} >Add to cart</button> 
            <Modal
                isOpen={showModal}
                shouldCloseOnEsc = {false}
                onRequestClose={() => setShowModal(false)}
                contentLabel="Not Logged In Modal"
                style={customStyles}
            >
                <div>
                    <p>Click <Link to="/login">here</Link> to Sign In.</p>
                    <button onClick={() => setShowModal(false)}>Close</button>
                </div>
            </Modal>
            <h4>Desciption</h4>
            <ul>
                {Object.entries(productDetails).map(([key, value]) => (
                    <li key={key}>
                    <strong>{key}:</strong> {value}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function SmallImg({ image, onClick }) {
    return (
      <div className="small-img-col" onClick={onClick}>
        <img src={image} width="100%" className="small-img" alt="" />
      </div>
    );
}

const ProductDetail = ({ addToCart, isLoggedIn }) => {
    const { index } = useParams();
    const [mainImg, setMainImg] = useState(products[index - 1].image);

    const handleSmallImgClick = (newImg) => {
        setMainImg(newImg);
    };
    return (
        <div>
        <section id="prodetails" className="section-p1">
            <div className="single-pro-image">
                <img src={mainImg} width="100%" id="MainImg" alt="" />

                <div className="small-img-group">
                    <SmallImg image={products[index - 1].sub_p1} onClick={() => handleSmallImgClick(products[index - 1].sub_p1)} />
                    <SmallImg image={products[index - 1].sub_p2} onClick={() => handleSmallImgClick(products[index - 1].sub_p2)} />
                    <SmallImg image={products[index - 1].sub_p3} onClick={() => handleSmallImgClick(products[index - 1].sub_p3)} />
                    <SmallImg image={products[index - 1].sub_p4} onClick={() => handleSmallImgClick(products[index - 1].sub_p4)} />
                </div>
            </div>
            <Description product={products} productIndex={index} addToCart={addToCart} isLoggedIn={ isLoggedIn }/>
        </section>
        </div>
    )
};

export default ProductDetail