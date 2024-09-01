"use client";
import React, { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FiDollarSign } from "react-icons/fi";
import { FaMoneyBillWave, FaMobileAlt, FaUniversity, FaCalendarDay, FaCalendarWeek, FaCalendarAlt } from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartPage = () => {
  const { data: addedMoneyDetails = [], loading: addedLoading } = useFetch("/fund-received");
  const [categorizedData, setCategorizedData] = useState({
    cash: 0,
    bkash: 0,
    dbbl: 0,
    nagad: 0,
    total: 0,
  });
  const [timeBasedCollections, setTimeBasedCollections] = useState({
    today: 0,
    week: 0,
    month: 0,
  });

  useEffect(() => {
    if (!addedLoading && Array.isArray(addedMoneyDetails)) {
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday as the start of the week
      startOfWeek.setHours(0, 0, 0, 0); // Set start of the day

      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      startOfMonth.setHours(0, 0, 0, 0); // Set start of the day

      const categories = { cash: 0, bkash: 0, dbbl: 0, nagad: 0 };
      const timeCollections = { today: 0, week: 0, month: 0 };

      addedMoneyDetails.forEach((record) => {
        const account = record?.account?.toLowerCase();
        const amount = parseFloat(record?.amount);
        const date = new Date(record?.timeReceived);

        if (account && categories.hasOwnProperty(account) && !isNaN(amount)) {
          categories[account] += amount;

          const recordDate = new Date(date);
          recordDate.setHours(0, 0, 0, 0); // Normalize date to start of the day

          if (recordDate.toDateString() === today.toDateString()) {
            timeCollections.today += amount;
          }
          if (recordDate >= startOfWeek && recordDate <= today) {
            timeCollections.week += amount;
          }
          if (recordDate >= startOfMonth && recordDate <= today) {
            timeCollections.month += amount;
          }
        }
      });

      const total = Object.values(categories).reduce((acc, curr) => acc + curr, 0);
      setCategorizedData({ ...categories, total });
      setTimeBasedCollections(timeCollections);
    }
  }, [addedLoading, addedMoneyDetails]);

  const formatCurrency = (amount) => {
    return amount?.toLocaleString("en-US", { style: "currency", currency: "BDT" });
  };

  const chartData = {
    labels: ["Cash", "bKash", "DBBL", "Nagad"],
    datasets: [
      {
        label: "Fund Collections",
        data: [categorizedData.cash, categorizedData.bkash, categorizedData.dbbl, categorizedData.nagad],
        backgroundColor: ["#36a2eb", "#ff6384", "#ffcd56", "#4bc0c0"],
        hoverBackgroundColor: ["#36a2eb", "#ff6384", "#ffcd56", "#4bc0c0"],
        borderRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Fund Collection by Payment Method",
        font: {
          size: 18,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => formatCurrency(value),
        },
      },
    },
  };

  return (
    <div className="bg-gray-100 text-gray-800 p-4 mx-auto max-w-screen-xl">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Fund Statistics</h1>
      </header>

      <div className="flex flex-wrap justify-between gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md flex-1">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Total Collections</h2>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 bg-blue-100 p-4 rounded-lg shadow-md mb-4 flex items-center">
              <FaMoneyBillWave className="text-blue-500 text-2xl mr-2" />
              <div>
                <h3 className="text-xl font-bold">Cash</h3>
                <p className="text-lg text-gray-700">{formatCurrency(categorizedData.cash)}</p>
              </div>
            </div>

            <div className="flex-1 bg-pink-100 p-4 rounded-lg shadow-md mb-4 flex items-center">
              <FaMobileAlt className="text-pink-500 text-2xl mr-2" />
              <div>
                <h3 className="text-xl font-bold">bKash</h3>
                <p className="text-lg text-gray-700">{formatCurrency(categorizedData.bkash)}</p>
              </div>
            </div>

            <div className="flex-1 bg-yellow-100 p-4 rounded-lg shadow-md mb-4 flex items-center">
              <FaUniversity className="text-yellow-500 text-2xl mr-2" />
              <div>
                <h3 className="text-xl font-bold">DBBL</h3>
                <p className="text-lg text-gray-700">{formatCurrency(categorizedData.dbbl)}</p>
              </div>
            </div>

            <div className="flex-1 bg-teal-100 p-4 rounded-lg shadow-md mb-4 flex items-center">
              <FaUniversity className="text-teal-500 text-2xl mr-2" />
              <div>
                <h3 className="text-xl font-bold">Nagad</h3>
                <p className="text-lg text-gray-700">{formatCurrency(categorizedData.nagad)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md flex-1">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Funds Collection Chart</h2>
          <div className="w-full h-64">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Time-Based Collections</h2>
        <div className="flex flex-wrap gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md flex-1">
            <h3 className="text-xl font-bold mb-2">Today</h3>
            <p className="text-lg text-gray-700">{formatCurrency(timeBasedCollections.today)}</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md flex-1">
            <h3 className="text-xl font-bold mb-2">This Week</h3>
            <p className="text-lg text-gray-700">{formatCurrency(timeBasedCollections.week)}</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md flex-1">
            <h3 className="text-xl font-bold mb-2">This Month</h3>
            <p className="text-lg text-gray-700">{formatCurrency(timeBasedCollections.month)}</p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ChartPage;
