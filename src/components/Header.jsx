import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Firebase auth state
  const navigate = useNavigate();
  const auth = getAuth();

  // Monitor Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribe(); // Cleanup listener on unmount
  }, [auth]);

  // Handle Logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false);
        navigate("/"); // Redirect to home page
      })
      .catch((error) => {
        console.error("Error during logout:", error.message);
      });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 ">
      <nav className="w-full px-6 md:px-20 py-4 flex items-center justify-between">
        {/* Logo */}
        <div>
          <Link to="/">
            <img
              className="h-auto w-32 md:w-36 transition-transform transform hover:scale-105"
              src="logo.png"
              alt="Klera Logo"
            />
          </Link>
        </div>

        {/* Menu for large screens */}
        <ul className="hidden md:flex space-x-8 items-center text-white">
          <li>
            <Link
              to="/"
              className="hover:text-teal-400 transition duration-300 text-lg"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/store"
              className="hover:text-teal-400 transition duration-300 text-lg"
            >
              Store
            </Link>
          </li>
          <li>
            <a
              href="#about"
              className="hover:text-teal-400 transition duration-300 text-lg"
            >
              About
            </a>
          </li>
          {/* Conditional Rendering for Login/Logout */}
          <li>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-[#EAB308] text-black rounded-3xl hover:bg-red-600 transition duration-300 font-semibold"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2 bg-[#3D77EC] text-white rounded-3xl hover:bg-[#638ada] transition duration-300 font-semibold"
              >
                Login / Signup
              </Link>
            )}
          </li>
        </ul>

        {/* Hamburger Menu Button */}
        <button
          className="block md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="space-y-1">
            <div
              className={`h-0.5 w-6 bg-white transition-transform ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></div>
            <div
              className={`h-0.5 w-6 bg-white ${
                isOpen ? "opacity-0" : "opacity-100"
              } transition-opacity`}
            ></div>
            <div
              className={`h-0.5 w-6 bg-white transition-transform ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></div>
          </div>
        </button>

        {/* Mobile Menu */}
        <ul
          className={`${
            isOpen ? "translate-x-0" : "translate-x-full"
          } absolute top-0 right-0 w-2/3 h-screen  text-white flex flex-col items-center space-y-6 py-8 md:hidden transition-transform duration-300 shadow-lg backdrop-blur-xl`}
        >
          <li>
            <Link
              to="/"
              className="hover:text-teal-400 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/store"
              className="hover:text-teal-400 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              Store
            </Link>
          </li>
          <li>
            <a
              href="#about"
              className="hover:text-teal-400 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
          </li>
          <li>
            {isLoggedIn ? (
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="px-6 py-2 bg-[r#EAB308] text-white rounded-3xl hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2 bg-teal-500 text-white rounded-3xl hover:bg-teal-600 transition duration-300 font-semibold"
                onClick={() => setIsOpen(false)}
              >
                Login / Signup
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
