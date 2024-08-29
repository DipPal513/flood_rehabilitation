import React from "react";

const SkeletonLoader = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-6 bg-gray-200 rounded"></div>
    <div className="h-6 bg-gray-200 rounded"></div>
    <div className="h-6 bg-gray-200 rounded"></div>
  </div>
);

export default SkeletonLoader;
