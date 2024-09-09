"use client";
import React, { useState } from "react";
import useFetch from "@/hooks/useFetch";
import FundModal from "./FundModal";
import FundCard from "./FundCard";
import FundTable from "./FundTable";
import SearchSort from "./FundSort";
import {
  parseISO,
  isToday,
  isThisWeek,
  isThisMonth,
  isThisYear,
} from "date-fns"; // Importing necessary functions
import EventSlider from "../eventSlider/EventSlider";

const FundPage = () => {
  const {
    data: addedMoneyDetails = [], // Defaulting to an empty array
    loading: addedLoading,
    error: addedError,
  } = useFetch("/fund-received");

  const {
    data: spendMoneyDetails = [], // Defaulting to an empty array
    loading: spendLoading,
    error: spendError,
  } = useFetch("/fund-sent");

  const currentMoney =
    (addedMoneyDetails?.reduce(
      (sum, record) => sum + Number(record.amount),
      0
    ) || 0) -
    (spendMoneyDetails?.reduce(
      (sum, record) => sum + Number(record.amount),
      0
    ) || 0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("all");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Filter and sort data based on search query and sortBy
  const filterData = (data) => {
    return data
      ?.filter((record) =>
        record?.donor?.toLowerCase().includes(searchQuery.toLowerCase())
      )
      ?.filter((record) => {
        const recordDate = parseISO(record?.timeReceived);
        switch (sortBy) {
          case "today":
            return isToday(recordDate);
          case "thisWeek":
            return isThisWeek(recordDate);
          case "thisMonth":
            return isThisMonth(recordDate);
          case "thisYear":
            return isThisYear(recordDate);
          default:
            return true;
        }
      });
  };

  const filteredAddedMoneyDetails = filterData(addedMoneyDetails);
  const filteredSpendMoneyDetails = filterData(spendMoneyDetails);

  console.log("Spent Money Details: ", addedMoneyDetails);

  return (
    <div className="max-w-screen-xl mx-auto sm:p-6 p-2">
      <FundModal isModalOpen={isModalOpen} closeModal={closeModal} />

      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-red-600 mb-4">
          Fund Overview
        </h1>
        <button
          onClick={openModal}
          className="bg-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-700 transition duration-300"
        >
          Donate!
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <FundCard
          title="Added Money"
          amount={addedMoneyDetails?.reduce(
            (sum, record) => sum + Number(record.amount),
            0
          )}
          description="Total added money"
          isLoading={addedLoading}
          bg={"bg-red-500"}
          titleClass="white"
          className=" text-white"
        />
        <FundCard
          title="Spent Money"
          amount={spendMoneyDetails?.reduce(
            (sum, record) => sum + Number(record.amount),
            0
          )}
          description="Total spent money"
          isLoading={spendLoading}
          className="border-t-red-600"
        />
        <FundCard
          title="Current Money"
          amount={currentMoney}
          description="Available funds"
          isLoading={addedLoading || spendLoading}
          className="border-t-green-600"
        />
      </div>
<EventSlider />
      <SearchSort
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <FundTable
        title="Added Money Details"
        data={filteredAddedMoneyDetails}
        isLoading={addedLoading}
        error={addedError}
        type={"add"}
      />

      <FundTable
        title="Spent Money Details"
        data={spendMoneyDetails}
        isLoading={spendLoading}
        error={spendError}
        type={"spent"}
      />
    </div>
  );
};

export default FundPage;
