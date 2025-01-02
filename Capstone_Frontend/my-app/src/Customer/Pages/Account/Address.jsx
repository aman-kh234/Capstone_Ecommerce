import React, { useState, useEffect } from 'react';
import UserAddressCard from './UserAddressCard';
import AddressForm from '../Checkout/Addressform';
import { Button, Typography, CircularProgress, Box, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'; // Import the Add icon
import CloseIcon from '@mui/icons-material/Close';
import { green, red } from '@mui/material/colors';
import { LocationOn } from '@mui/icons-material';

const Address = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null); // Track selected address
  const [showForm, setShowForm] = useState(false); // Manage form visibility
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Fetch user data from the backend
  useEffect(() => {
    const token = localStorage.getItem('userToken'); // Get token from localStorage
    if (token) {
      // Fetch user profile data
      fetch('http://localhost:8080/users/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Pass token in Authorization header
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          return response.json();
        })
        .then(data => {
          setUserData(data); // Store the user data
          setLoading(false); // Stop loading
        })
        .catch(error => {
          setError(error.message); // Handle error
          setLoading(false); // Stop loading
        });
    } else {
      setLoading(false);
      setError('User is not authenticated');
    }
  }, []);

  const handleAddressChange = (addressId) => {
    setSelectedAddressId(addressId); // Update selected address ID
  };

  const handleOpenForm = () => {
    setShowForm(true); // Show the address form
  };

  const handleCloseForm = () => {
    setShowForm(false); // Close the address form
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleAddAddress = () => {
    setSnackbarMessage('New address added successfully!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
    setShowForm(false); // Close form after adding address
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="space-y-6 p-6 bg-gray-50">
      {/* Header with Title and Button */}
      {/* <div className="flex justify-between items-center mb-8">
        <LocationOn sx={{ fontSize: 30, color: 'primary.main' }} />
        <Typography variant="h5" color="textPrimary" fontWeight="bold">
          My Addresses
        </Typography>


        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenForm}
          sx={{
            paddingX: 4,
            paddingY: 1.5,
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
            boxShadow: 3,
            borderRadius: '12px',
          }}
          startIcon={<AddIcon />} // Add icon before text
        >
          Add Address
        </Button>
      </div> */}


      <div className="flex justify-between items-center mb-8">
        {/* Left section - Icon and Heading */}
        <div className="flex items-center">
          <LocationOn sx={{ fontSize: 30, color: 'primary.main', marginRight: 1 }} />
          <Typography variant="h5" color="textPrimary" fontWeight="bold">
            My Addresses
          </Typography>
        </div>

        {/* Right section - Add Address Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenForm}
          sx={{
            paddingX: 4,
            paddingY: 1.5,
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
            boxShadow: 3,
            borderRadius: '12px',
          }}
          startIcon={<AddIcon />} // Add icon before text
        >
          Add Address
        </Button>
      </div>

      {/* Render address cards dynamically */}
      {userData && userData.addresses && userData.addresses.length > 0 ? (
        userData.addresses.map((address) => (
          <UserAddressCard
            key={address.id}
            address={address}
            isSelected={address.id === selectedAddressId} // Pass selected state
            onSelect={handleAddressChange} // Handle selection change
          />
        ))
      ) : (
        <Box textAlign="center" color="text.secondary" sx={{ marginTop: 5 }}>
          <Typography variant="body1" mb={2}>
            No addresses found
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleOpenForm}
            sx={{
              paddingX: 4,
              paddingY: 1.5,
              '&:hover': {
                backgroundColor: 'primary.light',
              },
            }}
          >
            Add Your Address
          </Button>
        </Box>
      )}

      {/* Floating Dialog Form for Adding Address */}
      <Dialog
        open={showForm}
        onClose={handleCloseForm}
        maxWidth="sm"
        fullWidth
        sx={{
          borderRadius: '8px',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Dialog Title */}
        <DialogTitle
          sx={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#4B0082', // Dark purple title
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Add New Address
          </Typography>
          <Button
            onClick={handleCloseForm}
            sx={{
              padding: 0,
              minWidth: 'auto',
              color: '#4B0082', // Dark purple close icon
              '&:hover': { backgroundColor: 'transparent' },
            }}
          >
            <CloseIcon />
          </Button>
        </DialogTitle>
        <DialogContent>
          <AddressForm onClose={handleCloseForm} onAdd={handleAddAddress} />
        </DialogContent>
      </Dialog>

      {/* Snackbar for success or error messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: snackbarSeverity === 'success' ? green[500] : red[500],
            color: 'white',
          },
        }}
      />
    </div>
  );
};

export default Address;
