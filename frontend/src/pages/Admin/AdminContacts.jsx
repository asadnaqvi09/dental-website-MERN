import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ConfirmModal from '../../components/admin/ConfirmModal';
import { fetchContacts, deleteContact } from '../../redux/features/contacts/contactsSlice';

function AdminContacts() {
    const dispatch = useDispatch();
    const { data, loading } = useSelector((state) => state.contacts);
    const [viewContact, setViewContact] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    const handleDelete = () => {
        if (!deleteId) return;
        dispatch(deleteContact(deleteId))
            .unwrap()
            .then(() => {
                toast.success('Contact deleted');
                setDeleteId(null);
            })
            .catch((err) => toast.error(err));
    };

    return (
        <div className="bg-blue-500/10 rounded-3xl py-10 px-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Contacts</h1>
            {loading ? (
                <p className="text-gray-500 text-center py-10">Loading contacts...</p>
            ) : data.length === 0 ? (
                <p className="text-gray-500 text-center py-10">No contact messages yet</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full bg-white rounded-2xl overflow-hidden">
                        <thead>
                            <tr className="bg-blue-50 text-left text-gray-700">
                                <th className="p-4 font-semibold">Name</th>
                                <th className="p-4 font-semibold">Email</th>
                                <th className="p-4 font-semibold">Phone</th>
                                <th className="p-4 font-semibold">Date</th>
                                <th className="p-4 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item._id} className="border-t border-gray-100">
                                    <td className="p-4 font-semibold text-gray-900">{item.firstName} {item.lastName}</td>
                                    <td className="p-4 text-gray-600">{item.email}</td>
                                    <td className="p-4 text-gray-600">{item.phoneNo}</td>
                                    <td className="p-4 text-gray-600">{new Date(item.createdAt).toLocaleDateString()}</td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setViewContact(item)}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold cursor-pointer hover:bg-blue-700"
                                            >
                                                View
                                            </button>
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
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {viewContact && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="bg-white rounded-3xl p-8 max-w-lg w-full">
                        <h3 className="text-xl font-bold mb-4">Message from {viewContact.firstName}</h3>
                        <div className="space-y-2 text-gray-600 mb-4">
                            <p><strong>Email:</strong> {viewContact.email}</p>
                            <p><strong>Phone:</strong> {viewContact.phoneNo}</p>
                        </div>
                        <div className="bg-blue-50 rounded-2xl p-4 text-gray-700 mb-6">{viewContact.message}</div>
                        <button type="button" onClick={() => setViewContact(null)} className="btn-primary w-full">
                            <span className="relative z-10">Close</span>
                        </button>
                    </div>
                </div>
            )}
            <ConfirmModal
                isOpen={!!deleteId}
                title="Delete Contact"
                message="Are you sure you want to delete this contact message?"
                confirmText="Delete"
                onConfirm={handleDelete}
                onCancel={() => setDeleteId(null)}
            />
        </div>
    );
}

export default AdminContacts;
