'use client';
import { useState } from 'react';
import axios from 'axios';

interface PlannerProps {
  totalIncome: number;
  totalExpense: number;
}

export default function Planner({ totalIncome, totalExpense }: PlannerProps) {
  const [targetSavings, setTargetSavings] = useState(2000);
  const [days, setDays] = useState(30);
  const [result, setResult] = useState<{
    dailyBudget: number;
    overspendAlert: boolean;
    remainingSavings: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    if (!targetSavings || !days) return;

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/planner', {
        totalIncome,
        totalExpense,
        targetSavings,
        days,
      });
      setResult(res.data);
    } catch (err) {
      console.error('Error calculating planner:', err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 lg:px-10">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg text-gray-800">
        <h2 className="text-3xl font-bold mb-6 text-emerald-700">Set Your Savings Goal</h2>

      {/* Input Fields */}
      <div className="flex flex-col gap-6 mb-8">
        <div>
          <label className="block mb-2 font-medium text-gray-600">Target Savings (₹)</label>
          <input
            type="number"
            value={targetSavings}
            onChange={(e) => setTargetSavings(Number(e.target.value))}
            className="w-full p-4 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800"
            placeholder="Enter your target savings"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-600">Time Period (Days)</label>
          <input
            type="number"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full p-4 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800"
            placeholder="Enter time period in days"
          />
        </div>
      </div>

      {/* Calculate Button */}
      <button
        onClick={handleCalculate}
        disabled={loading}
        className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg transition-transform duration-200 transform hover:scale-105"
      >
        {loading ? 'Calculating...' : 'Calculate Daily Spending'}
      </button>

      {/* Result Card */}
      {result && (
        <div className="mt-8 p-6 rounded-2xl bg-emerald-50 border border-emerald-100 shadow-md">
          <p className="mb-3 text-lg">
            <span className="font-semibold text-emerald-700">Daily Allowance:</span> <span className="text-emerald-700 font-bold">₹{result.dailyBudget.toFixed(2)}</span>
          </p>
          <p className="mb-3 text-lg">
            <span className="font-semibold text-emerald-700">Remaining Savings:</span> <span className="text-gray-800 font-bold">₹{result.remainingSavings.toFixed(2)}</span>
          </p>
          {result.overspendAlert && (
            <p className="text-rose-600 font-semibold mt-4">Warning: You have overspent today!</p>
          )}
        </div>
      )}
      </div>
    </div>
  );
}
