import React, { useState } from "react";
import contactSchema from "../shared/contactSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { createContact } from "../../redux/features/contacts/contactsSlice";
import { toast } from "react-toastify";

function ContactForm() {
  const dispatch = useDispatch();
  const [successMsg, setSuccessMsg] = useState("");

  const { loading: contactLoading, error } = useSelector(
    (state) => state.contacts
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onPressed = (formData) => {
    setSuccessMsg("");
    dispatch(createContact(formData))
      .unwrap()
      .then((res) => {
        setSuccessMsg("✅ Your message has been sent successfully");
        toast.success(res.message || "Message sent successfully");
        reset();
      })
      .catch((err) => {
        toast.error(
          err?.message ||
            err?.errors?.[0]?.message ||
            "Failed to send message"
        );
      });
  };

  return (
    <div className="form-div">
      <form onSubmit={handleSubmit(onPressed)} className="space-y-6">
        
        {successMsg && (
          <div className="bg-green-100 text-green-700 p-3 rounded-xl text-center">
            {successMsg}
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-xl text-center">
            ❌ {typeof error === "string" ? error : "Something went wrong"}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-md font-medium text-gray-600 mb-2">
              First Name*
            </label>
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
            <label className="block text-md font-medium text-gray-600 mb-2">
              Last Name
            </label>
            <input
              {...register("lastName")}
              className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter Your Last Name (Optional)"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-md font-medium text-gray-600 mb-2">
              Email*
            </label>
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

          <div>
            <label className="block text-md font-medium text-gray-600 mb-2">
              Phone Number*
            </label>
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
        </div>

        <div>
          <label className="block text-md font-medium text-gray-600 mb-2">
            Message*
          </label>
          <textarea
            {...register("message")}
            rows={4}
            className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            placeholder="Write your message..."
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={contactLoading}
          className="btn-primary w-full flex items-center justify-center"
        >
          {contactLoading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}

export default ContactForm;