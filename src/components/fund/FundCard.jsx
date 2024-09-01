import React from "react";

const FundCard = ({ title, amount, description, isLoading, className,bg = "bg-white" ,titleClass= "red-500"}) => (
  <div className={`${bg} shadow-lg rounded-lg p-6 text-center border-t-4 ${className}`}>
    <h2 className={`text-2xl font-bold text-${titleClass} mb-2`}>{title}</h2>
    <p className="text-4xl font-bold mb-4">
      {isLoading ? "Loading..." : `${amount.toLocaleString()} BDT`}
    </p>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default FundCard;
