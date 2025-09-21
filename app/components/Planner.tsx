'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Expense { id: number; amount: number; }
interface Income { id: number; amount: number; }

interface PlannerProps {
  totalIncome: number;
  totalExpense: number;
}

export default function PlannerPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [income, setIncome] = useState<Income[]>([]);
  const BACKEND_URL = 'http://localhost:5000';

  const loadData = async () => {
    try {
      const [expRes, incRes] = await Promise.all([
        axios.get<Expense[]>(`${BACKEND_URL}/expenses`),
        axios.get<Income[]>(`${BACKEND_URL}/income`),
      ]);
      setExpenses(expRes.data);
      setIncome(incRes.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { loadData(); }, []);

  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalIncome = income.reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="min-h-screen p-8 bg-white text-[#262626]">
      <h1 className="text-3xl font-bold mb-8 text-[#FF9900]">Savings Planner</h1>
      <Planner totalIncome={totalIncome} totalExpense={totalExpense} />
    </div>
  );
}

function Planner({ totalIncome, totalExpense }: PlannerProps) {
  const [targetSavings, setTargetSavings] = useState(2000);
  const [days, setDays] = useState(30);
  const [result, setResult] = useState<{ dailyBudget: number; overspendAlert: boolean; remainingSavings: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/planner', { totalIncome, totalExpense, targetSavings, days });
      setResult(res.data);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  return (
    <div className="max-w-md p-6 rounded-2xl shadow-lg bg-gray-50">
      <div className="flex flex-col gap-6 mb-6">
        <div>
          <label className="block mb-2 font-medium text-gray-600">Target Savings (₹)</label>
          <input type="number" value={targetSavings} onChange={(e) => setTargetSavings(Number(e.target.value))} className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF9900]" />
        </div>
        <div>
          <label className="block mb-2 font-medium text-gray-600">Time Period (Days)</label>
          <input type="number" value={days} onChange={(e) => setDays(Number(e.target.value))} className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF9900]" />
        </div>
      </div>
      <button onClick={handleCalculate} disabled={loading} className="w-full py-3 rounded-xl font-semibold transition-transform duration-200 transform hover:scale-105 bg-[#FF9900] text-white">
        {loading ? 'Calculating...' : 'Calculate Daily Spending'}
      </button>
      {result && (
        <div className="mt-6 p-6 rounded-lg bg-white border border-gray-200">
          <p className="text-lg mb-2"><span className="font-semibold text-[#FF9900]">Daily Allowance:</span> <span className="text-green-600 font-bold">₹{result.dailyBudget.toFixed(2)}</span></p>
          <p className="text-lg"><span className="font-semibold text-[#FF9900]">Remaining Savings:</span> <span className="text-gray-800 font-bold">₹{result.remainingSavings.toFixed(2)}</span></p>
          {result.overspendAlert && <p className="text-red-500 font-semibold mt-4">Warning: You have overspent today!</p>}
        </div>
      )}
    </div>
  );
}