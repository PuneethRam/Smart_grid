import React from 'react';
import { Order, OrderType } from '@/types';
import { useWallet } from '@/context/WalletContext';
import { Zap, User, DollarSign } from 'lucide-react';

interface OrderCardProps {
  order: Order;
  onOrderUpdate: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onOrderUpdate }) => {
  const { directPurchase, cancelOrder, account, isLoading } = useWallet();
  const isOwner = order.user.toLowerCase() === account?.toLowerCase();

  const handleBuy = async () => {
    await directPurchase(order.id);
    onOrderUpdate();
  };

  const handleCancel = async () => {
    await cancelOrder(order.id);
    onOrderUpdate();
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="bg-gradient-to-r from-teal-500 to-green-500 px-4 py-2 text-white font-semibold flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Zap size={18} className="text-yellow-300" />
          <span>Order #{order.id}</span>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs ${
          order.orderType === OrderType.SELL ? 'bg-green-700' : 'bg-blue-700'
        }`}>
          {OrderType[order.orderType]}
        </span>
      </div>
      
      <div className="p-4">
        <div className="mb-4 space-y-2">
          <div className="flex items-center text-gray-700">
            <User size={16} className="mr-2" />
            <span className="text-sm">
              {isOwner ? 'Your Order' : `${order.user.substring(0, 6)}...${order.user.substring(order.user.length - 4)}`}
            </span>
          </div>
          
          <div className="flex items-center text-gray-700">
            <Zap size={16} className="mr-2" />
            <span className="text-sm font-medium">{order.amount} kWh</span>
          </div>
          
          <div className="flex items-center text-gray-700">
            <DollarSign size={16} className="mr-2" />
            <span className="text-sm font-medium">{order.price/1000000000000000000} ENGT per kWh</span>
          </div>
          
          <div className="text-gray-700">
            <span className="text-sm font-medium">Total: {(order.amount * (order.price/1000000000000000000)).toFixed(2)} ENGT</span>
          </div>
        </div>
        
        {order.orderType === OrderType.SELL && !isOwner ? (
          <button
            onClick={handleBuy}
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing...' : 'Buy Energy'}
          </button>
        ) : isOwner ? (
          <button
            onClick={handleCancel}
            disabled={isLoading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing...' : 'Cancel Order'}
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default OrderCard;