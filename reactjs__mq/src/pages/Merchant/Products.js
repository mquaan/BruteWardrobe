import React, { useState, useRef } from 'react';
import '../../styles/Merchant/Products.css';
import { Link } from 'react-router-dom';
import { products } from '../../helpers/product_list';
import Modal from '../../components/Modal';
// import { MDBContainer } from 'mdb-react-ui-kit';

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

function MerchantProducts({ handleOpen, handleProductModal }) {
    const productsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const totalPages = Math.ceil(products.length / productsPerPage);
    const displayedProducts = products.slice(startIndex, endIndex);
    const goToPage = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'auto' });
    };
    const [isExpanded, setIsExpanded] = useState(false);
    const inputRef = useRef();

    const handleBlur = (event) => {
        if (!inputRef.current.contains(event.relatedTarget)) {
            setIsExpanded(false);
        }
    };

    return (
        <div>
            <section className='product1 section-p1'>
                <div className='search-bar' onClick={() => setIsExpanded(true)} onBlur={handleBlur} tabIndex={0} ref={inputRef}>
                    <i className='fa-solid fa-magnifying-glass'></i>
                    <input type='text' className={`search-click ${isExpanded ? 'expanded' : ''}`} placeholder='search here...' />
                </div>
                <div className='pro-container'>
                    {displayedProducts.map((product, index) => (
                        <Product handleOpen={handleOpen} handleProductModal={handleProductModal} product={product} />
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

export default MerchantProducts;
