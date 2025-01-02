import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import { purple, red, teal } from '@mui/material/colors';
import { Button, Divider } from '@mui/material';
import { AddShoppingCart, Favorite, FavoriteBorder, LocalShipping, Remove, Shield, Wallet, WorkspacePremium } from '@mui/icons-material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SimilarProducts from './SimilarProducts';
import axios from 'axios';

import Review from '../Review/Review';
import { jwtDecode } from 'jwt-decode';

const ProductDetails = () => {
  const { categoryId, name, productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const token = localStorage.getItem('userToken');
  const sellerToken = localStorage.getItem('sellerToken');
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isWomenOrMen, setIsWomenOrMen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState('');

  console.log("sss",userRole);
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      const decodedToken = jwtDecode(localStorage.getItem('userToken'));
      console.log("aaaaaaaa",decodedToken)
      setUserEmail(decodedToken.email);
      setUserRole(decodedToken.authorities); // Assuming the JWT contains the user's role
      console.log("User token--->>", localStorage.getItem("userToken"));
    }
    fetch(`http://localhost:8080/products/${productId}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        setSelectedImage(data.images[0]);
        const isWomenProduct = data.title.toLowerCase().includes('women') || categoryId.toLowerCase().includes('women');
        const isMenProduct = data.title.toLowerCase().includes('men') || categoryId.toLowerCase().includes('men');
        setIsWomenOrMen(isWomenProduct || isMenProduct);
      })
      .catch(error => console.error('Error fetching product:', error));
  }, [productId, categoryId]);

  const handleAddToCart = async () => {
    if (isWomenOrMen && !selectedSize) {
      alert('Please select a size before adding to the cart');
      return;
    }

    if (!token) {
      navigate('/');
      alert('You must be logged in to add items to the cart');
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:8080/api/cart/add",
        {
          productId: product.id,
          size: selectedSize,
          quantity: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Item added to cart:', response.data);
      navigate('/cart');
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert('Failed to add product to cart');
    }
  };

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    const token = localStorage.getItem('userToken');
    
    if (!token) {
      alert('Please log in to add to wishlist');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/wishlist/add-product/${product.id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsFavorited(!isFavorited);
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token && product) {
      axios
        .get('http://localhost:8080/api/wishlist', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const isProductInWishlist = response.data.products.some(
            (item) => item.id === product.id
          );
          setIsFavorited(isProductInWishlist);
        })
        .catch((error) => {
          console.error('Error fetching wishlist:', error);
        });
    }
  }, [product, productId]);

  useEffect(() => {
    if (!token) {
      localStorage.setItem('cart', JSON.stringify([]));
    }
  }, [token]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="px-5 lg:px-20 pt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section className="flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3">
            {product.images.map((image, index) => (
              <img
                key={index}
                className="lg:w-full w-[50px] cursor-pointer rounded-md"
                src={image}
                alt="Product Thumbnail"
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
          <div className="w-full lg:w-[85%]">
            <img
              className="w-full rounded-md"
              src={selectedImage}
              alt="Main Product"
            />
          </div>
        </section>

        <section>
          <h1 className="font-bold text-lg text-[#6a1b9a]">{product.title}</h1>

          <div className="flex justify-between items-center py-2 border w-[180px] px-3 mt-5">
            <div className="flex gap-1 items-center">
              <span>{product.numRatings}</span>
              <StarIcon sx={{ color: purple[700], fontSize: "17px" }} />
            </div>
            <Divider orientation="vertical" flexItem />
            <span>{product.numRatings} Ratings</span>
          </div>

          <div>
            <div className="price flex items-center gap-3 mt-5 text-2xl">
              <span className="font-sans text-gray-800">₹{product.sellingPrice}</span>
              {product.mrpPrice !== product.sellingPrice && (
                <span className="line-through text-gray-400">₹{product.mrpPrice}</span>
              )}
              <span className="text-[#6a1b9a] font-semibold">
                {Math.round((1 - product.sellingPrice / product.mrpPrice) * 100)}%
              </span>
            </div>
            <p className="text-sm">Inclusive of all taxes, Free Shipping above ₹1500</p>
          </div>

          <div className="mt-7 space-y-3">
            <div className="flex items-center gap-4">
              <Shield sx={{ color: purple[700] }} />
              <p>Authentic & Quality Assured</p>
            </div>
            <div className="flex items-center gap-4">
              <WorkspacePremium sx={{ color: purple[700] }} />
              <p>100% Money Back Guarantee</p>
            </div>
            <div className="flex items-center gap-4">
              <LocalShipping sx={{ color: purple[700] }} />
              <p>Free Shipping & Returns</p>
            </div>
            <div className="flex items-center gap-4">
              <Wallet sx={{ color: purple[700] }} />
              <p>Pay on Delivery</p>
            </div>
          </div>

          {userRole !== 'Role_Admin' && (
            <>
              <div className="mt-7 space-y-2">
                <h1>Quantity</h1>
                <div className="flex items-center gap-2 w-[140px] justify-between">
                  <Button disabled={quantity === 1} onClick={() => setQuantity(quantity - 1)}>
                    <Remove />
                  </Button>
                  <span>{quantity}</span>
                  <Button disabled={quantity >= product.quantity}
                    onClick={() => setQuantity(quantity + 1)}>
                    <AddCircleIcon />
                  </Button>
                </div>
              </div>
            </>
          )}

          <div className="mt-7 space-y-2">
            <h1>Size</h1>
            {isWomenOrMen ? (
              <div className="flex gap-3">
                {product.sizes && product.sizes.trim().length > 0 ? (
                  product.sizes
                    .split(",")
                    .map((size, index) => (
                      <Button
                        key={index}
                        variant="outlined"
                        sx={{
                          backgroundColor: selectedSize === size.trim() ? teal[500] : 'transparent',
                          color: selectedSize === size.trim() ? 'white' : teal[500],
                          '&:hover': {
                            backgroundColor: selectedSize === size.trim() ? teal[700] : 'transparent',
                            color: 'white',
                          },
                        }}
                        onClick={() => setSelectedSize(size.trim())}
                      >
                        {size.trim()}
                      </Button>
                    ))
                ) : (
                  <span>No sizes available</span>
                )}
              </div>
            ) : (
              <span>No size options available for this product.</span>
            )}
          </div>

          {userRole !== 'Role_Admin' && (
            <div className="mt-12 flex items-center gap-5">
              <Button
                fullWidth
                variant="contained"
                startIcon={<AddShoppingCart />}
                sx={{ py: "1rem" }}
                onClick={handleAddToCart}
              >
                Add To Cart
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={
                  isFavorited ? (
                    <Favorite sx={{ color: red[500] }} />
                  ) : (
                    <FavoriteBorder sx={{ color: teal[500] }} />
                  )
                }
                sx={{ py: "1rem" }}
                onClick={handleFavoriteClick}
              >
                {isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </Button>
            </div>
          )}

          <div className="mt-5">
            <p>{product.description}</p>
          </div>
        </section>
      </div>

      <div>
        <Review products={product.id} userEmail={userEmail}></Review>
      </div>

      <div className="mt-20">
        <h1 className="text-lg font-bold">Similar Products</h1>
        <div className="pt-5">
          <SimilarProducts category={categoryId} excludeProductId={product.id} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
