import React from 'react';
import ProductCard from './ProductCard';

const SearchResult = (props) => {
  // Ensure that 'products' is always an array
  const products = props.products || [];

  return (
    <div>
      <section className="products_section grid gap-y-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 justify-center">
        {products.length === 0 ? (
          <div className="flex w-full h-96 justify-center items-center text-center text-xl font-bold text-gray-700">
            <p>No products available</p>
          </div>
        ) : (
          products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        )}
      </section>
    </div>
  );
};

export default SearchResult;
