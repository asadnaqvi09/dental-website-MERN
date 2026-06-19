import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AdminRoute() {
    const { user, sessionChecked, loading } = useSelector((state) => state.auth);

    if (!sessionChecked || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-blue-50">
                <p className="text-gray-600 font-medium">Checking session...</p>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
}

export default AdminRoute;
