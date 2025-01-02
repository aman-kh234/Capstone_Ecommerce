import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";

const BusinessDetails = () => {
  const [initialValues, setInitialValues] = useState({
    businessName: "",
    businessEmail: "",
    businessMobile: "",
    businessAddress: "",
  });

  const [error, setError] = useState("");

  // Fetch existing business details on component mount
  useEffect(() => {
    const fetchBusinessDetails = async () => {
      const sellerToken = localStorage.getItem("sellerToken");

      if (!sellerToken) {
        setError("Authorization token is missing.");
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/seller/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${sellerToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Failed to fetch business details: ${errorData.message || response.statusText}`);
        }

        const data = await response.json();
        console.log("Fetched Seller Data:", data);

        // Ensure the values are not null or undefined
        if (data.businessDetails) {
          setInitialValues({
            businessName: data.businessDetails.businessName || "",
            businessEmail: data.businessDetails.businessEmail || "",
            businessMobile: data.businessDetails.businessMobile || "",
            businessAddress: data.businessDetails.businessAddress || "",
          });
        } else {
          setInitialValues({
            businessName: "",
            businessEmail: "",
            businessMobile: "",
            businessAddress: "",
          });
        }
      } catch (err) {
        console.log("Error:", err);
        setError(err.message);
      }
    };

    fetchBusinessDetails();
  }, []);

  // Formik form setup
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: async (values) => {
      const sellerToken = localStorage.getItem("sellerToken");

      if (!sellerToken) {
        setError("Authorization token is missing.");
        return;
      }

      try {
        const updatedBusinessDetails = {
          businessName: values.businessName,
          businessEmail: values.businessEmail,
          businessMobile: values.businessMobile,
        };

        const response = await fetch("http://localhost:8080/seller", {
          method: "PATCH",
          headers: {
            "Authorization": `Bearer ${sellerToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedBusinessDetails),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Failed to update business details: ${errorData.message || response.statusText}`);
        }

        setError("");
        formik.setValues({
          ...formik.values,
          ...updatedBusinessDetails,
        });

        console.log("Updated Business Details:", updatedBusinessDetails);
        window.location.reload();
      } catch (err) {
        console.log("Error:", err);
        setError(err.message);
      }
    },
  });

  return (
    <div className="space-y-4">
      {/* Business Name Field */}
      <TextField
        fullWidth
        name="businessName"
        label="Business Name"
        value={formik.values.businessName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.businessName && Boolean(formik.errors.businessName)}
        helperText={formik.touched.businessName && formik.errors.businessName}
      />

      {/* Business Email Field */}
      <TextField
        fullWidth
        name="businessEmail"
        label="Business Email"
        value={formik.values.businessEmail}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.businessEmail && Boolean(formik.errors.businessEmail)}
        helperText={formik.touched.businessEmail && formik.errors.businessEmail}
      />

      {/* Business Mobile Field (Replaced Address) */}
      <TextField
        fullWidth
        name="businessMobile"
        label="Business Mobile"
        value={formik.values.businessMobile}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.businessMobile && Boolean(formik.errors.businessMobile)}
        helperText={formik.touched.businessMobile && formik.errors.businessMobile}
      />

      <TextField
        fullWidth
        name="businessAddress"
        label="Business Address"
        value={formik.values.businessAddress}
        disabled
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.businessAddress && Boolean(formik.errors.businessAddress)}
        helperText={formik.touched.businessAddress && formik.errors.businessAddress}
      />

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button
          variant="contained"
          onClick={formik.handleSubmit}
          sx={{
            width: 'auto',
            maxWidth: '150px',
            padding: '8px 16px',
          }}
        >
          Submit
        </Button>
      </Box>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </div>
  );
};

export default BusinessDetails;
