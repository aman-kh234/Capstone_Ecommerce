import { Delete } from '@mui/icons-material';
import { Avatar, Box, Grid, IconButton, Rating, Typography } from '@mui/material';
import { grey, purple } from '@mui/material/colors';
import axios from 'axios';
import React from 'react';

const ReviewCard = (prop) => {
  const userToken = localStorage.getItem('userToken');
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0'); // Pad single digits with leading zero
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Get month (0-11) and add 1
  const year = today.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/reviews/${prop.review.id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      window.location.reload();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 3,
        border: `1px solid ${grey[300]}`,
        borderRadius: '8px',
        boxShadow: 2,
        mb: 2,
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Box display="flex" alignItems="center">
            <Avatar sx={{ bgcolor: purple[700], width: 56, height: 56 }}>
              {prop.review.user.fullName[0]}
            </Avatar>
            <Box ml={2}>
              <Typography variant="subtitle1" fontWeight="bold">
                {prop.review.user.fullName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {formattedDate}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="body1" paragraph>
            {prop.review.reviewText}
          </Typography>
          <Rating readOnly value={prop.review.rating} precision={0.5} />
        </Grid>
      </Grid>

      {/* Delete button for the user's own review */}
      {prop.userEmail === prop.review.user.email && (
        <IconButton color="error" onClick={handleDelete} sx={{ marginLeft: 2 }}>
          <Delete />
        </IconButton>
      )}
    </Box>
  );
};

export default ReviewCard;
