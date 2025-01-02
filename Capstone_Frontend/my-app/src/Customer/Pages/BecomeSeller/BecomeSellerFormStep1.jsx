import { Box, TextField } from '@mui/material';
import React from 'react';

const BecomeSellerFormStep1 = ({ formik }) => {
  // Mobile validation function
  const validateMobile = (value) => {
    const regex = /^[6-9][0-9]{9}$/; // Mobile number should start with 6-9 and then 9 digits
    if (!value) {
      return 'Mobile number is required';
    } else if (!regex.test(value)) {
      return 'Mobile number must be 10 digits and start with 6-9';
    }
    return null;
  };

  // GSTIN validation function
  const validateGSTIN = (value) => {
    if (!value) {
      return 'GSTIN is required';
    } else if (value.length !== 15) {
      return 'GSTIN must be exactly 15 characters';
    }
    return null;
  };

  const handleMobileChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, ''); // Allow only digits

    // Ensure the mobile number starts with a digit from 6-9
    if (inputValue && inputValue.length === 1 && !/[6-9]/.test(inputValue[0])) {
      return; // Prevent typing if the first digit is not 6-9
    }

    // Set Formik value and validate
    formik.setFieldValue('mobile', inputValue);
    const mobileError = validateMobile(inputValue);
    formik.setFieldError('mobile', mobileError);
  };

  const handleGSTINChange = (e) => {
    const value = e.target.value;
    formik.setFieldValue('GSTIN', value); // Update Formik value

    // Dynamically set error on typing
    const gstinError = validateGSTIN(value);
    formik.setFieldError('GSTIN', gstinError);
  };

  return (
    <Box>
      <div className="space-y-9">
        <TextField
          fullWidth
          required
          inputProps={{ maxLength: 10 }}
          name="mobile"
          label="Mobile"
          value={formik.values.mobile}
          onChange={handleMobileChange}
          onBlur={() => formik.setFieldError('mobile', validateMobile(formik.values.mobile))}
          error={formik.touched.mobile && Boolean(formik.errors.mobile)}
          helperText={formik.touched.mobile && formik.errors.mobile}
        />
        <TextField
          fullWidth
          required
          name="GSTIN"
          label="GSTIN"
          value={formik.values.GSTIN}
          onChange={handleGSTINChange}
          onBlur={() => formik.setFieldError('GSTIN', validateGSTIN(formik.values.GSTIN))}
          error={formik.touched.GSTIN && Boolean(formik.errors.GSTIN)}
          helperText={formik.touched.GSTIN && formik.errors.GSTIN}
          inputProps={{ maxLength: 15 }}
        />
      </div>
    </Box>
  );
};

export default BecomeSellerFormStep1;
