import React from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const Dashboard = () => {
  const salesByCategory = {
    labels: ['Electronics', 'Clothing', 'Home & Kitchen', 'Books', 'Toys'],
    datasets: [
      {
        data: [30, 25, 20, 15, 10],
        backgroundColor: ['#734F96', '#2A3D66', '#483D8B', '#4B0082', '#8B008B'], // Vibrant colors
        hoverBackgroundColor: ['#FF5733', '#33FF57', '#339BFF', '#F4C300', '#FF33D1'],
      },
    ],
  };

  const topSellingProducts = {
    labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
    datasets: [
      {
        label: 'Units Sold',
        data: [500, 400, 350, 200, 150],
        backgroundColor: '#191970', // Deep Blue
        borderColor: '#191970',
        borderWidth: 1,
      },
    ],
  };

  const monthlyRevenueGrowth = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue ($)',
        data: [1000, 1200, 1100, 1300, 1250, 1500], // Fluctuating monthly revenue
        fill: false,
        borderColor: '#8B008B', // Dark Violet
        tension: 0.1,
      },
    ],
  };

  // Card information (these can be dynamically updated)
  const cardInfo = [
    { title: 'Total Sales', value: '$30,000', color: '#FF6347' },  // Tomato Red
    { title: 'Products Sold', value: '2,000', color: '#1ABC9C' },  // Teal
    { title: 'Monthly Growth', value: '15%', color: '#F39C12' },   // Gold
    { title: 'Average Revenue', value: '$1,200', color: '#4682B4' }, // Steel Blue
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '30px', textAlign: 'center' }}>Seller Analysis Dashboard</h1>

      {/* Cards Section */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', marginBottom: '40px'
      }}>
        {cardInfo.map((card, index) => (
          <div
            key={index}
            style={{
              backgroundColor: card.color,
              color: 'white',
              padding: '15px',
              borderRadius: '8px',
              width: '22%',
              textAlign: 'center',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease-in-out',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <h4 style={{ fontSize: '1rem', fontWeight: '600' }}>{card.title}</h4>
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
        <div style={{ width: '100%', maxWidth: '48%', height: '350px' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '25px', fontWeight: 'bold' }}>Sales by Category</h3>
          <Pie
            data={salesByCategory}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                tooltip: {
                  backgroundColor: '#000',
                  titleColor: '#fff',
                  bodyColor: '#fff',
                },
              },
            }}
          />
        </div>

        <div style={{ width: '100%', maxWidth: '48%', height: '350px' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '25px', fontWeight: 'bold' }}>Top-Selling Products</h3>
          <Bar
            data={topSellingProducts}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                tooltip: {
                  backgroundColor: '#000',
                  titleColor: '#fff',
                  bodyColor: '#fff',
                },
              },
            }}
          />
        </div>
      </div>

      {/* Monthly Revenue Growth Chart */}
      <div style={{ marginTop: '70px' }}>
        
         <h3 style={{ fontSize: '1.25rem', marginTop:'105px', marginBottom: '25px',fontWeight: 'bold' }}>Monthly Revenue Growth</h3>

         <Line data={monthlyRevenueGrowth} />
       </div>
    </div>
  );
};

export default Dashboard;
