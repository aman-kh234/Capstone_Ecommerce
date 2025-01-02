import React, { useState, useEffect } from "react";
import {
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
  TextField,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Import the check icon
import axios from "axios";
import { Wallet } from "@mui/icons-material";

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

const ManageWallet = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [usedWalletBalance, setUsedWalletBalance] = useState(0); // Stores the entered wallet balance

  const userToken = localStorage.getItem("userToken");

  const handleWallet = async (id, amount) => {
    if (window.confirm("Update Wallet Balance to " + amount + "?")) {
      try {
        // Update the API request URL to match the backend route
        const response = await axios.post(
          `http://localhost:8080/users/update-wallet/${id}/${amount}`, // Updated URL
          {}
        );
        console.log(response.data);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? { ...user, wallet: amount } : user
          )
        );
      } catch (error) {
        setError("Error updating wallet");
      }
      window.location.reload();
    }
  };

  // Fetch users data from API
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/users/manage-wallet", {
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


  // Handle key press to allow only numbers (no negative values)
  const handleKeyDown = (e) => {
    // Block non-numeric keys except for backspace
    if (!/[\d]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
      e.preventDefault();
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f4f6f8', minHeight: '100vh', padding: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <Paper elevation={3} sx={{ width: '100%', maxWidth: 1000, padding: 3 }}>
          <Typography variant="h5" component="h1" color="black" gutterBottom>
            <Wallet sx={{ marginRight: "10px", fontSize: "30px" }} />
            Wallet Management
          </Typography>

          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Full Name</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell align="right">Mobile</StyledTableCell>
                  <StyledTableCell align="right">Wallet Coins</StyledTableCell>
                  <StyledTableCell align="right">Wallet Update</StyledTableCell>
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
                      <StyledTableCell align="right">{row.wallet}</StyledTableCell>
                      <StyledTableCell align="right" style={{ width: "200px" }}>
                        <div className="flex items-center space-x-2">
                          <TextField
                            label="Enter Amount"
                            // type="number"
                            size="small"
                            onChange={(e) => { const value = e.target.value;
                              // Allow only positive numbers and prevent 0 or negative input
                              if (/^\d*\.?\d*$/.test(value) && (value === '' || Number(value) > 0)) {
                                // console.log(value)
                                setUsedWalletBalance(value);
                              }} } // Store input value
                            
                              onKeyDown={handleKeyDown} 
                              inputProps={{
                              min: 0,
                            }}
                            sx={{ width: "120px" }} // Make text field smaller
                          />
                          <IconButton
                            color="primary"
                            onClick={() =>
                              handleWallet(row.id, usedWalletBalance) // Call wallet update on click
                            }
                          >
                            <CheckCircleIcon />
                          </IconButton>
                        </div>
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
        </Paper>
      </div>
    </Box>
  );
};

export default ManageWallet;
