import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../redux/features/Service/ServiceSlice";
import ServiceCard from "./ServiceCard";
import { motion } from "framer-motion";

function OurServices({ limit = null }) {
  const dispatch = useDispatch();
  const { data: services, loading } = useSelector((state) => state.services);
  const flexCenter = "flex items-center gap-2";

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const getServices = () => (limit !== null ? services.slice(0, limit) : services);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section className="mb-12 bg-blue-500/10 rounded-3xl py-16 px-4 sm:px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="headingContent flex flex-col items-center justify-center mb-12"
      >
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="origin-left"
        >
          <div className={`${flexCenter} py-2 text-center`}>
            <span className="dot bg-blue-600 rounded-full w-2 h-2"></span>
            <span className="heading text-blue-600 font-semibold text-lg sm:text-xl">
              Our Services
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-black/90 max-w-3xl mx-auto leading-tight"
        >
          Complete dental services for a healthy smile
        </motion.h1>
      </motion.div>

      {loading ? (
        <p className="text-center text-gray-500">Loading services...</p>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {Array.isArray(services) && services.length > 0 ? (
            getServices().map((service) => (
              <motion.div key={service._id} variants={itemVariants}>
                <ServiceCard
                  image={service.img_url}
                  title={service.category}
                  description={service.description}
                  price={service.price}
                  tags={service.subCat}
                />
              </motion.div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 py-10">
              No services available
            </p>
          )}
        </motion.div>
      )}
    </section>
  );
}

export default OurServices;