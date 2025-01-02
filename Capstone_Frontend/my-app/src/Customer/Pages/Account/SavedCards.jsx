import { Payment } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';

const SavedCards = () => {
  const [userName, setUserName] = useState('');
  const [savedCards, setSavedCards] = useState([
    {
      cardType: 'Visa',
      last4Digits: '1234',
      expiryDate: '12/25',
      cardHolder: '', // We'll replace this dynamically
      brand: 'Visa',
    },
    {
      cardType: 'MasterCard',
      last4Digits: '5678',
      expiryDate: '11/24',
      cardHolder: '', // We'll replace this dynamically
      brand: 'MasterCard',
    },
    {
      cardType: 'American Express',
      last4Digits: '9876',
      expiryDate: '09/26',
      cardHolder: '', // We'll replace this dynamically
      brand: 'American Express',
    }
  ]);

  useEffect(() => {
    // Fetch user data from localStorage or API
    const token = localStorage.getItem('userToken');
    if (token) {
      const storedUserData = JSON.parse(localStorage.getItem('userData'));
      if (storedUserData && storedUserData.fullName) {
        setUserName(storedUserData.fullName); // Set user name from the stored data
      } else {
        fetch('http://localhost:8080/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(response => response.json())
          .then(data => {
            if (data.fullName) {
              setUserName(data.fullName); // Set the fetched user's name
              localStorage.setItem('userData', JSON.stringify(data)); // Store user data
            }
          })
          .catch(error => console.error('Error fetching user data:', error));
      }
    }
  }, []);

  // Update cardholder name dynamically based on the logged-in user
  const updatedCards = savedCards.map(card => ({
    ...card,
    cardHolder: userName, // Use the dynamic username as the cardholder name
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-8">
      <div className="flex items-center justify-center mb-8">
        <Payment sx={{ fontSize: 30, color: 'primary.main', mr: 2 }} /> {/* Icon */}
        <h2 className="text-3xl font-semibold text-center text-gray-800">My Saved Cards</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {updatedCards.map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-semibold text-gray-900">{card.cardType} ({card.brand})</div>
              <div className="text-sm text-gray-500">Expires: {card.expiryDate}</div>
            </div>

            <div className="text-sm text-gray-700 mb-2">
              <span className="font-medium">Cardholder:</span> {card.cardHolder}
            </div>

            <div className="text-sm text-gray-500">
              **** **** **** {card.last4Digits}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedCards;
