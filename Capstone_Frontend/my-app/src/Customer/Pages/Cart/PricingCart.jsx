import React from 'react';
import { Divider } from '@mui/material';

const PricingCart = ({ totalSellingPrice, totalItem, totalMrpPrice, discount }) => {
  const formattedDiscount = (discount).toFixed(2); 
  return (
    <div className="space-y-3 p-5">
      <div className="flex justify-between items-center">
        <span>Subtotal</span>
        <span>₹{totalSellingPrice}</span>
      </div>

      <div className="flex justify-between items-center">
        <span>Discount</span>
        <span>{formattedDiscount}%</span>
      </div>

      <div className="flex justify-between items-center">
        <span>Shipping</span>
        <span>₹69</span>
      </div>

      <div className="flex justify-between items-center">
        <span>Platform</span>
        <span>Free</span>
      </div>

      <Divider />

      <div className="flex justify-between items-center p-3 text-[#6a1b9a]">
        <span>Total</span>
        <span>₹{totalSellingPrice+69}</span>
      </div>
    </div>
  );
};

export default PricingCart;




