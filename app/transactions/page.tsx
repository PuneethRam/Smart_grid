"use client";

import { useState } from "react";
import { Download, Wallet } from "lucide-react";

export default function TransactionsPage() {
  const [transactions] = useState([
    { orderId: "#125", energySold: 2.5, pricePerKwh: 5.2, earnings: 13, status: "Completed", date: "2024-03-15" },
    { orderId: "#124", energySold: 1.8, pricePerKwh: 5.0, earnings: 9, status: "Completed", date: "2024-03-14" },
    { orderId: "#123", energySold: 3.2, pricePerKwh: 5.5, earnings: 17.6, status: "Pending", date: "2024-03-14" },
  ]);

  return (
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
          <h2 className="font-semibold">Recent Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {[
                  "Order ID",
                  "Energy Sold",
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
                  <td className="px-6 py-4 whitespace-nowrap">{transaction.energySold} kWh</td>
                  <td className="px-6 py-4 whitespace-nowrap">₹{transaction.pricePerKwh}</td>
                  <td className="px-6 py-4 whitespace-nowrap">₹{transaction.earnings}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      transaction.status === "Completed"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
