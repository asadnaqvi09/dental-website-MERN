import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const categories = [
    'Pediatric Dentistry',
    'Orthodontics',
    'Precision Dentures',
    'Cosmetic Dentistry',
    'Restorative Dentistry',
    'Specialized Services',
];

function ServiceFormModal({ isOpen, onClose, onSubmit, initialData = null, loading = false }) {
    const [form, setForm] = useState({
        category: '',
        description: '',
        price: '',
        subCat: '',
        img_url: '',
    });
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        if (initialData) {
            setForm({
                category: initialData.category || '',
                description: initialData.description || '',
                price: initialData.price || '',
                subCat: Array.isArray(initialData.subCat) ? initialData.subCat.join(', ') : '',
                img_url: initialData.img_url || '',
            });
        } else {
            setForm({ category: '', description: '', price: '', subCat: '', img_url: '' });
        }
        setImageFile(null);
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('category', form.category);
        data.append('description', form.description);
        data.append('price', form.price);
        data.append('subCat', JSON.stringify(form.subCat.split(',').map((s) => s.trim()).filter(Boolean)));
        if (imageFile) {
            data.append('img_url', imageFile);
        } else if (form.img_url && !initialData) {
            data.append('img_url', form.img_url);
        } else if (form.img_url && initialData && form.img_url !== initialData.img_url) {
            data.append('img_url', form.img_url);
        }
        onSubmit(data);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 overflow-y-auto py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-xl"
            >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {initialData ? 'Edit Service' : 'Add Service'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                        rows={4}
                        placeholder="Description (min 50 characters)"
                        className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    />
                    <input
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        required
                        placeholder="Price"
                        className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                        name="subCat"
                        value={form.subCat}
                        onChange={handleChange}
                        placeholder="Sub categories (comma separated)"
                        className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl"
                    />
                    {!imageFile && (
                        <input
                            name="img_url"
                            value={form.img_url}
                            onChange={handleChange}
                            placeholder="Or paste image URL"
                            className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    )}
                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose} className="flex-1 px-6 py-3 rounded-full border border-gray-300 text-gray-700 font-semibold cursor-pointer">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} className="flex-1 btn-primary">
                            <span className="relative z-10">{loading ? 'Saving...' : 'Save'}</span>
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}

export default ServiceFormModal;
