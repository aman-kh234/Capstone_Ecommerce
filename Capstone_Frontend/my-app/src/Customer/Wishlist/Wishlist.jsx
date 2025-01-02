import React, { useState, useEffect } from 'react';
import WishlistProductCard from './WishlistProductCard';
import axios from 'axios';
import { CircularProgress, Snackbar, Alert } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
const Wishlist = () => {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error handling
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar for success/error
const navigate=useNavigate();
  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem('userToken');
      try {
        const response = await axios.get('http://localhost:8080/api/wishlist', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setWishlistProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        setError('Failed to load wishlist. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (productId) => {
    const token = localStorage.getItem('userToken');
    try {
      // Ask for confirmation before removing
      const confirmed = window.confirm('Are you sure you want to remove this item from your wishlist?');
      if (!confirmed) return;

      await axios.post(
        `http://localhost:8080/api/wishlist/remove-product/${productId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setWishlistProducts((prev) => prev.filter((item) => item.id !== productId));
      setOpenSnackbar(true); // Show success message
    } catch (error) {
      console.error('Error removing product from wishlist:', error);
      setError('Failed to remove product from wishlist. Please try again.');
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };




  const getRoleFromToken = () => {
    // Step 1: Get the token from local storage
    const sellerToken = localStorage.getItem('userToken'); // or sessionStorage
  console.log("inside get toknfrom local storage");
  console.log("Token->",sellerToken)
    if (sellerToken) {
      try {
        // Step 2: Decode the token
        const decodedToken = jwtDecode(sellerToken);
  
        // Step 3: Check the role in the decoded token (assuming the role is in 'role' claim)
        if (decodedToken.authorities=== 'Role_Customer') {
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
  
useEffect(()=>{
getRoleFromToken();
},[])








  return (
    <div className="p-6">
      {/* Wishlist Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Your Wishlist</h1>
        <p className="text-gray-600 mt-2">Browse the products you love and save them for later!</p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center mt-10">
          <CircularProgress size={50} />
        </div>
      )}

      {/* Error Handling */}
      {error && (
        <div className="text-center text-red-500 mt-4">
          <p>{error}</p>
        </div>
      )}

      {/* Wishlist Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {wishlistProducts.length > 0 ? (
          wishlistProducts.map((product) => (
            <WishlistProductCard
              key={product.id}
              product={product}
              onRemove={handleRemoveFromWishlist}
            />
          ))
        ) : (
          <div className="flex justify-center items-center col-span-full h-[60vh]">
          <div className="text-center">
            <p className="text-gray-600 text-lg">:(</p>
            {/* <br />  Empty line */}
            <p className="text-gray-600 text-lg">
              Your wishlist is empty! Start adding products you love.
            </p>
          </div>
        </div>
        )}
      </div>

      {/* Snackbar for Success/Error */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Product removed from wishlist successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Wishlist;
