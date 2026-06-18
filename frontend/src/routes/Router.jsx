import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import AdminRoutes from './AdminRoutes';

function Router() {
    return (
        <Routes>
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="/*" element={<AppRoutes />} />
        </Routes>
    );
}

export default Router;
