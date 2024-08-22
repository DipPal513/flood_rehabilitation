// components/SpendMoneyTable.js
import React from "react";
import { MdDonate } from "react-icons/md";

const spendData = [
  { id: 1, category: "Food", amount: "$50", date: "2024-08-20" },
  { id: 2, category: "Transport", amount: "$20", date: "2024-08-19" },
  { id: 3, category: "Entertainment", amount: "$30", date: "2024-08-18" },
  { id: 4, category: "Utilities", amount: "$100", date: "2024-08-17" },
];

const SpendMoneyTable = () => {
  return (
    <section className="max-w-screen-xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Spending Summary</h2>
        <button className="flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
          <MdDonate className="mr-2 text-lg" />
          Donate
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {spendData.map((spend) => (
              <tr key={spend.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {spend.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {spend.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {spend.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {spend.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default SpendMoneyTable;
