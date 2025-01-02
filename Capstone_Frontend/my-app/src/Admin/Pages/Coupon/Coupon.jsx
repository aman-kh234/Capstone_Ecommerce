import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { LocalOffer } from "@mui/icons-material"; // Importing the icon
import axios from "axios";

// Function to format date in dd-mm-yyyy format
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#000", // Table header black
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

const Coupon = () => {
  const [accountStatus, setAccountStatus] = useState("ACTIVE");
  const [error, setError] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  // Fetch coupons
  const fetchCoupon = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/coupons/admin/all");
      setCoupons(response.data);
    } catch (err) {
      console.error("Error fetching coupons:", err);
      setError("Failed to fetch coupons. Please try again.");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (event) => {
    setAccountStatus(event.target.value);
  };

  // Open Dialog for status change
  const openStatusChangeDialog = (coupon) => {
    setSelectedCoupon(coupon);
    setOpenDialog(true);
  };

  // Close the Dialog
  const closeDialog = () => {
    setOpenDialog(false);
    setSelectedCoupon(null);
  };

  // Update status (Active to Inactive or Inactive to Active)
  const updateStatus = async (status) => {
    if (!selectedCoupon) return;

    try {
      await axios.get(
        `http://localhost:8080/api/coupons/update/${selectedCoupon.id}/${status}`
      );
      setCoupons((prevCoupons) =>
        prevCoupons.map((coupon) =>
          coupon.id === selectedCoupon.id ? { ...coupon, active: !coupon.active } : coupon
        )
      );
      closeDialog();
    } catch (err) {
      console.error("Error updating coupon status:", err);
      setError("Failed to update coupon status. Please try again.");
    }
  };

  useEffect(() => {
    fetchCoupon();
  }, []);

  return (
    <Box sx={{ backgroundColor: "#f4f6f8", minHeight: "100vh", padding: "20px" }}>
      <Paper sx={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "10px" }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
            fontWeight: "bold",
            color: "#000", // Keep the heading color normal (not black)
            padding: "10px 20px",
          }}
        >
          <LocalOffer sx={{ marginRight: "10px", fontSize: "30px" }} />
          Coupon Management
        </Typography>

        {error && <Typography color="error">{error}</Typography>}

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="coupon table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Coupon Code</StyledTableCell>
                <StyledTableCell align="right">Discount %</StyledTableCell>
                <StyledTableCell align="right">Minimum Order Value</StyledTableCell>
                <StyledTableCell>Start Date</StyledTableCell>
                <StyledTableCell>End Date</StyledTableCell>
                <StyledTableCell align="right">Active Status</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coupons.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="right">{row.code}</StyledTableCell>
                  <StyledTableCell align="right">{row.discountPercentage}</StyledTableCell>
                  <StyledTableCell align="right">{row.minimumOrderValue}</StyledTableCell>
                  <StyledTableCell>{formatDate(row.validityStartDate)}</StyledTableCell>
                  <StyledTableCell>{formatDate(row.validityEndDate)}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.active ? "Active" : "Not Active"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.active ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => openStatusChangeDialog(row)}
                        sx={{ textTransform: "none" }}
                      >
                        Deactivate
                      </Button>
                    ) : (
                      "N/A"
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={coupons.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Status Change Dialog */}
      <Dialog open={openDialog} onClose={closeDialog}>
        <DialogTitle sx={{ backgroundColor: "#000", color: "#fff" }}>
          Change Coupon Status
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to change the status of coupon{" "}
            <strong>{selectedCoupon ? selectedCoupon.code : ""}</strong> to{" "}
            {selectedCoupon && selectedCoupon.active ? "Inactive" : "Active"}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary" sx={{ textTransform: "none" }}>
            Cancel
          </Button>
          <Button
            onClick={() =>
              updateStatus(selectedCoupon && selectedCoupon.active ? "false" : "true")
            }
            color="secondary"
            sx={{ textTransform: "none" }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Coupon;
