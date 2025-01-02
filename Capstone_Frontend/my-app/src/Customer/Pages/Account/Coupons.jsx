import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CardGiftcard } from '@mui/icons-material';
import { jwtDecode } from "jwt-decode"
const Coupons = () => {
  const [userName, setUserName] = useState('');
  const [coupons, setCoupons] = useState([]);
  const [usedCoupons, setUsedCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('')

  const token = localStorage.getItem('userToken');

  useEffect(() => {
    if (token != null) {
      setEmail(jwtDecode(token).email)
      console.log('----------------------------------', jwtDecode(token).email)
    }

    const fetchUserData = async () => {
      if (token) {
        try {
          const response = await axios.get('http://localhost:8080/users/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const userData = response.data;
          setUserName(userData.fullName);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    const fetchCoupons = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/coupons/admin/all');
        const allCoupons = response.data;

        setCoupons(allCoupons);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching coupons:', error);
        setLoading(false);
      }
    };

    const fetchUsedCoupons = async () => {
      if (token) {
        try {
          const response = await axios.get('http://localhost:8080/api/coupons/used', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const usedCouponIds = response.data.map(coupon => coupon.id);
          setUsedCoupons(usedCouponIds);
        } catch (error) {
          console.error('Error fetching used coupons:', error);
        }
      }
    };

    fetchUserData();
    fetchCoupons();
    fetchUsedCoupons();
  }, [token]);

  const getCouponStatus = (coupon) => {
    const today = new Date();
    const expiryDate = new Date(coupon.validityEndDate);
    if (expiryDate < today) {
      return 'Expired';
    }
    else if (usedCoupons.includes(coupon.id)) {
      return 'Redeemed';
    }
    else if ((
      coupon.code.toLowerCase().includes('pnc') && email.toLowerCase().includes('@incedoinc.com')
    ) || (coupon.code.toLowerCase().includes('pnc') === false)) {
      return 'Available'
    }
    else if (coupon.code.toLowerCase().includes('pnc') && email.toLowerCase().includes('@incedoinc.com') === false)
      return 'Not Available';
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }


  return (
    <div className="coupons-container">
      <div className="flex items-center justify-center mb-8">
        <CardGiftcard sx={{ fontSize: 30, color: 'primary.main', mr: 2 }} />
        <h2 className="text-3xl font-semibold text-center text-gray-800">My Coupons</h2>
      </div>
      <div className="coupons-grid">

        {coupons.map((coupon) => {
          if ((
            coupon.code.toLowerCase().includes('pnc') && email.toLowerCase().includes('@incedoinc.com') === false
          ))
            return <></>
          console.log('----------------------------------------', coupon.code, email)
          // console.log()
          return (
            <div
              key={coupon.id}
              className={`coupon-card ${getCouponStatus(coupon) === 'Expired' ? 'expired' :
                !(
                  coupon.code.toLowerCase().includes('pnc') && email.toLowerCase().includes('@incedoinc.com')
                ) ? "NotAvailable" : ""} }`}
            >
              <div className="coupon-header">
                <div className="coupon-code">{coupon.code}</div>
                <div className="coupon-validity">Valid Till: {coupon.validityEndDate}</div>
              </div>
              <div className="coupon-details">
                <div><strong>Discount:</strong> {coupon.discountPercentage}% off</div>
                <div><strong>Minimum Order:</strong> ₹{coupon.minimumOrderValue}</div>
              </div>
              {/* <div className={
                getCouponStatus(coupon) === 'Expired' ? 'coupon-status-expired' : 
                !(
                  coupon.code.toLowerCase().includes('pnc') && email.toLowerCase().includes('@incedoinc.com')
                ) ? "coupon-status-not-availabe" : `coupon-status ${getCouponStatus(coupon).toLowerCase()}`
                
                }>
                {getCouponStatus(coupon)
                }
              </div> */}
              <div className={`coupon-status ${getCouponStatus(coupon).toLowerCase()}`}>
                {getCouponStatus(coupon)}
              </div>
            </div>
          )
        }
        )}
      </div>

      <style jsx>{`
  .coupons-container {
    min-height: 100vh;
    padding: 2rem;
    background-color: #f7f7f7;
  }

  .header {
    font-size: 2.5rem;
    font-weight: bold;
    text-align: center;
    color: #333;
    margin-bottom: 2rem;
  }

  .coupons-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .coupon-card {
    background-color: #fff;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid #e0e0e0;
    transition: transform 0.3s ease-in-out;
    position: relative;
  }

  .coupon-card:hover {
    transform: translateY(-5px);
  }

  .coupon-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .coupon-code {
    font-size: 1.25rem;
    font-weight: bold;
    color: #333;
  }

  .coupon-validity {
    font-size: 0.875rem;
    color: #888;
  }

  .coupon-details {
    font-size: 0.875rem;
    color: #555;
    margin-bottom: 1rem;
  }

  .coupon-status {
    font-weight: bold;
    font-size: 1rem;
    text-align: center;
    padding: 0.5rem;
    border-radius: 4px;
  }
    

  .coupon-status.available {
    color: #28a745;
    background-color: #e6f9e6;
  }
   

  .coupon-status.redeemed {
    color: #dc3545;
    background-color: #f8d7da;
  }

  
  .coupon-status.expired {
    color: #6c757d;
    background-color: #f1f3f5;
  }

  /* Adjust the expired coupon blur */
  .coupon-card.expired{
    filter: blur(1px);  /* Reduced blur effect */
    opacity: 0.75;  /* Increased opacity to make details more visible */
  }

  

  .loading {
    font-size: 1.5rem;
    text-align: center;
    color: #888;
  }
`}</style>

    </div>
  );
};

export default Coupons;
