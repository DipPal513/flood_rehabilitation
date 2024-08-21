import React from 'react';

const DailyFundPage = () => {
  // Example data, replace with your actual data or fetch from an API
  const dailyCollection = 50000;
  const dailySpent = 30000;
  const totalCollection = 1500000;
  const totalSpent = 1200000;

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center text-red-600 mb-8">Daily Fund Update</h1>

      {/* Fund Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Daily Collection */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center border-t-4 border-red-600">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Daily Collection</h2>
          <p className="text-4xl font-bold">{dailyCollection.toLocaleString()} BDT</p>
          <p className="text-gray-600 mt-2">Today's collected amount</p>
        </div>

        {/* Daily Spent */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center border-t-4 border-red-600">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Daily Spent</h2>
          <p className="text-4xl font-bold">{dailySpent.toLocaleString()} BDT</p>
          <p className="text-gray-600 mt-2">Today's spent amount</p>
        </div>

        {/* Total Collection */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center border-t-4 border-red-600">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Total Collection</h2>
          <p className="text-4xl font-bold">{totalCollection.toLocaleString()} BDT</p>
          <p className="text-gray-600 mt-2">Total collected amount</p>
        </div>

        {/* Total Spent */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center border-t-4 border-red-600">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Total Spent</h2>
          <p className="text-4xl font-bold">{totalSpent.toLocaleString()} BDT</p>
          <p className="text-gray-600 mt-2">Total spent amount</p>
        </div>
      </div>

      {/* Additional Fund Details */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">Fund Allocation Details</h2>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <p className="text-gray-600">
            Detailed information on the allocation of funds can be provided here. You may include breakdowns of how the daily collections are being utilized, and provide insights on major expenditures or special projects.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DailyFundPage;
