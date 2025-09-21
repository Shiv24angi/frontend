'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import ExpenseChart from './components/ExpenseChart';
import SavingsInsight from './components/SavingsInsight';

interface Expense { id: number; amount: number; category: string; }
interface Income { id: number; amount: number; }

export default function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [income, setIncome] = useState<Income[]>([]);
  const BACKEND_URL = 'http://localhost:5000';

  const loadData = async () => {
    try {
      const [expRes, incRes] = await Promise.all([
        axios.get<Expense[]>(`${BACKEND_URL}/expenses`),
        axios.get<Income[]>(`${BACKEND_URL}/income`)
      ]);
      setExpenses(expRes.data);
      setIncome(incRes.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { loadData(); }, []);

  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalIncome = income.reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="flex min-h-screen bg-white text-[#262626]">
      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8 text-[#FF9900]">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Total Income Card */}
          <div className="p-6 rounded-2xl shadow-lg bg-gray-50">
            <h2 className="font-semibold mb-2 text-gray-600">Total Income</h2>
            <p className="text-3xl font-extrabold text-green-600">₹{totalIncome}</p>
          </div>

          {/* Total Expense Card */}
          <div className="p-6 rounded-2xl shadow-lg bg-gray-50">
            <h2 className="font-semibold mb-2 text-gray-600">Total Expense</h2>
            <p className="text-3xl font-extrabold text-red-600">₹{totalExpense}</p>
          </div>

          {/* Savings Card */}
          <div className="p-6 rounded-2xl shadow-lg bg-gray-50">
            <h2 className="font-semibold mb-2 text-gray-600">Savings</h2>
            <p className="text-3xl font-extrabold text-[#FFC700]">₹{totalIncome - totalExpense}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Expense Chart */}
          <div className="p-6 rounded-2xl shadow-lg bg-gray-50 flex-grow">
            <h2 className="text-xl font-bold mb-4 text-[#FF9900]">Expenses by Category</h2>
            <ExpenseChart expenses={expenses} />
          </div>

          {/* Savings Insight */}
          <div className="p-6 rounded-2xl shadow-lg bg-gray-50 flex-grow">
            <SavingsInsight totalIncome={totalIncome} totalExpense={totalExpense} />
          </div>
        </div>
      </main>
    </div>
  );
}