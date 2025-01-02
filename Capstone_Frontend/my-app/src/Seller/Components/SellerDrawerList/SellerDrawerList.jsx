import { AccountBalanceWallet, AccountBox, Add, Dashboard, Inventory, Logout, Receipt, ShoppingBag } from '@mui/icons-material';
import React from 'react';
import DrawerList from './DrawerList';

// Menu items for the drawer
const menu = [
    {
        name: "Dashboard",
        path: "/seller",
        icon: <Dashboard className="text-[#6a1b9a]" />,
        activeIcon: <Dashboard className='text-white' />
    },
    {
        name: "Orders",
        path: "/seller/orders",
        icon: <ShoppingBag className="text-[#6a1b9a]" />,
        activeIcon: <ShoppingBag className='text-white' />
    },
    {
        name: "Products",
        path: "/seller/products",
        icon: <Inventory className="text-[#6a1b9a]" />,
        activeIcon: <Inventory className='text-white' />
    },
    {
        name: "Add Product",
        path: "/seller/add-product",
        icon: <Add className="text-[#6a1b9a]" />,
        activeIcon: <Add className='text-white' />
    },
    // {
    //     name: "Payment",
    //     path: "/seller/payment",
    //     icon: <AccountBalanceWallet className="text-[#6a1b9a]" />,
    //     activeIcon: <AccountBalanceWallet className='text-white' />
    // },
    {
        name: "Transaction",
        path: "/seller/Transaction",
        icon: <Receipt className="text-[#6a1b9a]" />,
        activeIcon: <Receipt className='text-white' />
    },
];

const menu2 = [
    {
        name: "Account",
        path: "/seller/account",
        icon: <AccountBox className="text-[#6a1b9a]" />,
        activeIcon: <AccountBox className='text-white' />
    },
    {
        name: "Logout",
        path: "/",
        icon: <Logout className="text-[#6a1b9a]" />,
        activeIcon: <Logout className='text-white' />
    },
];

const SellerDrawerList = ({ toggleDrawer }) => {
    return (
        <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer} />
    );
};

export default SellerDrawerList;
