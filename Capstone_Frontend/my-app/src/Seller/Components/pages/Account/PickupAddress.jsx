
import React, { useState } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import axios from 'axios'; // Assuming you're using axios to make API requests

const PickupAddress = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    pinCode: '',
    address: '',
    locality: '',
    city: '',
    state: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Get the sellerToken from localStorage
  const sellerToken = localStorage.getItem('sellerToken');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    // Basic validations
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.mobile || !/^[6-9]\d{9}$/.test(formData.mobile)) newErrors.mobile = 'Invalid mobile number';
    if (!formData.pinCode || !/^[1-9][0-9]{5}$/.test(formData.pinCode)) newErrors.pinCode = 'Invalid pin code';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.locality) newErrors.locality = 'Locality is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updatePickupAddress = async (pickupAddress) => {
    try {
      setLoading(true);

      // Prepare the updated seller object with pickupAddress
      const updatedSeller = {
        pickupAddress: {
          address: pickupAddress.address,
          locality: pickupAddress.locality,
          mobile: pickupAddress.mobile,
          pinCode: pickupAddress.pinCode,
          city: pickupAddress.city,
          state: pickupAddress.state,
        },
      };

      if (!sellerToken) {
        console.error('Seller token is missing');
        setLoading(false);
        return;
      }

      // Make the PATCH request using axios
      const response = await axios.patch(
        'http://localhost:8080/seller', // Your API endpoint
        updatedSeller,
        {
          headers: {
            Authorization: `Bearer ${sellerToken}`, // JWT token from localStorage
          },
        }
      );

      console.log('Updated Seller:', response.data); // Handle the response here
      window.location.reload();

    } catch (error) {
      console.error('Error updating seller:', error);
      // Optionally set error state here
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      updatePickupAddress(formData);  // Submit the form data for updating pickup address
    }
  };

  return (
    <Box sx={{ maxWidth: 'auto' }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              name="mobile"
              label="Mobile"
              value={formData.mobile}
              onChange={handleChange}
              error={!!errors.mobile}
              helperText={errors.mobile}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              name="pinCode"
              label="Pin Code"
              value={formData.pinCode}
              onChange={handleChange}
              error={!!errors.pinCode}
              helperText={errors.pinCode}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="address"
              label="Address"
              value={formData.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="locality"
              label="Locality"
              value={formData.locality}
              onChange={handleChange}
              error={!!errors.locality}
              helperText={errors.locality}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              name="city"
              label="City"
              value={formData.city}
              onChange={handleChange}
              error={!!errors.city}
              helperText={errors.city}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              name="state"
              label="State"
              value={formData.state}
              onChange={handleChange}
              error={!!errors.state}
              helperText={errors.state}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  width: 'auto',
                  maxWidth: '150px',
                  padding: '8px 16px', // Optional: Adjust padding for a more compact look
                }}
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Submit'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default PickupAddress;
