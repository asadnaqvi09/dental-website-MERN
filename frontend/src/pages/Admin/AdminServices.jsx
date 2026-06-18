import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ConfirmModal from '../../components/admin/ConfirmModal';
import ServiceFormModal from '../../components/admin/ServiceFormModal';
import {
    fetchAdminServices,
    createAdminService,
    updateAdminService,
    deleteAdminService,
} from '../../redux/features/Admin/adminServiceSlice';

function AdminServices() {
    const dispatch = useDispatch();
    const { data, loading, actionLoading } = useSelector((state) => state.adminServices);
    const [modalOpen, setModalOpen] = useState(false);
    const [editService, setEditService] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        dispatch(fetchAdminServices());
    }, [dispatch]);

    const handleSubmit = (formData) => {
        if (editService) {
            dispatch(updateAdminService({ id: editService._id, formData }))
                .unwrap()
                .then(() => {
                    toast.success('Service updated');
                    setModalOpen(false);
                    setEditService(null);
                })
                .catch((err) => toast.error(err));
        } else {
            dispatch(createAdminService(formData))
                .unwrap()
                .then(() => {
                    toast.success('Service created');
                    setModalOpen(false);
                })
                .catch((err) => toast.error(err));
        }
    };

    const handleDelete = () => {
        if (!deleteId) return;
        dispatch(deleteAdminService(deleteId))
            .unwrap()
            .then(() => {
                toast.success('Service deleted');
                setDeleteId(null);
            })
            .catch((err) => toast.error(err));
    };

    return (
        <div className="bg-blue-500/10 rounded-3xl py-10 px-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Services</h1>
                <button
                    type="button"
                    onClick={() => { setEditService(null); setModalOpen(true); }}
                    className="btn-primary"
                >
                    <span className="relative z-10">Add Service</span>
                </button>
            </div>
            {loading ? (
                <p className="text-gray-500 text-center py-10">Loading services...</p>
            ) : data.length === 0 ? (
                <p className="text-gray-500 text-center py-10">No services yet</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {data.map((service) => (
                        <div key={service._id} className="bg-white rounded-3xl p-6 shadow-sm">
                            <img src={service.img_url} alt={service.category} className="w-full h-40 object-contain mb-4 rounded-2xl" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{service.category}</h3>
                            <p className="text-blue-600 font-semibold mb-2">{service.price}</p>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{service.description}</p>
                            {Array.isArray(service.subCat) && service.subCat.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {service.subCat.map((tag, i) => (
                                        <span key={i} className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-full">{tag}</span>
                                    ))}
                                </div>
                            )}
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => { setEditService(service); setModalOpen(true); }}
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold cursor-pointer hover:bg-blue-700"
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setDeleteId(service._id)}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-600 rounded-full text-sm font-semibold cursor-pointer hover:bg-gray-50"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <ServiceFormModal
                isOpen={modalOpen}
                onClose={() => { setModalOpen(false); setEditService(null); }}
                onSubmit={handleSubmit}
                initialData={editService}
                loading={actionLoading}
            />
            <ConfirmModal
                isOpen={!!deleteId}
                title="Delete Service"
                message="Are you sure you want to delete this service?"
                confirmText="Delete"
                onConfirm={handleDelete}
                onCancel={() => setDeleteId(null)}
            />
        </div>
    );
}

export default AdminServices;
