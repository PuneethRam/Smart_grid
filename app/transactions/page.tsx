"use client";

import { useState, useEffect } from "react";
import { Download, Wallet } from "lucide-react";
import ProtectedRoute from "../components/ProtectedRoute";
import { useWallet, Transaction } from "@/context/WalletContext";

export default function TransactionsPage() {
  const { fetchUserTransactions, isLoading: walletLoading } = useWallet();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setLoading(true);
        const userTransactions = await fetchUserTransactions();
        setTransactions(userTransactions);
      } catch (error) {
        console.error("Failed to load transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, [fetchUserTransactions]);

  // Determine if we're in a loading state
  const isPageLoading = loading || walletLoading;

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Transactions & Earnings</h1>
          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <Download className="w-5 h-5" />
              <span>Download Statement</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              <Wallet className="w-5 h-5" />
              <span>Withdraw Funds</span>
            </button>
          </div>
        </div>

        {/* Earnings Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Daily Earnings", amount: "₹39.60" },
            { label: "Weekly Earnings", amount: "₹245.50" },
            { label: "Monthly Earnings", amount: "₹982.00" },
          ].map((item, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
              <p className="text-2xl font-bold mt-1">{item.amount}</p>
            </div>
          ))}
        </div>

        {/* Transactions Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <h2 className="font-semibold">Your Transactions</h2> 
          </div>
          <div className="overflow-x-auto">
            {isPageLoading ? (
              <div className="p-6 text-center">Loading transactions...</div>
            ) : transactions.length === 0 ? (
              <div className="p-6 text-center">No transactions found</div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    {[
                      "Order ID",
                      "Type",
                      "Energy Amount",
                      "Price/kWh",
                      "Earnings",
                      "Status",
                      "Date",
                    ].map((header, index) => (
                      <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {transactions.map((transaction, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">{transaction.orderId}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          transaction.type === "Buy"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                        }`}>
                          {transaction.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{transaction.energySold} kWh</td>
                      <td className="px-6 py-4 whitespace-nowrap">₹{transaction.pricePerKwh}</td>
                      <td className="px-6 py-4 whitespace-nowrap">₹{transaction.earnings}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          transaction.status === "Completed"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : transaction.status === "Matched"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : transaction.status === "Open"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{transaction.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}