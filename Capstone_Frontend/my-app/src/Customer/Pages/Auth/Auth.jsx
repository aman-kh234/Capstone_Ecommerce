import React, { useState } from 'react';
import RegisterForm from './RegisterForm';
import { Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Auth = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div style={{ width: '400px', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      {isLogin ? <LoginForm /> : <RegisterForm />}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <p style={{ display: 'inline', marginRight: '5px' }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
        </p>
        <Button size="small" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Create Account' : 'Login'}
        </Button>
      </div>
    </div>
  );
};

export default Auth;
