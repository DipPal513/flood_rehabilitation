"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  FiPlusCircle,
  FiDollarSign,
  FiUser,
  FiPieChart,
  FiSettings,
  FiMenu,
  FiX,
} from "react-icons/fi";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <aside
        className={`bg-red-600 md:relative fixed  text-white h-full  transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }   w-64 z-40 md:translate-x-0`}
      >
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          </div>
          <ul className="mt-6 space-y-2">
            <li>
              <Link href={"/dashboard/addmoney"} className="w-full flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-red-700 transition">
                <FiPlusCircle className="w-5 h-5" />
                <span>Add Money</span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/spendmoney" className="w-full flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-red-700 transition">
                <FiDollarSign className="w-5 h-5" />
                <span>Spend Money</span>
              </Link>
            </li>
            <li>
              <Link href={'/dashboard/users'} className="w-full flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-red-700 transition">
                <FiUser className="w-5 h-5" />
                <span>User Management</span>
              </Link>
            </li>
            <li>
              <Link href={"/dashboard/reports"} className="w-full flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-red-700 transition">
                <FiPieChart className="w-5 h-5" />
                <span>Reports</span>
              </Link>
            </li>
            <li>
              <Link href={"/dashboard/settings"} className="w-full flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-red-700 transition">
                <FiSettings className="w-5 h-5" />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Sidebar toggle button */}
        <button
          onClick={toggleSidebar}
          className="absolute right-0 top-0 transform translate-x-full bg-red-600 text-white p-2 rounded-r-md"
        >
          {isSidebarOpen ? (
            <FiX className="w-6 h-6" />
          ) : (
            <FiMenu className="w-6 h-6" />
          )}
        </button>
      </aside>
    </div>
  );
};

export default Sidebar;
