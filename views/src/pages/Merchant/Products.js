import React, { useState, useRef, useEffect } from 'react';
import '../../styles/Merchant/Products.css';
import axios from 'axios';
import Modal from '../../components/Modal';
import { Select, Option } from '@material-tailwind/react';

function Product({ handleOpen, handleProductModal, product }) {
	return (
		<div
			className='pro'
			onClick={() => {
				handleProductModal(product);
				handleOpen();
			}}
		>
			<img className='image' src={product.imgURLs[0]} alt='' />
			<div className='des'>
				<h5>{product.description.Type}</h5>
				<div className='star'>
					<i className='fas fa-star'></i>
					<i className='fas fa-star'></i>
					<i className='fas fa-star'></i>
					<i className='fas fa-star'></i>
					<i className='fas fa-star'></i>
				</div>
				<h4>${product.price}</h4>
			</div>
			<div>
				<i className='fa-solid fa-pen edit'></i>
			</div>
		</div>
	);
}

function MerchantProducts({ open, handleOpen, handleProductModal }) {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		axios
			.get('http://localhost:4000/products')
			.then((response) => {
				if (response.data.success) {
					setProducts(response.data.products);
				}
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}, [open]);
	
	const productsPerPage = 12;
	const [currentPage, setCurrentPage] = useState(1);
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
	const goToPage = (page) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: 'auto' });
	};

	const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const totalPages = Math.ceil(sortedAndFilteredProducts.length / productsPerPage);
    
    const displayedProducts = sortedAndFilteredProducts.slice(startIndex, endIndex);
	const [isExpanded, setIsExpanded] = useState(false);
	const inputRef = useRef();

	const handleBlur = (event) => {
		if (!inputRef.current.contains(event.relatedTarget)) {
			setIsExpanded(false);
		}
	};

	const toggleFilterPanel = () => {
        setFilterPanelVisible((prevVisible) => !prevVisible);
    };

	return (
		<div>
			<section className='product1 section-p1'>
				<div className='control-bar flex items-center justify-between'>
					<div className='buttons-part flex items-center gap-4'>
						<button
							className='add-button'
							onClick={() => {
								handleProductModal({
									productId: null,
									name: '',
									description: {
										Type: '',
										Occasion: '',
										Color: '',
										Pattern: '',
										Collar: '',
										Material: '',
										SleevesLength: '',
										Brand: '',
										Thickness: '',
										Season: '',
										DesignElement: '',
										FitType: '',
										Collection: '',
									},
									rate: '',
									price: '',
									imgURLs: ['', '', '', ''],
									numSold: '',
								});
								handleOpen();
							}}
						>
							<i className='fa-solid fa-plus'></i>
						</button>
						<button className='filter-button' onClick={toggleFilterPanel}>
                            <i className='fa-regular fa-filter'></i> 
                        </button>
						{filterPanelVisible && (    
                        <div className={`filter-panel1 ${filterPanelVisible ? 'show' : ''}`}>
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
						<div className='search-bar' onClick={() => setIsExpanded(true)} onBlur={handleBlur} tabIndex={0} ref={inputRef}>
							<i className='fa-solid fa-magnifying-glass'></i>
							<input type='text' className={`search-click ${isExpanded ? 'expanded' : ''}`} placeholder='search here...' />
						</div>
					</div>
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
