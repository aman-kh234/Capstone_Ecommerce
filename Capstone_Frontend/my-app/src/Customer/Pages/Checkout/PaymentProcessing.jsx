import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PaymentProcessing = () => {
  const [timer, setTimer] = useState(5); // 10 seconds timer
  const [loading, setLoading] = useState(true); // For loading animation
  const [paymentCompleted, setPaymentCompleted] = useState(false); // Track if payment is done
  const navigate = useNavigate();

  // Start the timer when the component mounts
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(countdown);
          setLoading(false);
          setPaymentCompleted(true); // Payment done after 10 seconds
          // Navigate after 10 seconds
          setTimeout(() => {
            navigate('/account/orders');
          }, 10000); // Delay before navigating to orders
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(countdown); // Clean up the interval on component unmount
  }, [navigate]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        backgroundColor: '#f4f7fb',
        padding: '20px',
      }}
    >
      <Box
        style={{
          textAlign: 'center',
          background: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          padding: '40px 30px',
          width: '100%',
          maxWidth: '500px',
        }}
      >
        {/* Circular Loader */}
        <Box style={{ marginBottom: '30px' }}>
          <CircularProgress size={60} thickness={4} style={{ color: '#00796b' }} />
        </Box>

        {!paymentCompleted ? (
          <div>
            <Typography variant="h5" style={{ marginBottom: '20px', fontWeight: 'bold' }}>
              Your payment is processing. Please wait...
            </Typography>
            <Typography variant="h6" color="textSecondary" style={{ marginBottom: '20px' }}>
              Processing payment... ({timer}s)
            </Typography>
          </div>
        ) : (
          <div>
            <Typography variant="h5" style={{ marginBottom: '20px', fontWeight: 'bold' }}>
              Your payment is complete.
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '30px', color: '#888' }}>
              Please wait, you will be redirected to your orders page in 10 seconds...
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/account/orders')}
              style={{
                backgroundColor: '#00796b',
                color: '#fff',
                padding: '12px 30px',
                fontSize: '16px',
                borderRadius: '30px',
                textTransform: 'none',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              Redirect Now
            </Button>
          </div>
        )}
      </Box>
    </div>
  );
};

export default PaymentProcessing;
