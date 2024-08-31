"use client";
import React, { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  ArcElement,
  PointElement,
} from "chart.js";

// Register the necessary Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  ArcElement,
  PointElement
);

const ChartPage = () => {
  const {
    data: addedMoneyDetails = [],
    loading: addedLoading,
    error: addedError,
  } = useFetch("/fund-received");

  const {
    data: spendMoneyDetails = [],
    loading: spendLoading,
    error: spendError,
  } = useFetch("/fund-sent");

  const [chartData, setChartData] = useState({
    daily: { labels: [], datasets: [] },
    weekly: { labels: [], datasets: [] },
    monthly: { labels: [], datasets: [] },
  });

  useEffect(() => {
    if (!addedLoading && !spendLoading) {
      console.log("Added Money Details:", addedMoneyDetails);
      console.log("Spent Money Details:", spendMoneyDetails);

      const processData = () => {
        const dailyData = getStatistics(addedMoneyDetails, spendMoneyDetails, 'day');
        const weeklyData = getStatistics(addedMoneyDetails, spendMoneyDetails, 'week');
        const monthlyData = getStatistics(addedMoneyDetails, spendMoneyDetails, 'month');
        
        setChartData({
          daily: dailyData,
          weekly: weeklyData,
          monthly: monthlyData,
        });
      };

      processData();
    }
  }, [addedLoading, spendLoading, addedMoneyDetails, spendMoneyDetails]);

  const getStatistics = (addedData, spentData, period) => {
    // Initialize labels and data arrays
    const labels = [];
    const addedMoneyData = [];
    const spentMoneyData = [];

    // Helper function to group and calculate data based on period
    const processData = (data) => {
      return data.reduce((acc, record) => {
        const date = new Date(record.date); // Adjust based on your data structure
        const key = period === 'day' ? `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` :
          period === 'week' ? `${date.getFullYear()}-W${getWeekNumber(date)}` :
          `${date.getFullYear()}-${date.getMonth() + 1}`; // Monthly grouping
          
        if (!acc[key]) acc[key] = 0;
        acc[key] += record.amount;
        return acc;
      }, {});
    };

    // Function to get the week number
    const getWeekNumber = (date) => {
      const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
      const days = Math.floor((date - firstDayOfYear) / (24 * 60 * 60 * 1000));
      return Math.ceil((days + firstDayOfYear.getDay() + 1) / 7);
    };

    // Process added and spent data
    const addedDataProcessed = processData(addedData);
    const spentDataProcessed = processData(spentData);

    // Populate labels and datasets
    for (const [key, value] of Object.entries(addedDataProcessed)) {
      labels.push(key);
      addedMoneyData.push(value);
      spentMoneyData.push(spentDataProcessed[key] || 0);
    }

    return {
      labels,
      datasets: [
        {
          label: 'Added Money',
          data: addedMoneyData,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          label: 'Spent Money',
          data: spentMoneyData,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div className="max-w-screen-xl mx-auto sm:p-6 p-2">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-red-600 mb-4">Fund Statistics</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-4">Daily Statistics</h2>
          <Line
            data={chartData.daily}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Daily Added vs Spent Money',
                },
              },
            }}
          />
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-4">Weekly Statistics</h2>
          <Bar
            data={chartData.weekly}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Weekly Added vs Spent Money',
                },
              },
            }}
          />
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-4">Monthly Statistics</h2>
          <Pie
            data={chartData.monthly}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Monthly Added vs Spent Money',
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartPage;
