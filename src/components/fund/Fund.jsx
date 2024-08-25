"use client";
import React, { useState } from "react";
import { format } from "date-fns";
import useFetch from "@/hooks/useFetch"; // Import your custom useFetch hook

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

  // Calculate current money by converting string amounts to numbers and then performing arithmetic
  const currentMoney =
    (addedMoneyDetails?.reduce((sum, record) => sum + Number(record.amount), 0) || 0) -
    (spendMoneyDetails?.reduce((sum, record) => sum + Number(record.amount), 0) || 0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded mb-4"></div>
      <div className="h-4 bg-gray-200 rounded mb-4"></div>
      <div className="h-4 bg-gray-200 rounded mb-4"></div>
      <div className="h-4 bg-gray-200 rounded mb-4"></div>
      <div className="h-4 bg-gray-200 rounded mb-4"></div>
    </div>
  );

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <button
          onClick={openModal}
          className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
        >
          Donate!
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="rounded-lg relative max-w-lg mx-auto">
            <button
              onClick={closeModal}
              className="absolute top-6 left-6 text-white bg-black"
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
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}

      <h1 className="text-4xl font-bold text-center text-red-600 mb-8">
        Fund Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Current Money */}
        <div className="flex justify-center items-center">
          <div className="relative bg-red-600 text-white rounded-full w-60 h-60 flex items-center justify-center shadow-xl">
            <span className="text-4xl font-bold">
              {currentMoney.toLocaleString()} BDT
            </span>
            <span className="absolute bottom-4 text-sm font-medium">
              Current Fund
            </span>
          </div>
        </div>

        {/* Spend Money */}
        <div className="bg-white shadow-xl rounded-lg p-6 text-center border-t-4 border-red-600">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Spent Money</h2>
          <p className="text-4xl font-bold">
            {spendLoading
              ? "Loading..."
              : spendMoneyDetails
                  ?.reduce((sum, record) => sum + Number(record.amount), 0)
                  .toLocaleString()}{" "}
            BDT
          </p>
          <p className="text-gray-600 mt-2">Total money spent on projects</p>
        </div>

        {/* Added Money */}
        <div className="bg-white shadow-xl rounded-lg p-6 text-center border-t-4 border-red-600">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Added Money</h2>
          <p className="text-4xl font-bold">
            {addedLoading
              ? "Loading..."
              : addedMoneyDetails
                  ?.reduce((sum, record) => sum + Number(record.amount), 0)
                  .toLocaleString()}{" "}
            BDT
          </p>
          <p className="text-gray-600 mt-2">Recently added funds</p>
        </div>
      </div>

      {/* Additional Fund Details */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
          Fund Distribution Details
        </h2>
        <div className="bg-white shadow-xl rounded-lg p-6">
          <p className="text-gray-600 mb-6">
            Here you can provide detailed information about how the funds are
            being utilized. You can include a breakdown of the expenditure on
            different projects, recent donations, and other relevant financial
            details.
          </p>

          {/* Added Money List */}
          <h3 className="text-2xl font-bold text-red-600 mb-4">
            Added Money List
          </h3>
          <div className="overflow-x-auto mb-8">
            {addedLoading ? (
              <SkeletonLoader />
            ) : addedError ? (
              <p className="text-red-500">Failed to load data.</p>
            ) : (
              <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
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
                  {addedMoneyDetails.map((record, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="border-t px-4 py-3 text-gray-700">
                        {record.date}
                      </td>
                      <td className="border-t px-4 py-3 text-gray-700">
                        {record.donor}
                      </td>
                      <td className="border-t px-4 py-3 text-gray-700">
                        {Number(record.amount).toLocaleString()}
                      </td>
                      <td className="border-t px-4 py-3 text-gray-700">
                        {record.account}
                      </td>
                      <td className="border-t px-4 py-3 text-gray-700">
                        {record.trx}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Spend Money List */}
          <h3 className="text-2xl font-bold text-red-600 mb-4">
            Spent Money List
          </h3>
          <div className="overflow-x-auto">
            {spendLoading ? (
              <SkeletonLoader />
            ) : spendError ? (
              <p className="text-red-500">Failed to load data.</p>
            ) : (
              <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
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
                  {spendMoneyDetails.map((record, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="border-t px-4 py-3 text-gray-700">
                        {record.date}
                      </td>
                      <td className="border-t px-4 py-3 text-gray-700">
                        {record.project}
                      </td>
                      <td className="border-t px-4 py-3 text-gray-700">
                        {Number(record.amount).toLocaleString()}
                      </td>
                      <td className="border-t px-4 py-3 text-gray-700">
                        {record.account}
                      </td>
                      <td className="border-t px-4 py-3 text-gray-700">
                        {record.transactionId}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundPage;
