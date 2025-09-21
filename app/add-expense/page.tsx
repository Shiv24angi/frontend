'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Expense {
  id: number;
  amount: number;
  merchant: string;
  category: string;
  date: string;
  notes: string;
}

export default function AddExpense() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [form, setForm] = useState({ amount: '', merchant: '', category: '', date: '', notes: '' });
  const BACKEND_URL = 'http://localhost:5000';

  const loadExpenses = async () => {
    try {
      const res = await axios.get<Expense[]>(`${BACKEND_URL}/expenses`);
      setExpenses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { loadExpenses(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${BACKEND_URL}/expenses`, form);
      setForm({ amount: '', merchant: '', category: '', date: '', notes: '' });
      loadExpenses();
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id: number) => {
    try { await axios.delete(`${BACKEND_URL}/expenses/${id}`); loadExpenses(); } catch (err) { console.error(err); }
  };

  const handleDeleteAll = async () => {
    if (!confirm("Are you sure you want to delete ALL expenses?")) return;
    try { await axios.delete(`${BACKEND_URL}/expenses`); loadExpenses(); } catch (err) { console.error(err); }
  };

  return (
    <div className="p-8 min-h-screen bg-white text-[#262626]">
      <h1 className="text-3xl font-bold mb-8 text-[#FF9900]">Add Expense</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 rounded-2xl shadow-lg max-w-md mb-8 bg-gray-50">
        <input type="number" placeholder="Amount" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} className="mb-4 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF9900]" required />
        <input type="text" placeholder="Merchant" value={form.merchant} onChange={e => setForm({ ...form, merchant: e.target.value })} className="mb-4 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF9900]" />
        <input type="text" placeholder="Category (optional)" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="mb-4 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF9900]" />
        <input type="date" placeholder="Date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="mb-4 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF9900]" required />
        <input type="text" placeholder="Notes" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} className="mb-4 p-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF9900]" />
        <button type="submit" className="w-full px-6 py-3 rounded-xl font-semibold transition-transform duration-200 transform hover:scale-105 bg-[#FF9900] text-white">Add Expense</button>
      </form>

      {/* Delete All & Expense List Container */}
      <div className="max-w-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Recent Expenses</h2>
          <button onClick={handleDeleteAll} className="px-4 py-2 rounded-xl text-sm font-medium transition-transform duration-200 transform hover:scale-105 bg-red-500 text-white">Delete All</button>
        </div>

        {/* Expense List */}
        <div className="p-6 rounded-2xl shadow-lg bg-gray-50">
          {expenses.length === 0 ? (
            <p className="text-center text-gray-400">No expenses added yet.</p>
          ) : (
            <ul className="space-y-4">
              {expenses.map(exp => (
                <li key={exp.id} className="flex justify-between items-center p-4 rounded-lg bg-white border border-gray-200 transition-transform duration-200 transform hover:scale-[1.01] hover:shadow-md">
                  <div className="flex-1 space-y-1">
                    <p className="font-semibold text-lg">{exp.category || "Uncategorized"}</p>
                    <p className="text-sm text-gray-500">{exp.merchant} - {exp.date}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-xl font-bold text-red-500">-₹{exp.amount}</span>
                    <button onClick={() => handleDelete(exp.id)} className="px-3 py-1 rounded-lg text-xs font-medium bg-red-100 text-red-600 transition-colors hover:bg-red-200">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}