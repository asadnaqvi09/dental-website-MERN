import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ConfirmModal from '../../components/admin/ConfirmModal';
import {
    fetchAppointments,
    confirmAppointment,
    rejectAppointment,
    deleteAppointment,
    setAdminFilter,
} from '../../redux/features/appointments/appointmentsSlice';

const tabs = [
    { key: '', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'confirmed', label: 'Confirmed' },
    { key: 'rejected', label: 'Rejected' },
    { key: 'expired', label: 'Expired' },
];

const statusStyles = {
    pending: 'bg-amber-100 text-amber-700',
    confirmed: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
    expired: 'bg-gray-100 text-gray-700',
};

function AdminAppointments() {
    const dispatch = useDispatch();
    const { data: allAppointments, loading, actionLoading } = useSelector((state) => state.appointments);
    const [activeTab, setActiveTab] = useState('pending');
    const [rejectModal, setRejectModal] = useState(null);
    const [rejectNote, setRejectNote] = useState('');
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        dispatch(setAdminFilter(activeTab));
        dispatch(fetchAppointments());
    }, [dispatch, activeTab]);

    const data = useMemo(() => {
        if (!activeTab) return allAppointments;
        return allAppointments.filter((a) => a.status === activeTab);
    }, [allAppointments, activeTab]);

    const conflictMap = useMemo(() => {
        const map = {};
        data.filter((a) => a.status === 'pending').forEach((a) => {
            const key = `${a.date?.slice(0, 10)}_${a.time}_${a.ServiceCategory?._id || a.ServiceCategory}`;
            map[key] = (map[key] || 0) + 1;
        });
        return map;
    }, [data]);

    const getConflictCount = (item) => {
        const key = `${item.date?.slice(0, 10)}_${item.time}_${item.ServiceCategory?._id || item.ServiceCategory}`;
        return conflictMap[key] || 0;
    };

    const handleConfirm = (id) => {
        dispatch(confirmAppointment(id))
            .unwrap()
            .then(() => {
                toast.success('Appointment confirmed');
                dispatch(fetchAppointments());
            })
            .catch((err) => toast.error(err));
    };

    const handleReject = () => {
        if (!rejectModal) return;
        dispatch(rejectAppointment({ id: rejectModal, adminNote: rejectNote }))
            .unwrap()
            .then(() => {
                toast.success('Appointment rejected');
                setRejectModal(null);
                setRejectNote('');
                dispatch(fetchAppointments());
            })
            .catch((err) => toast.error(err));
    };

    const handleDelete = () => {
        if (!deleteId) return;
        dispatch(deleteAppointment(deleteId))
            .unwrap()
            .then(() => {
                toast.success('Appointment deleted');
                setDeleteId(null);
            })
            .catch((err) => toast.error(err));
    };

    return (
        <div className="bg-blue-500/10 rounded-3xl py-10 px-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Appointments</h1>
            <div className="flex flex-wrap gap-2 mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        type="button"
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-5 py-2 rounded-full font-semibold cursor-pointer transition-colors ${
                            activeTab === tab.key
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-blue-50'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            {loading ? (
                <p className="text-gray-500 text-center py-10">Loading appointments...</p>
            ) : data.length === 0 ? (
                <p className="text-gray-500 text-center py-10">No appointments found</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full bg-white rounded-2xl overflow-hidden">
                        <thead>
                            <tr className="bg-blue-50 text-left text-gray-700">
                                <th className="p-4 font-semibold">Patient</th>
                                <th className="p-4 font-semibold">Contact</th>
                                <th className="p-4 font-semibold">Service</th>
                                <th className="p-4 font-semibold">Date & Time</th>
                                <th className="p-4 font-semibold">Status</th>
                                <th className="p-4 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => {
                                const conflicts = getConflictCount(item);
                                return (
                                    <tr key={item._id} className="border-t border-gray-100">
                                        <td className="p-4">
                                            <p className="font-semibold text-gray-900">{item.firstName} {item.lastName}</p>
                                            {conflicts > 1 && item.status === 'pending' && (
                                                <p className="text-amber-600 text-sm mt-1">{conflicts} requests for this slot</p>
                                            )}
                                        </td>
                                        <td className="p-4 text-gray-600">
                                            <p>{item.email}</p>
                                            <p>{item.phoneNo}</p>
                                        </td>
                                        <td className="p-4 text-gray-600">{item.ServiceCategory?.category || '—'}</td>
                                        <td className="p-4 text-gray-600">
                                            <p>{item.date?.slice(0, 10)}</p>
                                            <p>{item.time}</p>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${statusStyles[item.status]}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-wrap gap-2">
                                                {item.status === 'pending' && (
                                                    <>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleConfirm(item._id)}
                                                            disabled={actionLoading}
                                                            className="px-4 py-2 bg-green-600 text-white rounded-full text-sm font-semibold cursor-pointer hover:bg-green-700"
                                                        >
                                                            Accept
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => setRejectModal(item._id)}
                                                            className="px-4 py-2 bg-red-500 text-white rounded-full text-sm font-semibold cursor-pointer hover:bg-red-600"
                                                        >
                                                            Reject
                                                        </button>
                                                    </>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => setDeleteId(item._id)}
                                                    className="px-4 py-2 border border-gray-300 text-gray-600 rounded-full text-sm font-semibold cursor-pointer hover:bg-gray-50"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
            {rejectModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full">
                        <h3 className="text-xl font-bold mb-4">Reject Appointment</h3>
                        <textarea
                            value={rejectNote}
                            onChange={(e) => setRejectNote(e.target.value)}
                            rows={3}
                            placeholder="Optional note for patient"
                            className="w-full px-4 py-3 border border-gray-300 rounded-2xl mb-4 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                        <div className="flex gap-3 justify-end">
                            <button type="button" onClick={() => { setRejectModal(null); setRejectNote(''); }} className="px-6 py-3 rounded-full border border-gray-300 font-semibold cursor-pointer">
                                Cancel
                            </button>
                            <button type="button" onClick={handleReject} disabled={actionLoading} className="btn-primary">
                                <span className="relative z-10">{actionLoading ? 'Rejecting...' : 'Reject'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <ConfirmModal
                isOpen={!!deleteId}
                title="Delete Appointment"
                message="Are you sure you want to permanently delete this appointment?"
                confirmText="Delete"
                loading={actionLoading}
                onConfirm={handleDelete}
                onCancel={() => setDeleteId(null)}
            />
        </div>
    );
}

export default AdminAppointments;
