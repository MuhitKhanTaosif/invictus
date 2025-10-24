import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token'));

    // Set up axios defaults
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);

    // Verify token on app load
    useEffect(() => {
        const verifyToken = async () => {
            if (token) {
                try {
                    const response = await axios.get('http://localhost:5002/api/auth/verify');
                    setUser(response.data.user);
                } catch (error) {
                    console.error('Token verification failed:', error);
                    logout();
                }
            }
            setLoading(false);
        };

        verifyToken();
    }, [token]);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5002/api/auth/login', {
                email,
                password
            });

            const { token: newToken, user: userData } = response.data;

            // Update state immediately
            setToken(newToken);
            setUser(userData);
            localStorage.setItem('token', newToken);
            
            // Set axios default header immediately
            axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

            return { success: true };
        } catch (error) {
            console.error('Login failed:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
    };

    const changePassword = async (currentPassword, newPassword) => {
        try {
            await axios.put('http://localhost:5002/api/auth/change-password', {
                currentPassword,
                newPassword
            });
            return { success: true };
        } catch (error) {
            console.error('Password change failed:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Password change failed'
            };
        }
    };

    const value = {
        user,
        token,
        loading,
        login,
        logout,
        changePassword,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};



