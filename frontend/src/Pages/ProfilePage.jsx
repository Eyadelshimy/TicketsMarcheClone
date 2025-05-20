import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import '../assets/css/profile.css';

const EditProfileModal = ({ user, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: user.name || '',
        email: user.email || '',
        profilePicture: user.profilePicture || ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState(user.profilePicture || '');
    const { user: authUser } = useAuth();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                setFormData({
                    ...formData,
                    profilePicture: reader.result
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const authToken = localStorage.getItem('auth_token');
            
            const response = await fetch('http://localhost:5000/api/v1/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authToken ? `Bearer ${authToken}` : '',
                },
                body: JSON.stringify(formData),
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                onSave(authUser ? { ...authUser, ...formData } : formData);
                onClose();
            } else {
                setError(data.message || 'Failed to update profile');
            }
        } catch (error) {
            setError('Network error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-container">
                <div className="auth-modal">
                    <button className="close-button" onClick={onClose}>×</button>
                    <h2>Edit Profile</h2>
                    <p className="auth-subtitle">Update your profile information</p>
                    
                    {error && <div className="alert alert-danger">{error}</div>}
                    
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="profile-picture-upload">
                            <div className="profile-picture-preview">
                                {previewImage ? (
                                    <img src={previewImage} alt="Profile" />
                                ) : (
                                    <div className="avatar-placeholder">
                                        <span className="avatar-text">{formData.name ? formData.name[0].toUpperCase() : '?'}</span>
                                    </div>
                                )}
                                <div className="upload-overlay">
                                    <span>Upload</span>
                                </div>
                            </div>
                            <input 
                                type="file" 
                                id="profilePicture" 
                                name="profilePicture" 
                                onChange={handleImageChange} 
                                accept="image/*" 
                                className="profile-picture-input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <button 
                            type="submit" 
                            className="btn-tm-primary btn-block"
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Save Changes'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const ProfilePage = () => {
    const { user } = useAuth();
    const [showEditModal, setShowEditModal] = useState(false);
    const [userData, setUserData] = useState({
        name: 'User',
        email: '',
        role: 'User',
        createdAt: new Date().toISOString()
    });
    
    useEffect(() => {
        if (user) {
            let userRole = user.role || 'User';
            
            if (userRole === 'user' || userRole === 'admin' || userRole === 'organizer') {
                userRole = userRole.charAt(0).toUpperCase() + userRole.slice(1);
            }
            
            setUserData({
                ...user,
                name: user.name || 'User',
                email: user.email || '',
                profilePicture: user.profilePicture || '',
                createdAt: user.createdAt || new Date().toISOString(),
                role: userRole
            });
        }
    }, [user]);

    if (!user) {
        return (
            <div className="profile-page">
                <div className="profile-card">
                    <h2>Please log in</h2>
                    <p>You need to be logged in to view this page.</p>
                </div>
            </div>
        );
    }

    const handleSaveProfile = (updatedData) => {
        setUserData({
            ...userData,
            ...updatedData
        });
    };

    const memberSinceYear = userData.createdAt ? new Date(userData.createdAt).getFullYear() : new Date().getFullYear();
    const handleOpenModal = () => setShowEditModal(true);

    return (
        <div className="profile-page">
            {showEditModal && (
                <EditProfileModal 
                    user={userData}
                    onClose={() => setShowEditModal(false)}
                    onSave={handleSaveProfile}
                />
            )}
            
            <div className="profile-header-section">
                <div className="profile-avatar-container clickable" onClick={handleOpenModal}>
                    {userData.profilePicture ? (
                        <img src={userData.profilePicture} alt="Profile" className="profile-image" />
                    ) : (
                        <div className="profile-avatar-placeholder">
                            <span className="avatar-text">{userData.name ? userData.name[0].toUpperCase() : '?'}</span>
                        </div>
                    )}
                </div>
                
                <div className="profile-header-content">
                    <h1 className="profile-name">
                        {userData.name}
                        <svg 
                            className="edit-name-icon" 
                            onClick={handleOpenModal}
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </h1>
                    <p className="profile-member-since">Member Since {memberSinceYear}</p>
                
                    <div className="profile-contact-info">
                        <div className="contact-info-item">
                            <div className="contact-icon role-icon">
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 14.016q2.531 0 5.273 1.102t2.742 2.883v2.016h-16.031v-2.016q0-1.781 2.742-2.883t5.273-1.102zM12 12q-1.641 0-2.813-1.172t-1.172-2.813 1.172-2.836 2.813-1.195 2.813 1.195 1.172 2.836-1.172 2.813-2.813 1.172z"/>
                                </svg>
                            </div>
                            <p className="contact-text">{userData.role}</p>
                        </div>

                        <div className="contact-info-item">
                            <div className="contact-icon email-icon">
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm17 4.238l-7.928 7.1L4 7.216V19h16V7.238zM4.511 5l7.55 6.662L19.502 5H4.511z"/>
                                </svg>
                            </div>
                            <p className="contact-text">{userData.email}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="purchase-history-section">
                <h2 className="section-title">Purchase History</h2>
                <div className="purchase-history-content">
                    <div className="empty-purchases">
                        <p className="empty-purchases-text">You haven't purchased tickets for any upcoming events yet.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage; 