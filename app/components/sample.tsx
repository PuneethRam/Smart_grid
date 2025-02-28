"use client";

import { useState } from "react";

export default function CreateOrderPage() {
  const [energyAmount, setEnergyAmount] = useState<number>(5);
  const [pricePerKwh, setPricePerKwh] = useState<number>(5.8);
  const [timeWindow, setTimeWindow] = useState<string>("14:00-18:00");

  const estimatedEarnings = (energyAmount * pricePerKwh).toFixed(2);

  const handleOrderCreation = () => {
    alert("Order created successfully!");
    // Here you would typically send the order to your backend
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Create Sell Order</h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm space-y-6">
        {/* Energy Amount Slider */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Energy Amount (kWh)
          </label>
          <input
            type="range"
            min="0.5"
            max="100"
            step="0.5"
            value={energyAmount}
            onChange={(e) => setEnergyAmount(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <p className="mt-2 text-2xl font-bold">{energyAmount} kWh</p>
        </div>

        {/* Price Per kWh */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Price per kWh (₹)
          </label>
          <input
            type="number"
            value={pricePerKwh}
            onChange={(e) => setPricePerKwh(parseFloat(e.target.value))}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
            step="0.1"
          />
          <p className="mt-1 text-sm text-gray-500">Market rate: ₹5.8/kWh</p>
        </div>

        {/* Time Window Dropdown */}
        <div>
          <label className="block text-sm font-medium mb-2">Buy/Sell</label>
          <div className="flex space-x-2">
            <button
              className={`w-full p-2 rounded-lg text-white border-2 ${
                timeWindow === "Buy"
                  ? "bg-green-600 border-green-800"
                  : "bg-green-400 border-transparent"
              }`}
              onClick={() => setTimeWindow("Buy")}
            >
              Buy
            </button>
            <button
              className={`w-full p-2 rounded-lg text-white border-2 ${
                timeWindow === "Sell"
                  ? "bg-red-600 border-red-800"
                  : "bg-red-400 border-transparent"
              }`}
              onClick={() => setTimeWindow("Sell")}
            >
              Sell
            </button>
          </div>
        </div>



        {/* Estimated Earnings */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/50 rounded-lg">
          <h3 className="font-medium mb-2">Estimated Earnings</h3>
          <p className="text-3xl font-bold">₹{estimatedEarnings}</p>
        </div>

        {/* Create Order Button */}
        <button
          onClick={handleOrderCreation}
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Create Order
        </button>
      </div>
    </div>
  );
}
