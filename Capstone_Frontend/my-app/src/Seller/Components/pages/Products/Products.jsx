import React from "react";
import ProductTable from "./ProductTable";
import { Container, Typography, Paper, Box, Grid, Button } from "@mui/material";
import ListAltIcon from '@mui/icons-material/ListAlt';



const Products = () => {
  return (
    <Container maxWidth="lg" sx={{ backgroundColor: "background.default", pb: 4 }}>
      <Box mt={4} mb={4}>
        <Typography variant="h4" gutterBottom color="textPrimary">
          <ListAltIcon style={{ marginRight: 8 }} />
          All Products
        </Typography>
        <Paper elevation={3} sx={{ p: 3, backgroundColor: "background.paper", boxShadow: 5, borderRadius: 2 }}>
          <ProductTable />
        </Paper>
      </Box>
    </Container>
  );
};

export default Products;
