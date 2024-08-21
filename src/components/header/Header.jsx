import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-red-600 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/">
            <a>Flood Rehabilitation BD</a>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/">
            <a className="hover:text-red-300">Home</a>
          </Link>
          <Link href="/about">
            <a className="hover:text-red-300">About</a>
          </Link>
          <Link href="/projects">
            <a className="hover:text-red-300">Projects</a>
          </Link>
          <Link href="/contact">
            <a className="hover:text-red-300">Contact</a>
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
