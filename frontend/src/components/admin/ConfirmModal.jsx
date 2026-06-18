import React from 'react';
import { motion } from 'framer-motion';

function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Confirm', loading = false }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl p-8 max-w-md w-full shadow-xl"
            >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-600 mb-6">{message}</p>
                <div className="flex gap-3 justify-end">
                    <button type="button" onClick={onCancel} className="px-6 py-3 rounded-full border border-gray-300 text-gray-700 font-semibold cursor-pointer">
                        Cancel
                    </button>
                    <button type="button" onClick={onConfirm} disabled={loading} className="btn-primary">
                        <span className="relative z-10">{loading ? 'Processing...' : confirmText}</span>
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

export default ConfirmModal;
