"use client";
import React from "react";

const SettingsPage = () => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-red-600 mb-6">Settings</h2>
      
      <div className="space-y-6">
        {/* Profile Settings */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Profile Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-1">Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="john.doe@example.com"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="********"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Notification Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <input type="checkbox" id="email-notifications" className="mr-2" />
              <label htmlFor="email-notifications" className="text-gray-600">Email Notifications</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="sms-notifications" className="mr-2" />
              <label htmlFor="sms-notifications" className="text-gray-600">SMS Notifications</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
