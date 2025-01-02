import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  IconButton,
  Box,
  Divider,
} from "@mui/material";
import axios from "axios";
import BusinessIcon from '@mui/icons-material/Business';  // Business icon
import PersonIcon from '@mui/icons-material/Person';    // Icon for user details
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Icon for address

// Styling for the table cells
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null); // Store selected user for the dialog
  const [openDialog, setOpenDialog] = useState(false); // Controls dialog visibility

  const userToken = localStorage.getItem("userToken");

  // Fetch users data from API
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/users/all", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        setError("Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [userToken]);

  // Handle "View" button click
  const handleViewUserDetails = (user) => {
    setSelectedUser(user);
    setOpenDialog(true); // Open the dialog when "View" is clicked
  };

  // Handle dialog close
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  return (
    <Box sx={{ backgroundColor: "#f4f6f8", minHeight: "100vh", padding: "20px" }}>
      <Paper sx={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "10px" }}>
        <Grid container alignItems="center" justifyContent="space-between">
          {/* Users Management Heading with Icon */}
          <Grid item>
            <Box display="flex" alignItems="center">
              <BusinessIcon sx={{ color: 'black', marginRight: 1 }} /> {/* Business Icon */}
              <Typography variant="h5" component="h3" sx={{ color: "black" }}>
                Users Management
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {loading ? (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <Card variant="outlined" sx={{ marginTop: 3 }}>
            <CardContent>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Full Name</StyledTableCell>
                      <StyledTableCell>Email</StyledTableCell>
                      <StyledTableCell align="right">Mobile</StyledTableCell>
                      <StyledTableCell align="right">Addresses</StyledTableCell>
                      {/* <StyledTableCell align="right">View</StyledTableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.length > 0 ? (
                      users.map((row) => (
                        <StyledTableRow key={row.id}>
                          <StyledTableCell component="th" scope="row">
                            {row.fullName}
                          </StyledTableCell>
                          <StyledTableCell>{row.email}</StyledTableCell>
                          <StyledTableCell align="right">{row.mobile}</StyledTableCell>
                          {/* <StyledTableCell align="right">
                            {row.addresses?.length > 0 ? row.addresses.length : "N/A"}
                          </StyledTableCell> */}
                          <StyledTableCell align="right">
                            <Button
                              variant="contained"
                              onClick={() => handleViewUserDetails(row)}
                            >
                              View
                            </Button>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))
                    ) : (
                      <StyledTableRow>
                        <StyledTableCell colSpan={5} align="center">
                          No users available.
                        </StyledTableCell>
                      </StyledTableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        )}
      </Paper>

      {/* Dialog for viewing user details */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <PersonIcon sx={{ color: 'black', marginRight: 1 }} /> {/* User Icon */}
            <Typography variant="h6">
              User Details: {selectedUser?.fullName}
            </Typography>
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ padding: "20px", backgroundColor: "#f9f9f9" }}>
          <Grid container spacing={3}>
            {/* User Info Section */}
            <Grid item xs={12}>
              <Box sx={{
                backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px", boxShadow: 3, border: "1px solid #ddd"
              }}>
                <Typography variant="h6" gutterBottom>
                  <strong>Email:</strong> {selectedUser?.email}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  <strong>Mobile:</strong> {selectedUser?.mobile}
                </Typography>
              </Box>
            </Grid>

            {/* Addresses Section */}
            <Grid item xs={12}>
              <Box sx={{
                backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px", boxShadow: 3, border: "1px solid #ddd"
              }}>
                <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                  <LocationOnIcon sx={{ marginRight: 1 }} /> Addresses:
                </Typography>
                {selectedUser?.addresses?.length > 0 ? (
                  selectedUser.addresses.map((address, index) => (
                    <Box key={index} sx={{ marginBottom: 3 }}>
                      <Box sx={{
                        padding: "15px", borderRadius: "8px", backgroundColor: "#f0f0f0", boxShadow: 1
                      }}>
                        <Typography variant="body1">
                          <strong>Address {index + 1}</strong>
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          <strong>Line 1:</strong> {address.line1}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          <strong>Line 2:</strong> {address.line2}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          <strong>City:</strong> {address.city}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          <strong>State:</strong> {address.state}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          <strong>Zip Code:</strong> {address.zipCode}
                        </Typography>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Typography>No addresses available for this user.</Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ padding: "20px" }}>
          <Button onClick={handleCloseDialog} color="primary" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsersTable;
