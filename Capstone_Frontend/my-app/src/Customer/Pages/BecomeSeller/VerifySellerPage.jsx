import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifySellerPage = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // To read query parameters
  const navigate = useNavigate(); // For programmatic navigation

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const otp = queryParams.get('otp');  // Get OTP from URL

    if (otp) {
      verifyOtp(otp);
    } else {
      setMessage('A verifying link has been sent to your email, please check and verify.');
      setLoading(false);
    }
  }, [location]);

  const verifyOtp = async (otp) => {
    try {
      const response = await axios.patch(`http://localhost:8080/seller/verify/${otp}`); // Use PATCH request

      if (response.status === 200) {
        setMessage('Your email has been verified successfully!');
      } else {
        setMessage('Invalid OTP. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Handle the login redirect when button is clicked
  const handleLoginRedirect = () => {
    navigate('/become-seller'); // Redirect to /become-seller
  };

  return (
    <div className="verify-seller-container">
      <div className="message-box">
        <h2>Verify Your Account</h2>
        {loading ? (
          <p className="loading-text">Verifying OTP...</p>
        ) : (
          <>
            <p className={`message ${message.includes('successfully') ? 'success' : message.includes('error') ? 'error' : ''}`}>
              {message}
            </p>
            {/* Show the button only if the message indicates success */}
            {message === 'Your email has been verified successfully!' && (
              <button onClick={handleLoginRedirect} className="login-button">
                Please Login
              </button>
            )}
          </>
        )}
      </div>

      {/* Inline CSS */}
      <style jsx>{`
        .verify-seller-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f4f7fb;
          font-family: Arial, sans-serif;
        }

        .message-box {
          background-color: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          text-align: center;
          width: 100%;
          max-width: 400px;
        }

        .message-box h2 {
          font-size: 24px;
          color: #333;
          margin-bottom: 20px;
        }

        .message-box p {
          font-size: 18px;
          color: #333;
          margin-top: 20px;
        }

        .loading-text {
          font-size: 18px;
          color: #007bff;
        }

        .message.success {
          color: #28a745;
          font-weight: bold;
        }

        .message.error {
          color: #dc3545;
          font-weight: bold;
        }

        /* Styling for the login button */
        .login-button {
          margin-top: 20px;
          padding: 10px 20px;
          background-color: #6a1b9a;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
        }

        .login-button:hover {
          background-color: #6a1b9a;
        }
      `}</style>
    </div>
  );
};

export default VerifySellerPage;
