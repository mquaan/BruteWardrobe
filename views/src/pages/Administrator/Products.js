import { useState, useEffect } from 'react'
import axios from 'axios';
import '../../styles/Administrator/Products.css';
import DataTable from 'react-data-table-component';

function Products() {
    const [open, setOpen] = useState(true);

    const [data, setData] = useState([])
    const [records, setRecords] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                let responseProducts = await axios.get('http://localhost:4000/products');
                let responseMerchants = await axios.get('http://localhost:4000/merchants');
                let responseSales = await axios.get('http://localhost:4000/admin/getsales');

                if (!responseProducts.data.success 
                    || !responseMerchants.data.success 
                    || !responseSales.data.success
                ) {
                    console.error("Fail to fetch data");
                }
                
                let products = responseProducts.data.products;
                let merchants = responseMerchants.data.merchants;
                let sales = responseSales.data.sales;

                products.forEach((prod) => {
                    if (prod.last_updated_by) {
                        prod.last_updated_by = merchants.find((mer) => prod.last_updated_by == mer.userId);
                        if (prod.last_updated_by)
                            prod.last_updated_by = prod.last_updated_by.username;
                        else
                            prod.last_updated_by = "none"
                    }
                    if (typeof prod.price === 'string') {
                        if (prod.price === "")
                            prod.price = 0
                        else
                            prod.price = Number(prod.price)
                    }
                    if (typeof prod.numSold === 'string') {
                        if (prod.numSold === "")
                            prod.numSold = 0
                        else
                            prod.numSold = Number(prod.numSold)
                    }
                })
                console.log(products)

                setData(products);
                setRecords(products);

            } catch (errors) {
                console.error('Error:', errors);
            }
        };

        fetchData();
    }, [open]);

    const handleOpen = () => {
        setOpen(!open);
    }

    const handleFilter = (event) => {
        const newData = data.filter(row => {
            return row.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setRecords(newData)
    }

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
            width: '30%'
        },
        {
            name: 'Last updated',
            selector: row => row.last_updated_by,
            sortable: true,
            width: '20%'
        },
        {
            name: 'Unit price',
            selector: row => row.price,
            sortable: true,
            width: '15%'
        },
        {
            name: 'Sold',
            selector: row => row.numSold,
            sortable: true,
            width: '10%'
        },
        {
            name: 'Total Sales',
            selector: row => row.price * row.numSold,
            sortable: true,
            width: '20%'
        },
    ];

    const customStyles = {
        headCells: {
            style: {
                fontSize: '17px', // Adjust the font size as needed
                fontWeight: 'bold'
            },
        },
        cells: {
            style: {
                fontSize: '16px', // Adjust the font size as needed
            }
        },
        rows: {
            style: {
                '&:hover': {
                    background: '#f4f4f4'
                },
            }
        }
    };

    return (
        <div className='ad_Products_Tab'>
            <div className='Products_Tab'>
                <div className='introduction-products-tab'>
                    <h1>Product Management</h1>
                </div>
                <div className='box-products-manage'>
                    <div className='products-manage-elements'>
                        <h2 className='h2-products-list'>Search Product Here</h2>
                        <div className='box-input'>
                            <input
                                className='input-products'
                                type='text'
                                placeholder='Search product name...'
                                onChange={handleFilter}
                            ></input>
                            <i className='fas fa-search'></i>
                        </div>
                    </div>

                    <div className='products-management-table'>
                        <DataTable
                            columns={columns}
                            data={records}
                            selectableRows
                            fixedHeader
                            pagination
                            className='products-table'
                            customStyles={customStyles}
                        ></DataTable>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products;
