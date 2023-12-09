import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Product_detail.css';

const products_des = [
    {
        name: 'abc',
        price: '250.000 VND',
        Occasion: 'Casual',
        Color: 'Blue',
        Size: 'S, M, L, XL, 2XL',
        Pattern: 'Color Block',
        Collar: 'Lapel Collar',
        Material: 'Polyester',
        SleevesLength: 'Long Sleeve',
        Brand: 'ChArmkpR',
        Thickness: 'Moderate',
        Season: 'Autumn',
        DesignElement: 'Patchwork, Button',
        FitType: 'Regular',
        Collection: 'Mensclo',
    },
    {
        name: 'abc123',
        price: '250.000 VND',
        Occasion: 'xyz',
        Color: 'Blue',
        Size: 'S, M, L, XL, 2XL',
        Pattern: 'Color Block',
        Collar: 'Lapel Collar',
        Material: 'Polyester',
        SleevesLength: 'Long Sleeve',
        Brand: 'ChArmkpR',
        Thickness: 'Moderate',
        Season: 'Autumn',
        DesignElement: 'Patchwork, Button',
        FitType: 'Regular',
        Collection: 'Mensclo',
    },
    {
        name: 'abc3566',
        price: '250.000 VND',
        Occasion: 'abc',
        Color: 'Blue',
        Size: 'S, M, L, XL, 2XL',
        Pattern: 'Color Block',
        Collar: 'Lapel Collar',
        Material: 'Polyester',
        SleevesLength: 'Long Sleeve',
        Brand: 'ChArmkpR',
        Thickness: 'Moderate',
        Season: 'Autumn',
        DesignElement: 'Patchwork, Button',
        FitType: 'Regular',
        Collection: 'Mensclo',
    },
];

function Description({ products, productIndex }) {
    const { name, price, ...productDetails } = products[productIndex - 1];
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

const ProductDetail = () => {
    const { index } = useParams();
    return (
        <div>
            <section id="prodetails" className="section-p1">
                <div className="single-pro-image">
                    <img src="../assets/products/p1.jpg" width="100%" id="MainImg" alt=""/>

                    <div className="small-img-group">
                        <div className="small-img-col">
                            <img src="../assets/products/p1.jpg" width="100%" className="small-img" alt=""/>
                        </div>
                        <div className="small-img-col">
                            <img src="../assets/products/p2.jpg" width="100%" className="small-img" alt=""/>
                        </div>
                        <div className="small-img-col">
                            <img src="../assets/products/p3.jpg" width="100%" className="small-img" alt=""/>
                        </div>
                        <div className="small-img-col">
                            <img src="../assets/products/p4.jpg" width="100%" className="small-img" alt=""/>
                        </div>
                    </div>
                </div>
                {/* <div className="single-pro-details">
                    <h4>Mens Corduroy Color Block Panel Stitching Casual Long Sleeve Shirts</h4>
                    <h2>250.000 VND</h2>
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
                    <h4>Desciption</h4> */}
                <Description products={products_des} productIndex={index} />
                {/* </div> */}
            </section>
        </div>
    )
};

export default ProductDetail