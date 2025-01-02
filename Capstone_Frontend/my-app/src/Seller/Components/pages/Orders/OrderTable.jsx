import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TablePagination,
} from "@mui/material";

// Styling components using MUI
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

const statusColors = {
  PENDING: "#FFA500", // Orange
  PLACED: "#00BFFF",  // Deep Sky Blue
  CONFIRMED: "#008000", // Green
  SHIPPED: "#0000FF", // Blue
  DELIVERED: "#32CD32", // Lime Green
  CANCELLED: "#FF6347", // Tomato
};

const statusLabels = {
  PENDING: "Pending",
  PLACED: "Placed",
  CONFIRMED: "Confirmed",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

const statusOrder = [
  "PENDING",
  "PLACED",
  "CONFIRMED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

// Function to get valid next statuses, excluding "CANCELLED" for SHIPPED/DELIVERED statuses
const getNextValidStatuses = (currentStatus) => {
  const currentIndex = statusOrder.indexOf(currentStatus);
  let validStatuses = statusOrder.slice(currentIndex + 1); // Returns statuses that are after the current status

  // Exclude "CANCELLED" for "SHIPPED" and "DELIVERED"
  if (currentStatus === "SHIPPED" || currentStatus === "DELIVERED") {
    validStatuses = validStatuses.filter(status => status !== "CANCELLED");
  }

  return validStatuses;
};

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const token = localStorage.getItem("sellerToken");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/seller/orders", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders", error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  const handleChangeStatus = (orderId, currentStatus) => {
    setSelectedOrderId(orderId);
    setSelectedStatus(currentStatus);
    setOpenDialog(true);
  };

  const handleUpdateStatus = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/seller/orders/${selectedOrderId}/status/${selectedStatus}`,
        {},
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      if (response.status === 202) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === selectedOrderId
              ? { ...order, orderStatus: selectedStatus }
              : order
          )
        );

        setOpenDialog(false);
      }
    } catch (error) {
      console.error("Error updating order status", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const paginatedOrders = orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Order Id</StyledTableCell>
              <StyledTableCell>Products</StyledTableCell>
              <StyledTableCell align="right">Shipping Address</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">Update</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length === 0 ? (
              <StyledTableRow>
                <StyledTableCell colSpan={5} align="center">
                  No orders available.
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              paginatedOrders.map((order) => (
                <StyledTableRow key={order.id}>
                  <StyledTableCell component="th" scope="row">
                    {order.id}
                  </StyledTableCell>
                  <StyledTableCell>
                    {order.orderItems
                      .map((item) => item.product?.title)
                      .join(", ") || "No Products"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {order.shippingAddress
                      ? `${order.shippingAddress.address}, ${order.shippingAddress.city}`
                      : "N/A"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <span
                      style={{
                        backgroundColor: statusColors[order.orderStatus],
                        color: "white",
                        padding: "5px 10px",
                        borderRadius: "15px",
                      }}
                    >
                      {statusLabels[order.orderStatus]}
                    </span>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {/* Only show the button if the order is not "CANCELLED" or "DELIVERED" */}
                    {order.orderStatus !== "CANCELLED" && order.orderStatus !== "DELIVERED" ? (
                      <Button
                        onClick={() => handleChangeStatus(order.id, order.orderStatus)}
                        variant="outlined"
                        color="primary"
                      >
                        Change
                      </Button>
                    ) : (
                      <Button variant="outlined" color="primary" disabled>
                        Change
                      </Button>
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Component */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Modal for status update */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Update Order Status</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {getNextValidStatuses(selectedStatus).map((status) => (
                <MenuItem key={status} value={status}>
                  {statusLabels[status]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateStatus} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OrderTable;








