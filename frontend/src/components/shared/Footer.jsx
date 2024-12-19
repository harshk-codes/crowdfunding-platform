// import React from 'react';
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto">
        {/* First Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-500 mb-4 md:mb-0">
            Fund
          </Link>

          {/* Links */}
          <div className="flex flex-wrap md:space-x-16">
            {/* Donate */}
            <div className="mb-4 md:mb-0">
              <h3 className="font-semibold text-lg mb-2">Donate</h3>
              <ul>
                <li>
                  <Link to="/donate-money" className="hover:text-blue-400">
                    Donate Money
                  </Link>
                </li>
                <li>
                  <Link to="/donate-items" className="hover:text-blue-400">
                    Donate Items
                  </Link>
                </li>
              </ul>
            </div>

            {/* Help */}
            <div className="mb-4 md:mb-0">
              <h3 className="font-semibold text-lg mb-2">Help</h3>
              <ul>
                <li>
                  <Link to="/faq" className="hover:text-blue-400">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/support" className="hover:text-blue-400">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="mb-4 md:mb-0">
              <h3 className="font-semibold text-lg mb-2">Company</h3>
              <ul>
                <li>
                  <Link to="/about" className="hover:text-blue-400">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="hover:text-blue-400">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <hr className="border-gray-700 my-6" />

        {/* Second Row */}
        <div className="flex justify-between items-center">
          {/* Copyright */}
          <p className="text-sm">&copy; 2024 Fund. All rights reserved.</p>

          {/* Social Media Buttons */}
          <div className="flex space-x-4">

              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>

              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>


              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>

              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
