import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          x: position.x,
          y: position.y,
          opacity: 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="hidden md:block fixed pointer-events-none w-2.5 h-2.5 bg-blue-500 rounded-full z-50"
        style={{ translateX: "-50%", translateY: "-50%" }}
      />
    </AnimatePresence>
  );
}

export default CustomCursor;