import React, { createContext, useContext, useState, useEffect } from 'react';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    const openLoginModal = () => {
        setIsLoginModalOpen(true);
        setIsRegisterModalOpen(false);
    };

    const openRegisterModal = () => {
        setIsRegisterModalOpen(true);
        setIsLoginModalOpen(false);
    };

    const closeModals = () => {
        setIsLoginModalOpen(false);
        setIsRegisterModalOpen(false);
    };

    // Watch for route changes and auth state changes
    useEffect(() => {
        const handleRouteChange = () => {
            // Close modals when route changes (like after logout)
            closeModals();
        };

        window.addEventListener('popstate', handleRouteChange);
        
        return () => {
            window.removeEventListener('popstate', handleRouteChange);
        };
    }, []);

    return (
        <ModalContext.Provider
            value={{
                isLoginModalOpen,
                isRegisterModalOpen,
                openLoginModal,
                openRegisterModal,
                closeModals
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export default ModalContext; 