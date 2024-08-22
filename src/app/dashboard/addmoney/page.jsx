"use client";
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import base_url from '@/utils/base_url';

const AddMoneyForm = () => {
  const [addAmount, setAddAmount] = useState('');
  const [addSource, setAddSource] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [donor, setDonor] = useState('');

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    const token = Cookies.get('token'); // Get the token from cookies
    const apiKey = 'your-x-api-key'; // Replace with your actual API key

    const data = {
      donor: donor, // Replace with dynamic donor if needed
      amount: addAmount,
      account: addSource,
      trx: transactionId,
      timeReceived: new Date().toISOString(),
      // addedBy: '66c6c2053e60a1eb8e9eb74a', // Replace with dynamic user ID if needed
    };

    try {
      const response = await axios.post(base_url + '/fund-received', data, {
        headers: {
          'Content-Type': 'application/json',
            'x-api-key': "[gJzLw!\'^!KW3X8v.5c4WYvjPxVliea5"
        },
        withCredentials: true, // Ensure cookies are sent with the request
      });

      console.log(response.data);
      // Handle success (e.g., show a success message, clear form)
    } catch (error) {
      console.error('Error adding money:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-red-600 mb-4">Add Money</h2>
      <form onSubmit={handleAddSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Donor</label>
          <input
            type="text"
            value={donor}
            onChange={(e) => setDonor(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter amount"
            required
          />
        </div>
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
