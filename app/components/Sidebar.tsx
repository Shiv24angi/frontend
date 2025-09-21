'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const path = usePathname();
  const links = [
    { name: 'Dashboard', href: '/' },
    { name: 'Add Expense', href: '/add-expense' },
    { name: 'Add Income', href: '/add-income' },
    { name: 'Planner', href: '/planner' },
    { name: 'Expenses', href: '/expenses' }
  ];

  return (
    <div className="w-64 h-screen p-8 flex flex-col bg-[#1F1F1F] text-white shadow-xl">
      <h1 className="text-4xl font-extrabold mb-10 text-[#FFC700] tracking-wide">Tracker</h1>
      <nav className="flex flex-col gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-4 py-4 px-6 rounded-xl font-semibold text-lg transition-transform duration-200 transform hover:scale-105 ${
              path === link.href
                ? 'bg-[#FF9900] text-[#262626] shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}