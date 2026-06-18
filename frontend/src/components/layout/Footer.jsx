import React from "react";
import herobg from "../../assets/images/hero-bg.png";
import { NavLink } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Denture from "../../assets/images/footer-logo.svg";
import { Facebook, Twitter, Linkedin } from "lucide-react";

function Footer() {
  const quickLinks = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "About Us", path: "/about" },
    { id: 3, name: "Services", path: "/service" },
    { id: 4, name: "Appointment", path: "/book-appointment" },
  ];

  const services = [
    "Cosmetic Dentistry",
    "Orthodontics",
    "Precision Dentures",
    "Restorative Dentistry",
  ];

  const socials = [
    { icon: Facebook, href: "https://facebook.com" },
    { icon: Twitter, href: "https://twitter.com" },
    { icon: Linkedin, href: "https://linkedin.com" },
  ];

  return (
    <footer
      style={{
        backgroundImage: `url(${herobg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="rounded-xl text-white py-10 sm:py-14 px-4 sm:px-6 lg:px-10 my-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
        <div className="flex flex-col gap-4">
          <LazyLoadImage
            src={Denture}
            alt="Denture Dental Clinic"
            className="w-32 sm:w-40 lg:w-[180px] h-auto"
          />
          <p className="font-medium text-sm sm:text-base leading-relaxed max-w-xs">
            Comprehensive dental services, confident smiles through, personalized care.
          </p>
          <div className="flex gap-3">
            {socials.map(({ icon: Icon, href }, idx) => (
              <a
                key={idx}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-11 sm:h-11 border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-black transition"
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-3">
            {quickLinks.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  className="flex items-center text-white hover:text-blue-300 transition font-medium text-sm sm:text-base"
                >
                  <span className="w-2 h-2 bg-blue-400 rounded-full shrink-0"></span>
                  <span className="ml-3">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl sm:text-2xl font-bold mb-4">Our Services</h3>
          <ul className="space-y-3">
            {services.map((service, index) => (
              <li key={index} className="flex items-center font-medium text-sm sm:text-base">
                <span className="w-2 h-2 bg-blue-400 rounded-full shrink-0"></span>
                <span className="ml-3">{service}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <h3 className="text-xl sm:text-2xl font-bold mb-4">Contact Us</h3>
          <div className="bg-white/10 p-4 sm:p-6 rounded-xl space-y-4">
            <p className="font-semibold text-base sm:text-lg break-all">Domain@gmail.com</p>
            <p className="font-semibold text-base sm:text-lg">(+0) 789345601</p>
            <div className="flex flex-wrap justify-between gap-2 text-sm mt-4">
              <span className="font-medium">Mon to Sat:</span>
              <span className="font-medium">9AM to 9PM</span>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/20 mt-8 sm:mt-10 pt-6 text-center text-xs sm:text-sm">
        Copyright © 2025 All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
