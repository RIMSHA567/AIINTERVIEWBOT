import React from "react";
import { FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-[#111827] py-10 px-6 md:px-12 w-full">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Left */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-green-400 font-semibold text-lg mb-2">
            AI Interview
          </h3>
          <p className="text-gray-400 text-sm">
            The premier evaluation for high-stakes interview simulation,
            engineering the future of professional assessments.
          </p>
        </div>

        {/* Center */}
        <div className="flex flex-col items-center md:items-start text-gray-400 text-sm">
          <h4 className="text-white font-semibold mb-2">Quick Links</h4>
          <a href="#" className="hover:text-green-400 transition-colors mb-1">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-green-400 transition-colors mb-1">
            Terms of Service
          </a>
          <a href="#" className="hover:text-green-400 transition-colors">
            Support
          </a>
        </div>

        {/* Right */}
        <div className="flex flex-col items-center md:items-start text-gray-400 text-sm">
          <h4 className="text-white font-semibold mb-2">Contact</h4>
          <a href="#" className="hover:text-green-400 transition-colors mb-1">
            Email Us
          </a>
          <a href="#" className="hover:text-green-400 transition-colors mb-2">
            LinkedIn
          </a>
          <div className="flex gap-3 mt-2">
            <FiFacebook className="w-5 h-5 hover:text-green-400 transition-colors cursor-pointer" />
            <FiTwitter className="w-5 h-5 hover:text-green-400 transition-colors cursor-pointer" />
            <FiInstagram className="w-5 h-5 hover:text-green-400 transition-colors cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} AI Interview. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
