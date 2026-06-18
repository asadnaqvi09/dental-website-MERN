import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminRoute from '../components/admin/AdminRoute';
import AdminLayout from '../components/admin/AdminLayout';
import AdminLogin from '../pages/Admin/AdminLogin';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import AdminAppointments from '../pages/Admin/AdminAppointments';
import AdminContacts from '../pages/Admin/AdminContacts';
import AdminServices from '../pages/Admin/AdminServices';

function AdminRoutes() {
    return (
        <Routes>
            <Route path="login" element={<AdminLogin />} />
            <Route element={<AdminRoute />}>
                <Route element={<AdminLayout />}>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="appointments" element={<AdminAppointments />} />
                    <Route path="contacts" element={<AdminContacts />} />
                    <Route path="services" element={<AdminServices />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default AdminRoutes;
