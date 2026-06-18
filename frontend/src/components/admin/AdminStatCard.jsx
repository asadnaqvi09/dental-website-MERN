import React from 'react';
import { motion } from 'framer-motion';

function AdminStatCard({ title, value, accent = 'blue' }) {
    const colors = {
        blue: 'text-blue-600 bg-blue-100',
        amber: 'text-amber-600 bg-amber-100',
        green: 'text-green-600 bg-green-100',
        gray: 'text-gray-600 bg-gray-100',
    };
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-6 shadow-sm border border-blue-50"
        >
            <p className="text-gray-600 font-medium mb-2">{title}</p>
            <p className={`text-3xl font-bold inline-block px-4 py-2 rounded-2xl ${colors[accent]}`}>{value}</p>
        </motion.div>
    );
}

export default AdminStatCard;
