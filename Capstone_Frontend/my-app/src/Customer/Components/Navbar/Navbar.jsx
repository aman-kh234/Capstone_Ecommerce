import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { AddShoppingCart, FavoriteBorder } from '@mui/icons-material';
import CategorySheet from './CategorySheet';
import { MainCategory } from '../../../Data/Category/MainCategory';
import { useNavigate } from 'react-router-dom';
import LoginSignupModal from '../../Pages/Auth/LoginSignupModal';
import axios from 'axios';
import WalletIcon from '@mui/icons-material/Wallet';

const Navbar = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'));
  const [selectedCategory, setSelectedCategory] = useState('men');
  const [showCategorySheet, setShowCategorySheet] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [walletBalance, setWalletBalance] = useState(0);
  const [userRole, setUserRole] = useState(''); // To store user role

  const fetchUserWallet = async () => {
    console.log("fetch user wallet-------------------")
    const userToken = localStorage.getItem('userToken');

    const response = await axios.get(
      `http://localhost:8080/users/getWalletBalance`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    if (response.data == "") setWalletBalance(0);
    else setWalletBalance(response.data);
    console.log("User Wallet Balance is->", response);
  }

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (userData) {
        setUser(userData);
        setUserRole(userData.role);  // Set the user role from localStorage
        fetchUserWallet();
      }
    }

    const sellerToken = localStorage.getItem('sellerToken');
    if (sellerToken) {
      fetchSellerProfile(sellerToken);
    }
  }, []);

  const fetchSellerProfile = async (token) => {
    try {
      const response = await axios.get('http://localhost:8080/seller/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(response.data);
    } catch (err) {
      setError('Failed to fetch profile. Please try again.');
      console.error('Fetch profile error: ', err);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setUserRole(userData.role); // Set the role on login
    localStorage.setItem('userData', JSON.stringify(userData));
    setModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setProfile(null);
    setUserRole(''); // Reset the user role on logout
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('sellerToken');
    setTimeout(() => {
      navigate('/');
    }, 0);
  };

  const handleUserProfileClick = () => {
    navigate('/account');
  };

  const handleSellerProfileClick = () => {
    if (profile) {
      navigate('/seller');
    }
  };

  const handleSearch = () => {
    console.log(searchTerm)
    if (searchTerm.length > 0) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div>
      <Box className="sticky top-0 left-0 right-0 bg-white" sx={{ zIndex: 2 }}>
        <div className="flex items-center justify-between px-5 lg:px-20 h-[70px] border-b">
          <div className="flex items-center gap-9">
            <div className="flex items-center gap-2">
              {!isLarge && (
                <IconButton>
                  <MenuIcon />
                </IconButton>
              )}
              <h1
                onClick={() => navigate('/')}
                className="logo cursor-pointer text-lg md:text-2xl font-bold"
                style={{ color: '#6a1b9a' }}
              >
                Trendly
              </h1>
            </div>
            <ul className="hidden lg:flex items-center font-medium text-gray-800">
              {MainCategory.map((item) => (
                <li
                  key={item.categoryId}
                  onMouseLeave={() => setShowCategorySheet(false)}
                  onMouseEnter={() => {
                    setShowCategorySheet(true);
                    setSelectedCategory(item.categoryId);
                  }}
                  className="MainCategory hover:text-[#6a1b9a] hover:border-b-2 h-[70px] px-4 border-[#6a1b9a] flex items-center cursor-pointer"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-1 lg:gap-4 items-center">
            <TextField
              size="small"
              variant="outlined"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: 200 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearch} edge="end">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {user ? (
              <div className="flex items-center cursor-pointer" onClick={handleUserProfileClick}>
                <Avatar>{user.fullName[0]}</Avatar>
                <span className="ml-2">{user.fullName}</span>
                <Button onClick={handleLogout} sx={{ ml: 2 }}>
                  Logout
                </Button>
              </div>
            ) : profile ? (
              <div className="flex items-center cursor-pointer" onClick={handleSellerProfileClick}>
                <Avatar>{profile.sellerName[0]}</Avatar>
                <span className="ml-2">{profile.sellerName}</span>
                <Button onClick={handleLogout} sx={{ ml: 2 }}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                variant="contained"
                sx={{
                  color: 'white',
                  backgroundColor: theme.palette.primary.main,
                }}
                onClick={() => setModalOpen(true)}
              >
                Login
              </Button>
            )}

            {/* Conditional rendering for Wishlist and Add to Cart icons */}
            {userRole !== 'Role_Admin' && (
              <>
                <IconButton onClick={() => navigate('/wishlist')}>
                  <FavoriteBorder sx={{ fontSize: 29 }} />
                </IconButton>
                <IconButton onClick={() => navigate('/cart')}>
                  <AddShoppingCart className="text-grey-700" sx={{ fontSize: 29 }} />
                </IconButton>
                <Tooltip title={`Wallet Balance: ₹${walletBalance}`} arrow>
                  <IconButton>
                    <WalletIcon className="text-grey-700" sx={{ fontSize: 29, color: 'green' }} />
                  </IconButton>
                </Tooltip>
              </>
            )}

            {/* Show Become Seller button only if no user or profile exists */}
            {(!user && !profile) && (
              <Button onClick={() => navigate('/become-seller')}>
                Seller
              </Button>
            )}
          </div>
        </div>

        {showCategorySheet && (
          <div
            onMouseLeave={() => setShowCategorySheet(false)}
            onMouseEnter={() => setShowCategorySheet(true)}
            className="categorySheet absolute top-[4.41rem] left-20 right-20 border shadow-lg bg-white z-10"
          >
            <CategorySheet selectedCategory={selectedCategory} />
          </div>
        )}
      </Box>

      <LoginSignupModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default Navbar;
