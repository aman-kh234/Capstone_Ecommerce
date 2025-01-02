import { Link } from 'react-router-dom';
import { LocalShipping } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderItem from './OrderItem'; // Assuming you have a component to display basic order info
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import OrderStepper from './OrderStepper'; // Assuming the OrderStepper is in the same directory

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [openDialog, setOpenDialog] = useState(false); // Dialog state
  const [selectedOrderId, setSelectedOrderId] = useState(null); // Store the selected order ID
  const userToken = localStorage.getItem('userToken'); // Retrieving user token from localStorage

  // Fetch orders from backend API
  useEffect(() => {
    if (userToken) {
      axios
        .get('http://localhost:8080/api/orders/user', {
          headers: { Authorization: `Bearer ${userToken}` },
        })
        .then((response) => {
          console.log('Response Data:', response.data); // Log the response
          setOrders(response.data);
        })
        .catch((error) => {
          console.error('Error fetching orders:', error);
        });
    }
  }, [userToken]);

  const handleOrderClick = (orderId) => {
    setSelectedOrderId(orderId);
    setOpenDialog(true); // Open dialog when order is clicked
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close dialog
    setSelectedOrderId(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center p-8">
      <div className="mb-6 text-center">
        <div className="flex items-center justify-center">
          <LocalShipping sx={{ fontSize: 30, color: 'primary.main', mr: 2 }} />
          <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
        </div>
        <p className="text-gray-600">Track and manage your orders</p>
      </div>

      <div className="w-full max-w-4xl space-y-6">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.id}
            // onClick={() => handleOrderClick(order.id)} // Open dialog on order click
            >
              <OrderItem order={order} userToken={userToken} />
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">
            <p>No orders found</p>
          </div>
        )}
      </div>

      {/* Dialog to show OrderStepper */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          <OrderStepper orderId={selectedOrderId} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Orders;
