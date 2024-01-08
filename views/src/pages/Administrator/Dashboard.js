import React, { useState, useEffect } from 'react';
import '../../styles/Administrator/Dashboard.css';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Dashboard() {
	const [accountNum, setAccountNum] = useState([]);
	const [totalRevenue, setTotalRevenue] = useState(0);
	const [customerCounts, setCustomerCounts] = useState([]);
	const [saleCounts, setSaleCounts] = useState([]);
	const [reloadCustomerCounts, setReloadCustomerCounts] = useState(false);
	const [reloadSaleCounts, setReloadSaleCounts] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				axios.get('http://localhost:4000/admin/getaccountNumber').then((response) => {
					if (response.data.success) {
						setAccountNum(response.data.accountNum);
					}
				});
			} catch (errors) {
				console.error('Error:', errors);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				axios.get('http://localhost:4000/admin/gettotalrevenue').then((response) => {
					if (response.data.success) {
						setTotalRevenue(response.data.totalRevenue);
					}
				});
			} catch (errors) {
				console.error('Error:', errors);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				axios.get('http://localhost:4000/admin/countcustomers').then((response) => {
					if (response.data.success) {
						console.log(response.data.customerCounts);
						setCustomerCounts(response.data.customerCounts);
						setReloadCustomerCounts(false);
					}
				});
			} catch (errors) {
				console.error('Error:', errors);
			}
		};
		fetchData();
	}, [reloadCustomerCounts]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				axios.get('http://localhost:4000/admin/countsales').then((response) => {
					if (response.data.success) {
						console.log(response.data.saleCounts);
						setSaleCounts(response.data.saleCounts);
						setReloadSaleCounts(false);
					}
				});
			} catch (errors) {
				console.error('Error:', errors);
			}
		};
		fetchData();
	}, [reloadSaleCounts]);

	const data1 = {
		labels: customerCounts ? customerCounts.map((item) => item[0]) : [],
		datasets: [
			{
				data: customerCounts ? customerCounts.map((item) => item[1]) : [],
				backgroundColor: '#9DD2A8',
				barThickness: 22,
				// borderColor: 'black',
				borderWidth: 1,
			},
		],
	};

	const data2 = {
		labels: saleCounts ? saleCounts.map((item) => item[0]) : [],
		datasets: [
			{
				data: saleCounts ? saleCounts.map((item) => item[1]) : [],
				backgroundColor: '#4098DB',
				barThickness: 22,
				borderWidth: 1,
			},
		],
	};

	const options = {
		plugins: {
			legend: {
				display: false, // Hide label
			},
		},
	};

	return (
		<div className='ad_dashboard'>
			<div className='dashboard'>
				<div className='introduction'>
					<h1>Website Usage And Financial Report</h1>
				</div>

				<div className='parameter-boxes'>
					<div className='parameter-admin'>
						<i class='fa-solid fa-user-gear'></i>
						<p className='admin-num' style={{ color: 'black' }}>
							{accountNum[0]}
						</p>
						<p className='tit'>Administrators</p>
					</div>

					<div className='parameter-merchant'>
						<i class='fa-solid fa-user-tie-hair'></i>
						<p className='merchant-num' style={{ color: 'black' }}>
							{accountNum[1]}
						</p>
						<p className='tit'>Merchants</p>
					</div>

					<div className='parameter-customer'>
						<i class='fa-solid fa-users'></i>
						<p className='customer-num' style={{ color: 'black' }}>
							{accountNum[2]}
						</p>
						<p className='tit'>Customers</p>
					</div>

					<div className='parameter-profit'>
						<div style={{ display: 'flex', justifyContent: 'space-between', margin: '15px 15px 0px 15px' }}>
							<p className='profit'>Total Profit</p>
							<img src='../assets/features/profit.png' alt='' />
						</div>
						<p className='total-profit'>{Intl.NumberFormat('en-DE').format(totalRevenue * 0.3)} VND</p>
					</div>
					<div className='parameter-revenue'>
						<div style={{ display: 'flex', justifyContent: 'space-between', margin: '15px 15px 0px 15px' }}>
							<p className='revenue'>Total Revenue</p>
							<img src='../assets/features/revenue.png' alt='' />
						</div>
						<p className='total-revenue'>{Intl.NumberFormat('en-DE').format(totalRevenue)} VND</p>
					</div>
				</div>

				<div className='box-users-sales'>
					<p className='users'>Customers Counts</p>
					<button className='btn-users-sync' onClick={() => setReloadCustomerCounts(true)}>
						<i className='fa-solid fa-rotate fa-spin'></i>Sync
					</button>
					<p className='sales'>Sales</p>
					<button className='btn-sales-sync' onClick={() => setReloadSaleCounts(true)}>
						<i className='fa-solid fa-rotate fa-spin'></i>Sync
					</button>
				</div>

				<div className='box-chart'>
					<div className='chart1'>
						<Bar data={data1} options={options} style={{ marginTop: '30px' }}></Bar>
					</div>
					<div className='chart2'>
						<Bar data={data2} options={options} style={{ marginTop: '30px' }}></Bar>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
