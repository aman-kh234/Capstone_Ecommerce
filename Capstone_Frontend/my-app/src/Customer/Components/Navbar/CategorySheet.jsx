import { Box } from '@mui/material';
import React from 'react';
import { menLevelTwo } from '../../../Data/Category/leveltwo/menLevelTwo.js';
import { womenLevelTwo } from '../../../Data/Category/leveltwo/womenLevelTwo.js';
import { furnitureLevelTwo } from '../../../Data/Category/leveltwo/furnitureLevelTwo.js';
import { electronicsLevelTwo } from '../../../Data/Category/leveltwo/electronicsLevelTwo.js';
import { menLevelThree } from '../../../Data/Category/levelthree/menLevelThree';
import { womenLevelThree } from '../../../Data/Category/levelthree/womenLevelThree.js';
import { electronicsLevelThree } from '../../../Data/Category/levelthree/electronicsLevelThree.js';
import { furnitureLevelThree } from '../../../Data/Category/levelthree/furnitureLevelThree.js';
import { useNavigate } from 'react-router-dom';


const categoryTwo = {
  men: menLevelTwo,
  women: womenLevelTwo,
  electronics: electronicsLevelTwo,
  home_furniture: furnitureLevelTwo,
};

const categoryThree = {
  men: menLevelThree,
  women: womenLevelThree,
  electronics: electronicsLevelThree,
  home_furniture: furnitureLevelThree,
};

const CategorySheet = ({ selectedCategory }) => {
  const navigate = useNavigate();

  const childCategory = (category, parentCategoryId) => {
    return category.filter((child) => child.parentCategoryId === parentCategoryId);
  };

  return (
    <Box sx={{ zIndex: 2 }} className="bg-white shadow-lg lg:h-[200px] overflow-y-auto">
      <div className="flex text-sm flex-wrap">
        {categoryTwo[selectedCategory]?.map((item, index) => (
          <div
            className={`p-8 lg:w-[20%] ${index % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}
            key={item.categoryId}
          >
            <p className=" mb-5 font-semibold"
             style={{ color: '#6a1b9a' }}>{item.name}</p>
            <ul className="space-y-3">
              {childCategory(categoryThree[selectedCategory], item.categoryId).map((childItem) => (
                <li
                  key={childItem.categoryId}
                  onClick={() => navigate(`/products/${childItem.categoryId}`)} 
                  className="hover:text-[#6a1b9a]  cursor-pointer"
                >
                  {childItem.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default CategorySheet;
