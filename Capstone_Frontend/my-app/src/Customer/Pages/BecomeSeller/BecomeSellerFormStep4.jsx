import { TextField } from '@mui/material';
import React from 'react';

const BecomeSellerFormStep4 = ({ formik }) => {
  // Custom validation function for form fields
  const validateFields = () => {
    const errors = {};
    const { businessName, sellerName, email, password } = formik.values;

    // Validate Business Name (Required, Min 3 characters)
    if (!businessName) {
      errors.businessDetails = { ...errors.businessDetails, businessName: 'Business Name is required' };
    } else if (businessName.length < 3) {
      errors.businessDetails = { ...errors.businessDetails, businessName: 'Business Name must be at least 3 characters long' };
    }

    // Validate Seller Name (Required, Min 3 characters, No digits)
    if (!sellerName) {
      errors.sellerName = 'Seller Name is required';
    } else if (sellerName.length < 3) {
      errors.sellerName = 'Seller Name must be at least 3 characters long';
    } else if (/\d/.test(sellerName)) {  // Check if there are any digits
      errors.sellerName = 'Seller Name cannot contain digits';
    }

    // Validate Email (Required, Valid email format)
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
      errors.email = 'Invalid email format';
    }

    // Validate Password (Required, Min 8 characters, 1 uppercase, 1 lowercase, 1 digit, 1 special character)
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!/[A-Z]/.test(password)) {
      errors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[a-z]/.test(password)) {
      errors.password = 'Password must contain at least one lowercase letter';
    } else if (!/[0-9]/.test(password)) {
      errors.password = 'Password must contain at least one number';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.password = 'Password must contain at least one special character';
    }

    return errors;
  };

  return (
    <div className="space-y-5">
      <TextField
        fullWidth
        name="businessDetails.businessName"
        label="Business Name"
        value={formik.values.businessDetails.businessName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched?.businessDetails?.businessName && Boolean(formik.errors?.businessDetails?.businessName)}
        helperText={formik.touched?.businessDetails?.businessName && formik.errors?.businessDetails?.businessName}
        inputProps={{ maxLength: 100 }}  // Optional: Limit length to 100
      />
      <TextField
        fullWidth
        name="sellerName"
        label="Seller Name"
        value={formik.values.sellerName}
        onChange={(e) => {
          // Restrict to letters and spaces only
          const value = e.target.value;
          if (/^[A-Za-z\s]*$/.test(value)) {
            formik.handleChange(e);
          }
        }}
        onBlur={formik.handleBlur}
        error={formik.touched?.sellerName && Boolean(formik.errors?.sellerName)}
        helperText={formik.touched?.sellerName && formik.errors?.sellerName}
        inputProps={{ maxLength: 100 }}  // Optional: Limit length to 100
      />
      <TextField
        fullWidth
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched?.email && Boolean(formik.errors?.email)}
        helperText={formik.touched?.email && formik.errors?.email}
      />
      <TextField
        fullWidth
        name="password"
        label="Password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched?.password && Boolean(formik.errors?.password)}
        helperText={formik.touched?.password && formik.errors?.password}
      />
    </div>
  );
};

export default BecomeSellerFormStep4;
