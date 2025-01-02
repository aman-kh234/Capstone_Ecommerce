import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SellersTable from '../Admin/Pages/Sellers/SellersTable'
import Coupon from '../Admin/Pages/Coupon/Coupon'
import AddNewCouponForm from '../Admin/Pages/Coupon/AddNewCouponForm'
import UsersTable from '../Admin/Pages/Users/UsersTable'
import Account from '../Admin/Pages/Account/Account'
import ManageWallet from '../Admin/Pages/ManageWallet/ManageWallet'

 
const AdminRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<SellersTable />} />
            <Route path='/coupon' element={<Coupon />} />
            <Route path='/add-coupon' element={<AddNewCouponForm />} />
            <Route path='/customer' element={<UsersTable />} />
            <Route path='/account' element={<Account />} />
            <Route path='/manage-wallet' element={<ManageWallet />} />
          
        </Routes>
    </div>
  )
}
 
export default AdminRoutes