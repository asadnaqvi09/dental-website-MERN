import React from "react";
import { NavLink } from "react-router-dom";
import FaqQuestion from "./FaqQuestion";

function Faq() {
  return (
    <section className="flex flex-col md:flex-row mb-12">
      <div className="faqInfo w-full md:w-1/2 flex flex-col">
        <div className="faqHeading text-start mb-10 max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span className="text-md text-blue-500 font-semibold tracking-widest uppercase">
              Faq's
            </span>
          </div>
          <div className="mainHead text-4xl font-bold text-primary text-start mb-4">
            Frequently asked questions about your dental care
          </div>
        </div>
        <div className="faqBox flex flex-col w-[500px] p-12 bg-blue-800 rounded-3xl text-start">
          <div className="heading flex flex-col gap-2 mb-6">
            <h1 className="text-2xl font-bold text-white">
              Still have a dental question?
            </h1>
            <p className="text-lg font-medium text-white/80">
            Can't find the answer you're looking for? Contact our dental team
            for personalized help.
          </p>
          </div>
          <NavLink
            to="/book-appointment"
            className="px-6 py-3.5 rounded-full bg-white text-blue-500 text-center w-full hover:bg-black hover:text-white font-bold cursor-pointer transition-all duration-300"
          >
            Make an Appointment
          </NavLink>
        </div>
      </div>
      <div className="faqQuestions w-full md:w-1/2">
        <FaqQuestion />
      </div>
    </section>
  );
}

export default Faq;
