import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Menu, X } from "lucide-react";
import Denture from "../../assets/images/Denture_Logo.svg";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "About Us", path: "/about" },
    { id: 3, name: "Services", path: "/service" },
    { id: 4, name: "Contact Us", path: "/contact" },
  ];

  return (
      <section className="navbar md:mx-6 md:my-4 px-4 md:px-10 py-6 md:rounded-2xl flex justify-between items-center bg-blue-50 relative">
            <div className="webLogo">
              <LazyLoadImage
                src={Denture}
                alt="Denture Dental Clinic"
                width="175"
                height="50"
              />
            </div>
            <div className="hidden md:flex navlinks items-center space-x-10">
              {navLinks.map((item) => {
                return (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-600 font-semibold"
                        : "text-gray-700 hover:text-blue-600 font-medium transition-colors"
                    }
                  >
                    {item.name}
                  </NavLink>
                );
              })}
            </div>
            <div className="hidden md:block btn-primary">
              <NavLink to="/book-appointment">
                <span className="flex items-center gap-2 relative z-10">
                  <span>Make An Appointment</span>
                  <svg
                    className="transition-transform duration-300 btn-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.1996 9.16687C14.2492 9.16687 12.4716 7.31603 12.4716 5.28353V4.4502H10.8716V5.28353C10.8716 6.76186 11.494 8.14853 12.4708 9.16687H2.59961V10.8335H12.4708C11.494 11.8519 10.8716 13.2385 10.8716 14.7169V15.5502H12.4716V14.7169C12.4716 12.6844 14.2492 10.8335 16.1996 10.8335H16.9996V9.16687H16.1996Z"
                    />
                  </svg>
                </span>
              </NavLink>
            </div>
            <div className="md:hidden z-20">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition-colors cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden absolute top-20 left-0 w-full bg-white z-30"
            >
              <div className="px-6 py-4">
                <div className="flex flex-col space-y-4">
                  {navLinks.map((item) => (
                    <NavLink
                      key={item.id}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        isActive
                          ? "text-blue-600 font-semibold py-2 px-4 bg-blue-50 rounded-lg cursor-pointer"
                          : "text-gray-700 hover:text-blue-600 font-medium py-2 px-4 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                  <div className="pt-4 border-t btn-primary">
                    <NavLink
                      to="/book-appointment"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="flex items-center gap-2 relative z-10 items-center justify-center">
                        <span>Make An Appointment</span>
                        <svg
                          className="transition-transform duration-300 btn-icon"
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M16.1996 9.16687C14.2492 9.16687 12.4716 7.31603 12.4716 5.28353V4.4502H10.8716V5.28353C10.8716 6.76186 11.494 8.14853 12.4708 9.16687H2.59961V10.8335H12.4708C11.494 11.8519 10.8716 13.2385 10.8716 14.7169V15.5502H12.4716V14.7169C12.4716 12.6844 14.2492 10.8335 16.1996 10.8335H16.9996V9.16687H16.1996Z"
                          />
                        </svg>
                      </span>
                    </NavLink>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
      </section>
  );
}

export default Navbar;
