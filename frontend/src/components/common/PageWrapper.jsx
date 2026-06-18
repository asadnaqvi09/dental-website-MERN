import { motion } from "framer-motion";
import Container from "./Container";

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <Container className="py-4">{children}</Container>
    </motion.div>
  );
}

export default PageWrapper;
