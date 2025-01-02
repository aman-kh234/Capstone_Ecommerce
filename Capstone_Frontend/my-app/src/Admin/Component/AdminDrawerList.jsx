import React from 'react';
import DrawerList from '../../component/DrawerList';
import {
  AccountBox,
  Add,
  Category,
  Dashboard,
  ElectricBolt,
  Home,
  IntegrationInstructions,
  LocalOffer,
  Logout,
  Wallet
} from '@mui/icons-material';

const menu = [
  {
    name: "Seller",
    path: "/admin",
    icon: <Dashboard sx={{ color: "primary.main" }} />,
    activeIcon: <Dashboard className="text-white" />
  },
  {
    name: "Customer",
    path: "/admin/customer",
    icon: <Dashboard sx={{ color: "primary.main" }} />,
    activeIcon: <Dashboard className="text-white" />
  },
  {
    name: "Coupons",
    path: "/admin/coupon",
    icon: <IntegrationInstructions sx={{ color: "primary.main" }} />,
    activeIcon: <IntegrationInstructions className="text-white" />
  },
  {
    name: "Add New Coupon",
    path: "/admin/add-coupon",
    icon: <Add sx={{ color: "primary.main" }} />,
    activeIcon: <Add className="text-white" />
  },
  {
    name: "Manage Wallet",
    path: "/admin/manage-wallet",
    icon: <Wallet sx={{ color: "primary.main" }} />,
    activeIcon: <Wallet className="text-white" />
  },

];

const menu2 = [
  {
    name: "Account",
    path: "/admin/account",
    icon: <AccountBox sx={{ color: "primary.main" }} />,
    activeIcon: <AccountBox className="text-white" />
  },
  {
    name: "Logout",
    path: "/",
    icon: <Logout sx={{ color: "primary.main" }} />,
    activeIcon: <Logout className="text-white" />
  }
];

const AdminDrawerList = ({ toggleDrawer }) => {
  return <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer} />;
};

export default AdminDrawerList;