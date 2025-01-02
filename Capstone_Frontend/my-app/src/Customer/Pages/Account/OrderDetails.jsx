import { Box, Button, Divider } from '@mui/material';
import PaymentsIcon from '@mui/icons-material/Payments';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import OrderStepper from './OrderStepper';

const OrderDetails = () => {
  const navigate = useNavigate();

  return (
    <Box className="space-y-5">
      <section className="flex flex-col gap-5 justify-center items-center">
        <img
          className="w-[100px] rounded-lg shadow-lg"
          src="https://images.unsplash.com/photo-1610189019383-606d9eaa6766?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fHNhcmVlfGVufDB8MXwwfHx8MA%3D%3D"
          alt="Product Image"
        />
        <div className="text-sm space-y-1 text-center">
          <h1 className="font-bold">{"Sahiba Clothing"}</h1>
          <p>
            Cellecor RAY 1.43" AMOLED Display | 700 NITS | AOD | BT-Calling | AI Voice | Split Screen Smartwatch (Black Strap, Free Size)
          </p>
          <p><strong>Size:</strong> M</p>
        </div>
        <Button onClick={() => navigate(`/reviews/${5}/create`)} variant="outlined" color="primary">
          Write Review
        </Button>
      </section>

      <section className="border p-5 rounded-lg">
        <OrderStepper orderStatus={"SHIPPED"} />
      </section>

      <section className="border p-5 rounded-lg mt-4">
        <h1 className="font-bold pb-3">Delivery Address</h1>
        <div className="text-sm space-y-2">
          <div className="flex gap-5 font-medium">
            <p>{"Aman"}</p>
            <Divider flexItem orientation="vertical" />
            <p>{1234567890}</p>
          </div>
          <p>Ambala, Haryana - 134003</p>
        </div>
      </section>

      <section className="border space-y-4 p-5 rounded-lg">
        <div className="flex justify-between text-sm">
          <div className="space-y-1">
            <p className="font-bold">Total Item Price</p>
            <p>
              You saved <span className="text-green-500 font-medium">$300</span> on this item
            </p>
          </div>
          <p className="font-medium">$3000</p>
        </div>
        <div className="px-5">
          <div className="bg-teal-50 px-5 py-2 text-xs font-medium flex items-center gap-3">
            <PaymentsIcon />
            <p>Pay On Delivery</p>
          </div>
        </div>
      </section>

      <Divider />

      <div className="px-5 pb-5">
        <p className="text-xs"><strong>Sold by: </strong>{`Sahiba Clothing`}</p>
      </div>

      <div className="p-10">
        <Button
          disabled={true}
          color="error"
          sx={{ py: "0.7rem" }}
          variant="outlined"
          fullWidth
        >
          {true ? "Order cancelled" : "Cancel Order"}
        </Button>
      </div>
    </Box>
  );
};

export default OrderDetails;
