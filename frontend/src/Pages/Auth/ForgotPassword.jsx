import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../assets/css/auth.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const response = await axios.post(
                'http://localhost:5000/api/v1/forgot-password',
                { email },
                { withCredentials: true }
            );

            setMessage(response.data.message || 'Password reset link sent to your email!');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send reset link. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Forgot Password</h2>
                <p className="auth-subtitle">
                    Enter your email address and we'll send you a link to reset your password.
                </p>

                {message && (
                    <div className="alert alert-success">
                        <i className="fas fa-check-circle me-2"></i>
                        {message}
                    </div>
                )}
                
                {error && (
                    <div className="alert alert-danger">
                        <i className="fas fa-exclamation-circle me-2"></i>
                        {error}
                    </div>
                )}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="fas fa-envelope"></i>
                            </span>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder="Enter your registered email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-actions mt-4">
                        <button 
                            type="submit" 
                            className="btn btn-tm-primary btn-block"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-paper-plane me-2"></i>
                                    Send Reset Link
                                </>
                            )}
                        </button>
                    </div>

                    <div className="auth-links text-center mt-4">
                        <Link to="/login" className="back-to-login-btn">
                            <i className="fas fa-arrow-left"></i>
                            Back to Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword; 