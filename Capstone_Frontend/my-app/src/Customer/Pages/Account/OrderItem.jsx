import { ElectricBolt, CheckCircle, Cancel } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import axios from 'axios';

const OrderItem = ({ order, userToken }) => {

  // Cancel order handler
  const cancelOrder = (orderId) => {
    axios
      .put(`http://localhost:8080/api/orders/${orderId}/cancel`, {}, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then(() => {
        alert("Order canceled successfully!");
        window.location.reload();
      })
      .catch(() => {
        alert("Failed to cancel the order.");
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Define order status color classes
  const getStatusClass = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-200 text-yellow-800';
      case 'PLACED':
        return 'bg-blue-200 text-blue-800';
      case 'CONFIRMED':
        return 'bg-green-200 text-green-800';
      case 'SHIPPED':
        return 'bg-purple-200 text-purple-800';
      case 'DELIVERED':
        return 'bg-green-500 text-white';
      case 'CANCELLED':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-300 text-gray-800';
    }
  };

  return (
    <div className="bg-white border rounded-lg p-5 mb-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
      {/* Order Header */}
      <div className="flex items-center gap-4 mb-3">
        <Avatar sx={{ bgcolor: '#6a1b9a', width: 36, height: 36 }}>
          <ElectricBolt />
        </Avatar>
        <div className="flex flex-col">
          <h2 className={`font-semibold text-sm ${getStatusClass(order.orderStatus)} py-1 px-3 rounded-full`}>
            {order.orderStatus}
          </h2>

          {/* Only show 'Arriving By' if the order is not cancelled or delivered */}
          {order.orderStatus !== 'CANCELLED' && order.orderStatus !== 'DELIVERED' && (
            <p className="text-xs text-gray-600 mt-1">Arriving By {formatDate(order.deliverDate)}</p>
          )}

          {/* Show Ordered Date */}
          <p className="text-xs text-gray-600 mt-2">Ordered On: {formatDate(order.orderDate)}</p>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex gap-4 mb-3 items-center">
        <div>
          {order.orderItems && order.orderItems[0].product?.images?.length > 0 ? (
            <img
              className="w-[70px] h-[70px] object-cover rounded-md"
              src={order.orderItems[0].product.images[0]}
              alt="Product Image"
            />
          ) : (
            <img
              className="w-[70px] h-[70px] object-cover rounded-md"
              src="path/to/default-image.jpg"
              alt="Default Product"
            />
          )}
        </div>

        <div className="flex flex-col w-full">
          <h3 className="font-semibold text-lg text-gray-800">
            {order.orderItems && order.orderItems.length > 0 ? order.orderItems[0].product.title : 'Product Title Not Available'}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {order.orderItems && order.orderItems.length > 0 ? order.orderItems[0].product.description : 'Product Description Not Available'}
          </p>
          <p className="text-sm text-gray-500 mt-2"><strong>Size:</strong> {order.orderItems[0].size}</p>
        </div>
      </div>

      {/* Cancel Button */}
      {order.orderStatus === 'PENDING' && (
        <div className="flex justify-end">
          <button
            className="py-1 px-4 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
            onClick={() => cancelOrder(order.id)}
          >
            Cancel Order
          </button>
        </div>
      )}

      {/* Status Icons */}
      {order.orderStatus === 'DELIVERED' && <CheckCircle className="text-green-500 mt-2" />}
      {order.orderStatus === 'CANCELLED' && <Cancel className="text-red-500 mt-2" />}
    </div>
  );
};

export default OrderItem;
