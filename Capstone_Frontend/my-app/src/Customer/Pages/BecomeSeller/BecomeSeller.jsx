import React, { useState } from 'react';
import SellerAccountForm from './SellerAccountForm';
import SellerLoginForm from './SellerLoginForm';
import { Button, Box, Typography, Paper } from '@mui/material';
import axios from 'axios';
import { Formik } from 'formik';

const BecomeSeller = () => {
  const [isLogin, setIsLogin] = useState(false);

  const handleShowPage = () => {
    setIsLogin(!isLogin);
  };

  const handleCreateAccount = async () => {
    try {
      const sellerData = {
        email: Formik.values.email,
        password: Formik.values.password,
        sellerName: Formik.values.sellerName,
        mobile: Formik.values.mobile,
        GSTIN: Formik.values.gstin,
        pickupAddress: {
          name: Formik.values.pickupAddres.name,
          mobile: Formik.values.pickupAddres.mobile,
          pincode: Formik.values.pickupAddres.pincode,
          address: Formik.values.pickupAddres.address,
          locality: Formik.values.pickupAddres.locality,
          city: Formik.values.pickupAddres.city,
          state: Formik.values.pickupAddres.state,
        },
        bankDetails: {
          accountNumber: Formik.values.bankDetails.accountNumber,
          ifscCode: Formik.values.bankDetails.ifscCode,
          accountHolderName: Formik.values.bankDetails.accountHolderName,
        },
        businessDetails: Formik.values.businessDetails,
      };

      const response = await axios.post('http://localhost:8080/seller', sellerData);

      console.log('Seller created successfully', response.data);
    } catch (error) {
      console.error('Error creating seller:', error.response || error.message);
      alert('Failed to create account. Please try again later.');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f4f7fc"
      padding={2}
    >
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 3, width: '100%', maxWidth: '600px' }}>
        <Typography variant="h5" textAlign="center" mb={3} fontWeight="bold" color="primary">
          {isLogin ? 'Seller Login' : 'Become a Seller'}
        </Typography>

        <Box>
          {!isLogin ? <SellerAccountForm /> : <SellerLoginForm />}
        </Box>

        <Box mt={3} textAlign="center">
          <Typography variant="body2" color="textSecondary" mb={2}>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleShowPage}
            sx={{
              padding: '12px 24px',
              textTransform: 'none',
              fontWeight: 'bold',
              width: 'auto',
              margin: '0 auto',
              display: 'block',
              maxWidth: '500px',
              borderRadius: '4px',
            }}
          >
            {isLogin ? 'Register' : 'Login'}
          </Button>

        </Box>
      </Paper>
    </Box>
  );
};

export default BecomeSeller;
