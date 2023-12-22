import React, { useState, useEffect } from 'react';
import { Dialog, Card, CardBody, CardFooter, Typography, Input } from '@material-tailwind/react';
import '../styles/Merchant/Modal.css';

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
	return (
		<>
			<Dialog size='lg' open={open} handler={handleOpen} className='bg-transparent shadow-none'>
				<Card className='mx-auto w-full custom-dialog'>
					<div>
						<CardBody className='flex flex-col gap-4'>
							<Typography variant='h4' color='blue-gray' className='text-center'>
								{values.productID ? 'Edit' : 'Add'} product
							</Typography>
							<div className='flex items-center gap-4'>
								<Typography variant='medium' color='blue-gray' className='pt-5 pb-2 mt-0 mb-0 font-medium' style={{ fontWeight: 'bold' }}>
									Name:
								</Typography>
								<Input variant='standard' size='lg' name='name' value={values.name} onChange={handleChange} />
							</div>
							<Typography variant='medium' color='blue-gray' className='mb-2 font-medium' style={{ fontWeight: 'bold' }}>
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
							</div>
							{!values.productID ? (
								<>
									<div className='flex items-center gap-4'>
										<Typography
											variant='small'
											color='blue-gray'
											className='pt-5 pb-2 mt-0 mb-0 font-medium'
											style={{ fontWeight: 'bold', padding: 0 }}
										>
											<label for='form__file' className='form-label'>
												Image:
											</label>
										</Typography>
										<br />
										<button className='form__file-btn' type='button'>
											<label for='form__file'>
												<i className='fa-light fa-upload'></i> Upload here
											</label>
										</button>
										<input type='file' id='form__file' name='uploadedImages' accept='image/*' multiple onChange={showUploadFile} />
									</div>
									<div id='form__file-list'>{fileNames.join(', ')}</div>
								</>
							) : (
								''
							)}
						</CardBody>
						<CardFooter className='pt-0 flex justify-center'>
							<button variant='gradient' onClick={handleOpen}>
								{values.productID ? 'Edit' : 'Add'}
							</button>
						</CardFooter>
					</div>
				</Card>
			</Dialog>
		</>
	);
}
