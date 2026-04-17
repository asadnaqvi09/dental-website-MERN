import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ContactForm from "../../../components/form/ContactForm";
import { Phone,Mail,MapIcon } from "lucide-react";

function ContactUs() {
  return (
    <section className="appointment flex flex-col md:flex-row gap-10 mb-12">
      <div className="leftSide w-full md:w-1/2">
        <div className="appointmentHeading text-start mb-10 max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span className="text-lg text-blue-500 font-semibold tracking-widest uppercase">
              Get In Touch
            </span>
          </div>
          <div className="mainHead text-4xl font-bold text-primary text-start mb-4">
            Reach out to schedule your next dental visit
          </div>
          <div className="para text-md font-medium text-gray-600 text-start">
            We'd love to hear from you! Whether you have questions, feedback, or
            just want to say hello, our team is here to help. Reach out to us
            using the contact form below, and we'll get back to you as soon as
            possible.
          </div>
        </div>
        <ContactForm />
      </div>
      <div className="rightSide w-full md:w-1/2 relative">
        <div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white p-8 rounded-3xl"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 pb-6 border-b border-white/20">
            <div className="flex items-start justify-center text-white gap-3">
              <Phone className="w-7 h-7 text-white" />
              <div>
                <h2 className="text-lg font-semibold">Phone Number</h2>
                <p className="mt-1 opacity-90">+ (0) 789345601</p>
              </div>
            </div>

            <div className="flex items-start justify-center gap-3">
              <Mail className="w-7 h-7 text-white" />
              <div>
                <h2 className="text-lg font-semibold">Email Address</h2>
                <p className="mt-1 opacity-90">domain@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-start justify-center gap-3">
            <MapIcon className="w-7 h-7 text-white"/>
            <div>
              <h2 className="text-lg font-semibold">Our Location</h2>
              <p className="mt-1 text-sm opacity-90 leading-relaxed">
                Ground Floor, Crescent Medical Plaza, Opposite Grand City Mall,
                Palm Street, Miami, FL 33101, USA
              </p>
            </div>
          </div>
        </div>

        <div className="imageContainer w-full h-[670px] bg-black/60 rounded-3xl">
          <LazyLoadImage
            src="https://demo.awaikenthemes.com/denture/wp-content/uploads/2025/09/contact-us-img.jpg"
            alt="appointmentImg"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
