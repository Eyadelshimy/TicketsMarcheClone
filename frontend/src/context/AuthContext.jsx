import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Check if user is already logged in on page load
    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                // First check if we have a token in localStorage (remember me was checked)
                const savedToken = localStorage.getItem('auth_token');
                
                const response = await fetch('http://localhost:5000/api/v1/users/me', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': savedToken ? `Bearer ${savedToken}` : '',
                    },
                    credentials: 'include', // to send cookies
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData.data);
                }
            } catch (error) {
                console.error('Error checking authentication status:', error);
                // Clear potentially invalid token
                localStorage.removeItem('auth_token');
            } finally {
                setLoading(false);
            }
        };

        checkLoggedIn();
    }, []);

    // Login function
    const login = async (email, password, rememberMe = false) => {
        try {
            const response = await fetch('http://localhost:5000/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, rememberMe }),
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data.data);
                
                // If remember me is checked, store the token in localStorage
                if (rememberMe && data.token) {
                    localStorage.setItem('auth_token', data.token);
                } else {
                    // Ensure we remove any previous token if remember me is not checked
                    localStorage.removeItem('auth_token');
                }
                
                return { success: true };
            } else {
                return { success: false, message: data.message || 'Login failed' };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'Network error occurred' };
        }
    };

    // Register function
    const register = async (userData) => {
        try {
            // Make sure role follows the correct capitalization format when sending to backend
            const modifiedUserData = { ...userData };
            
            const response = await fetch('http://localhost:5000/api/v1/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(modifiedUserData),
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data.data);
                
                // Store token if provided with registration
                if (data.token) {
                    localStorage.setItem('auth_token', data.token);
                }
                
                return { success: true };
            } else {
                return { success: false, message: data.message || 'Registration failed' };
            }
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, message: 'Network error occurred' };
        }
    };

    // Logout function
    const logout = async () => {
        try {
            await fetch('http://localhost:5000/api/v1/logout', {
                method: 'POST',
                credentials: 'include',
            });
            setUser(null);
            // Clear the stored token on logout
            localStorage.removeItem('auth_token');
            // Navigate to home page after logout
            navigate('/', { replace: true });
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext; 