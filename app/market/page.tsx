"use client";

import { useState } from "react";
import { TrendingUp, Users, Clock } from "lucide-react";

export default function MarketPage() {
  const [recentOrders, setRecentOrders] = useState([
    { user: "User A", amount: "10 kWh", price: "₹5.9", time: "5 mins ago" },
    { user: "User B", amount: "5 kWh", price: "₹5.8", time: "12 mins ago" },
    { user: "User C", amount: "8 kWh", price: "₹5.7", time: "25 mins ago" },
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Market Insights & Grid Stats</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Current Price */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Current Price</p>
              <p className="text-3xl font-bold mt-1">₹5.8/kWh</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
          <p className="text-sm text-green-500 mt-2">↑ 3% from yesterday</p>
        </div>

        {/* Grid Demand */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Grid Demand</p>
              <p className="text-3xl font-bold mt-1">High</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
          <p className="text-sm text-gray-500 mt-2">Peak hours: 2 PM - 6 PM</p>
        </div>

        {/* Price Prediction */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Price Prediction</p>
              <p className="text-3xl font-bold mt-1">₹6.2/kWh</p>
            </div>
            <Clock className="w-8 h-8 text-purple-500" />
          </div>
          <p className="text-sm text-purple-500 mt-2">Expected in next 4 hours</p>
        </div>
      </div>

      {/* Market Orders & Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Market Orders */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <h2 className="font-semibold mb-4">Recent Market Orders</h2>
          <div className="space-y-4">
            {recentOrders.map((order, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium">{order.user}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {order.amount} @ {order.price}
                  </p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {order.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Price Trends */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <h2 className="font-semibold mb-4">Price Trends (Last 7 Days)</h2>
          <div className="h-64 flex items-center justify-center">
            <p className="text-gray-500">Price trend chart will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
