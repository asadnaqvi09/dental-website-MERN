import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FaqQuestion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "How often should I visit the dentist?",
      a: "We recommend a dental check-up and cleaning every 6 months for most patients. If you have gum disease, diabetes, or a history of cavities, we may suggest visits every 3–4 months.",
    },
    {
      q: "Is teeth whitening safe for my teeth?",
      a: "Yes, 100% safe when done under professional supervision. Our whitening treatments use dentist-approved gels that brighten your smile without damaging enamel or causing sensitivity in most cases.",
    },
    {
      q: "How painful are dental implants?",
      a: "The implant placement is done under local anesthesia — you won’t feel pain during the procedure. After surgery, mild soreness is normal for 3–7 days, easily managed with regular painkillers.",
    },
    {
      q: "What counts as a dental emergency?",
      a: "Severe toothache, knocked-out tooth, broken crown/bridge, swollen face, uncontrolled bleeding, or any injury to the mouth — call us immediately. We keep same-day emergency slots open daily.",
    },
    {
      q: "Do you offer payment plans or accept insurance?",
      a: "Absolutely! We accept all major insurance plans and offer 0% interest payment plans from 6 to 24 months so you can get treatment without worrying about the cost upfront.",
    },
  ];

  return (
    <div className="space-y-6">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="bg-blue-500/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full px-6 py-4 flex justify-between items-center text-left group cursor-pointer"
            >
              <span className="text-lg font-semibold text-gray-900 pr-8 leading-tight">
                {index + 1}. {faq.q}
              </span>

              <motion.div
                animate={{ rotate: isOpen ? 0 : -90 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                className="text-3xl font-bold text-blue-600 select-none"
              >
                {isOpen ? "−" : "+"}
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} // Super smooth ease
                >
                  <motion.div
                    initial={{ y: -10 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 "
                  >
                    <p className="text-gray-600 text-base leading-relaxed">
                      {faq.a}
                    </p>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="mt-5 h-px bg-blue-300 origin-left"
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default FaqQuestion;