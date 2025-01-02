import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SellerLoginForm = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  // Regular expression for validating email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const fetchSellerProfile = async (token) => {
    try {
      console.log("Fetching profile with token:", token);
      const response = await axios.get('http://localhost:8080/seller/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(response.data); // Set the profile data
      return response.data;
    } catch (err) {
      setError('Failed to fetch profile. Please try again.');
      console.error('Fetch profile error: ', err);
    }
  };

  const handleSendOtp = async () => {
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      setError('');
      setLoading(true);
      const response = await axios.post('http://localhost:8080/auth/signup/otp', {
        email,
        role: 'Role_Seller',
      });

      if (response.status === 200) {
        setOtpSent(true);
      }
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
      console.error('OTP error: ', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!otp) {
      setError('Please enter the OTP sent to your email.');
      return;
    }

    try {
      setError('');
      setLoading(true);
      const response = await axios.post('http://localhost:8080/seller/login', {
        email,
        otp,
      });

      if (response.status === 200) {
        const token = response.data.jwt;
        console.log("JWT Token: ", token);
        localStorage.setItem('sellerToken', token);
        setToken(token);
        fetchSellerProfile(token); // Fetch seller profile after successful login
      } else {
        setError('Invalid OTP or email.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Login error: ', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (profile) {
      navigate('/seller'); // Navigate to /seller once the profile is set

      // Reload the page after navigating to /seller
      window.location.reload();
    }
  }, [profile, navigate]); // Trigger this effect when the profile is set

  return (
    <div>
      {/* <h1 className="text-center font-bold text-xl text-primary-color pb-5">
        Login as Seller
      </h1> */}
      <div className="space-y-5">
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!error && !emailRegex.test(email)} // Show error if email is invalid
          helperText={error || (email && !emailRegex.test(email) && 'Please enter a valid email address.')}
        />
        {otpSent && (
          <div className="space-y-5">
            <p className="font-medium text-sm opacity-60">
              Enter OTP sent to your email
            </p>
            <TextField
              fullWidth
              label="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              error={!!error && !otp} // Show error if OTP is empty
              helperText={error || (!otp && 'Please enter the OTP sent to your email.')}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ py: '11px' }}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? 'Logging In...' : 'Login'}
            </Button>
          </div>
        )}
        {!otpSent && (
          <Button
            fullWidth
            variant="text"
            sx={{ py: '11px' }}
            onClick={handleSendOtp}
            disabled={loading}
          >
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </Button>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default SellerLoginForm;
