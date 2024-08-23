"use client";
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import apiKey from "@/utils/api_key";
import base_url from "@/utils/base_url";
import { toast } from "react-hot-toast";

const SpendMoneyForm = () => {
  const [amount, setAmount] = useState("");
  const [sector, setSector] = useState("");
  const [trx, setTrx] = useState("");
  const [account, setAccount] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = Cookies.get("accessToken"); 
    const user = JSON.parse(Cookies.get("user"));
    
    const data = {
      amount,
      project: sector,
      account: account,
      trx,
      timeSent: new Date(time).toISOString(),
      addedBy: user._id,
    };

    try {
      const response = await axios.post(base_url + "/fund-sent", data, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (response.status === 201) {
        toast.success("Money spent successfully!");
        // Reset form fields
        setAmount("");
        setSector("");
        setTrx("");
        setAccount("");
        setTime("");
      }
    } catch (error) {
      console.error("Error spending money:", error);
      toast.error("Failed to spend money. Please try again.");
    } finally {
      setLoading(false);
    }
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
            disabled={loading}
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
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="trx" className="block text-gray-700 font-medium mb-1">
            Transaction Id
          </label>
          <input
            type="text"
            id="trx"
            value={trx}
            onChange={(e) => setTrx(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md p-2"
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="account" className="block text-gray-700 font-medium mb-1">
            Account
          </label>
          <input
            id="account"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            required
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-gray-700 font-medium mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md p-2"
            disabled={loading}
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
            disabled={loading}
          >
            {loading ? "Processing..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SpendMoneyForm;
