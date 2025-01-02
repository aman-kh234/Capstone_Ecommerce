import React from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useFormik } from 'formik';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Button, TextField, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CardGiftcard } from '@mui/icons-material';

const AddNewCouponForm = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      code: "",
      discountPercentage: 0,
      validityStartDate: null,
      validityEndDate: null,
      minimumOrderValue: 0,
    },
    onSubmit: async (values) => {
      const formattedValues = {
        ...values,
        validityStartDate: values.validityStartDate?.toISOString(),
        validityEndDate: values.validityEndDate?.toISOString(),
      };
      try {
        const response = await axios.post('http://localhost:8080/api/coupons/admin/create', formattedValues);
        console.log('Coupon created:', response.data);
        // You can add a success notification or redirect here
      } catch (error) {
        console.error('Error creating coupon:', error);
      }

      // window.location.reload();
      navigate('/admin/coupon')
    },
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <Paper elevation={3} sx={{ width: '100%', maxWidth: 600, padding: 3 }}>
        <Typography variant="h5" component="h1" align="center" color="black" gutterBottom>
          <CardGiftcard sx={{ marginRight: "10px", fontSize: "30px", paddingBottom: "5px" }} />
          Create New Coupon
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box component="form" onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              {/* Coupon Code */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="code"
                  label="Coupon Code"
                  variant="outlined"
                  value={formik.values.code}
                  onChange={formik.handleChange}
                  error={formik.touched.code && Boolean(formik.errors.code)}
                  helperText={formik.touched.code && formik.errors.code}
                  required
                  sx={{ marginBottom: 2 }}
                />
              </Grid>

              {/* Discount Percentage */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="discountPercentage"
                  label="Discount Percentage"
                  variant="outlined"
                  type="number"
                  value={formik.values.discountPercentage}
                  onChange={formik.handleChange}
                  error={formik.touched.discountPercentage && Boolean(formik.errors.discountPercentage)}
                  helperText={formik.touched.discountPercentage && formik.errors.discountPercentage}
                  required
                  sx={{ marginBottom: 2 }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="minimumOrderValue"
                  label="Minimum Order Value"
                  variant="outlined"
                  type="number"
                  value={formik.values.minimumOrderValue}
                  onChange={formik.handleChange}
                  error={formik.touched.minimumOrderValue && Boolean(formik.errors.minimumOrderValue)}
                  helperText={formik.touched.minimumOrderValue && formik.errors.minimumOrderValue}
                  required
                  sx={{ marginBottom: 2 }}
                />
              </Grid>

              {/* Validity Start Date */}
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Validity Start Date"
                  value={formik.values.validityStartDate}
                  onChange={(date) => formik.setFieldValue('validityStartDate', date)}
                  renderInput={(params) => <TextField {...params} fullWidth sx={{ marginBottom: 2 }} />}
                  required
                />
              </Grid>

              {/* Validity End Date */}
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Validity End Date"
                  value={formik.values.validityEndDate}
                  onChange={(date) => formik.setFieldValue('validityEndDate', date)}
                  renderInput={(params) => <TextField {...params} fullWidth sx={{ marginBottom: 2 }} />}
                  required
                />
              </Grid>

              {/* Minimum Order Value */}


              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    padding: '12px 0',
                    fontSize: '16px',
                    '&:hover': {
                      backgroundColor: '#2c6df2', // Custom hover effect
                    },
                  }}
                >
                  Create Coupon
                </Button>
              </Grid>
            </Grid>
          </Box>
        </LocalizationProvider>
      </Paper>
    </div>
  );
};

export default AddNewCouponForm;
