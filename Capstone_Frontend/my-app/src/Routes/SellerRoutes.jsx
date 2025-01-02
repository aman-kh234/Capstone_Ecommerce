import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Dashboard from '../Seller/Components/pages/SellerDashBoard/Dashboard'
import Products from '../Seller/Components/pages/Products/Products'
import AddProduct from '../Seller/Components/pages/Products/AddProduct'
import Orders from '../Seller/Components/pages/Orders/Orders'
import Profile from '../Seller/Components/pages/Account/Profile'
import Payment from '../Seller/Components/pages/Payment/Payment'
import Transaction from '../Seller/Components/pages/Transaction/Transaction'

const SellerRoutes = () => {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/products' element={<Products />} />
        <Route path='/add-product' element={<AddProduct />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/account' element={<Profile />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/transaction' element={<Transaction />} />
      </Routes>
    </div>
  )
}

export default SellerRoutes