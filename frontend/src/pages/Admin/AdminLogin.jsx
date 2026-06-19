import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { toast } from 'react-toastify';
import { loginAdmin, clearAuthError } from '../../redux/features/auth/authSlice';
import Denture from '../../assets/images/Denture_Logo.svg';

function AdminLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, user, sessionChecked } = useSelector((state) => state.auth);
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        if (sessionChecked && user) {
            navigate('/admin/dashboard', { replace: true });
        }
    }, [user, sessionChecked, navigate]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearAuthError());
        }
    }, [error, dispatch]);

    const onSubmit = (data) => {
        dispatch(loginAdmin(data))
            .unwrap()
            .then(() => {
                toast.success('Welcome back!');
                navigate('/admin/dashboard');
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl p-8 md:p-12 w-full max-w-md shadow-lg"
            >
                <div className="flex justify-center mb-8">
                    <LazyLoadImage src={Denture} alt="Denture Dental Clinic" width="175" height="50" />
                </div>
                <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">Admin Login</h1>
                <p className="text-gray-600 text-center mb-8">Sign in to manage your clinic</p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <input
                        {...register('email', { required: true })}
                        type="email"
                        placeholder="Admin Email"
                        className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                        {...register('password', { required: true })}
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <button type="submit" disabled={loading} className="btn-primary w-full">
                        <span className="relative z-10">{loading ? 'Signing in...' : 'Sign In'}</span>
                    </button>
                </form>
            </motion.div>
        </div>
    );
}

export default AdminLogin;
