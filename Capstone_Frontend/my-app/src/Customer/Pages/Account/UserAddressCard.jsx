import { Radio, Box, Typography, Paper } from '@mui/material';
import React from 'react';

const UserAddressCard = ({ address, isSelected, onSelect }) => {
  const handleChange = () => {
    onSelect(address.id); // Update selected address when radio button is clicked
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        borderRadius: 2,
        boxShadow: 2,
        transition: 'box-shadow 0.3s ease',
        '&:hover': {
          boxShadow: 6,
        },
      }}
    >
      <Box display="flex" alignItems="center">
        <Radio
          checked={isSelected} // Only check the radio button if the address is selected
          value={address.id}
          onChange={handleChange} // Trigger the change handler
          name="address-radio-button"
          sx={{
            color: isSelected ? 'primary.main' : 'text.secondary',
            '&.Mui-checked': {
              color: 'primary.main',
            },
          }}
        />
        <Box ml={2}>
          <Typography variant="h6" color="textPrimary">{address.name}</Typography>
          <Typography variant="body2" color="textSecondary">{address.city}, {address.state}, {address.zip}</Typography>
          <Typography variant="body2" color="textSecondary"><strong>Mobile:</strong> {address.mobile}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default UserAddressCard;
