import React from "react";
import { NavLink } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from "framer-motion";
import { Clock, Phone, Mail } from "lucide-react";

import heroBg from "../../../assets/images/hero-bg.png";
import doc1 from "../../../assets/images/doctor1.png";
import doc2 from "../../../assets/images/doctor2.png";
import doc3 from "../../../assets/images/doctor3.png";
import doc4 from "../../../assets/images/doctor4.png";

// Variants
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const fadeItem = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const doctors = [doc1, doc2, doc3, doc4];
const services = [
  { id: 1, title: "Smiles" },
  { id: 2, title: "Dentistry" },
  { id: 3, title: "Cavity" },
];

function HeroSection() {
  return (
    <section
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="heroSection text-white rounded-3xl mb-12 overflow-hidden overflow-x-hidden"
    >
      {/* HERO TOP */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={container}
        className="py-16 px-6 flex flex-col items-center justify-center relative"
      >
        <motion.div
          variants={scaleIn}
          className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20"
        >
          <div className="flex -space-x-3 overflow-x-hidden">
            {doctors.map((doc, i) => (
              <motion.img
                key={i}
                src={doc}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 + 0.5 }}
                className="w-8 h-8 rounded-full object-contain border-2 border-white/30"
              />
            ))}
          </div>

          <h3 className="text-sm font-bold opacity-90">
            15k Satisfied Patients
          </h3>
        </motion.div>

        <motion.div variants={fadeItem} className="mt-6 text-center max-w-3xl">
          <h1 className="text-3xl sm:text-6xl font-bold leading-tight flex flex-wrap justify-center gap-2">
            Transforming
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="inline-flex items-center gap-2"
            >
              <LazyLoadImage
                src="https://demo.awaikenthemes.com/denture/wp-content/uploads/2025/09/hero-title-image.jpg"
                alt="smile"
                className="w-28 rounded-full object-cover transition-all duration-300 hover:scale-110"
              />
              smiles
            </motion.span>
            with expert care
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 text-lg font-medium max-w-2xl mx-auto opacity-90"
          >
            Experience personalized dental treatment designed to restore,
            protect, and enhance your smile with comfort and confidence.
          </motion.p>
        </motion.div>

        <motion.div
          variants={fadeItem}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-secondary mt-8"
        >
          <NavLink to="/contact">
            <span className="flex items-center gap-2 relative z-10">
              <span>Start your smile journey</span>

              <motion.svg
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="btn-icon"
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
              </motion.svg>
            </span>
          </NavLink>
        </motion.div>
      </motion.div>

      {/* INTRO CARDS */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
        className="introCards grid grid-cols-1 md:grid-cols-4 gap-4 py-8 mx-6 overflow-x-hidden"
      >
        {/* CARD 1 */}
        <motion.div
          variants={fadeItem}
          className="bg-white/10 px-5 py-4 rounded-2xl backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-20">
            <h1 className="text-xl font-bold max-w-xl">
              Comprehensive Dental Care
            </h1>

            <div className="nextCta bg-blue-500 text-white w-14 h-10 rounded-full flex justify-center items-center cursor-pointer hover:bg-white hover:text-blue-500 transition-all">
              <svg
                className="transition-transform duration-300 btn-icon -rotate-30 hover:rotate-0"
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
            </div>
          </div>

          <div className="flex -space-x-3 overflow-x-hidden">
            {doctors.map((doc, i) => (
              <img
                key={i}
                src={doc}
                className="w-10 h-10 rounded-full object-contain border-2 border-white/30"
              />
            ))}
          </div>

          <div className="mt-4 text-white/80 text-lg font-semibold">
            <p>More Than 4,000 Skilled</p>
            <p>Dental Professionals</p>
          </div>
        </motion.div>

        {/* CARD 2 */}
        <motion.div
          variants={fadeItem}
          style={{
            backgroundImage: `url("https://demo.awaikenthemes.com/denture/wp-content/uploads/2025/09/hero-info-item-image-1.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="relative p-4 h-80 rounded-2xl overflow-hidden flex flex-col justify-end"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-2xl" />

          <div className="relative z-10">
            <h1 className="text-2xl font-bold leading-tight">
              Comprehensive <br /> Dental Care
            </h1>

            <div className="mt-4 flex flex-wrap gap-3">
              {services.map((s) => (
                <motion.div
                  key={s.id}
                  whileHover={{ scale: 1.1 }}
                  className="px-4 py-1 rounded-full border border-white text-white text-sm font-medium"
                >
                  {s.title}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CARD 3 */}
        <motion.div
          variants={fadeItem}
          className="bg-white/10 p-6 rounded-3xl text-white shadow-xl backdrop-blur-sm"
        >
          <div className="flex items-center gap-3 border-b border-white/20 pb-4">
            <Clock className="w-6 h-6 text-white/90" />
            <h2 className="text-xl font-semibold">Opening Hours</h2>
          </div>

          <div className="mt-6 space-y-6 text-[17px]">
            <div className="flex justify-between">
              <span className="opacity-90">Mon to Sat:</span>
              <span className="font-medium">9AM to 9PM</span>
            </div>

            <div className="flex justify-between pt-4 border-t border-white/10">
              <span className="opacity-90">Sunday:</span>
              <span className="font-medium">Closed</span>
            </div>
          </div>

          <div className="hidden md:block btn-primary mt-6">
            <NavLink to="/book-appointment">
              <span className="flex items-center justify-center relative z-10">
                <span>Book Appointment</span>
                <motion.svg
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="transition-transform duration-300 btn-icon ml-2"
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
                </motion.svg>
              </span>
            </NavLink>
          </div>
        </motion.div>

        {/* CARD 4 */}
        <motion.div
          variants={fadeItem}
          className="relative rounded-3xl overflow-hidden shadow-xl"
        >
          <img
            src="https://demo.awaikenthemes.com/denture/wp-content/uploads/2025/09/hero-info-item-image-2.jpg"
            className="w-full h-full object-cover"
          />

          <button className="absolute top-4 right-4 bg-blue-500 hover:bg-white text-white hover:text-blue-500 transition-all w-10 h-10 rounded-full flex items-center justify-center">
            <svg
              className="transition-transform duration-300 btn-icon -rotate-30 hover:rotate-0"
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
          </button>

          <div className="absolute bottom-6 left-6 right-6 bg-white/20 backdrop-blur-xl rounded-2xl p-5 text-white border border-white/20">
            <div className="flex items-center gap-3 text-lg">
              <Phone className="w-6 h-6 text-white/90" />
              +00-123-254-896
            </div>

            <div className="flex items-center gap-3 mt-3 text-md">
              <Mail className="w-6 h-6 text-white/90" />
              support@domain.cc
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
