import Link from 'next/link';
import { FaFacebookF } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-red-600 text-white py-8">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Contact Info */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">Contact Us</h2>
            <p className="mt-2">Phone: <a href="tel:01625197575" className="hover:text-red-300">01625197575</a></p>
            <p className="mt-1">Email: <Link href="mailto:dip.pal.513@gmail.com" className="hover:text-red-300">dip.pal.513@gmail.com</Link></p>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-6">
            <Link href="https://www.facebook.com/YourPage" passHref>
              <p  className="hover:text-red-300">
                <FaFacebookF size={24} />
              </p>
            </Link>
            {/* Add other social media links here if needed */}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center">
          <p>&copy; {new Date().getFullYear()} August Flood Rehabilitation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
