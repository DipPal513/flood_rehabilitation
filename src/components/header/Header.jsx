import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-red-600 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/">
          August Flood Rehabilitation
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/">
            <p className="hover:text-red-300">Home</p>
          </Link>
          <Link href="/about">
            <p className="hover:text-red-300">About</p>
          </Link>
          <Link href="/projects">
            <p className="hover:text-red-300">Projects</p>
          </Link>
          <Link href="/contact">
            <p className="hover:text-red-300">Contact</p>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
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
    </header>
  );
};

export default Header;
