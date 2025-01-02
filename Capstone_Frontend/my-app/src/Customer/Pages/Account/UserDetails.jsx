import React, { useState, useEffect } from 'react';
import ProfileFieldCard from './ProfileFieldCard';
import { Divider, Card, CardContent, Typography, Box, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { Person, Email, Phone, AccountCircle, Edit } from '@mui/icons-material';
import axios from 'axios';

const UserDetails = () => {
  const [userData, setUserData] = useState(null);  // State for user data
  const [openDialog, setOpenDialog] = useState(false);  // For dialog visibility
  const [newPhone, setNewPhone] = useState('');  // For holding updated phone number
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState('');  // State to store phone validation error

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('userToken');  // Get the JWT token from localStorage

      if (token) {
        try {
          const response = await axios.get('http://localhost:8080/users/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData(response.data);  // Set the user data
          setNewPhone(response.data.mobile);  // Initialize phone number
        } catch (error) {
          console.error('Error fetching user data', error);
          alert('Error fetching user details');
        }
      }
    };

    fetchUserData();
  }, []);  // Empty dependency array means this runs once when the component mounts

  // If userData is not yet loaded, show a loading message
  if (!userData) {
    return (
      <div className="flex justify-center items-center py-10">
        <Typography variant="h6" color="textSecondary">Loading...</Typography>
      </div>
    );
  }

  // Open the dialog
  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  // Close the dialog
  const handleDialogClose = () => {
    setOpenDialog(false);
    setPhoneError(''); // Reset phone error when closing dialog
  };


  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[6-9][0-9]{9}$/;  // Phone must start with 6-9 and be exactly 10 digits
    return phoneRegex.test(phone);
  };
  // Handle the phone number update
  const handleUpdatePhone = async () => {
    if (!validatePhoneNumber(newPhone)) {
      setPhoneError('Please enter a valid 10-digit phone number');
      return;
    }

    if (newPhone === userData.mobile) {
      alert('No changes detected');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.patch(
        'http://localhost:8080/users/update',
        { mobile: newPhone },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Phone number updated successfully!');
      setOpenDialog(false);  // Close the dialog
      setLoading(false);
      window.location.reload();

    } catch (error) {
      console.error('Error updating phone number', error);
      setLoading(false);
      alert('Error updating phone number');
    }
  };

  return (
    <div className="flex justify-center py-10">
      <div className="w-full lg:w-[70%]">
        {/* Heading Section with Edit Icon */}
        <Box display="flex" alignItems="center" pb={4} justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <AccountCircle sx={{ fontSize: 30, color: 'primary.main', mr: 1 }} /> {/* Icon */}
            <Typography variant="h5" color="textPrimary" fontWeight="bold">
              Personal Details
            </Typography>
          </Box>
          {/* Edit Icon */}
          <IconButton onClick={handleDialogOpen}>
            <Edit sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>

        {/* User Details Section */}
        <Card elevation={2} sx={{ padding: 2 }}>
          <CardContent>
            <ProfileFieldCard
              icon={<Person />}
              label="Name"
              value={userData.fullName}
            />
            <Divider sx={{ marginY: 1 }} />
            <ProfileFieldCard
              icon={<Email />}
              label="Email"
              value={userData.email}
            />
            <Divider sx={{ marginY: 1 }} />

            {/* Mobile Field with Edit Icon after Mobile */}
            <Box display="flex" alignItems="center" mb={2}>
              <Box flex={1}>
                <ProfileFieldCard
                  icon={<Phone />}
                  label="Mobile"
                  value={userData.mobile}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </div>

      {/* Dialog for Updating Phone */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Update Phone Number</DialogTitle>
        <DialogContent>
          <TextField
            label="New Phone Number"
            variant="outlined"
            fullWidth
            value={newPhone}

            onChange={(e) => {
              const value = e.target.value;
              if (/[^0-9]/.test(value)) {
                return; // Ignore non-digit characters
              }
              setNewPhone(value);
              setPhoneError(''); // Clear error if input is valid
            }}
            sx={{ marginBottom: 2, marginTop: 2 }}
            error={!!phoneError} // Highlight if error exists
            helperText={phoneError} // Display error message
            inputProps={{ maxLength: 10 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleUpdatePhone}
            color="primary"
            variant="contained"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserDetails;
