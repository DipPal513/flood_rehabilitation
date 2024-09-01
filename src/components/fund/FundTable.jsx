import React, { useState } from "react";
import { format, parseISO } from "date-fns";
import SkeletonLoader from "./SkeletonLoader";

const FundTable = ({ title, data, isLoading, error, type }) => {
  // Number of items to show initially and when loading more
  const initialItems = 15;
  const [itemsToShow, setItemsToShow] = useState(initialItems);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return <p className="text-red-500">Failed to load data.</p>;
  }

  // Sort the data by timeReceived in descending order
  const sortedData = data?.slice().sort((a, b) => new Date(b.timeReceived) - new Date(a.timeReceived));

  // Get the items to display based on the current `itemsToShow` value
  const displayedData = sortedData?.slice(0, itemsToShow);

  // Function to handle loading more items
  const loadMore = () => {
    setItemsToShow(prev => prev + initialItems);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-12">
      <h3 className="text-2xl font-bold text-red-600 mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-red-600 text-white">
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">{type === "add" ? "Donor" : "Project"}</th>
              <th className="px-4 py-3 text-left">Amount (BDT)</th>
              <th className="px-4 py-3 text-left">Account</th>
              <th className="px-4 py-3 text-left">Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {displayedData?.map((record) => (
              <tr key={record._id} className="border-b border-gray-200">
                <td className="px-4 py-3">{format(parseISO(record.timeReceived || record.timeSent), "dd MMM yyyy")}</td>
                <td className="px-4 py-3">{record.project || record.donor}</td>
                <td className="px-4 py-3">{record.amount}</td>
                <td className="px-4 py-3">{record.account}</td>
                <td className="px-4 py-3">{record.trx}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Render Load More button if there are more items to load */}
      {displayedData?.length < sortedData?.length && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={loadMore}
            className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default FundTable;
