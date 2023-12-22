import React, { useState } from 'react';
import '../../styles/Customer/Shop.css';
import { Link } from 'react-router-dom';
import { products } from '../../helpers/product_list';

function Product(props) {
    const goToTop = () => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    };
    return (
        <div className='pro' onClick={() => goToTop()}>
            <Link to={`/product-detail/${props.index + 1}`} style={{ textDecoration: 'none' }}>
                <img className='image' src={props.image} alt='' />
                <div className='des'>
                    <h5>{props.type}</h5>
                    <div className='star'>
                        <i className='fas fa-star'></i>
                        <i className='fas fa-star'></i>
                        <i className='fas fa-star'></i>
                        <i className='fas fa-star'></i>
                        <i className='fas fa-star'></i>
                    </div>
                    <h4>${props.price}</h4>
                </div>
            </Link>
            <div>
                <i className='fa-solid fa-cart-shopping cart'></i>
            </div>
        </div>
    );
}

function Shop() {
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

    return (
        <div>
            <section className='page-header'>
                <h2>#stayfashionable</h2>
                <h3>Discover your style</h3>
            </section>

            <section className='product1 section-p1'>
                <div className='control-bar'>
                    <div className='buttons-part'>
                        <button className='filter-button'>
                            <i class='fa-regular fa-filter'></i>
                        </button>
                    </div>
                    <div className='sort-part'>
                        <span style={{ width: '100%' }}>Sort by</span>
                        <div className='select-container'>
                            <select className='select' style={{ padding: '16px' }}>
                                <option>Price high to low</option>
                                <option>Price low to high</option>
                                <option>Popular</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='pro-container'>
                    {displayedProducts.map((product, index) => (
                        <Product
                            key={index}
                            index={index + (currentPage - 1) * productsPerPage}
                            image={product.imgURLs[0]}
                            type={product.description.type}
                            price={product.price}
                        />
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

export default Shop;