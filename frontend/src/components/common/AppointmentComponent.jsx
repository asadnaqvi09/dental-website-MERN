import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import AppointmentForm from "../form/AppointmentForm";
import { Clock } from "lucide-react";

function AppointmentComponent() {
  return (
    <section className="appointment flex flex-col md:flex-row gap-10 mb-12">
      <div className="leftSide w-full md:w-1/2 min-w-0">
        <div className="appointmentHeading text-start mb-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span className="text-lg text-blue-500 font-semibold tracking-widest uppercase">
              Booking Now
            </span>
          </div>
          <div className="mainHead text-2xl sm:text-3xl lg:text-4xl font-bold text-primary text-start mb-4">
            Make an Appointment
          </div>
          <div className="para text-base sm:text-lg font-medium text-gray-600 text-start">
            Your healthy smile starts with a simple click. Book your appointment today and let our experts provide the care you deserve
          </div>
        </div>
        <AppointmentForm />
      </div>
      <div className="rightSide w-full md:w-1/2 relative min-w-0">
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-10 bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-5 text-white border border-white/20 max-w-md">
          <div className="flex items-center justify-between border-b border-white/20 pb-4 gap-4">
            <h2 className="text-xl font-semibold">Opening Hours</h2>
            <Clock className="w-6 h-6 text-white/90 shrink-0" />
          </div>
          <div className="mt-6 space-y-6 text-[17px]">
            <div className="flex flex-wrap justify-between gap-2">
              <span className="opacity-90">Monday - Saturday:</span>
              <span className="font-medium">10AM to 5PM</span>
            </div>
            <div className="flex flex-wrap justify-between gap-2 pt-4 border-t border-white/10">
              <span className="opacity-90">Sunday:</span>
              <span className="font-medium">Closed</span>
            </div>
          </div>
        </div>
        <div className="imageContainer w-full h-[320px] sm:h-[450px] md:h-[580px]">
          <LazyLoadImage
            src="https://demo.awaikenthemes.com/denture/wp-content/uploads/2025/09/appointment-image.jpg"
            alt="appointmentImg"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
}

export default AppointmentComponent;
