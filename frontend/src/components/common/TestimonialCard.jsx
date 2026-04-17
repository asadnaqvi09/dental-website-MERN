import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Quote, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Chief Dental Surgeon",
    quote:
      "The advanced technology and compassionate care at this clinic transformed my dental experience. I've never felt more comfortable during procedures!",
    image: "/images/dr-sarah.jpg",
    ratings: 4,
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    role: "Orthodontics Specialist",
    quote:
      "As a dental professional myself, I'm impressed by the precision and expertise shown here. My family trusts them completely with our dental health.",
    image: "/images/dr-chen.jpg",
    ratings: 5,
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    role: "Pediatric Dentist",
    quote:
      "The gentle approach and modern equipment make every visit stress-free. They truly understand patient comfort and dental excellence.",
    image: "/images/dr-rodriguez.jpg",
    ratings: 5,
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    role: "Periodontist",
    quote:
      "Outstanding gum treatment I received here. The team's knowledge and the clinic's hygiene standards are exceptional.",
    image: "/images/dr-wilson.jpg",
    ratings: 5,
  },
  {
    id: 5,
    name: "Dr. Lisa Thompson",
    role: "Cosmetic Dentistry Expert",
    quote:
      "My smile makeover was beyond expectations. The attention to detail and artistic approach to cosmetic dentistry is remarkable.",
    image: "/images/dr-thompson.jpg",
    ratings: 5,
  },
  {
    id: 6,
    name: "Dr. Robert Kumar",
    role: "Endodontist",
    quote:
      "The root canal treatment was painless and efficient. Their use of digital imaging and gentle techniques sets them apart.",
    image: "/images/dr-kumar.jpg",
    ratings: 5,
  },
  {
    id: 7,
    name: "Dr. Amanda Park",
    role: "Oral Surgeon",
    quote:
      "Professional, skilled, and caring - everything you want in a dental team. My wisdom tooth extraction was smooth and recovery was quick.",
    image: "/images/dr-park.jpg",
    ratings: 5,
  },
  {
    id: 8,
    name: "Dr. David Martinez",
    role: "Prosthodontist",
    quote:
      "The dental implants I received feel and look completely natural. The craftsmanship and surgical precision are outstanding.",
    image: "/images/dr-martinez.jpg",
    ratings: 5,
  },
  {
    id: 9,
    name: "Dr. Jennifer Lee",
    role: "Dental Hygiene Specialist",
    quote:
      "The most thorough cleaning I've ever experienced. Their preventive care approach has kept my teeth healthy for years.",
    image: "/images/dr-lee.jpg",
    ratings: 5,
  },
  {
    id: 10,
    name: "Dr. Kevin O'Donnell",
    role: "TMJ Specialist",
    quote:
      "My chronic jaw pain is completely gone thanks to their expert diagnosis and treatment. Life-changing care!",
    image: "/images/dr-odonnell.jpg",
    ratings: 5,
  },
  {
    id: 11,
    name: "Dr. Maria Gonzalez",
    role: "Restorative Dentist",
    quote:
      "The dental crowns blend perfectly with my natural teeth. The color matching and fit are absolutely perfect.",
    image: "/images/dr-gonzalez.jpg",
    ratings: 5,
  },
  {
    id: 12,
    name: "Dr. Benjamin Carter",
    role: "Emergency Dental Care",
    quote:
      "When I had a dental emergency, they saw me immediately and provided excellent care. Truly reliable when you need them most.",
    image: "/images/dr-carter.jpg",
    ratings: 5,
  },
];

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 640 }, items: 1 },
  mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
};

const GroupTestimonials = [];
for (let i = 0; i < TESTIMONIALS.length; i += 3) {
  GroupTestimonials.push(TESTIMONIALS.slice(i, i + 3));
}

const CustomDot = ({ onClick, active }) => (
  <button
    onClick={onClick}
    className={`hidden md:block w-3 h-3 rounded-full mx-1 transition-all duration-300 cursor-pointer ${
      active
        ? "bg-blue-600 border border-white/50 scale-125"
        : "bg-gray-300 hover:bg-blue-600"
    }`}
  />
);

function TestimonialCard() {
  return (
    <div className="testimonial-carousel">
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={6000}
        transitionDuration={500}
        removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
        showDots
        customDot={<CustomDot />}
        dotListClass="flex justify-center gap-2 mt-10"
        containerClass="pb-10"
      >
        {GroupTestimonials.map((group, groupIndex) => (
          <div
            key={groupIndex}
            className="grid grid-cols-1 md:flex md:flex-row gap-6 px-2 sm:px-4"
          >
            <AnimatePresence mode="wait">
              {group.map((t, index) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -40, scale: 0.95 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    ease: "easeOut",
                  }}
                  className="flex-1 min-w-[90%] mx-auto md:min-w-0"
                >
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex gap-1 mb-6"
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.4 + i * 0.05 }}
                        >
                          <Star
                            className={`w-5 h-5 ${
                              i < t.ratings
                                ? "fill-blue-600 text-blue-600"
                                : "text-gray-300"
                            }`}
                          />
                        </motion.div>
                      ))}
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-gray-600 text-md font-medium leading-relaxed flex-grow"
                    >
                      "{t.quote}"
                    </motion.p>

                    <hr className="my-6 border-gray-300" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            delay: 0.6,
                            type: "spring",
                            stiffness: 200,
                          }}
                          className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gray-200"
                        >
                          <LazyLoadImage
                            src={`https://i.pravatar.cc/150?u=${t.name}`}
                            alt={t.name}
                            width={56}
                            height={56}
                            className="object-cover"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 }}
                        >
                          <h4 className="font-semibold text-gray-900">
                            {t.name}
                          </h4>
                          <p className="text-sm text-gray-500">{t.role}</p>
                        </motion.div>
                      </div>

                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          delay: 0.8,
                          type: "spring",
                          stiffness: 150,
                        }}
                      >
                        <Quote className="w-10 h-10 fill-blue-600 text-blue-600" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default TestimonialCard;
