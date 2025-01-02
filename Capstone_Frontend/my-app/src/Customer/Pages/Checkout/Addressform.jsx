import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Snackbar, CircularProgress, Alert } from '@mui/material';

const AddressForm = ({ onClose }) => {
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Validate each field immediately on change
    const error = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  // Validate each field
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return !value || /[^A-Za-z\s]/.test(value) ? 'Name must only contain alphabets and spaces' : null;
      case 'mobile':
        return !value || !/^[6-9][0-9]{9}$/.test(value) ? 'Mobile number must start between 6 to 0' : null;
      case 'pinCode':
        return !value || !/^\d{6}$/.test(value) ? 'Pin Code must only contain digits' : null;
      case 'locality':
        return !value || /[^A-Za-z\s]/.test(value) ? 'Locality must only contain alphabets and spaces' : null;
      case 'city':
        return !value || /[^A-Za-z\s]/.test(value) ? 'City must only contain alphabets and spaces' : null;
      case 'state':
        return !value || /[^A-Za-z\s]/.test(value) ? 'State must only contain alphabets and spaces' : null;
      case 'address':
        return !value ? 'Address is required' : null;
      default:
        return null;
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields before submitting
    const newErrors = Object.keys(formData).reduce((acc, key) => {
      const error = validateField(key, formData[key]);
      if (error) acc[key] = error;
      return acc;
    }, {});

    setErrors(newErrors);

    // If no errors, proceed with the submission
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      setSubmitError(null);
      setSubmitSuccess(false);

      const token = localStorage.getItem('userToken');
      if (!token) {
        setIsSubmitting(false);
        setSubmitError('User is not authenticated');
        return;
      }

      fetch('http://localhost:8080/users/add-address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to add address');
          }
          return response.json();
        })
        .then((data) => {
          setIsSubmitting(false);
          setSubmitSuccess(true);
          setOpenSnackbar(true);
          if (onClose) onClose();
          window.location.reload(); // Optional: Reload the page after success
        })
        .catch((error) => {
          setIsSubmitting(false);
          setSubmitError('Failed to add address. Please try again.');
          setOpenSnackbar(true);
        });
    }
  };

  // Close snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: 600, margin: '0 auto', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Name Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              sx={{
                '& .MuiInputBase-root': { borderRadius: '8px', backgroundColor: '#fff' },
              }}
            />
          </Grid>

          {/* Mobile Field */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="mobile"
              label="Mobile"
              value={formData.mobile}
              onChange={handleChange}
              error={!!errors.mobile}
              helperText={errors.mobile}
              inputProps={{ maxLength: 10 }} // Set maxLength for mobile
              sx={{
                '& .MuiInputBase-root': { borderRadius: '8px', backgroundColor: '#fff' },
              }}
            />
          </Grid>

          {/* Pin Code Field */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="pinCode"
              label="Pin Code"
              value={formData.pinCode}
              onChange={handleChange}
              error={!!errors.pinCode}
              helperText={errors.pinCode}
              inputProps={{ maxLength: 6 }} // Set maxLength for pin code
              sx={{
                '& .MuiInputBase-root': { borderRadius: '8px', backgroundColor: '#fff' },
              }}
            />
          </Grid>

          {/* Address Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="address"
              label="Address"
              value={formData.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
              sx={{
                '& .MuiInputBase-root': { borderRadius: '8px', backgroundColor: '#fff' },
              }}
            />
          </Grid>

          {/* Locality Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="locality"
              label="Locality"
              value={formData.locality}
              onChange={handleChange}
              error={!!errors.locality}
              helperText={errors.locality}
              sx={{
                '& .MuiInputBase-root': { borderRadius: '8px', backgroundColor: '#fff' },
              }}
            />
          </Grid>

          {/* City Field */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="city"
              label="City"
              value={formData.city}
              onChange={handleChange}
              error={!!errors.city}
              helperText={errors.city}
              sx={{
                '& .MuiInputBase-root': { borderRadius: '8px', backgroundColor: '#fff' },
              }}
            />
          </Grid>

          {/* State Field */}
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="state"
              label="State"
              value={formData.state}
              onChange={handleChange}
              error={!!errors.state}
              helperText={errors.state}
              sx={{
                '& .MuiInputBase-root': { borderRadius: '8px', backgroundColor: '#fff' },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                size="small"
                sx={{
                  py: '6px',
                  backgroundColor: '#4B0082',
                  '&:hover': { backgroundColor: '#4B0082' },
                  borderRadius: '4px',
                  textTransform: 'none',
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} sx={{ color: 'white' }} />
                ) : (
                  'Add Address'
                )}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={submitSuccess ? 'success' : 'error'} sx={{ width: '100%' }}>
          {submitSuccess ? 'Address added successfully!' : submitError || 'An unexpected error occurred.'}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddressForm;
