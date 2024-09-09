"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaFacebook, FaFacebookF } from "react-icons/fa";

const Header = () => {
  const token = Cookies.get("accessToken");
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;

  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsDropdownOpen(false); // Close dropdown when toggling the menu
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("user");
    toast.success("Logged out successfully!");
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
    router.push("/login");
  };

  return (
    <header className="bg-red-600 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/">August Flood Rehabilitation</Link>
        </div>
        <Link href={"https://www.facebook.com/AugustFloodRehabilitation?mibextid=ZbWKwL"} target="_blank" className="me-3 md:hidden block">
        <FaFacebookF className="text-2xl"/></Link>
        {/* Navigation for larger screens */}
        <nav className="hidden md:flex space-x-6 items-center">
          {token ? (
            <div className="relative">
              <button onClick={toggleDropdown} className="focus:outline-none">
                <Image
                  src="/path-to-avatar.jpg" // Replace with your avatar image path
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg py-2 z-50">
                  <Link href="/profile">
                    <div className="block px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      Profile
                    </div>
                  </Link>
                  {user?.role === "ADMIN" && (
                    <Link href="/dashboard">
                      <div className="block px-4 py-2 hover:bg-gray-200 cursor-pointer">
                        Dashboard
                      </div>
                    </Link>
                  )}
                  <div
                    onClick={handleLogout}
                    className="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login">
              <div className="hover:text-red-300 cursor-pointer">Login</div>
            </Link>
          )}
          <Link href="/">
            <p className="hover:text-red-300 cursor-pointer">Home</p>
          </Link>
          <Link href="/team">
            <p className="hover:text-red-300 cursor-pointer">Team</p>
          </Link>
          <Link href="/insight">
            <p className="hover:text-red-300 cursor-pointer">Insight</p>
          </Link>
          <Link href="/events">
            <p className="hover:text-red-300 cursor-pointer">Events</p>
          </Link>
        </nav>
         
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-white focus:outline-none" onClick={toggleMenu}>
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
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-red-600 px-4 py-3 space-y-2">
          {token ? (
            <div className="relative">
              <button onClick={toggleDropdown} className="focus:outline-none">
                <Image
                  src="/path-to-avatar.jpg" // Replace with your avatar image path
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </button>
              {isDropdownOpen && (
                <div className="mt-2 w-full bg-black text-white rounded-lg shadow-lg py-2 z-50">
                  <Link href="/profile">
                    <div className="block px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      Profile
                    </div>
                  </Link>
                  {user?.role === "ADMIN" && (
                    <Link href="/dashboard">
                      <div className="block px-4 py-2 hover:bg-gray-200 cursor-pointer">
                        Dashboard
                      </div>
                    </Link>
                  )}
                  <div
                    onClick={handleLogout}
                    className="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login">
              <div className="block text-white hover:bg-red-700 px-3 py-2 rounded-md">
                Login
              </div>
            </Link>
          )}
          <Link href="/">
            <div className="block text-white hover:bg-red-700 px-3 py-2 rounded-md">
              Home
            </div>
          </Link>
          <Link href="/team">
            <div className="block text-white hover:bg-red-700 px-3 py-2 rounded-md">
              Our Team
            </div>
          </Link>
          <Link href="/insight">
            <div className="block text-white hover:bg-red-700 px-3 py-2 rounded-md">
              Insight
            </div>
          </Link>
          <Link href="/events">
            <div className="block text-white hover:bg-red-700 px-3 py-2 rounded-md">
              events
            </div>
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
