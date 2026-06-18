import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AdminRoute() {
    const { token } = useSelector((state) => state.auth);
    if (!token) {
        return <Navigate to="/admin/login" replace />;
    }
    return <Outlet />;
}

export default AdminRoute;
