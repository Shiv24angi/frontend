'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Expense {
  id: number;
  amount: number;
  category: string;
  merchant?: string;
  date?: string;
  notes?: string;
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const BACKEND_URL = 'http://localhost:5000';

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const res = await axios.get<Expense[]>(`${BACKEND_URL}/expenses`);
        setExpenses(res.data);
      } catch (err) { console.error(err); }
    };
    loadExpenses();
  }, []);

  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="min-h-screen p-8 bg-white text-[#262626]">
      <h1 className="text-3xl font-bold mb-6 text-[#FF9900]">
        Expense Breakdown
      </h1>

      <div className="mb-8 p-6 rounded-2xl shadow-lg bg-gray-50">
        <p className="text-2xl font-bold text-red-600">
          Total Expense: ₹{totalExpense}
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl shadow-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-[#FFC700] text-white">
              <th className="py-4 px-6 text-left font-bold text-[#262626] rounded-tl-2xl">Date</th>
              <th className="py-4 px-6 text-left font-bold text-[#262626]">Merchant</th>
              <th className="py-4 px-6 text-left font-bold text-[#262626]">Category</th>
              <th className="py-4 px-6 text-right font-bold text-[#262626]">Amount (₹)</th>
              <th className="py-4 px-6 text-left font-bold text-[#262626] rounded-tr-2xl">Notes</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp, index) => (
              <tr key={exp.id} className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <td className="py-4 px-6">{exp.date || '-'}</td>
                <td className="py-4 px-6">{exp.merchant || '-'}</td>
                <td className="py-4 px-6">{exp.category}</td>
                <td className="py-4 px-6 text-right font-semibold text-red-500">{exp.amount}</td>
                <td className="py-4 px-6">{exp.notes || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}