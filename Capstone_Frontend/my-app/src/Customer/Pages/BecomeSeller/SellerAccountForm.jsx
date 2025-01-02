import React, { useState } from 'react';
import { Button, Step, StepLabel, Stepper } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';  // Use useNavigate for navigation
import BecomeSellerFormStep1 from './BecomeSellerFormStep1';
import BecomeSellerFromStep2 from './BecomeSellerFromStep2';
import BecomeSellerFromStep3 from './BecomeSellerFromStep3';
import BecomeSellerFormStep4 from './BecomeSellerFormStep4';
import { useFormik } from 'formik';
import axios from 'axios';

const steps = [
  "Tax Details & Mobile",
  "Pickup Address",
  "Bank Details",
  "Supplier Details"
];

const SellerAccountForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();  // for navigation

  const handleStep = (value) => () => {
    if (value === -1) {
      activeStep > 0 && setActiveStep(activeStep + value);
    }
    if (value === 1) {
      activeStep < (steps.length - 1) && setActiveStep(activeStep + value);
    }
    if (activeStep === steps.length - 1) {
      handleCreateAccount();
    }
  };

  const handleCreateAccount = async () => {
    try {
      const response = await axios.post('http://localhost:8080/seller', formik.values);
      alert('Account created successfully. Please check your email to verify your account.');
      navigate('/verify-seller');
    } catch (error) {
      console.error('Error creating account:', error);
      alert('Error creating account. Please try again.');
    }
  };

  const formik = useFormik({
    initialValues: {
      mobile: "",
      otp: "",
      gstin: "",
      pickupAddress: {
        name: "",
        mobile: "",
        pincode: "",
        address: "",
        locality: "",
        city: "",
        state: "",
      },
      bankDetails: {
        accountNumber: "",
        ifscCode: "",
        accountHolderName: "",
      },
      sellerName: "",
      email: "",
      businessDetails: {
        businessName: "",
        businessEmail: "",
        businessMobile: "",
        logo: "",
        banner: "",
        businessAddress: "",
      },
      password: ""
    },
    onSubmit: (values) => {
      console.log(values, "formik submitted");
    }
  });

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <section className="mt-20 space-y-10">
        <div>
          {activeStep === 0 ? <BecomeSellerFormStep1 formik={formik} /> :
            activeStep === 1 ? <BecomeSellerFromStep2 formik={formik} /> :
            activeStep === 2 ? <BecomeSellerFromStep3 formik={formik} /> :
            activeStep === 3 ? <BecomeSellerFormStep4 formik={formik} /> :
            ""}
        </div>
        <div className="flex items-center justify-between">
          <Button onClick={handleStep(-1)} variant="contained" disabled={activeStep === 0}>
            Back
          </Button>
          <Button onClick={handleStep(1)} variant="contained">
            {activeStep === (steps.length - 1) ? "Create Account" : "Continue"}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SellerAccountForm;
