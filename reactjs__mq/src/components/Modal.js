import React, { useState, useEffect } from 'react';
import { Button, Dialog, Card, CardBody, CardFooter, Typography, Input, Checkbox } from '@material-tailwind/react';
import '../styles/Merchant/Modal.css';

export default function Modal({ open, handleOpen, product }) {
    const [values, setValues] = useState(product);
    useEffect(() => {
        setValues(product);
    }, [product]);
    
    const handleChange = (e) => {
        console.log(values);
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };
    return (
        <>
            <Dialog size='lg' open={open} handler={handleOpen} className='bg-transparent shadow-none'>
                <Card className='mx-auto w-full custom-dialog'>
                    <div>
                    <CardBody className='flex flex-col gap-4'>
                        <Typography variant='h4' color='blue-gray'>
                            Edit product
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
                            {Object.entries(product).map(([key, value], index) => {
                                if (key !== 'name' && key !== 'image' && !key.includes('sub')) {
                                    return (
                                        <div className='flex items-center gap-4' key={index}>
                                            <Typography variant='small' color='blue-gray' className='pt-5 pb-2 mt-0 mb-0 font-medium' style={{ fontWeight: 'bold' }}>
                                                {key.charAt(0).toUpperCase() + key.slice(1) + ':'}
                                            </Typography>
                                            <Input variant='standard' size='lg' name={key} value={values[key]} onChange={handleChange} />
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </CardBody>
                    <CardFooter className='pt-0'>
                        <Button variant='gradient' onClick={handleOpen}>
                            Edit
                        </Button>
                    </CardFooter>
                    </div>
                </Card>
            </Dialog>
        </>
    );
}
