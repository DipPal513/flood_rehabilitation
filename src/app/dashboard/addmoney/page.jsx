"use client";
import React, { useState } from 'react';

const AddMoneyForm = () => {
  const [addAmount, setAddAmount] = useState('');
  const [addSource, setAddSource] = useState('');
  const [transactionId, setTransactionId] = useState('');

  const handleAddSubmit = (e) => {
    e.preventDefault();
    console.log({
      addAmount,
      addSource,
      transactionId,
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-red-600 mb-4">Add Money</h2>
      <form onSubmit={handleAddSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Amount (BDT)</label>
          <input
            type="number"
            value={addAmount}
            onChange={(e) => setAddAmount(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter amount"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Source</label>
          <input
            type="text"
            value={addSource}
            onChange={(e) => setAddSource(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter source"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Transaction ID</label>
          <input
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter transaction ID"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddMoneyForm;
