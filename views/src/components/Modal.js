import React, { useState, useEffect } from 'react';
import { Dialog, Card, CardBody, CardFooter, Typography, Input } from '@material-tailwind/react';
import '../styles/Merchant/Modal.css';
import axios from 'axios';
import { Image } from 'cloudinary-react';

export default function Modal({ open, handleOpen, product }) {
	const [values, setValues] = useState(product);
	useEffect(() => {
		setValues(product);
	}, [product, open]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name in values) {
			setValues((prevValues) => ({
				...prevValues,
				[name]: value,
			}));
		} else {
			setValues((prevValues) => ({
				...prevValues,
				description: {
					...prevValues.description,
					[name]: value,
				},
			}));
		}
	};

	const [fileNames, setFileNames] = useState([]);

	const showUploadFile = (e) => {
		let fileList = e.target.files;
		if (fileList.length > 2) {
			alert('You can only upload a maximum of 2 files');
			e.target.value = '';
			return;
		}

		for (let i = 0; i < fileList.length; i++) {
			if (!fileList[i].type.startsWith('image/')) {
				// Check the file type
				alert('Only image files are allowed');
				e.target.value = '';
				return;
			}
		}

		let newFileNames = [];
		for (let i = 0; i < fileList.length; i++) {
			newFileNames.push(fileList[i].name); // Add each file name to the array
		}

		setFileNames(newFileNames);
	};

	const handleImageUpload = (event, index) => {
		const file = event.target.files[0];
		const reader = new FileReader();

		reader.onloadend = () => {
			setValues((prevValues) => {
				const newImgURLs = [...prevValues.imgURLs];
				newImgURLs[index] = reader.result;
				return { ...prevValues, imgURLs: newImgURLs };
			});
		};

		if (file) {
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = async () => {
		for (let i = 0; i < values.imgURLs.length; i++) {
			if (values.imgURLs[i] && !values.imgURLs[i].includes('cloudinary')) {
				const formData = new FormData();
				formData.append('file', values.imgURLs[i]);
				formData.append('upload_preset', 'kwnzx4kd');

				const res = await axios.post('https://api.cloudinary.com/v1_1/dikez764l/image/upload', formData);
				values.imgURLs[i] = res.data.url;
			}
		}
		axios.post('http://localhost:4000/merchant/editproductlist', { product: values });
	};
	return (
		<>
			<Dialog size='lg' open={open} handler={handleOpen} className='bg-transparent shadow-none'>
				<Card className=' mx-auto w-full custom-dialog '>
					<div>
						<CardBody className='flex flex-col gap-4'>
							<Typography variant='h4' color='blue-gray' className='text-center'>
								{values.productId ? 'Edit' : 'Add'} product
							</Typography>
							<div className='flex items-center gap-4'>
								<Typography variant='medium' color='blue-gray' className='pt-5 pb-2 mt-0 mb-0 font-medium' style={{ fontWeight: 'bold' }}>
									Name
								</Typography>
								<Input variant='standard' size='lg' name='name' value={values.name} onChange={handleChange} />
							</div>
							<Typography variant='medium' color='blue-gray' className='mb-0 font-medium' style={{ fontWeight: 'bold' }}>
								Description
							</Typography>
							<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
								{values &&
									values.description &&
									Object.entries(values.description).map(([key, value], index) => {
										return (
											<div className='flex items-center gap-4' key={index}>
												<Typography variant='small' color='blue-gray' className='pt-5 pb-2 mt-0 mb-0 font-medium' style={{ fontWeight: 'bold' }}>
													{key.charAt(0).toUpperCase() + key.slice(1) + ':'}
												</Typography>
												<Input variant='standard' size='lg' name={key} value={values.description[key]} onChange={handleChange} />
											</div>
										);
									})}
								<div className='flex items-center gap-4'>
									<Typography variant='small' color='blue-gray' className='pt-5 pb-2 mt-0 mb-0 font-medium' style={{ fontWeight: 'bold' }}>
										Price:
									</Typography>
									<Input variant='standard' size='lg' name='price' value={values.price} onChange={handleChange} />
								</div>
							</div>

							<Typography variant='medium' color='blue-gray' className='pt-5 pb-2 mt-0 mb-0 font-medium' style={{ fontWeight: 'bold' }}>
								Image
							</Typography>
							<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px' }}>
								{[...Array(4)].map((_, index) => (
									<label htmlFor={`file${index}`} className='image-frame'>
										{values.imgURLs && values.imgURLs[index] ? (
											<img className='image' src={values.imgURLs[index]} alt='' />
										) : (
											<span htmlFor={`file${index}`}>
												<i className='fa-light fa-upload'></i> Upload
											</span>
										)}
										<input type='file' id={`file${index}`} style={{ display: 'none' }} onChange={(event) => handleImageUpload(event, index)} />
									</label>
								))}
							</div>
						</CardBody>
						<CardFooter className='pt-0 flex justify-center'>
							<button variant='gradient' onClick={handleSubmit}>
								{values.productId ? 'Edit' : 'Add'}
							</button>
						</CardFooter>
					</div>
				</Card>
			</Dialog>
		</>
	);
}
