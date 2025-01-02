import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useSearchParams } from 'react-router-dom';
import FilterSection from './FilterSection';
import ProductCard from './ProductCard';
import { Box, Divider, FormControl, IconButton, InputLabel, MenuItem, Select, useMediaQuery, useTheme } from '@mui/material';
import { FilterAlt } from '@mui/icons-material';
 
import { useLocation } from 'react-router-dom';
import SearchResult from './SearchResult';

const Search = (props) => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'));
  const [sort, setSort] = useState('');
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const location = useLocation();
const searchQuery = new URLSearchParams(location.search).get('query') || '';

 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
       
        console.log("---------------------------abc-------------------------------------")
        console.log(searchQuery)
        const response = await axios.get('http://localhost:8080/products/search?query=' + searchQuery);
        console.log('Products fetched:', response.data);
 
        setProducts(response.data);
        // window.location.reload();
        console.log(products);
       
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
 
    fetchProducts();
  }, []);
 
 
 
  return (
    <div className="mt-10">
        <SearchResult products={products}/>
   
    </div>
  );
};
 
export default Search;