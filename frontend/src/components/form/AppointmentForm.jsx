import React, { useEffect, useMemo, useState, useCallback } from 'react';
import appointmentSchema from '../shared/appointmentSchema';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { createAppointment } from '../../redux/features/appointments/appointmentsSlice';
import { fetchServices } from '../../redux/features/services/servicesSlice';
import { toast } from 'react-toastify';
import api from '../shared/api';
import { socket } from '../../socket/socket';

const TIME_SLOTS = [
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
];

function AppointmentForm() {
    const dispatch = useDispatch();
    const { data: services, loading: servicesLoading } = useSelector((state) => state.services);
    const { submitLoading } = useSelector((state) => state.appointments);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(appointmentSchema),
    });
    const selectedDate = useWatch({ control, name: 'date' });
    const selectedService = useWatch({ control, name: 'ServiceCategory' });
    const selectedTime = useWatch({ control, name: 'time' });
    const [slotMap, setSlotMap] = useState({});

    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);

    const fetchSlots = useCallback(async () => {
        if (!selectedDate || !selectedService) {
            setSlotMap({});
            return;
        }
        try {
            const res = await api.get('/appointment/slot-availability', {
                params: { date: selectedDate, serviceId: selectedService },
            });
            setSlotMap(res.data.data || {});
        } catch {
            setSlotMap({});
        }
    }, [selectedDate, selectedService]);

    useEffect(() => {
        fetchSlots();
    }, [fetchSlots]);

    useEffect(() => {
        const onSlotsUpdated = ({ date, serviceId }) => {
            if (date === selectedDate && serviceId === selectedService) {
                fetchSlots();
            }
        };
        socket.on('slots:updated', onSlotsUpdated);
        return () => socket.off('slots:updated', onSlotsUpdated);
    }, [selectedDate, selectedService, fetchSlots]);

    const getSlotLabel = (slot) => {
        const info = slotMap[slot];
        if (!info) return slot;
        if (info.status === 'confirmed') return `${slot} — Booked`;
        if (info.status === 'pending') return `${slot} — Under review (${info.pendingCount})`;
        return slot;
    };

    const isSlotDisabled = (slot) => slotMap[slot]?.status === 'confirmed';

    const selectedSlotPending = selectedTime && slotMap[selectedTime]?.status === 'pending';

    const onPressed = (formData) => {
        dispatch(createAppointment(formData))
            .unwrap()
            .then((res) => {
                toast.success(res.message || 'Your appointment request has been received');
                reset();
                setSlotMap({});
            })
            .catch((err) => {
                if (err?.message?.includes('already booked')) {
                    toast.warning('This time slot is already booked');
                } else {
                    toast.error(err?.message || err?.errors?.[0]?.message || 'Failed to submit request');
                }
            });
    };

    const timeSlots = useMemo(() => TIME_SLOTS, []);

    return (
        <div className="form-div">
            {selectedSlotPending && (
                <div className="bg-amber-50 text-amber-700 p-4 rounded-2xl mb-4 text-sm">
                    This time slot has pending requests. You may still apply — the clinic will confirm one appointment.
                </div>
            )}
            <form onSubmit={handleSubmit(onPressed)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <input
                            {...register('firstName')}
                            className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Enter Your First Name..."
                        />
                        {errors.firstName && (
                            <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                        )}
                    </div>
                    <div>
                        <input
                            {...register('lastName')}
                            className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Enter Your Last Name (Optional)"
                        />
                    </div>
                </div>
                <div>
                    <input
                        {...register('email')}
                        className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Enter Your Email..."
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <input
                            {...register('phoneNo')}
                            className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="03XXXXXXXXX"
                        />
                        {errors.phoneNo && (
                            <p className="text-red-500 text-sm mt-1">{errors.phoneNo.message}</p>
                        )}
                    </div>
                    <div>
                        <select
                            {...register('ServiceCategory')}
                            className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                            disabled={servicesLoading}
                        >
                            <option value="">
                                {servicesLoading ? 'Loading services...' : 'Choose Service Type'}
                            </option>
                            {services?.map((service) => (
                                <option key={service._id} value={service._id}>{service.category}</option>
                            ))}
                        </select>
                        {errors.ServiceCategory && (
                            <p className="text-red-500 text-sm mt-1">{errors.ServiceCategory.message}</p>
                        )}
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <input
                            {...register('date')}
                            type="date"
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        {errors.date && (
                            <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
                        )}
                    </div>
                    <div>
                        <select
                            {...register('time')}
                            className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="">Select time</option>
                            {timeSlots.map((slot) => (
                                <option key={slot} value={slot} disabled={isSlotDisabled(slot)}>
                                    {getSlotLabel(slot)}
                                </option>
                            ))}
                        </select>
                        {errors.time && (
                            <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>
                        )}
                    </div>
                </div>
                    <button type="submit" disabled={submitLoading} className="btn-primary w-full">
                        {submitLoading ? 'Submitting...' : 'Request Appointment'}
                    </button>
            </form>
        </div>
    );
}

export default AppointmentForm;
