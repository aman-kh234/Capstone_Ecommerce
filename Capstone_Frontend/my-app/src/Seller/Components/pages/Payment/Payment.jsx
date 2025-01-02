import { Button, Card, Divider } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Transaction from "../Transaction/Transaction";

const Payment = () => {
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [lastPayment, setLastPayment] = useState(0);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("sellerToken");

  useEffect(() => {
    // Fetch orders data from the backend (or use any other appropriate endpoint)
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/seller/orders", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.status === 202) {
          const orders = response.data;
          console.log(orders);
          // Calculate total earnings and last payment
          const earnings = orders.reduce((acc, order) => acc + order.totalSellingPrice, 0);
          const lastPayment = orders.length > 0 ? orders[orders.length - 1].totalSellingPrice : 0;

          setTotalEarnings(earnings);
          setLastPayment(lastPayment);
        }
      } catch (error) {
        console.error("Error fetching orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Card
        style={{
          borderRadius: "4px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <h1 style={{ color: "#757575", fontWeight: 500 }}>Total Earnings :</h1>
        <h1 style={{ fontWeight: "bold", fontSize: "1.25rem", paddingBottom: "8px" }}>
          ${totalEarnings.toFixed(2)}
        </h1>
        <Divider />
        <p style={{ color: "#757575", fontWeight: 500, paddingTop: "8px" }}>
          Last Payment: <strong>${lastPayment.toFixed(2)}</strong>
        </p>
      </Card>
      <div
        style={{
          paddingTop: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Button variant="contained">Transaction</Button>
        <Transaction />
      </div>
    </div>
  );
};

export default Payment;
