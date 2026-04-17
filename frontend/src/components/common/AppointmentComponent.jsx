import React from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component'
import AppointmentForm from '../form/AppointmentForm'
import { Clock } from "lucide-react";

function AppointmentComponent() {
  return (
    <section className="appointment flex flex-col md:flex-row gap-10 mb-12">
      <div className="leftSide w-full md:w-1/2">
        <div className="appointmentHeading text-start mb-10 max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span className="text-lg text-blue-500 font-semibold tracking-widest uppercase">
              Booking Now
            </span>
          </div>
          <div className="mainHead text-4xl font-bold text-primary text-start mb-4">
            Make an Appointment
          </div>
          <div className="para text-lg font-medium text-gray-600 text-start">
            Your healthy smile starts with a simple click. Book your appointment today and let our experts provide the care you deserve
          </div>
        </div>
        <AppointmentForm />
      </div>
      <div className="rightSide w-full md:w-1/2 relative">
        <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-xl rounded-2xl p-5 text-white border border-white/20 w-[400px]">
          <div className="flex items-center justify-between border-b border-white/20 pb-4">
            <h2 className="text-xl font-semibold">Opening Hours</h2>
            <Clock className="w-6 h-6 text-white/90" />
          </div>

          <div className="mt-6 space-y-6 text-[17px]">
            <div className="flex justify-between">
              <span className="opacity-90">Monday - Saturday:</span>
              <span className="font-medium">10AM to 5PM</span>
            </div>

            <div className="flex justify-between pt-4 border-t border-white/10">
              <span className="opacity-90">Sunday:</span>
              <span className="font-medium">Closed</span>
            </div>
          </div>
        </div>
        <div className="imageContainer w-full h-[580px]">
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
