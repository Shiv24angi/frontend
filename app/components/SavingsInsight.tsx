'use client';
interface SavingsInsightProps { totalIncome: number; totalExpense: number; }

export default function SavingsInsight({ totalIncome, totalExpense }: SavingsInsightProps) {
  const savings = totalIncome - totalExpense;

  return (
    <div className="card text-[#0F172A]">
      <h2 className="text-xl font-bold mb-4 text-emerald-700">Savings Insight</h2>
      <p className="text-lg font-semibold">
        {savings >= 0
          ? <span className="text-emerald-600">Great! You have saved ₹{savings} this period.</span>
          : <span className="text-rose-600">You have overspent by ₹{-savings}.</span>}
      </p>
    </div>
  );
}
