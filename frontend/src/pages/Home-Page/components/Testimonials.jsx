import React from "react";
import TestimonialCard from "../../../components/common/TestimonialCard";

function Testimonials() {
  return (
    <section className="testimonial-section bg-blue-500/10 rounded-md py-16 px-6 mb-12">
      <div className="text-center mb-20 max-w-2xl mx-auto px-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          <span className="text-sm text-blue-500 font-bold tracking-widest uppercase">
            Testimonials
          </span>
        </div>
        <h2 className="text-4xl font-bold text-center leading-snug">
          Happy patients sharing their dental care journey
        </h2>
      </div>
      <TestimonialCard />
    </section>
  );
}

export default Testimonials;
