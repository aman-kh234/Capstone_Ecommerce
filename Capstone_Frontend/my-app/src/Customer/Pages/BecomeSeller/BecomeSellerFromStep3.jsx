import React from 'react';
import { TextField } from '@mui/material';

const BecomeSellerFromStep3 = ({ formik }) => {
  // Custom validation for form fields
  const validateFields = () => {
    const errors = {};
    const { accountNumber, ifscCode, accountHolderName } = formik.values.bankDetails;

    // Validate Account Number (Required and 16 digits)
    if (!accountNumber) {
      errors.bankDetails = { ...errors.bankDetails, accountNumber: 'Account Number is required' };
    } else if (!/^\d{16}$/.test(accountNumber)) {
      errors.bankDetails = { ...errors.bankDetails, accountNumber: 'Account Number must be 16 digits' };
    }

    // Validate IFSC Code (Required and valid format)
    if (!ifscCode) {
      errors.bankDetails = { ...errors.bankDetails, ifscCode: 'IFSC Code is required' };
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode)) {
      errors.bankDetails = { ...errors.bankDetails, ifscCode: 'Invalid IFSC Code format' };
    }

    // Validate Account Holder Name (Required, Min 3, Max 100 characters, Only Letters and Spaces)
    if (!accountHolderName) {
      errors.bankDetails = { ...errors.bankDetails, accountHolderName: 'Account Holder Name is required' };
    } else if (accountHolderName.length < 3) {
      errors.bankDetails = { ...errors.bankDetails, accountHolderName: 'Account Holder Name must be at least 3 characters' };
    } else if (accountHolderName.length > 100) {
      errors.bankDetails = { ...errors.bankDetails, accountHolderName: 'Account Holder Name must not exceed 100 characters' };
    } else if (/[\d]/.test(accountHolderName)) {
      errors.bankDetails = { ...errors.bankDetails, accountHolderName: 'Account Holder Name must not contain digits' };
    } else if (!/^[A-Za-z\s]+$/.test(accountHolderName)) {
      errors.bankDetails = { ...errors.bankDetails, accountHolderName: 'Account Holder Name must contain only letters and spaces' };
    }

    return errors;
  };

  // Handle input for Account Number (Allow only digits)
  const handleAccountNumberInput = (e) => {
    const regex = /^[0-9]*$/; // Allow only digits
    if (!regex.test(e.key)) {
      e.preventDefault(); // Prevent any non-digit input
    }
  };

  // Handle input for Account Holder Name (Disallow digits)
  const handleAccountHolderNameInput = (e) => {
    const regex = /^[A-Za-z\s]*$/; // Allow only letters and spaces
    if (!regex.test(e.key)) {
      e.preventDefault(); // Prevent any non-alphabetic or non-space input
    }
  };

  return (
    <div className="space-y-5">
      <TextField
        fullWidth
        name="bankDetails.accountNumber"
        label="Account Number"
        required
        value={formik.values.bankDetails.accountNumber}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        onKeyDown={handleAccountNumberInput} // Restrict input to digits
        error={formik.touched.bankDetails?.accountNumber && Boolean(formik.errors.bankDetails?.accountNumber)}
        helperText={formik.touched.bankDetails?.accountNumber && formik.errors.bankDetails?.accountNumber}
        inputProps={{ maxLength: 16 }} // Limit length to 16
      />
      <TextField
        fullWidth
        name="bankDetails.ifscCode"
        label="IFSC Code"
        required
        value={formik.values.bankDetails.ifscCode}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.bankDetails?.ifscCode && Boolean(formik.errors.bankDetails?.ifscCode)}
        helperText={formik.touched.bankDetails?.ifscCode && formik.errors.bankDetails?.ifscCode}
        inputProps={{ maxLength: 11 }} // Limit length of IFSC Code to 11 characters
      />
      <TextField
        fullWidth
        name="bankDetails.accountHolderName"
        label="Account Holder Name"
        required
        value={formik.values.bankDetails.accountHolderName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        onKeyDown={handleAccountHolderNameInput} // Restrict input to letters and spaces only
        error={formik.touched.bankDetails?.accountHolderName && Boolean(formik.errors.bankDetails?.accountHolderName)}
        helperText={formik.touched.bankDetails?.accountHolderName && formik.errors.bankDetails?.accountHolderName}
        inputProps={{ maxLength: 3 }} // Limit to 100 characters
      />
    </div>
  );
};

export default BecomeSellerFromStep3;
