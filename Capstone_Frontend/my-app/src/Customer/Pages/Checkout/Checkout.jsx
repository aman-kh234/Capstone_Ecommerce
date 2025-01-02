import { Box, Button, Modal, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import AddressCard from './AddressCard';
import PricingCart from '../Cart/PricingCart';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddressForm from './Addressform';

const Checkout = () => {
  const { state } = useLocation();
  const [open, setOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [cartData, setCartData] = useState(state?.cartData);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [usedWalletBalance, setUsedWalletBalance] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
      navigate('/login');
      return;
    }

    const fetchAddresses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/users/profile', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setAddresses(response.data.addresses);
      } catch (error) {
        console.error('Error fetching user addresses:', error);
      }
    };

    fetchAddresses();
  }, [navigate]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddressSelect = (addressId) => {
    const address = addresses.find(address => address.id === addressId);
    setSelectedAddress(address);
  };

  const fetchUserWallet = async () => {
    const userToken = localStorage.getItem('userToken');
    const response = await axios.get(`http://localhost:8080/users/getWalletBalance`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    if (response.data === "") setWalletBalance(0);
    else setWalletBalance(response.data);
  };

  const handleWalletBalanceChange = (e) => {
    let value = e.target.value;

    // If the value is empty (i.e., user backspaces everything), set it to 0
    if (value === '') {
      setUsedWalletBalance('');
    } else {
      // If the value is a valid number and within range, set it as the used wallet balance
      const parsedValue = parseFloat(value);

      // Ensure the value is not below 0 and within the wallet balance and cart total limit
      if (parsedValue >= 0 && parsedValue <= walletBalance && parsedValue <= cartData.totalSellingPrice) {
        setUsedWalletBalance(parsedValue);
      }
    }
  };

  useEffect(() => {
    fetchUserWallet();
  }, []);

  const handlePayment = async () => {
    const userToken = localStorage.getItem('userToken');

    if (!selectedAddress) {
      alert("Please select a shipping address.");
      return;
    }

    console.log("selectedAddress" + selectedAddress);
    console.log("used wallet balance-->", usedWalletBalance)
    try {
      let result = false;
      if (cartData && cartData.cartItems && cartData.cartItems.length > 0) {
        result = await axios.get(
          `http://localhost:8080/api/orders/verify`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
            params: { usedWalletBalance: usedWalletBalance }
          }
        );
      }
      console.log("------------------------------------------------------------------")
      console.log(result)
      console.log("------------------------------------------------------------------")
      if (result.data === false) {
        alert("Items out of stock");
        return;
      }


      const response = await axios.post(
        `http://localhost:8080/api/orders`,
        selectedAddress,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      console.log(cartData);
      if (cartData && cartData.cartItems && cartData.cartItems.length > 0) {
        for (let item of cartData.cartItems) {
          await axios.delete(`http://localhost:8080/api/cart/item/${item.id}`, {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          });
        }
      }

      setCartData(null);
      localStorage.removeItem('cartData');

      // navigate('/account/orders');
      navigate('/payment-processing');

    } catch (error) {
      console.error('Error creating order:', error);
      if (error.response) {
        console.error('Response error data:', error.response.data);
      }
    }
  };


  return (
    <>
      <div className="pt-10 px-5 sm:px-10 md:px-44 lg:px-60 min-h-screen">
        <div className="lg:grid lg:grid-cols-12 lg:gap-9">
          {/* Left Section: Address */}
          <div className="col-span-7 space-y-5">
            <div className="space-y-5 p-5 rounded-md border" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
              <div className="flex justify-between items-center">
                <h1 className="font-semibold">Select Address</h1>
                <Button onClick={handleOpen} style={{ backgroundColor: '#00796b', color: '#fff', textTransform: 'none', padding: '8px 16px', fontSize: '0.875rem' }}>
                  Add New Address
                </Button>
              </div>

              <div className="text-xs font-medium space-y-5">
                <div className="space-y-3">
                  {addresses.length > 0 ? (
                    addresses.map((address, index) => (
                      <AddressCard
                        key={index}
                        address={address}
                        selectedAddress={selectedAddress}
                        handleAddressSelect={handleAddressSelect}
                      />
                    ))
                  ) : (
                    <p>No addresses found. Please add an address.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Section: Wallet and Pay Now */}
          <div className="col-span-5 space-y-5">
            <div className="space-y-5 p-5 rounded-md border" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
              <h2 className="font-semibold">Use Wallet Balance</h2>
              <div className="flex items-center space-x-3">
                <TextField
                  label="Amount to Use"
                  value={usedWalletBalance}
                  onChange={handleWalletBalanceChange}
                  inputProps={{
                    min: 0,
                    max: Math.min(walletBalance, cartData ? cartData.totalSellingPrice : 0),
                  }}
                  fullWidth
                  helperText={`Available Balance: ${walletBalance}`}
                  // Disable the input if walletBalance is 0
                  disabled={walletBalance === 0}
                />
              </div>
            </div>

            <div className="space-y-5 p-5 rounded-md border" style={{ backgroundColor: '#ffffff', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
              <PricingCart
                totalSellingPrice={cartData ? cartData.totalSellingPrice - usedWalletBalance : 0}
                totalItem={cartData ? cartData.totalItem : 0}
                totalMrpPrice={cartData ? cartData.totalMrpPrice : 0}
                discount={cartData ? cartData.discount : 0}
              />
              <div className="p-1 px-15">
                <Button
                  fullWidth
                  variant="contained"
                  style={{ backgroundColor: '#00796b', color: '#fff', padding: '8px', fontSize: '1rem' }}
                  onClick={handlePayment}
                >
                  Pay Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <AddressForm onClose={handleClose} />
        </Box>
      </Modal>
    </>
  );
};

export default Checkout;
