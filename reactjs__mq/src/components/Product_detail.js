import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Product_detail.css';
import { products } from '../helpers/product_list';

function Description({ product, productIndex }) {
    const { name, price, image, sub_p1, sub_p2, sub_p3, sub_p4, type, ...productDetails } 
        = product[productIndex - 1];
    return (
        <div className="single-pro-details">
            <h4>{name}</h4>
            <h2>{price}</h2>
            <select>
                <option>Select Size</option>
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
                <option>2XL</option>
            </select>
            <input type="number" value="1"></input>
            <button className="normal">Add to cart</button>
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

const ProductDetail = () => {
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
            <Description product={products} productIndex={index} />
        </section>
        </div>
    )
};

export default ProductDetail