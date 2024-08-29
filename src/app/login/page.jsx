"use client";
import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const apiKey = "[gJzLw!'^!KW3X8v.5c4WYvjPxVliea5";
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast.loading("Logging in...");

    try {
      const response = await axios.post(
        "https://aefff-api.vercel.app/api/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
          },
        }
      );

      console.log( response?.data?.data?.user)
      const user = response?.data?.data?.user;
      if (response.status === 200 && response?.data?.data.accessToken) {
        const accessToken = response?.data?.data.accessToken; // Access the token from the response

        Cookies.set("accessToken", accessToken, { expires: 7 }); // Set cookie with access token, expires in 7 days
        Cookies.set("user",JSON.stringify(user) , { expires: 7 }); // Set cookie with access token, expires in 7 days

        toast.dismiss(); // Dismiss the loading toast
        toast.success("Login successful!");
        if(user.role == "ADMIN"){

          setTimeout(() => {
            
            router.push("/dashboard");
          }, 100);
        }
        else{
          setTimeout(() => {
            
            router.push("/profile");
          }, 100);
        }

      } else {
        toast.dismiss(); // Dismiss the loading toast
        toast.error(response.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      toast.dismiss(); // Dismiss the loading toast
      console.error("Login error:", error);
      toast.error(
        error.response?.data?.message || "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-red-600">Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                loading && "opacity-75"
              }`}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
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
                "Login"
              )}
            </button>
          </div>
        </form>
        
      </div>
      <Toaster />
    </div>
  );
};

export default LoginPage;
