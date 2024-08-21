"use client";
import React from "react";

const ReportsPage = () => {
  // Sample data for demonstration
  const reports = [
    { id: 1, title: "Monthly Report", date: "August 2024", status: "Completed" },
    { id: 2, title: "Quarterly Report", date: "July 2024", status: "In Progress" },
  ];

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-red-600 mb-6">Reports</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white text-left">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-b">
                <td className="py-2 px-4">{report.title}</td>
                <td className="py-2 px-4">{report.date}</td>
                <td className="py-2 px-4 text-gray-700">{report.status}</td>
                <td className="py-2 px-4 flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800">View</button>
                  <button className="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsPage;
