import React from "react";
import OrderTable from "./OrderTable";
import { Container, Grid, Paper, Typography, Box } from "@mui/material";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const Orders = () => {
  return (
    <Container maxWidth="lg">
      <Box mt={3}>
        <Typography variant="h4" gutterBottom color="textPrimary">
          <LocalShippingIcon style={{ marginRight: 8 }} />
          All Orders
        </Typography>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <OrderTable />
        </Paper>
      </Box>
    </Container>
  );
};

export default Orders;
