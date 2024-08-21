import React from 'react';

const FundPage = () => {
  // Example data, replace with your actual data
  const currentMoney = 150000;
  const spendMoney = 50000;
  const addedMoney = 20000;

  const addedMoneyDetails = [
    {
      date: '2024-08-15',
      donor: 'John Doe',
      amount: 5000,
      account: 'Bank Transfer',
      transactionId: 'TX12345678',
    },
    {
      date: '2024-08-14',
      donor: 'Jane Smith',
      amount: 3000,
      account: 'Credit Card',
      transactionId: 'TX87654321',
    },
    // Add more records as necessary
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-red-600 mb-8">Fund Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Current Money */}
        <div className="flex justify-center items-center">
          <div className="relative bg-red-600 text-white rounded-full w-60 h-60 flex items-center justify-center shadow-xl">
            <span className="text-4xl font-bold">{currentMoney.toLocaleString()} BDT</span>
            <span className="absolute bottom-4 text-sm font-medium">Current Fund</span>
          </div>
        </div>

        {/* Spend Money */}
        <div className="bg-white shadow-xl rounded-lg p-6 text-center border-t-4 border-red-600">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Spent Money</h2>
          <p className="text-4xl font-bold">{spendMoney.toLocaleString()} BDT</p>
          <p className="text-gray-600 mt-2">Total money spent on projects</p>
        </div>

        {/* Added Money */}
        <div className="bg-white shadow-xl rounded-lg p-6 text-center border-t-4 border-red-600">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Added Money</h2>
          <p className="text-4xl font-bold">{addedMoney.toLocaleString()} BDT</p>
          <p className="text-gray-600 mt-2">Recently added funds</p>
        </div>
      </div>

      {/* Additional Fund Details */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">Fund Distribution Details</h2>
        <div className="bg-white shadow-xl rounded-lg p-6">
          <p className="text-gray-600 mb-6">
            Here you can provide detailed information about how the funds are being utilized. You can include a breakdown of the expenditure on different projects, recent donations, and other relevant financial details.
          </p>

          {/* Added Money List */}
          <h3 className="text-2xl font-bold text-red-600 mb-4">Added Money List</h3>
          <div className="overflow-x-auto">
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
                    <td className="border-t px-4 py-3 text-gray-700">{record.date}</td>
                    <td className="border-t px-4 py-3 text-gray-700">{record.donor}</td>
                    <td className="border-t px-4 py-3 text-gray-700">{record.amount.toLocaleString()}</td>
                    <td className="border-t px-4 py-3 text-gray-700">{record.account}</td>
                    <td className="border-t px-4 py-3 text-gray-700">{record.transactionId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundPage;
