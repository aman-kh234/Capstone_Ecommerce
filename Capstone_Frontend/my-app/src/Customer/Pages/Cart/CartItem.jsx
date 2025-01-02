import React, { useState } from 'react';
import { Close, Remove } from '@mui/icons-material';
import { Button, Divider, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';

const CartItem = ({ item, updateCartItem, removeCartItem }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleUpdateQuantity = async (operation) => {
    let newQuantity = quantity;

    // Adjust quantity based on operation
    if (operation === 'increment') {
      newQuantity += 1;
    } else if (operation === 'decrement' && quantity > 1) {
      newQuantity -= 1;
    }

    setQuantity(newQuantity);

    // Send the updated quantity to the back-end API
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.put(
        `http://localhost:8080/api/cart/item/${item.id}`,
        {
          productId: item.product.id,
          quantity: newQuantity,
          size: item.size, // Assuming size is part of the item
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // If the update is successful, call the callback to update the UI in the parent component
      updateCartItem(item.id, response.data);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemoveItem = () => {
    removeCartItem(item.id); // Call removeCartItem function passed from Cart.js
  };


  return (
    <div className="border rounded-md relative">
      <div className="p-5 flex gap-3">
        <div>
          <img
            className="w-[90px] rounded-md"
            src={item.product.images[0]}
            alt={item.product.title}
          />
        </div>

        <div className="space-y-2">
          <h1 className="font-semibold text-lg">{item.product.title}</h1>
          <p>{item.product.description}</p>
          <p>7 days replacement</p>
          <p>
            <strong>Quantity :</strong> {quantity}
          </p>
        </div>
      </div>
      <Divider />

      <div className="flex justify-between items-center">
        <div className="px-5 py-2 flex justify-between items-center">
          <div className="flex items-center gap-2 w-[140px] justify-between">
            <Button onClick={() => handleUpdateQuantity('decrement')} disabled={quantity <= 1}>
              <Remove />
            </Button>
            <span>{quantity}</span>
            <Button onClick={() => handleUpdateQuantity('increment')} disabled={item.product.quantity <= quantity}
            >
              <AddCircleIcon />
            </Button>
          </div>
        </div>

        <div className="pr-5">
          <p className="text-gray-700 font-medium">
            {item.product.sellingPrice * quantity}
          </p>
        </div>
      </div>

      <div className="absolute top-1 right-1">
        <IconButton onClick={handleRemoveItem}>
          <Close className="text-red-500" />
        </IconButton>
      </div>
    </div>
  );
};

export default CartItem;
