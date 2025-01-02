import React from 'react';
import { useNavigate } from 'react-router-dom';

const ElectricCategoryCard = ({ category }) => {
  const navigate = useNavigate(); 

  const handleClick = () => {
    navigate(`/products/${category.name.toLowerCase()}`);
  };

  return (
    <div 
      className="flex flex-col items-center space-y-4 cursor-pointer" 
      onClick={handleClick} >
      <img
        className="object-cover w-20 h-20 rounded-full border-2 border-gray-300"
        src={category.image}
        alt={category.name}
      />
      <h2 className="font-semibold text-lg text-gray-700">{category.name}</h2>
    </div>
  );
};

export default ElectricCategoryCard;
