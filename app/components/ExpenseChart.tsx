'use client';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Expense { id: number; amount: number; category: string; }
interface Props { expenses: Expense[]; }

export default function ExpenseChart({ expenses }: Props) {
  const dataMap: { [key: string]: number } = {};
  expenses.forEach((e) => {
    if (e.category) dataMap[e.category] = (dataMap[e.category] || 0) + e.amount;
  });

  const data = {
    labels: Object.keys(dataMap),
    datasets: [
      {
        data: Object.values(dataMap),
        backgroundColor: [
          '#FFC700', // Yellow
          '#FF9900', // Orange
          '#FF6B6B', // Light Red
          '#60A5FA', // Blue
          '#34D399', // Green
          '#9A70FF', // Lavender
          '#F87171', // Red
        ],
      },
    ],
  };

  if (!Object.keys(dataMap).length)
    return <p className="text-gray-400 text-center mt-12">No expenses to show</p>;

  return (
    <div style={{ height: '250px', maxWidth: '300px', margin: '0 auto' }}>
      <Pie data={data} />
    </div>
  );
}