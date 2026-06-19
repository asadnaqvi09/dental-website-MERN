import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminStatCard from '../../components/admin/AdminStatCard';
import { fetchAppointments } from '../../redux/features/appointments/appointmentsSlice';
import { fetchContacts } from '../../redux/features/contacts/contactsSlice';
import { fetchServices } from '../../redux/features/services/servicesSlice';

function AdminDashboard() {
    const dispatch = useDispatch();
    const { data: appointments } = useSelector((state) => state.appointments);
    const { data: contacts } = useSelector((state) => state.contacts);
    const { data: services } = useSelector((state) => state.services);

    useEffect(() => {
        dispatch(fetchAppointments());
        dispatch(fetchContacts());
        dispatch(fetchServices());
    }, [dispatch]);

    const stats = useMemo(() => {
        const pending = appointments.filter((a) => a.status === 'pending').length;
        const confirmed = appointments.filter((a) => a.status === 'confirmed').length;
        const today = new Date().toISOString().slice(0, 10);
        const confirmedToday = appointments.filter(
            (a) => a.status === 'confirmed' && a.date?.slice(0, 10) === today
        ).length;
        return { pending, confirmed, confirmedToday, contacts: contacts.length, services: services.length };
    }, [appointments, contacts, services]);

    return (
        <div className="bg-blue-500/10 rounded-3xl py-10 px-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600 mb-8">Overview of your clinic activity</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <AdminStatCard title="Pending Appointments" value={stats.pending} accent="amber" />
                <AdminStatCard title="Confirmed Appointments" value={stats.confirmed} accent="green" />
                <AdminStatCard title="Confirmed Today" value={stats.confirmedToday} accent="blue" />
                <AdminStatCard title="Total Contacts" value={stats.contacts} accent="gray" />
                <AdminStatCard title="Total Services" value={stats.services} accent="blue" />
            </div>
            {stats.pending > 0 && (
                <Link to="/admin/appointments" className="btn-primary inline-block">
                    <span className="relative z-10">Review {stats.pending} Pending Appointment{stats.pending > 1 ? 's' : ''}</span>
                </Link>
            )}
        </div>
    );
}

export default AdminDashboard;
