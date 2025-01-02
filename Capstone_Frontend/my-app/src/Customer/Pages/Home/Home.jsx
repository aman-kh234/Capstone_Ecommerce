import React from 'react';
import ElectricCateogory from './ElectricCategory/ElectricCategory';
import CategoryGrid from './CategoryGrid/CategoryGrid';
import { Button, Card, CardContent, Typography } from '@mui/material';
// import Footer from '../../Components/Footer/footer';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  // Handle navigation to the product or sale page
  const handleNavigate = (pageName) => {
    // Format the pageName to make it URL-friendly (lowercase and spaces replaced by hyphens)
    navigate(`/products/${pageName.toLowerCase().replace(/ /g, '')}`);
  };
  return (
    <div className='space-y-5 lg:space-y-10 relative pb-20'>
      <ElectricCateogory />
      <CategoryGrid />


      {/* Best Selling Products Section */}
      <section className="py-20 bg-gray-200">
        <h2 className="text-3xl font-bold text-center text-[#6a1b9a] pb-10">Best Selling Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-4">
          {/* Smart Watches Card */}
          <Card className="shadow-lg hover:shadow-xl transition duration-300 ease-in-out" onClick={() => handleNavigate('Smart Watches')}>
            <img
              src="https://images.unsplash.com/photo-1698729617220-102b6d5a30b6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHdhdGNoZXMlMjBzbWFydHxlbnwwfDB8MHx8fDA%3D"
              alt="Best Seller 1"
              className="w-full h-[250px] object-cover"
            />
            <CardContent>
              <Typography variant="h6" className="font-semibold">Smart Watches</Typography>
              <div className="flex items-center mb-2">
                <Typography variant="body2" className="text-yellow-500">★★★★☆ (200 Reviews)</Typography>
              </div>
              <Typography variant="body2" color="textSecondary" className="mb-2">
                A popular item that everyone loves. Great for casual wear and everyday use.
              </Typography>
              <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Shop Now
              </Button>
            </CardContent>
          </Card>

          {/* Health & Beauty Card */}
          <Card className="shadow-lg hover:shadow-xl transition duration-300 ease-in-out" onClick={() => handleNavigate('Health & Beauty')}>
            <img
              src="https://images.unsplash.com/photo-1556760544-74068565f05c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhlYWx0aCUyMGFuZCUyMGJlYXV0eXxlbnwwfDB8MHx8fDA%3D"
              alt="Best Seller 2"
              className="w-full h-[250px] object-cover"
            />
            <CardContent>
              <Typography variant="h6" className="font-semibold">Health & Beauty</Typography>
              <div className="flex items-center mb-2">
                <Typography variant="body2" className="text-yellow-500">★★★★★ (500 Reviews)</Typography>
              </div>
              <Typography variant="body2" color="textSecondary" className="mb-2">
                This is a highly rated product and a must-have for anyone looking for durability and style.
              </Typography>
              <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Shop Now
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
            onClick={() => handleNavigate('Activewear')}>
            <img
              src="https://hips.hearstapps.com/hmg-prod/images/year-of-ours-ribbed-v-waist-65fc8d74ad49f.jpg"
              alt="Best Seller 3"
              className="w-full h-[250px] object-cover"
            />
            <CardContent>
              <Typography variant="h6" className="font-semibold">Activewear</Typography>
              <div className="flex items-center mb-2">
                <Typography variant="body2" className="text-yellow-500">
                  ★★★★☆ (200 Reviews)
                </Typography>
              </div>
              <Typography variant="body2" color="textSecondary" className="mb-2">
                Customers love this product for its convenience and ease of use. Perfect for travel.
              </Typography>
              <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Shop Now
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
            onClick={() => handleNavigate('Best-Selling Novels')}>
            <img
              src="https://images.unsplash.com/photo-1599495054627-35ad07218a46?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fG5vdmVsc3xlbnwwfDB8MHx8fDA%3D"
              alt="Best Seller 4"
              className="w-full h-[250px] object-cover"
            />
            <CardContent>
              <Typography variant="h6" className="font-semibold">Best Selling Novels</Typography>
              <div className="flex items-center mb-2">
                <Typography variant="body2" className="text-yellow-500">
                  ★★★★★ (150 Reviews)
                </Typography>
              </div>
              <Typography variant="body2" color="textSecondary" className="mb-2">
              One of our top picks for the season. Great value for money, exceptional quality, and perfect for everyone!              </Typography>
              <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Shop Now
              </Button>
            </CardContent>
          </Card>

        </div>
      </section>

      <section className="py-20 bg-gray-100">
        <h2 className="text-3xl font-bold text-center text-red-700 pb-10">
          🎄 Winter Sale is Here! 🎁
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-4">
          <div
            className="relative h-[350px] cursor-pointer"
            onClick={() => handleNavigate('Christmas Sale')}
          >
            <img
              src="https://images.unsplash.com/photo-1511268011861-691ed210aae8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hyaXN0bWFzfGVufDB8MHwwfHx8MA%3D%3D"
              alt="Christmas Sale"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center font-bold">
              <h3 className="text-4xl">Up to 50% Off</h3>
              <p className="text-xl">Shop the best Christmas deals now!</p>
            </div>
          </div>

          <div
            className="relative h-[350px] cursor-pointer"
            onClick={() => handleNavigate('Winter Wear')}
          >
            <img
              src="https://images.unsplash.com/photo-1511511450040-677116ff389e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGNocmlzdG1hcyUyMGNsb3RoZXN8ZW58MHwwfDB8fHww"
              alt="Winter Sale"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center font-bold">
              <h3 className="text-4xl">Hurry, Limited Time Only!</h3>
              <p className="text-xl">Exclusive discounts on winter essentials!</p>
            </div>
          </div>
        </div>
      </section>



    </div>
  );
};

export default Home;
