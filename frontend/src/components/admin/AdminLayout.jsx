import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { LogOut } from 'lucide-react';
import { logoutAdmin } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import Denture from '../../assets/images/Denture_Logo.svg';

const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Appointments', path: '/admin/appointments' },
    { name: 'Contacts', path: '/admin/contacts' },
    { name: 'Services', path: '/admin/services' },
];

function AdminLayout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logoutAdmin())
            .unwrap()
            .then(() => {
                toast.success('Logged out successfully');
                navigate('/admin/login');
            });
    };

    return (
        <div className="min-h-screen bg-white">
            <section className="navbar md:mx-6 md:my-4 px-4 md:px-10 py-6 md:rounded-2xl flex justify-between items-center bg-blue-50">
                <div className="flex items-center gap-6">
                    <LazyLoadImage src={Denture} alt="Denture Dental Clinic" width="175" height="50" />
                    <span className="hidden md:block text-blue-600 font-semibold text-lg">Admin Panel</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-gray-700 font-medium hidden sm:block">{user?.userName}</span>
                    <button type="button" onClick={handleLogout} className="btn-secondary flex items-center gap-2">
                        <span className="relative z-10 flex items-center gap-2">
                            <LogOut size={18} />
                            Logout
                        </span>
                    </button>
                </div>
            </section>
            <div className="md:mx-6 mx-4 flex flex-col md:flex-row gap-6 mb-8">
                <aside className="md:w-64 bg-blue-50 rounded-2xl p-4 h-fit">
                    <nav className="flex md:flex-col gap-2 overflow-x-auto">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    isActive
                                        ? 'text-blue-600 font-semibold py-3 px-4 bg-white rounded-xl whitespace-nowrap'
                                        : 'text-gray-700 hover:text-blue-600 font-medium py-3 px-4 hover:bg-white rounded-xl transition-colors whitespace-nowrap'
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </nav>
                </aside>
                <motion.main
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="flex-1"
                >
                    <Outlet />
                </motion.main>
            </div>
        </div>
    );
}

export default AdminLayout;
