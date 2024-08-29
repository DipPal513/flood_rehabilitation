import React from "react";

const FundModal = ({ isModalOpen, closeModal }) => {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg mx-auto relative">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <img
          src="/donation.jpg"
          alt="Donate"
          className="w-full h-full object-cover rounded-t-lg"
        />
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-red-600">Donate Now</h2>
          <p className="text-gray-600 mt-2">
            Support our cause by making a donation. Every contribution helps!
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundModal;
