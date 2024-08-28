"use client";
import React, { useState } from "react";
import { format, parseISO, isToday, isThisWeek, isThisMonth, isThisYear } from "date-fns";
import useFetch from "@/hooks/useFetch";

const FundPage = () => {
  // Fetch added money details
  const {
    data: addedMoneyDetails,
    loading: addedLoading,
    error: addedError,
  } = useFetch("/fund-received");

  // Fetch spent money details
  const {
    data: spendMoneyDetails,
    loading: spendLoading,
    error: spendError,
  } = useFetch("/fund-sent");

  // Calculate current money
  const currentMoney =
    (addedMoneyDetails?.reduce(
      (sum, record) => sum + Number(record.amount),
      0
    ) || 0) -
    (spendMoneyDetails?.reduce(
      (sum, record) => sum + Number(record.amount),
      0
    ) || 0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("all");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="animate-pulse space-y-4">
      <div className="h-6 bg-gray-200 rounded"></div>
      <div className="h-6 bg-gray-200 rounded"></div>
      <div className="h-6 bg-gray-200 rounded"></div>
    </div>
  );

  // Filter and sort data based on search query and sortBy
  const filterData = (data) => {
    return data
      ?.filter((record) =>
        record?.donor?.toLowerCase().includes(searchQuery.toLowerCase())
      )
      ?.filter((record) => {
        const recordDate = parseISO(record.timeReceived);
        switch (sortBy) {
          case "today":
            return isToday(recordDate);
          case "thisWeek":
            return isThisWeek(recordDate);
          case "thisMonth":
            return isThisMonth(recordDate);
          case "thisYear":
            return isThisYear(recordDate);
          default:
            return true;
        }
      });
  };

  const filteredAddedMoneyDetails = filterData(addedMoneyDetails);
  const filteredSpendMoneyDetails = filterData(spendMoneyDetails);

  return (
    <div className="max-w-screen-xl mx-auto sm:p-6 p-2">
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg mx-auto relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <img
              src="/donation.jpg"
              alt="Donate"
              className="w-full h-full object-cover rounded-t-lg"
            />
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold text-red-600">Donate Now</h2>
              <p className="text-gray-600 mt-2">
                Support our cause by making a donation. Every contribution helps!
              </p>
            </div>
          </div>
        </div>
      )}

      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-red-600 mb-4">Fund Overview</h1>
        <button
          onClick={openModal}
          className="bg-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-700 transition duration-300"
        >
          Donate!
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/* Current Money */}
        <div className="bg-red-600 text-white rounded-lg p-6 text-center shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Current Fund</h2>
          <p className="text-4xl font-bold mb-4">{currentMoney.toLocaleString()} BDT</p>
          <p className="text-gray-200">Total available funds after expenses</p>
        </div>

        {/* Spend Money */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center border-t-4 border-red-600">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Spent Money</h2>
          <p className="text-4xl font-bold mb-4">
            {spendLoading
              ? "Loading..."
              : spendMoneyDetails
                  ?.reduce((sum, record) => sum + Number(record.amount), 0)
                  .toLocaleString()}{" "}
            BDT
          </p>
          <p className="text-gray-600">Total spent on projects</p>
        </div>

        {/* Added Money */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center border-t-4 border-red-600">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Added Money</h2>
          <p className="text-4xl font-bold mb-4">
            {addedLoading
              ? "Loading..."
              : addedMoneyDetails
                  ?.reduce((sum, record) => sum + Number(record.amount), 0)
                  .toLocaleString()}{" "}
            BDT
          </p>
          <p className="text-gray-600">Recently added funds</p>
        </div>
      </div>

      {/* Fund Details */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-12">
        <h2 className="text-3xl font-bold text-red-600 mb-4 text-center">
          Fund Distribution Details
        </h2>
        <p className="text-gray-600 mb-6">
          Here you can find detailed information about how the funds are utilized. This includes breakdowns of expenditures on various projects, recent donations, and other relevant financial details.
        </p>

        {/* Search and Sort */}
        <div className="flex justify-center items-center mb-6 gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Donor Name"
            className="border border-gray-300 p-3 rounded-lg w-full md:w-1/2"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg w-full md:w-1/4"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="thisWeek">This Week</option>
            <option value="thisMonth">This Month</option>
            <option value="thisYear">This Year</option>
          </select>
        </div>

        {/* Added Money List */}
        <h3 className="text-2xl font-bold text-red-600 mb-4">Added Money List</h3>
        <div className="overflow-x-auto">
          {addedLoading ? (
            <SkeletonLoader />
          ) : addedError ? (
            <p className="text-red-500">Failed to load data.</p>
          ) : (
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr className="bg-red-600 text-white">
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Donor</th>
                  <th className="px-4 py-3 text-left">Amount (BDT)</th>
                  <th className="px-4 py-3 text-left">Account</th>
                  <th className="px-4 py-3 text-left">Transaction ID</th>
                </tr>
              </thead>
              <tbody>
                {filteredAddedMoneyDetails?.map((record) => (
                  <tr key={record.id} className="border-b border-gray-200">
                    <td className="px-4 py-3">{format(parseISO(record.timeReceived), "dd MMM yyyy")}</td>
                    <td className="px-4 py-3">{record.donor}</td>
                    <td className="px-4 py-3">{record.amount}</td>
                    <td className="px-4 py-3">{record.account}</td>
                    <td className="px-4 py-3">{record.trx}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Spent Money List */}
      <div className="bg-white shadow-lg rounded-lg sm:p-6">
        <h3 className="text-2xl font-bold text-red-600 mb-4">Spent Money List</h3>
        <div className="overflow-x-auto">
          {spendLoading ? (
            <SkeletonLoader />
          ) : spendError ? (
            <p className="text-red-500">Failed to load data.</p>
          ) : (
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr className="bg-red-600 text-white">
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Project</th>
                  <th className="px-4 py-3 text-left">Amount (BDT)</th>
                  <th className="px-4 py-3 text-left">Account</th>
                  <th className="px-4 py-3 text-left">Transaction ID</th>
                </tr>
              </thead>
              <tbody>
                {filteredSpendMoneyDetails?.map((record) => (
                  <tr key={record.id} className="border-b border-gray-200">
                    <td className="px-4 py-3">{format(parseISO(record.timeSent), "dd MMM yyyy")}</td>
                    <td className="px-4 py-3">{record.project}</td>
                    <td className="px-4 py-3">{record.amount}</td>
                    <td className="px-4 py-3">{record.account}</td>
                    <td className="px-4 py-3">{record.trx}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default FundPage;
