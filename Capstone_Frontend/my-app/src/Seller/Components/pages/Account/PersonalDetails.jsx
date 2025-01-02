import { Box, Button, TextField, CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";

const PersonalDetails = ({ profileData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // UseEffect to fetch the initial seller data
  useEffect(() => {
    const fetchProfileData = async () => {
      const sellerToken = localStorage.getItem("sellerToken");

      if (!sellerToken) {
        setError("Authorization token is missing.");
        return;
      }

      setLoading(true);

      try {
        const response = await fetch("http://localhost:8080/seller/profile", {
          headers: {
            Authorization: `Bearer ${sellerToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const profileData = await response.json();
        // Prefill form with the fetched data
        formik.setValues({
          sellerName: profileData.sellerName || "",
          email: profileData.email || "",
          mobile: profileData.mobile || "",
        });

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []); // Run once when the component is mounted

  const formik = useFormik({
    initialValues: {
      sellerName: "",
      email: "",
      mobile: "",
    },
    onSubmit: async (values) => {
      const sellerToken = localStorage.getItem("sellerToken");

      if (!sellerToken) {
        console.log("No token found");
        return;
      }

      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/seller", {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${sellerToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sellerName: values.sellerName,
            email: values.email,
            mobile: values.mobile,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update profile");
        }

        const updatedSeller = await response.json();
        console.log("Profile updated:", updatedSeller);

        // Reload the page after successful form submission
        window.location.reload();

      } catch (err) {
        setError(err.message);
        console.log("Error:", err);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="space-y-4">
      {error && <p style={{ color: "red" }}>{error}</p>}

      <TextField
        fullWidth
        name="sellerName"
        label="Seller Name"
        value={formik.values.sellerName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.sellerName && Boolean(formik.errors.sellerName)}
        helperText={formik.touched.sellerName && formik.errors.sellerName}
      />

      <TextField
        fullWidth
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />

      <TextField
        fullWidth
        name="mobile"
        label="Mobile"
        value={formik.values.mobile}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.mobile && Boolean(formik.errors.mobile)}
        helperText={formik.touched.mobile && formik.errors.mobile}
      />

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button
          variant="contained"
          onClick={formik.handleSubmit}
          sx={{
            width: "auto",
            maxWidth: "150px",
            padding: "8px 16px", // Optional: Adjust padding for a more compact look
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
        </Button>
      </Box>
    </div>
  );
};

export default PersonalDetails;
