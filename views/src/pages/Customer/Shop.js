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
            <Link to={`/product-detail/${props.index}`} style={{ textDecoration: 'none' }}>
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
    const goToPage = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'auto' });
    };

    const [filterPanelVisible, setFilterPanelVisible] = useState(false);
    const [filterOptions, setFilterOptions] = useState({
        type: '',
        occasion: '',
        color: '',
        brand: '',
        season: '',
    });

    const sortOptions = [
        { value: '', label: 'None' },
        { value: 'priceHighToLow', label: 'Price High to Low' },
        { value: 'priceLowToHigh', label: 'Price Low to High' },
        { value: 'mostPopular', label: 'Most Popular' },
    ];

    const [sortOption, setSortOption] = useState(sortOptions[0].value);

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilterOptions((prevOptions) => ({
            ...prevOptions,
            [name]: value,
        }));
        setCurrentPage(1); 
    };

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    const filterAndSortProducts = (originalProducts, filterOptions, sortOption) => {
        const filteredProducts = originalProducts.filter((product) => {
            return (
                (filterOptions.type ? product.description.Type === filterOptions.type : true) &&
                (filterOptions.occasion ? product.description.Occasion === filterOptions.occasion : true) &&
                (filterOptions.color ? product.description.Color === filterOptions.color : true) &&
                (filterOptions.brand ? product.description.Brand === filterOptions.brand : true) &&
                (filterOptions.season ? product.description.Season === filterOptions.season : true) 
            );
        });

        switch (sortOption) {
            case 'priceHighToLow':
                return filteredProducts.slice().sort((a, b) => b.price - a.price);
            case 'priceLowToHigh':
                return filteredProducts.slice().sort((a, b) => a.price - b.price);
            case 'mostPopular':
                return filteredProducts.slice().sort((a, b) => b.numSold - a.numSold);
            default:
                return filteredProducts;
        }
    };

    const sortedAndFilteredProducts = filterAndSortProducts(products, filterOptions, sortOption);

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const totalPages = Math.ceil(sortedAndFilteredProducts.length / productsPerPage);
    
    const displayedProducts = sortedAndFilteredProducts.slice(startIndex, endIndex);

    const toggleFilterPanel = () => {
        setFilterPanelVisible((prevVisible) => !prevVisible);
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
                        <button className='filter-button' onClick={toggleFilterPanel}>
                            <i className='fa-regular fa-filter'></i> 
                        </button>
                    </div>

                    {filterPanelVisible && (    
                        <div className={`filter-panel ${filterPanelVisible ? 'show' : ''}`}>
                            <select name='type' value={filterOptions.type} onChange={handleFilterChange}>
                                <option value=''>All types</option>
                                <option value='T-Shirts'>T-Shirts</option>
                                <option value='Shirts'>Shirts</option>
                                <option value='Hoodies'>Hoodies</option>
                                <option value='Sweatshirts'>Sweatshirts</option>
                                <option value='Pants'>Pants</option>
                                <option value='Shorts'>Shorts</option>
                            </select>

                            <select name='occasion' value={filterOptions.occasion} onChange={handleFilterChange}>
                                <option value=''>All occasions</option>
                                <option value='Vacation'>Vacation</option>
                                <option value='Casual'>Casual</option>
                                <option value='Basics'>Basics</option>
                                <option value='Street'>Street</option>
                                <option value='Daily'>Daily</option>
                            </select>

                            <select name='color' value={filterOptions.color} onChange={handleFilterChange}>
                                <option value=''>All colors</option>
                                <option value='Blue'>Blue</option> 
                                <option value='Brown'>Brown</option>
                                <option value='Black'>Black</option>
                                <option value='Red'>Red</option>
                                <option value='White'>White</option>
                                <option value='Green'>Green</option>
                            </select>

                            <select name='brand' value={filterOptions.brand} onChange={handleFilterChange}>
                                <option value=''>All brands</option>
                                <option value='ChArmkpR'>ChArmkpR</option>
                                <option value='Mensclo'>Mensclo</option>
                                <option value='INCERUN'>INCERUN</option>
                                <option value='KOYYE'>KOYYE</option>
                            </select>

                            <select name='season' value={filterOptions.season} onChange={handleFilterChange}>
                                <option value=''>All seasons</option>
                                <option value='Spring'>Spring</option>
                                <option value='Summer'>Summer</option>
                                <option value='Autumn'>Autumn</option>
                                <option value='Winter'>Winter</option> 
                            </select>
                        </div>
                    )}
            <div className='sort-part'>
                <span style={{ width: '100%' }}>Sort by</span>
                <div className='select-container'>
                    <select className='select' style={{ padding: '10px' }} onChange={handleSortChange}>
                        {sortOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
        <div className='pro-container'>
            {displayedProducts.map((product, index) => (
                <Product
                    key={index}
                    index={product.productID}
                    image={product.imgURLs[0]}
                    type={product.description.Type}
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
