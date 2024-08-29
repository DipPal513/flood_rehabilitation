"use client";
import React, { useState } from "react";
import useFetch from "@/hooks/useFetch";
import axios from "axios";
import apiKey from "@/utils/api_key";
import Cookies from "js-cookie";

const FundManagePage = () => {
  const [deleting, setDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [type, setType] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Fetch added money details
  const {
    data: addedMoneyDetails,
    loading: addedLoading,
    error: addedError,
    refetch: refetchAddedMoney,
  } = useFetch("/fund-received");

  // Fetch spent money details
  const {
    data: spendMoneyDetails,
    loading: spendLoading,
    error: spendError,
    refetch: refetchSpendMoney,
  } = useFetch("/fund-sent");
  console.log(addedMoneyDetails);

  const handleDelete = async (req_type, id) => {
    setDeleteId(id);
    setType(req_type);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(
        `https://aefff-api.vercel.app/api/${
          type == "add" ? "fund-received" : "fund-sent"
        }/${deleteId}`,
        {
          headers: {
            "x-api-key": apiKey, // Replace with your actual x-api-key
            Authorization: `Bearer ${Cookies.get("accessToken")}`, // Replace with your actual authorization token
          },
        }
      );
      refetchAddedMoney(); // Refetch added money details after deletion
      refetchSpendMoney(); // Refetch spend money details after deletion
    } catch (error) {
      console.error("Failed to delete:", error);
    } finally {
      setDeleting(false);
      setIsDeleteModalOpen(false);
      setDeleteId(null);
    }
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteId(null);
  };

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
      <h1 className="text-4xl font-bold text-center text-red-600 mb-8">
        Fund Management
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
        {/* Added Money Table */}
        <div className="bg-white shadow-xl rounded-lg p-6 text-center border-t-4 border-red-600">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Added Money</h2>
          <div className="overflow-x-auto">
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
                    <th className="px-4 py-3 text-left">Actions</th>
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
                        {record.transactionId}
                      </td>
                      <td className="border-t px-4 py-3 text-gray-700">
                        <button
                          onClick={() => handleDelete("add", record._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Spend Money Table */}
        <div className="bg-white shadow-xl rounded-lg p-6 text-center border-t-4 border-red-600">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Spent Money</h2>
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
                    <th className="px-4 py-3 text-left">Actions</th>
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
                      <td className="border-t px-4 py-3 text-gray-700">
                        <button
                          onClick={() => handleDelete("spend", record._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-auto text-center">
            <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
            <p className="mb-6">
              Are you sure you want to delete this record? This action cannot be
              undone.
            </p>
            <div className="flex justify-between">
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                onClick={closeDeleteModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FundManagePage;
