import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useSearchParams } from 'react-router-dom';
import FilterSection from './FilterSection';
import ProductCard from './ProductCard';
import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  useMediaQuery,
  useTheme,
  Pagination,
} from '@mui/material';
import { FilterAlt } from '@mui/icons-material';

const normalizeParams = (params) => {
  const normalized = {};
  for (const key in params) {
    if (params[key]) normalized[key] = params[key];
  }

  if (normalized.price) {
    const [minPrice, maxPrice] = normalized.price.split('-').map((p) => p.trim());
    normalized.minPrice = parseInt(minPrice, 10);
    normalized.maxPrice = parseInt(maxPrice, 10);
    delete normalized.price;
  }

  if (normalized.discount) {
    normalized.minDiscount = parseInt(normalized.discount, 10);
    delete normalized.discount;
  }

  return normalized;
};

const Product = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'));
  const [sort, setSort] = useState('');
  const [pageNumber, setPageNumber] = useState(0); 
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0); 
  const { category } = useParams();
  const [searchParams] = useSearchParams();

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPageNumber(value - 1); 
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = Object.fromEntries([...searchParams]);
        const params = normalizeParams({
          category,
          colors: query.color,
          discount: query.discount,
          price: query.price,
          sort: sort,
          pageNumber: pageNumber,
        });

        console.log('Fetching products with params:', params);

        const response = await axios.get('http://localhost:8080/products', { params });

        console.log('Products fetched:', response.data);

        setProducts(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [category, searchParams, sort, pageNumber]); 

 
  const fillEmptySlots = (products) => {
    const remainingSlots = 4 - (products.length % 4);
    if (remainingSlots !== 4) {
      return [...products, ...Array(remainingSlots).fill(null)]; 
    }
    return products;
  };

  const filledProducts = fillEmptySlots(products);

  return (
    <div className="mt-10">
      {/* <h1 className="text-3xl text-center font-bold text-gray-700 pb-5 px-9 uppercase space-x-2">
        {category.replace('_', ' ')}
      </h1> */}
      <h1 className="text-3xl text-center font-bold text-gray-700 pb-5 px-9 uppercase space-x-2">
        {category.replace(/_/g, ' ')}
      </h1>

      <div className="lg:flex">
        <section className="filter_section hidden lg:block w-[20%]">
          <FilterSection />
        </section>

        <div className="w-full lg:w-[80%] space-y-5">
          <div className="flex justify-between items-center px-9 h-[40px]">
            <div className="relative w-[50%]">
              {!isLarge && (
                <IconButton>
                  <FilterAlt />
                </IconButton>
              )}
              {!isLarge && (
                <Box>
                  <FilterSection />
                </Box>
              )}
            </div>

            <FormControl size="small" sx={{ width: '200px' }}>
              <InputLabel id="demo-simple-select-label">Sort</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                label="Sort"
                onChange={handleSortChange}
              >
                <MenuItem value="price_low">Price: Low - High</MenuItem>
                <MenuItem value="price_high">Price: High - Low</MenuItem>
                <MenuItem value="newest">Newest</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Divider />

          <section className="products_section grid gap-y-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 justify-center">
            {products.length === 0 ? (
              <div className="flex w-full h-96">
                <div className="text-center text-xl font-bold text-gray-700">
                  <div className="text-4xl">:(</div>
                  <p>Products not available</p>
                </div>
              </div>
            ) : (
              <>
                {filledProducts.map((product, index) => (
                  <div key={index} className="product-container">
                    {product ? (
                      <ProductCard product={product} />
                    ) : (
                      <div className="empty-slot"></div> 
                    )}
                  </div>
                ))}
              </>
            )}
          </section>

          <div className="pagination-controls flex justify-center mt-4">
            <Pagination
              count={totalPages}
              page={pageNumber + 1} 
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
              size="large"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
