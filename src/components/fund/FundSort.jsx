import React from "react";

const SearchSort = ({ searchQuery, setSearchQuery, sortBy, setSortBy }) => (
  <div className="flex justify-center items-center mb-6 gap-4">
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search by Donor Name"
      className="border border-gray-300 p-3 rounded-lg w-full md:w-1/2"
    />
    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      className="border border-gray-300 p-3 rounded-lg w-full md:w-1/4"
    >
      <option value="all">All Time</option>
      <option value="today">Today</option>
      <option value="thisWeek">This Week</option>
      <option value="thisMonth">This Month</option>
      <option value="thisYear">This Year</option>
    </select>
  </div>
);

export default SearchSort;
