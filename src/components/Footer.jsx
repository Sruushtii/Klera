import React from "react";
import { FaDiscord, FaVk, FaTelegram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-8">
      {/* Top Section */}
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Logo Image */}
        <div>
          <img
            src="/logo.png"
            alt="Klera Logo"
            className="h-32 w-auto" // Adjust height and auto width
          />
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap gap-6 mt-4 md:mt-0 text-sm">
          <a href="#" className="hover:text-white transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition">
            User Agreement
          </a>
          <a href="#" className="hover:text-white transition">
            Contacts
          </a>
          <a href="#" className="hover:text-white transition">
            Rules
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 mt-4 md:mt-0">
          <a
            href="#"
            className="text-gray-400 hover:text-white transition text-2xl"
          >
            <FaDiscord />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition text-2xl"
          >
            <FaVk />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition text-2xl"
          >
            <FaTelegram />
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-3 md:-mt-6">
        <div className="container mx-auto px-6 text-center text-sm mt-4">
          <p>
             <span className=" text-[#EAB308]">&copy; Klera</span> 2020-2024. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
