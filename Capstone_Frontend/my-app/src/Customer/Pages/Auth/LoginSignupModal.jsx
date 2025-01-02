import React, { useState } from 'react';
import { Button, TextField, Modal, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginSignupModal = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [fullName, setFullName] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  // Regular expression for validating email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Regular expression for validating full name (only alphabetic characters and spaces)
  const nameRegex = /^[A-Za-z\s]+$/;

  // Fetch user profile with token
  const fetchUserProfile = async (token) => {
    try {
      console.log('Fetching user profile with token:', token);
      const response = await axios.get('http://localhost:8080/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('User profile fetched:', response.data);
      onLogin(response.data);

      if (response.data.role === 'Role_Admin') navigate('/admin');
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to fetch profile. Please try again.');
    }
  };

  // Handle OTP send
  const handleSendOtp = async () => {
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      setError('');
      setLoading(true);
      const url = isSignup ? 'http://localhost:8080/auth/signup/otp' : 'http://localhost:8080/auth/signup/otp';
      const payload = isSignup
        ? { email, role: 'Role_Customer' }
        : { email };

      console.log(`Sending OTP for ${isSignup ? 'signup' : 'login'} to email:`, email);
      const response = await axios.post(url, payload);
      console.log('OTP sent:', response.data);
      setOtpSent(true);
    } catch (err) {
      console.error('Error sending OTP:', err);
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Login
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
      console.log('Logging in with email and OTP:', { email, otp });
      const response = await axios.post('http://localhost:8080/auth/login/otp', { email, otp });
      if (response.status === 200) {
        const token = response.data.jwt;
        console.log('Login successful, token received:', token);
        localStorage.setItem('userToken', token);
        fetchUserProfile(token);
        onClose();
      } else {
        setError('Invalid OTP or email.');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Signup
  const handleSignup = async () => {
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!nameRegex.test(fullName)) {
      setError('Full name should only contain alphabets and spaces.');
      return;
    }

    if (!otp) {
      setError('Please enter the OTP sent to your email.');
      return;
    }

    try {
      setError('');
      setLoading(true);
      console.log('Signing up with email, OTP, and full name:', { fullName, email, otp });
      const response = await axios.post('http://localhost:8080/auth/signup', {
        fullName,
        email,
        otp,
      });
      if (response.status === 200) {
        const token = response.data.jwt;
        console.log('Signup successful, token received:', token);
        localStorage.setItem('userToken', token);
        fetchUserProfile(token);
        onClose();
      } else {
        setError('Invalid OTP or email.');
      }
    } catch (err) {
      console.error('Error during signup:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <h1 className="text-center font-bold text-xl text-[#6a1b9a] pb-5">
          {isSignup ? 'Signup as User' : 'Login as User'}
        </h1>
        <div className="space-y-5">
          {/* Email Input */}
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error && !emailRegex.test(email)}
            helperText={error || (email && !emailRegex.test(email) && 'Please enter a valid email address.')}
          />

          {otpSent ? (
            <>
              {/* Only show full name and OTP fields if OTP is sent */}
              {isSignup && (
                <TextField
                  fullWidth
                  label="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  error={!!error && !nameRegex.test(fullName)}
                  helperText={error || (fullName && !nameRegex.test(fullName) && 'Full name should only contain alphabets and spaces.')}
                />
              )}

              <p className="font-medium text-sm opacity-60">
                Enter OTP sent to your email
              </p>
              <TextField
                fullWidth
                label="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                error={!!error && !otp}
                helperText={error || (!otp && 'Please enter the OTP sent to your email.')}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ py: '11px' }}
                onClick={isSignup ? handleSignup : handleLogin}
                disabled={loading}
              >
                {loading ? (isSignup ? 'Signing Up...' : 'Logging In...') : isSignup ? 'Signup' : 'Login'}
              </Button>
            </>
          ) : (
            <Button
              fullWidth
              variant="contained"
              sx={{ py: '11px' }}
              onClick={handleSendOtp}
              disabled={loading}
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </Button>
          )}

          {error && <p className="text-center text-red-500">{error}</p>}

          <Button
            fullWidth
            variant="text"
            sx={{ mt: 2 }}
            onClick={() => setIsSignup(!isSignup)} // Toggle between signup and login
          >
            {isSignup ? 'Already have an account? Login' : "Don't have an account? Signup"}
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default LoginSignupModal;


