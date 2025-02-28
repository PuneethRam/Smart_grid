"use client";

import React, { useState, useEffect } from 'react';
import { useWallet } from '@/context/WalletContext';
import { Order } from '@/types';
import OrderCard from '../components/OrderCard';
import CreateOrderModal from '../components/CreateOrderModal';
import { Plus, RefreshCw } from 'lucide-react';

const Marketplace: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { fetchOrders, isConnected, isLoading } = useWallet();

  const loadOrders = async () => {
    if (!isConnected) return;
    
    setIsRefreshing(true);
    const fetchedOrders = await fetchOrders();
    setOrders(fetchedOrders);
    setIsRefreshing(false);
  };

  useEffect(() => {
    if (isConnected) {
      loadOrders();
    }
  }, [isConnected]);

  const handleOrderUpdate = () => {
    loadOrders();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Available Energy Orders</h2>
        
        <div className="flex space-x-3">
          <button
            onClick={loadOrders}
            disabled={isRefreshing || !isConnected}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <RefreshCw size={16} className={`mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>
      
      {!isConnected ? (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Please connect your wallet to view and interact with energy orders.
              </p>
            </div>
          </div>
        </div>
      ) : isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h3 className="text-lg font-medium text-gray-700 mb-2">No energy orders available</h3>
          <p className="text-gray-500 mb-6">Be the first to create a sell order on the marketplace!</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <Plus size={16} className="mr-2" />
            Create Sell Order
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map(order => (
            <OrderCard key={order.id} order={order} onOrderUpdate={handleOrderUpdate} />
          ))}
        </div>
      )}
      
      <div className="fixed bottom-6 right-6">
        <button
          onClick={() => setIsModalOpen(true)}
          disabled={!isConnected}
          className="flex items-center justify-center h-14 w-14 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 disabled:opacity-70 disabled:cursor-not-allowed"
          title="Create Sell Order"
        >
          <Plus size={24} />
        </button>
      </div>
      
      <CreateOrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onOrderCreated={handleOrderUpdate}
      />
    </div>
  );
};

export default Marketplace;