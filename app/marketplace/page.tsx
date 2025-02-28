"use client";

import React, { useState, useEffect } from 'react';
import { useWallet } from '@/context/WalletContext';
import { Order } from '@/types';
import OrderCard from '../components/OrderCard';
import CreateOrderModal from '../components/CreateOrderModal';
import { Plus, RefreshCw, Zap } from 'lucide-react';

export default function Marketplace() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { fetchOrders, isConnected, isLoading, account, connectWallet } = useWallet();

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
    <>
      {/* Header section with dark mode support */}
      <header className="bg-gradient-to-r from-green-600 to-teal-500 text-white shadow-md dark:shadow-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Zap size={28} className="text-yellow-300" />
            <h1 className="text-2xl font-bold">P2P Energy Marketplace</h1>
          </div>
          
          <button
            onClick={connectWallet}
            disabled={isLoading || isConnected}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isConnected
                ? 'bg-green-700 hover:bg-green-800'
                : 'bg-blue-600 hover:bg-blue-700'
            } disabled:opacity-70 disabled:cursor-not-allowed`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connecting...
              </span>
            ) : isConnected ? (
              <span className="flex items-center">
                Connected: {account?.substring(0, 6)}...{account?.substring(account?.length - 4)}
              </span>
            ) : (
              'Connect Wallet'
            )}
          </button>
        </div>
      </header>

      {/* Main marketplace content with dark mode support */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Available Energy Orders</h2>
          
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
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 dark:bg-yellow-900/30 dark:border-yellow-600 dark:text-yellow-200">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-yellow-700 dark:text-yellow-200">
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
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">No energy orders available</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Be the first to create a sell order on the marketplace!</p>
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
    </>
  );
}