import { Card, Typography, List, ListItem, ListItemPrefix } from '@material-tailwind/react';
import { BuildingStorefrontIcon, ShoppingBagIcon, UserCircleIcon, PowerIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import '../styles/Merchant/Sidebar.css';

export default function Sidebar() {
    require('../../src/index.css');
    return (
        <Card className='h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 sidebar'>
            <div className='mb-2 p-4'>
                <Typography variant='h5' color='blue-gray'>
                    BruteWardrobe
                </Typography>
            </div>
            <List>
                <Link to='/merchant/products'>
                    <ListItem>
                        <ListItemPrefix>
                            <BuildingStorefrontIcon className='h-5 w-5' />
                        </ListItemPrefix>
                        Products
                    </ListItem>
                </Link>
                <Link to='/merchant/orders'>
                    <ListItem>
                        <ListItemPrefix>
                            <ShoppingBagIcon className='h-5 w-5' />
                        </ListItemPrefix>
                        Orders
                    </ListItem>
                </Link>
                <Link to='/merchant/profile'>
                    <ListItem>
                        <ListItemPrefix>
                            <UserCircleIcon className='h-5 w-5' />
                        </ListItemPrefix>
                        Profile
                    </ListItem>
                </Link>
                <Link to='/merchant/logout'>
                    <ListItem>
                        <ListItemPrefix>
                            <PowerIcon className='h-5 w-5' />
                        </ListItemPrefix>
                        Log Out
                    </ListItem>
                </Link>
            </List>
        </Card>
    );
}
