"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-red-600 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/">
            August Flood Rehabilitation
          </Link>
        </div>

        {/* Navigation for larger screens */}
        <nav className="hidden md:flex space-x-6 items-center">
            {/* User Avatar */}
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
                  <p className="block px-4 py-2 hover:bg-gray-200 cursor-pointer">Profile</p>
                </Link>
                <Link href="/dashboard">
                  <p className="block px-4 py-2 hover:bg-gray-200 cursor-pointer">Dashboard</p>
                </Link>
                <Link href="/logout">
                  <p className="block px-4 py-2 hover:bg-gray-200 cursor-pointer">Logout</p>
                </Link>
              </div>
            )}
          </div>
          <Link href="/dashboard">
            <p className="hover:text-red-300 cursor-pointer">admin?</p>
          </Link>
          <Link href="/">
            <p className="hover:text-red-300 cursor-pointer">Home</p>
          </Link>
          <Link href="/about">
            <p className="hover:text-red-300 cursor-pointer">About</p>
          </Link>
          <Link href="/projects">
            <p className="hover:text-red-300 cursor-pointer">Projects</p>
          </Link>
          <Link href="/contact">
            <p className="hover:text-red-300 cursor-pointer">Contact</p>
          </Link>

        
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMenu}
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
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-red-600 px-4 py-3 space-y-2">
          <Link href="/dashboard">
            <p className="block text-white hover:bg-red-700 px-3 py-2 rounded-md">admin?</p>
          </Link>
          <Link href="/">
            <p className="block text-white hover:bg-red-700 px-3 py-2 rounded-md">Home</p>
          </Link>
          <Link href="/about">
            <p className="block text-white hover:bg-red-700 px-3 py-2 rounded-md">About</p>
          </Link>
          <Link href="/projects">
            <p className="block text-white hover:bg-red-700 px-3 py-2 rounded-md">Projects</p>
          </Link>
          <Link href="/contact">
            <p className="block text-white hover:bg-red-700 px-3 py-2 rounded-md">Contact</p>
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
