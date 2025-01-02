import React from 'react';
import ElectricCategoryCard from './ElectricCategoryCard';

const categories = [
  { name: 'Women', image: 'https://images.unsplash.com/photo-1669479032913-6e9b057677e9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTM5fHx3b21lbiUyMHdlYXJ8ZW58MHwxfDB8fHww' },
  { name: 'Men', image: 'https://images.unsplash.com/photo-1613053342567-924891457d16?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fGVjb21tZXJjZXxlbnwwfDF8MHx8fDA%3D' },
  { name: 'Kids', image: 'https://plus.unsplash.com/premium_photo-1701984401514-a32a73eac549?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8a2lkc3xlbnwwfDF8MHx8fDA%3D' },
  { name: 'Home Decor', image: 'https://plus.unsplash.com/premium_photo-1670914333012-f4093b108aa1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG9tZSUyMGRlY29yfGVufDB8MXwwfHx8MA%3D%3D' },
  { name: 'Furniture', image: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZ1cm5pdHVyZXxlbnwwfDF8MHx8fDA%3D' },
  { name: 'Electronics', image: 'https://images.unsplash.com/photo-1543652437-15ae836b33e3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bGFwdG9wfGVufDB8MXwwfHx8MA%3D%3D'}
];

const ElectricCategory = () => {
  return (
    <div className="flex flex-wrap justify-between py-5 lg:px-20 border-b">
      {categories.map((category, index) => (
        <ElectricCategoryCard key={index} category={category} />
      ))}
    </div>
  );
};

export default ElectricCategory;
