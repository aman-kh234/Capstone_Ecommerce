import { Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AccountCircle, CardGiftcard, ExitToApp, Home, LocalShipping, LocationOn, Payment } from '@mui/icons-material';
import Orders from './Orders';
import OrderDetails from './OrderDetails';
import UserDetails from './UserDetails';
import Address from './Address';
import SavedCards from './SavedCards';
import Coupons from './Coupons';
import { jwtDecode } from 'jwt-decode';
import OrderStepper from './OrderStepper';


const menu = [
  { name: "Profile", path: "/account", icon: <AccountCircle /> },
  { name: "Addresses", path: "/account/addresses", icon: <LocationOn /> },
  { name: "Orders", path: "/account/orders", icon: <LocalShipping /> },
  { name: "Saved Cards", path: "/account/saved-card", icon: <Payment /> },
  { name: "Coupons", path: "/account/coupons", icon: <CardGiftcard /> },


];

const Account = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(null); // To store logged-in user data




  const getRoleFromToken = () => {
    // Step 1: Get the token from local storage
    const sellerToken = localStorage.getItem('userToken'); // or sessionStorage
    console.log("inside get toknfrom local storage");
    console.log("Token->", sellerToken)
    if (sellerToken) {
      try {
        // Step 2: Decode the token
        const decodedToken = jwtDecode(sellerToken);

        // Step 3: Check the role in the decoded token (assuming the role is in 'role' claim)
        if (decodedToken.authorities === 'Role_Customer') {
          console.log('User is a Validated');
          // alert("You are a validated User")
          return 'seller';
        } else if (decodedToken.authorities === 'Role_Seller') {
          console.log('User is not validated as User');
          // alert("You are a seller!! Login with user account")
          navigate("/");
          return 'user';
        } else {
          console.log('Role is not recognized');
          // alert("role not recignized");
          navigate("/")
          return 'unknown';
        }
      } catch (error) {
        console.error('Error decoding token:', error);

        return 'error';
      }
    } else {
      console.log('No token found');
      navigate("/");
      return 'no-token';
    }

  };

  useEffect(() => {
    getRoleFromToken();
  }, [])


  useEffect(() => {
    // Fetch user token from localStorage
    const token = localStorage.getItem('userToken');
    if (token) {
      const storedUserData = JSON.parse(localStorage.getItem('userData'));
      if (storedUserData) {
        setUserData(storedUserData); // Set user data if available
      }
    }
  }, []);

  const handleClick = (item) => {
    if (item.path === "/") {
      // Logout logic
      localStorage.removeItem('userToken');
      localStorage.removeItem('userData');
      navigate('/');
    } else {
      navigate(item.path);
    }
  };

  if (!userData) {
    return <div>Loading...</div>; // You can add a loading spinner here
  }

  return (
    <div className='lg:px-20 px-4 min-h-screen mt-10'>
      <div className='grid grid-cols-1 lg:grid-cols-4 lg:min-h-[80vh] gap-6'>
        <section className="lg:col-span-1 bg-white p-4 rounded-lg shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <img
              src={userData.avatarUrl || "https://via.placeholder.com/40"}
              alt="User Avatar"
              className="rounded-full"
            />
            <div>
              <p className="font-semibold text-lg">Hello, {userData.fullName || 'User'}</p>
            </div>
          </div>
          {menu.map((item) => (
            <div
              onClick={() => handleClick(item)}
              key={item.name}
              className={`py-3 px-4 cursor-pointer rounded-md mb-2 transition-colors duration-200 hover:[background-color:#6a1b9a] hover:text-white
                ${item.path === location.pathname ? "bg-[#6a1b9a] text-white" : "text-gray-700"}`}

            >
              <div className="flex items-center gap-3">
                {item.icon}
                <p className="font-medium">{item.name}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Main Content Section */}
        <section className='lg:col-span-3 bg-white p-6 rounded-lg shadow-lg'>
          <Routes>
            <Route path="/" element={<UserDetails userData={userData} />} />
            <Route path="/orders" element={<Orders userData={userData} />} />
            <Route path="/order/:orderId/:orderItemId" element={<OrderDetails />} />
            <Route path="/addresses" element={<Address userData={userData} />} />
            <Route path="/saved-card" element={<SavedCards />} /> {/* Add the SavedCards route here */}
            <Route path="/coupons" element={<Coupons />} />

          </Routes>
        </section>
      </div>
    </div>
  );
};

export default Account;
