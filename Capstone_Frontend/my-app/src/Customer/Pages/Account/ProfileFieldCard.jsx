import { Divider, Typography, Box } from '@mui/material';
import React from 'react';

const ProfileFieldCard = ({ label, value }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      bgcolor="background.paper"
      p={2} // Reduced padding to make it more compact
      mb={1} // Reduced margin bottom for tighter spacing
      borderRadius={1} // Slightly smaller rounded corners
      boxShadow={1} // Light shadow for a subtle effect
    >
      {/* Field label */}
      <Typography
        variant="body2" // Smaller size for label
        color="textSecondary"
        sx={{ width: { xs: 'auto', lg: 120 }, pr: 2 }} // Reduced width for the label
      >
        {label}
      </Typography>

      {/* Divider */}
      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} /> {/* Smaller margin around divider */}

      {/* Field value */}
      <Typography
        variant="body1" // Smaller size for value
        color="textPrimary"
        sx={{ pl: { xs: 2, lg: 4 }, fontWeight: '500' }} // Adjusted padding and weight for the value
      >
        {value}
      </Typography>
    </Box>
  );
};

export default ProfileFieldCard;
