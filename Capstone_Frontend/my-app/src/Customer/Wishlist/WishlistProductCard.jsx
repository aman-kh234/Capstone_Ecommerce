import { Close } from '@mui/icons-material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WishlistProductCard = ({ product, onRemove }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const {
    title,
    description,
    mrpPrice,
    sellingPrice,
    discountPercent,
    images,
    sizes,
    color,
  } = product;

  const handleClick = () => {
    navigate(`/product-details/${product.category.categoryId}/${product.title}/${product.id}`);
  };

  return (
    <div className="w-60 relative border p-3 shadow-md rounded-md">
      <div 
      className="w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      >
        <img
          src={
            images && images.length > 0
              ? images[0]
              : 'https://via.placeholder.com/150'
          }
          className="object-top w-full h-40 object-cover rounded-md"
          alt={title}
        />
      </div>
      <div className="pt-3 space-y-1">
        <h2 className="font-semibold text-lg truncate">{title}</h2>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        <p className="text-sm text-gray-500">Color: {color}</p>
        <p className="text-sm text-gray-500">Sizes: {sizes}</p>
      </div>
      <div className="price flex items-center gap-3 pt-2">
        <span className="font-semibold text-gray-800">₹{sellingPrice}</span>
        <span className="line-through text-gray-400">₹{mrpPrice}</span>
        <span className="text-green-600 font-medium">{discountPercent}% OFF</span>
      </div>
      <div className="absolute top-2 right-2">
        <button
          className="text-gray-500 hover:text-red-500"
          onClick={() => onRemove(product.id)}
        >
          <Close />
        </button>
      </div>
    </div>
  );
};

export default WishlistProductCard;
