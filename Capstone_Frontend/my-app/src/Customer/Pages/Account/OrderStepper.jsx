import React, { useEffect, useState } from 'react';
import { Box, Typography, Stepper, Step, StepLabel, Paper, StepContent } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HomeIcon from '@mui/icons-material/Home';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import { styled } from '@mui/system';

// Helper function to add days to a given date
const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Helper function to format date to 'Thu, 11 Jul'
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

// Enum mapping for order statuses
const statusIcons = {
  PENDING: <FiberManualRecordIcon sx={{ color: 'gray' }} />,
  PLACED: <CheckCircleIcon sx={{ color: 'green' }} />,
  CONFIRMED: <LocalShippingIcon sx={{ color: 'green' }} />,
  SHIPPED: <LocalShippingIcon sx={{ color: 'green' }} />,
  DELIVERED: <HomeIcon sx={{ color: 'green' }} />,
  CANCELLED: <CancelIcon sx={{ color: 'red' }} />,
};

const StepCard = styled(Paper)(({ theme, isCompleted, isRight }) => ({
  padding: theme.spacing(2),
  borderRadius: '8px',
  backgroundColor: isCompleted ? '#c8e6c9' : '#f5f5f5', // Green if completed, grey if future
  marginBottom: theme.spacing(2),
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  maxWidth: '500px',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: isCompleted ? '#a5d6a7' : '#e0e0e0',
  },
  marginLeft: isRight ? 'auto' : '0',
  marginRight: isRight ? '0' : 'auto',
}));

const OrderStepper = ({ orderId }) => {
  const [steps, setSteps] = useState([]);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userToken = localStorage.getItem('userToken'); // Retrieving user token from localStorage

  // Fetch order details
  useEffect(() => {
    if (orderId) {
      axios
        .get(`http://localhost:8080/api/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        })
        .then((response) => {
          console.log('Order Data:', response.data); // Log the response

          const fetchedOrder = response.data;
          setOrder(fetchedOrder);
          setLoading(false);

          const formattedSteps = [];
          const orderDate = new Date(fetchedOrder.orderDate);
          const orderStatus = fetchedOrder.orderStatus; // e.g., "SHIPPED"
          const deliverDate = fetchedOrder.deliverDate ? new Date(fetchedOrder.deliverDate) : null;
          const today = new Date();

          // Define delays and days for each step
          const stepDelays = {
            PLACED: 1,
            CONFIRMED: 3,
            SHIPPED: 5,
            DELIVERED: 7,
            CANCELLED: 0,
          };

          // Add "PENDING" step, it always starts the process
          formattedSteps.push({
            name: 'PENDING',
            description: `Order placed on ${formatDate(orderDate)}`,
            value: 'PENDING',
            icon: statusIcons['PENDING'],
            date: formatDate(orderDate),
            isCompleted: today > orderDate,
          });

          // Depending on the order status, add other steps
          if (orderStatus !== 'CANCELLED') {
            const placedDate = addDays(orderDate, stepDelays.PLACED);
            formattedSteps.push({
              name: 'PLACED',
              description: `Order placed on ${formatDate(placedDate)}`,
              value: 'PLACED',
              icon: statusIcons['PLACED'],
              date: formatDate(placedDate),
              isCompleted: today > placedDate,
            });
          }

          if (orderStatus === 'PLACED' || orderStatus === 'CONFIRMED') {
            const confirmedDate = addDays(orderDate, stepDelays.CONFIRMED);
            formattedSteps.push({
              name: 'CONFIRMED',
              description: `Order confirmed on ${formatDate(confirmedDate)}`,
              value: 'CONFIRMED',
              icon: statusIcons['CONFIRMED'],
              date: formatDate(confirmedDate),
              isCompleted: today > confirmedDate,
            });
          }

          if (orderStatus === 'CONFIRMED' || orderStatus === 'SHIPPED') {
            const shippedDate = addDays(orderDate, stepDelays.SHIPPED);
            formattedSteps.push({
              name: 'SHIPPED',
              description: `Shipped on ${formatDate(shippedDate)}`,
              value: 'SHIPPED',
              icon: statusIcons['SHIPPED'],
              date: formatDate(shippedDate),
              isCompleted: today > shippedDate,
            });
          }

          if (orderStatus === 'SHIPPED' || orderStatus === 'DELIVERED') {
            const deliveryDate = deliverDate || addDays(orderDate, stepDelays.DELIVERED);
            formattedSteps.push({
              name: 'DELIVERED',
              description: `Delivered on ${formatDate(deliveryDate)}`,
              value: 'DELIVERED',
              icon: statusIcons['DELIVERED'],
              date: formatDate(deliveryDate),
              isCompleted: today > deliveryDate,
            });
          }

          // If the order was cancelled, no need to show further steps
          if (orderStatus === 'CANCELLED') {
            formattedSteps.push({
              name: 'CANCELLED',
              description: `Order was cancelled on ${formatDate(orderDate)}`,
              value: 'CANCELLED',
              icon: statusIcons['CANCELLED'],
              date: formatDate(orderDate),
              isCompleted: true, // Mark as completed since the order was cancelled
            });
          }

          setSteps(formattedSteps);
        })
        .catch((error) => {
          console.error('Error fetching order details:', error);
          setError('Failed to load order details.');
          setLoading(false);
        });
    }
  }, [orderId, userToken]);

  // Render loading or error states
  if (loading) return <Typography variant="h6">Loading order details...</Typography>;
  if (error) return <Typography variant="h6" color="error">{error}</Typography>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <Stepper activeStep={steps.length - 1} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel
              optional={
                <Typography variant="caption" color="textSecondary">{step.date}</Typography>
              }
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: index % 2 === 0 ? 'row' : 'row-reverse', // Zigzag layout
                  marginBottom: '20px',
                }}
              >
                <StepCard isCompleted={step.isCompleted} isRight={index % 2 === 1}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {step.icon}
                    <Typography variant="body2" sx={{ marginLeft: '10px', fontWeight: 600 }}>
                      {step.name}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="textSecondary" sx={{ marginTop: '5px' }}>
                    {step.description}
                  </Typography>
                </StepCard>
              </Box>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default OrderStepper;
