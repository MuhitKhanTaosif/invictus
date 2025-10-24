import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { useAuth } from '../../Context/AuthContext';
import { toast } from 'react-toastify';

export default function AdminLoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const { login, isAuthenticated, user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/admin-invictus/application-state';

    // Redirect if already authenticated and is admin
    if (isAuthenticated && user?.role?.toLowerCase() === 'admin') {
        return <Navigate to={from} replace />;
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await login(formData.email, formData.password);

            if (result.success) {
                toast.success('Admin login successful!');
                console.log('Login successful, navigating to dashboard...');
                // Navigate immediately after successful login
                navigate('/admin-invictus/application-state', { replace: true });
            } else {
                toast.error(result.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error('An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-700 p-5">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white rounded-3xl p-10 w-full max-w-md shadow-strong"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-primary-600 text-3xl font-bold mb-2 font-heading">
                        Invictus Solutions
                    </h1>
                    <p className="text-neutral-600 text-sm">Admin Panel</p>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-semibold text-neutral-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl text-base transition-colors duration-300 focus:outline-none focus:border-primary-500 disabled:bg-neutral-100 disabled:cursor-not-allowed"
                            placeholder="admin@invictus.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-semibold text-neutral-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl text-base transition-colors duration-300 focus:outline-none focus:border-primary-500 disabled:bg-neutral-100 disabled:cursor-not-allowed"
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary-500 text-white py-4 rounded-xl font-semibold text-base transition-colors duration-300 hover:bg-primary-600 disabled:bg-neutral-400 disabled:cursor-not-allowed shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40"
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </motion.button>
                </motion.form>
            </motion.div>
        </div>
    );
};




