import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, IconButton, TablePagination, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Edit } from '@mui/icons-material';
import axios from 'axios';

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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function ProductTable() {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [totalProducts, setTotalProducts] = React.useState(0);
  const [openProductDialog, setOpenProductDialog] = React.useState(false); // Product update dialog state
  const [openImageDialog, setOpenImageDialog] = React.useState(false); // Image gallery dialog state
  const [currentProductId, setCurrentProductId] = React.useState(null);
  const [currentProduct, setCurrentProduct] = React.useState({
    title: '',
    description: '',
    mrpPrice: '',
    sellingPrice: '',
    discountPercent: '',
    quantity: '',
    color: '',
    sizes: '',
  });
  const [selectedProductImages, setSelectedProductImages] = React.useState([]);

  // Fetch products on component mount or page change
  React.useEffect(() => {
    const fetchProducts = async () => {
      const sellerToken = localStorage.getItem('sellerToken');
      if (!sellerToken) {
        setError('Seller token not found');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:8080/seller/products', {
          headers: {
            Authorization: `Bearer ${sellerToken}`,
          },
          params: {
            sellerId: localStorage.getItem('sellerId'),  // Get sellerId from localStorage
            page: page,
            size: rowsPerPage,
          },
        });

        setProducts(response.data.content);  // Assuming the API returns `content` as product list
        setTotalProducts(response.data.totalElements); // Update the total products count
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage); // Update page state when page changes
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10)); // Update rows per page
    setPage(0); // Reset to first page when rows per page changes
  };

  const handleOpenProductDialog = (productId, product) => {
    setCurrentProductId(productId);
    setCurrentProduct(product); // Set the product details in the form fields
    setOpenProductDialog(true);
  };

  const handleUpdateProduct = async () => {
    const sellerToken = localStorage.getItem('sellerToken');
    if (!sellerToken) {
      alert('Seller token not found');
      return;
    }

    try {
      await axios.put(`http://localhost:8080/seller/products/${currentProductId}`, {
        title: currentProduct.title,
        description: currentProduct.description,
        mrpPrice: currentProduct.mrpPrice,
        sellingPrice: currentProduct.sellingPrice,
        discountPercent: currentProduct.discountPercent,
        quantity: currentProduct.quantity,
        color: currentProduct.color,
        sizes: currentProduct.sizes,
      }, {
        headers: {
          Authorization: `Bearer ${sellerToken}`,
        },
      });

      setOpenProductDialog(false);
      setCurrentProduct({ // Reset the form fields
        title: '',
        description: '',
        mrpPrice: '',
        sellingPrice: '',
        discountPercent: '',
        quantity: '',
        color: '',
        sizes: '',
      });
      setPage(0); // Reset to first page
    } catch (err) {
      console.error('Error updating product:', err);
      alert('Failed to update product');
    }
  };

  const handleOpenImageDialog = (productImages) => {
    setSelectedProductImages(productImages); // Set the images for the clicked product
    setOpenImageDialog(true); // Open the dialog to show images
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Images</StyledTableCell>
            <StyledTableCell align="right">Title</StyledTableCell>
            <StyledTableCell align="right">MRP</StyledTableCell>
            <StyledTableCell align="right">Selling Price</StyledTableCell>
            <StyledTableCell align="right">Color</StyledTableCell>
            <StyledTableCell align="right">Update Stock</StyledTableCell>
            <StyledTableCell align="right">Update</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} align="center">
                <strong>No products found.</strong>
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <StyledTableRow key={product.id}>
                {/* Show only the first image in the table, and allow clicking to open all images */}
                <StyledTableCell component="th" scope="row">
                  {product.images && product.images.length > 0 && (
                    <img
                      src={product.images[0]} // Display only the first image
                      alt={`Product Image`}
                      style={{ width: 100, height: 100, cursor: 'pointer', objectFit: 'cover' }}
                      onClick={() => handleOpenImageDialog(product.images)} // Show all images in dialog
                    />
                  )}
                </StyledTableCell>
                <StyledTableCell align="right">{product.title}</StyledTableCell>
                <StyledTableCell align="right">₹{product.mrpPrice}</StyledTableCell>
                <StyledTableCell align="right">₹{product.sellingPrice}</StyledTableCell>
                <StyledTableCell align="right">{product.color}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    size="small"
                    variant={product.quantity ? 'contained' : 'outlined'}
                    color={product.quantity ? 'success' : 'error'}
                  >
                    {product.quantity ? 'In Stock' : 'Out of Stock'}
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => handleOpenProductDialog(product.id, product)}
                  >
                    <Edit />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))
          )}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalProducts}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Dialog for showing all images */}
      <Dialog open={openImageDialog} onClose={() => setOpenImageDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Product Images</DialogTitle>
        <DialogContent>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            {selectedProductImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product Image ${index + 1}`}
                style={{ width: 150, height: 150, margin: 10, objectFit: 'cover' }}
              />
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenImageDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for updating product details */}
      <Dialog open={openProductDialog} onClose={() => setOpenProductDialog(false)}>
        <DialogTitle>Update Product Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            value={currentProduct.title}
            onChange={(e) => setCurrentProduct({ ...currentProduct, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            value={currentProduct.description}
            onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="MRP Price"
            type="number"
            fullWidth
            value={currentProduct.mrpPrice}
            onChange={(e) => setCurrentProduct({ ...currentProduct, mrpPrice: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Selling Price"
            type="number"
            fullWidth
            value={currentProduct.sellingPrice}
            onChange={(e) => setCurrentProduct({ ...currentProduct, sellingPrice: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Discount Percent"
            type="number"
            fullWidth
            value={currentProduct.discountPercent}
            onChange={(e) => setCurrentProduct({ ...currentProduct, discountPercent: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Quantity"
            type="number"
            fullWidth
            value={currentProduct.quantity}
            onChange={(e) => setCurrentProduct({ ...currentProduct, quantity: e.target.value })}
          />
          {/* <TextField
            margin="dense"
            label="Color"
            type="text"
            fullWidth
            value={currentProduct.color}
            onChange={(e) => setCurrentProduct({ ...currentProduct, color: e.target.value })}
          /> */}
          <TextField
            margin="dense"
            label="Sizes"
            type="text"
            fullWidth
            value={currentProduct.sizes}
            onChange={(e) => setCurrentProduct({ ...currentProduct, sizes: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenProductDialog(false)} sx={{ color: 'red' }}>
            Cancel
          </Button>
          <Button onClick={handleUpdateProduct} color="primary">
            Update Product
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}
