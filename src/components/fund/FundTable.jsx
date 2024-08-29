import React from "react";
import { format, parseISO } from "date-fns";
import SkeletonLoader from "./SkeletonLoader";

const FundTable = ({ title, data, isLoading, error,type }) => {
  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return <p className="text-red-500">Failed to load data.</p>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-12">
      <h3 className="text-2xl font-bold text-red-600 mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-red-600 text-white">
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">{type == "add" ? "donor":"project"}</th>
              <th className="px-4 py-3 text-left">Amount (BDT)</th>
              <th className="px-4 py-3 text-left">Account</th>
              <th className="px-4 py-3 text-left">Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {data?.slice().reverse().map((record) => (
              <tr key={record._id} className="border-b border-gray-200">
                <td className="px-4 py-3">{format(parseISO(record.timeSent || record.timeReceived), "dd MMM yyyy")}</td>
                <td className="px-4 py-3">{record.project || record.donor}</td>
                <td className="px-4 py-3">{record.amount}</td>
                <td className="px-4 py-3">{record.account}</td>
                <td className="px-4 py-3">{record.trx}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FundTable;
