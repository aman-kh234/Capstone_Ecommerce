import React, { useState, useEffect } from "react";
import { Edit } from "@mui/icons-material";
import { Avatar, Box, Button, Divider, Modal, Typography, CircularProgress, Card, CardContent, Grid } from "@mui/material";
import PersonalDetails from "./PersonalDetails";
import BusinessDetails from "./BusinessDetails";
import PickupAddress from "./PickupAddress";
import BankDetails from "./BankDetails";

// Styling for the modal and overall layout
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  maxHeight: '90vh',
  overflowY: 'auto', // Allow scrolling within modal
};

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState("personalDetails");
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching profile data
  useEffect(() => {
    const sellerToken = localStorage.getItem("sellerToken");

    if (sellerToken) {
      fetch("http://localhost:8080/seller/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sellerToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setProfileData(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });

    }


  }, []);

  const handleOpen = (formName) => {
    setOpen(true);
    setSelectedForm(formName);
  };

  const handleClose = () => setOpen(false);

  const renderSelectedForm = () => {
    switch (selectedForm) {
      case "personalDetails":
        return <PersonalDetails />;
      case "businessDetails":
        return <BusinessDetails />;
      case "pickupAddress":
        return <PickupAddress />;
      case "bankDetails":
        return <BankDetails />;
      default:
        return null;
    }
  };

  const maskAccountNumber = (accountNumber) => {
    return accountNumber ? accountNumber.slice(0, 4) + " **** **** ****" : "****";
  };

  // Loading spinner
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress size={50} />
      </Box>
    );
  }

  // Error handling
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error" align="center">
          Something went wrong! Please try again later.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "20px 40px", backgroundColor: "#F5F7FB" }}>
      {/* Profile Header */}
      <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" mb={4}>
        <Avatar
          sx={{ width: 120, height: 120, marginBottom: 2 }}
          src={profileData?.avatar || "https://via.placeholder.com/150"}
        />
        <Typography variant="h5" color="text.primary" fontWeight="bold">
          {profileData?.sellerName || "John Doe"}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {profileData?.email || "johndoe@example.com"}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {profileData?.mobile || "123-456-7890"}
        </Typography>
      </Box>

      {/* Profile Sections */}
      <Grid container spacing={4}>
        {/* Personal Details Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%", borderRadius: 3, boxShadow: 5, transition: "all 0.3s ease", ":hover": { boxShadow: 12 } }}>
            <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" color="primary" fontWeight="bold">
                  Personal Details
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleOpen("personalDetails")}
                  startIcon={<Edit />}
                  sx={{ borderRadius: "20px" }}
                >
                  Edit
                </Button>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1"><strong>Name:</strong> {profileData?.sellerName}</Typography>
              <Typography variant="body1"><strong>Email:</strong> {profileData?.email}</Typography>
              <Typography variant="body1"><strong>Mobile:</strong> {profileData?.mobile}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Business Details Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%", borderRadius: 3, boxShadow: 5, transition: "all 0.3s ease", ":hover": { boxShadow: 12 } }}>
            <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" color="primary" fontWeight="bold">
                  Business Details
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleOpen("businessDetails")}
                  startIcon={<Edit />}
                  sx={{ borderRadius: "20px" }}
                >
                  Edit
                </Button>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1"><strong>Business Name:</strong> {profileData?.businessDetails?.businessName}</Typography>
              <Typography variant="body1"><strong>Business Email:</strong> {profileData?.businessDetails?.businessEmail}</Typography>
              <Typography variant="body1"><strong>Business Mobile:</strong> {profileData?.businessDetails?.businessMobile}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Pickup Address Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%", borderRadius: 3, boxShadow: 5, transition: "all 0.3s ease", ":hover": { boxShadow: 12 } }}>
            <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" color="primary" fontWeight="bold">
                  Pickup Address
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleOpen("pickupAddress")}
                  startIcon={<Edit />}
                  sx={{ borderRadius: "20px" }}
                >
                  Edit
                </Button>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1"><strong>Street:</strong> {profileData?.pickupAddress?.address}</Typography>
              <Typography variant="body1"><strong>Locality:</strong> {profileData?.pickupAddress?.locality}</Typography>
              <Typography variant="body1"><strong>City:</strong> {profileData?.pickupAddress?.city}</Typography>
              <Typography variant="body1"><strong>State:</strong> {profileData?.pickupAddress?.state}</Typography>
              <Typography variant="body1"><strong>Pin Code:</strong> {profileData?.pickupAddress?.pinCode}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Bank Details Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%", borderRadius: 3, boxShadow: 5, transition: "all 0.3s ease", ":hover": { boxShadow: 12 } }}>
            <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" color="primary" fontWeight="bold">
                  Bank Details
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleOpen("bankDetails")}
                  startIcon={<Edit />}
                  sx={{ borderRadius: "20px" }}
                >
                  Edit
                </Button>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1"><strong>Account Number:</strong> {maskAccountNumber(profileData?.bankDetails?.accountNumber)}</Typography>
              <Typography variant="body1"><strong>IFSC Code:</strong> {profileData?.bankDetails?.ifscCode}</Typography>
              <Typography variant="body1"><strong>Account Holder Name:</strong> {profileData?.bankDetails?.accountHolderName}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Modal for editing sections */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>{renderSelectedForm()}</Box>
      </Modal>
    </Box>
  );
};

export default Profile;
