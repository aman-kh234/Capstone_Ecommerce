import React, { useState, useEffect } from 'react';
import CartItem from './CartItem';
import { Close, LocalOffer } from '@mui/icons-material';
import { teal } from '@mui/material/colors';
import { Button, IconButton, TextField } from '@mui/material';
import PricingCart from './PricingCart';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartData, setCartData] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');

    if (!userToken) {
      // Redirect to homepage and show alert
      navigate('/');
      alert('Please log in to access your cart');
      return;
    }

    const fetchCartData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/cart', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        // setCartData(response.data);

        if (response.data) {
          setCartData(response.data);
          setIsCouponApplied(!!response.data.couponCode); // Check if coupon is already applied
          setCouponCode(response.data.couponCode || '');
        }
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchCartData();
  }, [navigate]);

  const handleChange = (e) => {
    setCouponCode(e.target.value);
  };

  const handleApplyCoupon = async () => {
    const userToken = localStorage.getItem('userToken');

    if (!couponCode) {
      alert('Please enter a valid coupon code.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/api/coupons/api',
        null,
        {
          params: {
            code: couponCode, // Pass the coupon code here
            apply: 'true', // Apply coupon
            orderValue: cartData?.totalSellingPrice || 0,
          },
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      if (response.data) {
        setCartData(response.data);
        setIsCouponApplied(true); // Set coupon as applied
        setCouponCode(couponCode); // Clear the coupon code input after applying
      }
    } catch (error) {
      alert('Coupon already used')
      console.error('Error applying coupon:', error);
    }
  };

  const handleRemoveCoupon = async () => {
    const userToken = localStorage.getItem('userToken');
    console.log(userToken)

    if (!isCouponApplied) {
      alert('No coupon applied')
      return
    }


    try {
      const response = await axios.post(
        'http://localhost:8080/api/coupons/api',
        null,
        {
          params: {
            code: couponCode, // Pass the coupon code here when removing it
            apply: 'false', // Set apply to false to remove the coupon
            orderValue: cartData?.totalSellingPrice || 0, // Pass the current order value
          },
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      console.log(response.data);
      if (response.data) {
        setCartData(response.data); // Update cart data after removing coupon
        setIsCouponApplied(false); // Mark coupon as removed
        setCouponCode(''); // Clear the coupon code field
      }
    } catch (error) {
      console.error('Error removing coupon:', error);
    }
  };

  const removeCartItem = async (itemId) => {
    const userToken = localStorage.getItem('userToken');

    setCartData((prevData) => {
      const updatedItems = prevData.cartItems.filter((item) => item.id !== itemId);
      return { ...prevData, cartItems: updatedItems };
    });

    try {
      const response = await axios.delete(
        `http://localhost:8080/api/cart/item/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.status !== 200) {
        console.error('Failed to delete item from the backend');
      }
    } catch (error) {
      console.error('Error removing item:', error);
      setCartData((prevData) => {
        const restoredItems = [...prevData.cartItems, { id: itemId }];
        return { ...prevData, cartItems: restoredItems };
      });
    }
  };

  const updateCartItem = (itemId, updatedItem) => {
    setCartData((prevData) => {
      const updatedItems = prevData.cartItems.map((item) =>
        item.id === itemId ? updatedItem : item
      );
      return { ...prevData, cartItems: updatedItems };
    });
  };

  if (!cartData) {
    navigate("/");
    return;
  }

  const handleCheckout = () => {
    navigate('/checkout', { state: { cartData } });
  };

  return (
    <div className="pt-10 px-5 sm:px-10 md:px-60 min-h-screen">
      {cartData.cartItems.length === 0 ? (
        <div className="flex flex-col justify-center items-center">
          <img
            src="https://plus.unsplash.com/premium_vector-1721296174151-fc6aa64a6ae1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFnfGVufDB8fDB8fHww"
            alt="Empty Cart"
            className="w-40 h-40 mb-4"
          />
          <p className="text-lg font-semibold">Hey, it feels so light!</p>
          <p className="text-sm text-gray-600">There is nothing in your bag. Let's add some items!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="cartItemSection lg:col-span-2 space-y-3">
            {cartData.cartItems.map((item, index) => (
              <CartItem
                key={index}
                item={item}
                updateCartItem={updateCartItem}
                removeCartItem={removeCartItem}
              />
            ))}
          </div>
          <div className="col-span-1 text-sm space-y-3">
            <div className="border rounded-md px-5 py-3 space-y-5">
              <div className="flex gap-3 text-sm items-center">
                <div className="flex gap-3 text-sm items-center">
                  <LocalOffer sx={{ color: teal[600], fontSize: '17px' }} />
                </div>
                <span>Apply Coupons</span>
              </div>


              {isCouponApplied ? (
                <div className="flex">
                  <div className="p-1 pl-5 pr-3 border rounded-md flex gap-2 items-center">
                    <span>Coupon Applied</span>
                    <IconButton
                      size="small"
                      onClick={handleRemoveCoupon} // Removes coupon
                    >
                      <Close className="text-red-500" />
                    </IconButton>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <TextField
                    onChange={handleChange}
                    value={couponCode}
                    id="outlined-basic"
                    placeholder="Enter coupon code"
                    size="small"
                    variant="outlined"
                  />
                  <Button
                    size="small"
                    onClick={handleApplyCoupon} // Applies coupon
                  >
                    Apply
                  </Button>
                </div>
              )}
            </div>

            <div className="border rounded-md">
              {console.log("Cart data------>", cartData)}
              <PricingCart
                totalSellingPrice={cartData.totalSellingPrice}
                totalItem={cartData.totalItem}
                totalMrpPrice={cartData.totalMrpPrice}
                discount={cartData.discount}
              />
              <div className="p-3">
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ py: '11px' }}
                  onClick={handleCheckout}
                  style={{
                    backgroundColor: '#00796b',
                    color: '#fff',
                    padding: '10px',
                    fontSize: '1rem',
                  }}
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
