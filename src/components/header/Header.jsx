"use client";
import { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
        <nav className="hidden md:flex space-x-6">
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
