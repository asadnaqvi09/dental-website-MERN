import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Star, Check, Phone } from "lucide-react";
import { NavLink } from "react-router-dom";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

function About() {
  const Rating = { rating: 4.9, outOf: 5, desc: "Average Patient Satisfaction Rating" };
  const Features = [
    "Experienced Team of Dental Professionals",
    "Gentle and Compassionate Care",
  ];
  const flexCenter = "flex items-center gap-2";

  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, Rating.rating, { duration: 1.8, ease: "easeOut" });
    return animation.stop;
  }, []);

  return (
    <section className="flex flex-col md:flex-row gap-4 mb-12">
      <motion.aside
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="about-media w-full md:w-[45%] flex flex-col md:flex-row items-center md:items-start justify-center gap-6 md:gap-8"
      >
        <figure className="mainImg w-full md:w-[60%] flex justify-center md:justify-end">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <LazyLoadImage
              src="https://demo.awaikenthemes.com/denture/wp-content/uploads/2025/09/about-us-image-1.png"
              alt="aboutImg"
              className="w-[85%] sm:w-[70%] md:w-full object-contain"
            />
          </motion.div>
        </figure>

        <div className="subImg w-full md:w-[40%] flex flex-row md:flex-col justify-between items-center md:items-start gap-4 md:gap-6">
          <motion.figure
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <LazyLoadImage
              src="https://demo.awaikenthemes.com/denture/wp-content/uploads/2025/09/about-us-image-2.jpg"
              alt="aboutImg2"
              className="w-[180px] h-[240px] sm:w-[200px] sm:h-[260px] object-cover rounded-xl shadow-xl"
            />
          </motion.figure>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.7, type: "spring", stiffness: 120 }}
            className="cardContent w-[180px] sm:w-[200px] p-5 sm:p-6 flex flex-col justify-between border border-gray-300 rounded-md bg-white shadow-lg"
          >
            <div className="rating flex flex-col items-start gap-1.5 mb-6">
              <h3 className="text-3xl font-bold text-primary">
                <motion.span>{rounded}</motion.span>/{Rating.outOf}
              </h3>
              <div className="stars flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: i < 5 ? 1 : 0.8 }}
                    transition={{ delay: i * 0.1 + 1 }}
                  >
                    <Star className={i < 5 ? "text-blue-500 fill-current" : "text-gray-300"} />
                  </motion.div>
                ))}
              </div>
            </div>
            <p className="text-md font-semibold text-gray-600 leading-tight">{Rating.desc}</p>
          </motion.div>
        </div>
      </motion.aside>

      <motion.article
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="about-info w-full md:w-[55%] text-start flex flex-col justify-center pl-4 md:pl-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`${flexCenter} mb-3`}
        >
          <span className="dot bg-blue-500 rounded-full w-2 h-2"></span>
          <span className="heading text-blue-500 text-lg font-bold">About Us</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl font-bold leading-tight mb-4 max-w-[575px] md:max-w-[550px]"
        >
          Your trusted dental partner for every family member
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-md font-bold text-gray-600 max-w-[500px] mb-6"
        >
          We provide comprehensive dental care for patients of all ages, ensuring healthy,
          confident smiles for every member of your family.
        </motion.p>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
          className="flex flex-col md:flex-row gap-6 mb-8"
        >
          {Features.map((item, index) => (
            <motion.li
              key={index}
              variants={{
                hidden: { opacity: 0, x: -40 },
                visible: { opacity: 1, x: 0 },
              }}
              className={`${flexCenter} text-gray-700 font-medium`}
            >
              <span className="bg-blue-600 w-6 h-6 flex items-center justify-center rounded-full">
                <Check className="text-white w-4 h-4" />
              </span>
              <span>{item}</span>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="contact flex flex-col md:flex-row gap-10 md:gap-14 mt-8"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary">
            <NavLink to="/about">
              <span className="flex items-center justify-center relative z-10">
                <span>More About Us</span>
                <motion.svg
                  animate={{ x: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="btn-icon ml-2"
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

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="contactInfo flex gap-4 items-center"
          >
            <span className="phoneIcon bg-white hover:bg-blue-800 border border-gray-300 w-14 h-14 rounded-full flex items-center justify-center text-blue-600 hover:text-white transition-all cursor-pointer shadow-md">
              <Phone className="w-7 h-7" />
            </span>
            <div className="contact flex flex-col gap-1">
              <span className="text-md text-gray-600">Need Help?</span>
              <span className="font-bold text-xl text-black/80 hover:text-blue-600 transition-colors cursor-pointer">
                +123-456-789
              </span>
            </div>
          </motion.div>
        </motion.div>
      </motion.article>
    </section>
  );
}

export default About;