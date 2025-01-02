import React from 'react';
import { Box, Grid, TextField } from '@mui/material';

const BecomeSellerFromStep2 = ({ formik }) => {

  // Manual validation function
  const validate = () => {
    const newErrors = {};

    // Validate Name (only alphabets)
    if (!formik.values.pickupAddress.name) {
      newErrors.name = 'Name is required';
    } else if (!/^[A-Za-z\s]+$/.test(formik.values.pickupAddress.name)) {
      newErrors.name = 'Name should contain only alphabets';
    }

    // Validate Mobile (must be numeric, 10 digits, starts with 6-9)
    if (!formik.values.pickupAddress.mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(formik.values.pickupAddress.mobile)) {
      newErrors.mobile = 'Mobile number must be 10 digits and start with 6-9';
    }

    // Validate Pin Code (must be numeric, exactly 6 digits)
    if (!formik.values.pickupAddress.pincode) {
      newErrors.pincode = 'Pin code is required';
    } else if (!/^\d{6}$/.test(formik.values.pickupAddress.pincode)) {
      newErrors.pincode = 'Pin code must be exactly 6 digits';
    }

    // Validate Address (required)
    if (!formik.values.pickupAddress.address) {
      newErrors.address = 'Address is required';
    }

    // Validate Locality (should contain only alphabets)
    if (!formik.values.pickupAddress.locality) {
      newErrors.locality = 'Locality is required';
    } else if (!/^[A-Za-z\s]+$/.test(formik.values.pickupAddress.locality)) {
      newErrors.locality = 'Locality should contain only alphabets';
    }

    // Validate City (should contain only alphabets)
    if (!formik.values.pickupAddress.city) {
      newErrors.city = 'City is required';
    } else if (!/^[A-Za-z\s]+$/.test(formik.values.pickupAddress.city)) {
      newErrors.city = 'City should contain only alphabets';
    }

    // Validate State (should contain only alphabets)
    if (!formik.values.pickupAddress.state) {
      newErrors.state = 'State is required';
    } else if (!/^[A-Za-z\s]+$/.test(formik.values.pickupAddress.state)) {
      newErrors.state = 'State should contain only alphabets';
    }

    return newErrors;
  };

  // Submit handler with validation
  const handleSubmit = (e) => {
    e.preventDefault();

    // Manually validate the form
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      // No errors, proceed with form submission
      formik.submitForm();
    } else {
      // Set formik errors manually
      formik.setErrors(errors);
    }
  };

  return (
    <Box sx={{ maxWidth: 'auto' }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Name */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="pickupAddress.name"
              label="Name"
              value={formik.values.pickupAddress.name}
              onChange={formik.handleChange}
              error={formik.touched.pickupAddress?.name && !!formik.errors.pickupAddress?.name}
              helperText={formik.touched.pickupAddress?.name && formik.errors.pickupAddress?.name}
            />
          </Grid>

          {/* Mobile */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="pickupAddress.mobile"
              label="Mobile"
              value={formik.values.pickupAddress.mobile}
              onChange={formik.handleChange}
              error={formik.touched.pickupAddress?.mobile && !!formik.errors.pickupAddress?.mobile}
              helperText={formik.touched.pickupAddress?.mobile && formik.errors.pickupAddress?.mobile}
              inputProps={{ maxLength: 10 }}
            />
          </Grid>

          {/* Pin Code */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="pickupAddress.pincode"
              label="Pin Code"
              value={formik.values.pickupAddress.pincode}
              onChange={formik.handleChange}
              error={formik.touched.pickupAddress?.pincode && !!formik.errors.pickupAddress?.pincode}
              helperText={formik.touched.pickupAddress?.pincode && formik.errors.pickupAddress?.pincode}
              inputProps={{ maxLength: 6 }}
            />
          </Grid>

          {/* Address */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="pickupAddress.address"
              label="Address"
              value={formik.values.pickupAddress.address}
              onChange={formik.handleChange}
              error={formik.touched.pickupAddress?.address && !!formik.errors.pickupAddress?.address}
              helperText={formik.touched.pickupAddress?.address && formik.errors.pickupAddress?.address}
            />
          </Grid>

          {/* Locality */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="pickupAddress.locality"
              label="Locality"
              value={formik.values.pickupAddress.locality}
              onChange={formik.handleChange}
              error={formik.touched.pickupAddress?.locality && !!formik.errors.pickupAddress?.locality}
              helperText={formik.touched.pickupAddress?.locality && formik.errors.pickupAddress?.locality}
            />
          </Grid>

          {/* City */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="pickupAddress.city"
              label="City"
              value={formik.values.pickupAddress.city}
              onChange={formik.handleChange}
              error={formik.touched.pickupAddress?.city && !!formik.errors.pickupAddress?.city}
              helperText={formik.touched.pickupAddress?.city && formik.errors.pickupAddress?.city}
            />
          </Grid>

          {/* State */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="pickupAddress.state"
              label="State"
              value={formik.values.pickupAddress.state}
              onChange={formik.handleChange}
              error={formik.touched.pickupAddress?.state && !!formik.errors.pickupAddress?.state}
              helperText={formik.touched.pickupAddress?.state && formik.errors.pickupAddress?.state}
            />
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default BecomeSellerFromStep2;
