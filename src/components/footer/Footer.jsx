import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-red-500 text-white py-4">
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        {/* Email */}
        <div className="mb-4">
          <p>
            Email:{" "}
            <Link
              href="mailto:augustprojectrehabiliation@gmail.com"
              className="hover:text-gray-400"
            >
              augustprojectrehabiliation@gmail.com
            </Link>
          </p>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-4 mb-4">
          <Link href="https://www.facebook.com/YourPage" passHref>
            <p className="hover:text-gray-400">
              <FaFacebookF size={24} />
            </p>
          </Link>
        </div>

        {/* Copyright and Developer Info */}
        <div className="text-sm text-white">
          <p>
            &copy; {new Date().getFullYear()} All rights reserved by{" "}
            <Link
              href="https://www.facebook.com/AugustFloodRehabilitation?mibextid=ZbWKwL"
              target="_blank"
              className="hover:text-gray-400"
            >
              Project: August Flood Rehabilitation
            </Link>
            .
          </p>
          <p>
            Developed by{" "}
            <a
              href="https://www.dippal.vercel.app"
              target="_blank"
              className="text-blue-500 underline hover:text-blue-400"
            >
              Dip Pal
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
