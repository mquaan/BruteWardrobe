import React from 'react'
import '../../styles/Administrator/Dashboard.css';
import {Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend} from 'chart.js';
import {Bar} from 'react-chartjs-2';
ChartJS.register(
    BarElement, CategoryScale, LinearScale, Tooltip, Legend
)


function Dashboard() {
    const data1 = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                data: [810, 990, 1050, 1150, 800, 1890, 1000, 1100, 1220, 1300, 1380, 1512],
                backgroundColor: '#9DD2A8',
                barThickness: 22,
                // borderColor: 'black',
                borderWidth: 1
            }
        ]
    }

    const data2 = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                data: [18000, 16000, 5000, 8000, 3000, 14000, 14000, 16000, 17000, 18000, 17770, 20000],
                backgroundColor: '#4098DB',
                barThickness: 22,
                borderWidth: 1
            }
        ]
    }

    const options = {
        plugins: {
            legend: {
                display: false // Hide label
            }
        }
    }
    
    return(
        <div className='ad_dashboard'>
            <div className='dashboard'>
                <div className='introduction'>
                    <h1>Website Usage And Financial Report</h1>
                </div>
            
                <div className='parameter-boxes'>
                    <div className='parameter-admin'>
                        <i class="fa-solid fa-user-gear"></i>
                        <p className='admin-num' style={{color: "black"}}>10</p>
                        <p className='tit'>Administrators</p>
                    </div>

                    <div className='parameter-merchant'>
                        <i class="fa-solid fa-user-tie-hair"></i>
                        <p className='merchant-num' style={{color: "black"}}>500</p>
                        <p className='tit'>Merchants</p>
                    </div>

                    <div className='parameter-customer'>
                        <i class="fa-solid fa-users"></i>
                        <p className='customer-num' style={{color: "black"}}>1,512</p>
                        <p className='tit'>Customers</p>
                    </div>

                    <div className='parameter-profit'>
                        <div style={{display: 'flex', justifyContent: 'space-between', margin: '15px 15px 0px 15px'}}>
                            <p className='profit'>Total Profit</p>
                            <img src='../assets/features/profit.png' alt=''/>
                        </div>
                        <p className='total-profit'>$ 35.000</p>
                    </div>
                    <div className='parameter-revenue'>
                        <div style={{display: 'flex', justifyContent: 'space-between', margin: '15px 15px 0px 15px'}}>
                            <p className='revenue'>Total Revenue</p>
                            <img src='../assets/features/revenue.png' alt=''/>
                        </div>
                        <p className='total-revenue'>$ 50.000</p>
                    </div>
                </div>
                
                <div className='box-users-sales'>
                    <p className='users'>Users Counts</p>
                    <button className='btn-users-sync'><i className='fa-solid fa-rotate fa-spin'></i>Sync</button>
                    <p className='sales'>Sales</p>
                    <button className='btn-sales-sync'><i className='fa-solid fa-rotate fa-spin'></i>Sync</button>
                </div>

                <div className='box-chart'>
                    <div className='chart1'>
                        <Bar
                            data = {data1}
                            options = {options}
                            style ={{marginTop: "30px"}}
                        > 
                        </Bar>
                    </div>
                    <div className='chart2'>
                        <Bar
                            data = {data2}
                            options = {options}
                            style ={{marginTop: "30px"}}
                        > 
                        </Bar>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dashboard;
