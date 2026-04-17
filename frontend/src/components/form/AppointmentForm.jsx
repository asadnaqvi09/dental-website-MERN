import React, { useEffect, useMemo } from "react";
import appointmentSchema from "../shared/appointmentSchema";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { createAppointment } from "../../redux/features/Appointment/AppointmentSlice";
import { fetchServices } from "../../redux/features/Service/ServiceSlice";
import { toast } from "react-toastify";
import api from "../shared/api";

function AppointmentForm() {
  const dispatch = useDispatch();

  const { data: services, loading: servicesLoading } = useSelector(
    (state) => state.services
  );

  const { loading: appointmentsLoading } = useSelector(
    (state) => state.appointment
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(appointmentSchema),
  });

  const selectedDate = useWatch({ control, name: "date" });
  const selectedService = useWatch({ control, name: "ServiceCategory" });

  const [bookedSlots, setBookedSlots] = React.useState([]);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  useEffect(() => {
    const fetchBooked = async () => {
      if (!selectedDate || !selectedService) {
        setBookedSlots([]);
        return;
      }
      try {
        const res = await api.get("/appointment/get-appointment");
        const filtered = res.data.data.filter(
          (item) =>
            item.ServiceCategory === selectedService &&
            item.date.slice(0, 10) === selectedDate
        );
        setBookedSlots(filtered.map((i) => i.time));
      } catch {
        setBookedSlots([]);
      }
    };
    fetchBooked();
  }, [selectedDate, selectedService]);

  const onPressed = (formData) => {
    dispatch(createAppointment(formData))
      .unwrap()
      .then((res) => {
        toast.success(res.message || "Appointment booked successfully");
        reset();
      })
      .catch((err) => {
        if (err?.message?.includes("already booked")) {
          toast.warning("This time slot is already booked");
        } else {
          toast.error(
            err?.message ||
              err?.errors?.[0]?.message ||
              "Failed to create appointment"
          );
        }
      });
  };

  const timeSlots = useMemo(
    () => [
      "10:00 AM",
      "11:00 AM",
      "12:00 PM",
      "02:00 PM",
      "03:00 PM",
      "04:00 PM",
      "05:00 PM",
    ],
    []
  );

  return (
    <div className="form-div">
      <form onSubmit={handleSubmit(onPressed)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <input
              {...register("firstName")}
              className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter Your First Name..."
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("lastName")}
              className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter Your Last Name (Optional)"
            />
          </div>
        </div>

        <div>
          <input
            {...register("email")}
            className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter Your Email..."
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <input
              {...register("phoneNo")}
              className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter Your Phone Number..."
            />
            {errors.phoneNo && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phoneNo.message}
              </p>
            )}
          </div>

          <div>
            <select
              {...register("ServiceCategory")}
              className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
              disabled={servicesLoading}
            >
              <option value="">
                {servicesLoading ? "Loading services..." : "Choose Service Type"}
              </option>
              {services?.map((service) => (
                <option key={service._id} value={service._id}>
                  {service.category}
                </option>
              ))}
            </select>
            {errors.ServiceCategory && (
              <p className="text-red-500 text-sm mt-1">
                {errors.ServiceCategory.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <input
              {...register("date")}
              type="date"
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">
                {errors.date.message}
              </p>
            )}
          </div>

          <div>
            <select
              {...register("time")}
              className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select time</option>
              {timeSlots.map((slot) => (
                <option
                  key={slot}
                  value={slot}
                  disabled={bookedSlots.includes(slot)}
                >
                  {slot} {bookedSlots.includes(slot) ? "(Booked)" : ""}
                </option>
              ))}
            </select>
            {errors.time && (
              <p className="text-red-500 text-sm mt-1">
                {errors.time.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={appointmentsLoading}
          className="btn-primary w-full"
        >
          {appointmentsLoading ? "Booking..." : "Book Appointment Now"}
        </button>
      </form>
    </div>
  );
}

export default AppointmentForm;