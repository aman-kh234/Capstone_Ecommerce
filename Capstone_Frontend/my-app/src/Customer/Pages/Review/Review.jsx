import React, { useEffect, useState } from 'react';
import ReviewCard from './ReviewCard';
import { Divider, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Rating, Box, Typography } from '@mui/material';
import { teal, purple, grey } from '@mui/material/colors';
import axios from 'axios';

const Review = (prop) => {
  const [review, setReview] = useState([]);
  const [open, setOpen] = useState(false);
  const [newReview, setNewReview] = useState({ text: '', rating: 0 });
  const userToken = localStorage.getItem('userToken');

  const fetchReview = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/products/${id}/reviews`);
      setReview(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewReview({ text: '', rating: 0 });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/products/${prop.products}/reviews`,
        {
          reviewText: newReview.text,
          reviewRating: newReview.rating,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      fetchReview(prop.products);
      handleClose();
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  useEffect(() => {
    fetchReview(prop.products);
  }, []);

  return (
    <Box p={5}>
      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h5" fontWeight="bold" color="textPrimary">
          Reviews
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
          sx={{
            backgroundColor: purple[700],
            '&:hover': { backgroundColor: purple[700] },
          }}
        >
          Add Review
        </Button>
      </Box>

      <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
        {review.length > 0 ? (
          review.map((item, index) => (
            <div key={index} className="mb-4">
              <ReviewCard review={item} userEmail={prop.userEmail} />
              <Divider sx={{ marginY: 2, borderColor: grey[300] }} />
            </div>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
            No reviews currently present.
          </Typography>
        )}
      </Box>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add a Review</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Review Text"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={newReview.text}
            onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <Box className="flex items-center mt-2">
            <Typography variant="body2" color="textSecondary" sx={{ marginRight: 2 }}>
              Rating:
            </Typography>
            <Rating
              value={newReview.rating}
              onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
              sx={{ marginTop: 1 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: purple[500],
              '&:hover': { backgroundColor: purple[700] },
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Review;
