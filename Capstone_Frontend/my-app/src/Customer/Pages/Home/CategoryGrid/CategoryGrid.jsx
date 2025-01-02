import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryGrid = () => {
  const navigate = useNavigate();

  const handleClick = (categoryName) => {
    // Navigate to the product page of the selected category
    navigate(`/products/${categoryName.toLowerCase()}`);
  };

  return (
    <div className="grid gap-4 grid-rows-12 grid-cols-12 lg:h-[600px] px-5 lg:px-20">
      <div className="col-span-3 row-span-12 text-white" onClick={() => handleClick('Women')}>
        <img
          className="w-full h-full object-cover object-top rounded-md"
          src="https://images.unsplash.com/photo-1618333453296-9e35280fd6b1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="women"
        />
      </div>
      <div className="col-span-2 row-span-6 text-white" onClick={() => handleClick('Furniture')}>
        <img
          className="w-full h-full object-cover object-top rounded-md"
          src="https://images.unsplash.com/photo-1487015307662-6ce6210680f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZnVybml0dXJlfGVufDB8fDB8fHww"
          alt="furniture"
        />
      </div>
      <div className="col-span-4 row-span-6 text-white" onClick={() => handleClick('Jewelry')}>
        <img
          className="w-full h-full object-cover object-top rounded-md"
          src="https://images.unsplash.com/photo-1659095141570-be8b9aff59ce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8andlbGxlcnl8ZW58MHx8MHx8fDA%3D"
          alt="jewelry"
        />
      </div>
      <div className="col-span-3 row-span-12 text-white" onClick={() => handleClick('Men')}>
        <img
          className="w-full h-full object-cover object-top rounded-md"
          src="https://images.unsplash.com/photo-1548142723-aae7678afa53?w=600&auto=format&fit=crop&q=60&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGUlMjBjb21tZXJjZSUyMHByb2R1Y3RzfGVufDB8fDB8fHww"
          alt="men"
        />
      </div>
      <div className="col-span-4 row-span-6 text-white" onClick={() => handleClick('Men Traditionals')}>
        <img
          className="w-full h-full object-cover object-top rounded-md"
          src="https://images.unsplash.com/photo-1505975281173-b339d9fd992c?w=600&auto=format&fit=crop&q=60&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGluZGlhbiUyMHdlYXJ8ZW58MHx8MHx8fDA%3D"
          alt="men traditionals"
        />
      </div>
      <div className="col-span-2 row-span-6 text-white" onClick={() => handleClick('Men Sports Shoes')}>
        <img
          className="w-full h-full object-cover object-top rounded-md"
          src="https://images.unsplash.com/photo-1562424995-2efe650421dd?w=600&auto=format&fit=crop&q=60&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fGZvb3R3ZWFyJTIwZWNvbW1lcmNlfGVufDB8fDB8fHww"
          alt="men sports shoes"
        />
      </div>
    </div>
  );
};

export default CategoryGrid;
