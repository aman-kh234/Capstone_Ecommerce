import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Grid,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { AccountBox, SellerIcon } from '@mui/icons-material'; // Import an appropriate seller icon, adjust if necessary.

const accountStatuses = [
  { status: "Pending_Verification", title: "Pending Verification", description: "ACCOUNT IS CREATED BUT NOT YET VERIFIED" },
  { status: "Active", title: "Active", description: "ACCOUNT IS ACTIVE AND IN GOOD STANDING" },
  { status: "Suspended", title: "Suspended", description: "ACCOUNT IS TEMPORARILY SUSPENDED, POSSIBLY DUE TO VIOLATIONS" },
  { status: "Deactivated", title: "Deactivated", description: "ACCOUNT IS DEACTIVATED, USER MAY HAVE CHOSEN TO DEACTIVATE IT" },
  { status: "Banned", title: "Banned", description: "ACCOUNT IS PERMANENTLY BANNED DUE TO SEVERE VIOLATIONS" },
  { status: "Closed", title: "Closed", description: "ACCOUNT IS PERMANENTLY CLOSED, POSSIBLY AT USER REQUEST" },
];

// Helper function to format status (capitalize words and replace underscores)
const formatStatus = (status) => {
  return status
    .replace(/_/g, " ")  // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase());  // Capitalize the first letter of each word
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black, // Set the header background to black
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

const SellersTable = () => {
  const [accountStatus, setAccountStatus] = useState("Active");
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [newSellerStatus, setNewSellerStatus] = useState("");

  const userToken = localStorage.getItem("userToken");

  // Fetch sellers data from API
  useEffect(() => {
    const fetchSellers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/seller/all", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          params: {
            status: accountStatus,
          },
        });
        setSellers(response.data);
      } catch (error) {
        setError("Error fetching sellers");
      } finally {
        setLoading(false);
      }
    };
    fetchSellers();
  }, [userToken, accountStatus]);

  const handleChange = (event) => {
    setAccountStatus(event.target.value);
  };

  const openChangeStatusDialog = (seller) => {
    setSelectedSeller(seller);
    setNewSellerStatus(seller.accountStatus); // Default to the current status of the seller
    setOpenDialog(true);
  };

  const closeChangeStatusDialog = () => {
    setOpenDialog(false);
    setSelectedSeller(null);
    setNewSellerStatus("");
  };

  const updateSellerStatus = async () => {
    try {
      if (!selectedSeller) return;
      const updatedSeller = { ...selectedSeller, accountStatus: newSellerStatus };
      await axios.patch("http://localhost:8080/seller/updateSellerStatus", updatedSeller, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setSellers((prevSellers) =>
        prevSellers.map((seller) =>
          seller.id === selectedSeller.id ? { ...seller, accountStatus: newSellerStatus } : seller
        )
      );
      closeChangeStatusDialog();
    } catch (error) {
      console.error("Error updating seller status:", error);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#f4f6f8", minHeight: "100vh", padding: "20px" }}>
      <Paper sx={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "10px" }}>
        <Grid container alignItems="center" justifyContent="space-between">
          {/* Sellers Management Heading with Icon */}
          <Grid item>
            <Box display="flex" alignItems="center">
              <AccountBox sx={{ color: 'black', marginRight: 1 }} /> {/* Seller Icon */}

              <Typography variant="h5" component="h3" sx={{ color: "black" }}>
                Sellers Management
              </Typography>
            </Box>
          </Grid>

          {/* Account Status Dropdown on the right */}
          <Grid item>
            <FormControl fullWidth sx={{ maxWidth: "250px", paddingBottom: "10px" }}>
              <InputLabel id="account-status-select-label">Account Status</InputLabel>
              <Select
                labelId="account-status-select-label"
                value={accountStatus}
                onChange={handleChange}
                label="Account Status"
              >
                {accountStatuses.map((item) => (
                  <MenuItem key={item.status} value={item.status}>
                    {formatStatus(item.title)} {/* Format status */}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {loading ? (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <Card>
            <CardContent>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Seller Name</StyledTableCell>
                      <StyledTableCell>Email</StyledTableCell>
                      <StyledTableCell align="right">Mobile</StyledTableCell>
                      <StyledTableCell align="right">Business Name</StyledTableCell>
                      <StyledTableCell align="left">Account Status</StyledTableCell> {/* Align Account Status to the left */}
                      <StyledTableCell align="right">Change Status</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sellers.length > 0 ? (
                      sellers.map((row) => (
                        <StyledTableRow key={row.id}>
                          <StyledTableCell component="th" scope="row">
                            {row.sellerName}
                          </StyledTableCell>
                          <StyledTableCell>{row.email}</StyledTableCell>
                          <StyledTableCell align="right">{row.mobile}</StyledTableCell>
                          <StyledTableCell align="right">{row.businessDetails?.businessName || "N/A"}</StyledTableCell>
                          <StyledTableCell align="left">{formatStatus(row.accountStatus)}</StyledTableCell> {/* Align Account Status to the left */}
                          <StyledTableCell align="right">
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => openChangeStatusDialog(row)}
                            >
                              Update
                            </Button>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))
                    ) : (
                      <StyledTableRow>
                        <StyledTableCell colSpan={6} align="center">
                          No sellers available for this status.
                        </StyledTableCell>
                      </StyledTableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        )}

        {/* Change Status Dialog */}
        <Dialog open={openDialog} onClose={closeChangeStatusDialog}>
          <DialogTitle>Change Seller Status</DialogTitle>
          <DialogContent>
            <FormControl fullWidth>
              <InputLabel id="status-select-label">New Status</InputLabel>
              <Select
                labelId="status-select-label"
                value={newSellerStatus}
                onChange={(e) => setNewSellerStatus(e.target.value)}
                label="New Status"
              >
                {accountStatuses.map((item) => (
                  <MenuItem key={item.status} value={item.status}>
                    {formatStatus(item.title)} {/* Format status */}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeChangeStatusDialog} color="secondary">
              Cancel
            </Button>
            <Button onClick={updateSellerStatus} color="primary">
              Update Status
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default SellersTable;
