"use client";
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import apiKey from "@/utils/api_key";
import base_url from "@/utils/base_url";

const SpendMoneyForm = () => {
  const [amount, setAmount] = useState("");
  const [sector, setSector] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = Cookies.get('accessToken'); // Get the token from cookies
     // Replace with your actual API key

    const data = {
      amount,
      sector,
      description,
      date,
    };

    try {
      const response = await axios.post(base_url+'/fund-sent', data, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
        withCredentials: true, // Ensure cookies are sent with the request
      });

      console.log(response.data);
      // Handle success (e.g., show a success message, clear form)
    } catch (error) {
      console.error('Error spending money:', error);
      // Handle error (e.g., show an error message)
    }

    // Reset form fields
    setAmount("");
    setSector("");
    setDescription("");
    setDate("");
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-red-600 mb-6">Spend Money</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-gray-700 font-medium mb-1">
            Amount (BDT)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label htmlFor="sector" className="block text-gray-700 font-medium mb-1">
            Sector
          </label>
          <input
            type="text"
            id="sector"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-700 font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="4"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-gray-700 font-medium mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SpendMoneyForm;
