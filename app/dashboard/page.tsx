"use client";

import { JSX, useEffect, useState } from "react";
import { Bell, Sun, Battery, ArrowUpRight } from "lucide-react";
import { db, auth } from "@/lib/firebase"; // Adjust the import path based on your project structure
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

interface Order {
  id: string;
  amount: number;
  price: number;
  status: string;
}

export default function DashboardPage() {
  const [activeOrders, setActiveOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async (userId: string) => {
      try {
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        const orders: Order[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          amount: doc.data().amount,
          price: doc.data().price,
          status: doc.data().status,
        }));

        setActiveOrders(orders);
      } catch (err) {
        setError("Failed to fetch orders. Please try again.");
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    // Listen for auth state change
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user); // Check user details
        fetchOrders(user.uid);
      } else {
        setLoading(false);
        setError("User not authenticated.");
      }
    });
    

    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Prosumer Dashboard</h1>
        <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>

      {/* Live Energy Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon={<Sun className="w-6 h-6 text-yellow-500" />} title="Generation" value="5.2 kWh" trend="↑ 12% from yesterday" />
        <StatCard icon={<Battery className="w-6 h-6 text-blue-500" />} title="Consumption" value="3.8 kWh" trend="↑ 5% from yesterday" />
        <StatCard icon={<ArrowUpRight className="w-6 h-6 text-green-500" />} title="Grid Export" value="1.4 kWh" trend="↑ 8% from yesterday" />
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Orders */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Active Orders</h3>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Create Order
            </button>
          </div>

          {loading ? (
            <p>Loading orders...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : activeOrders.length === 0 ? (
            <p>No active orders found.</p>
          ) : (
            <div className="space-y-4">
              {activeOrders.map((order) => (
                <div key={order.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium">Order #{order.id.slice(-4)}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {order.amount} kWh @ ₹{order.price}/kWh
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Market Insights */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold mb-4">Market Insights</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p>Current Price</p>
              <p className="text-2xl font-bold">₹5.8/kWh</p>
            </div>
            <div className="flex justify-between items-center">
              <p>Demand Level</p>
              <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                High
              </span>
            </div>
            <div className="flex justify-between items-center">
              <p>Today's Earnings</p>
              <p className="text-2xl font-bold">₹245.50</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 🏷️ Reusable Component for Stats
function StatCard({ icon, title, value, trend }: { icon: JSX.Element; title: string; value: string; trend: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
      <div className="flex items-center space-x-3">{icon} <h3 className="font-semibold">{title}</h3></div>
      <p className="text-3xl font-bold mt-2">{value}</p>
      <p className="text-green-500 text-sm">{trend}</p>
    </div>
  );
}
