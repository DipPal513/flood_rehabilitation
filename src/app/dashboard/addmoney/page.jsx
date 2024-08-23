"use client";
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import base_url from '@/utils/base_url';
import apiKey from '@/utils/api_key';

const AddMoneyForm = () => {
  const [addAmount, setAddAmount] = useState('');
  const [time, setTime] = useState('');
  const [account, setAccount] = useState('');
  const [trx, setTrx] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [donor, setDonor] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const token = Cookies.get('accessToken'); // Get the token from cookies
    const user = JSON.parse(Cookies.get('user')); // Get the token from cookies
    console.log(user)

    const data = {
      donor: donor, 
      amount: addAmount,
      account: account,
      trx: trx,
      timeReceived: new Date(time).toISOString(),
      addedBy: user._id, // Replace with dynamic user ID if needed
    };

    try {
      const response = await axios.post(base_url + '/fund-received', data, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          "Authorization": `Bearer ${token}`
        },withCredentials:true
      });

      console.log(response.data);

      if (response.status === 200) {
        toast.success('Money added successfully!');
        setAddAmount('');
        setTime('');
        setAccount('');
        setTrx('');
      
        setDonor('');
      } else {
        toast.error('Failed to add money. Please try again.');
      }
    } catch (error) {
      console.error('Error adding money:', error);
      toast.error('Error occurred. Please try again.');
    } finally {
      setLoading(false); // Stop loading
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
            placeholder="Enter donor name"
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
          <label className="block text-gray-700">Account</label>
          <input
            type="text"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter account"
            required
          />
        </div>
       
        <div className="mb-4">
          <label className="block text-gray-700">Transaction ID</label>
          <input
            type="text"
            value={trx}
            onChange={(e) => setTrx(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter transaction ID"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Time Received</label>
          <input
            type="date"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter time"
            required
          />
        </div>
        <button
          type="submit"
          className={`bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition ${loading ? 'opacity-75' : ''}`}
          disabled={loading}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          ) : (
            'Submit'
          )}
        </button>
      </form>
      <Toaster />
    </div>
  );
};

export default AddMoneyForm;
