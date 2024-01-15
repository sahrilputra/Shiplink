'use client'
import React, { createContext, useState } from 'react';

// Create the modal context
export const ModalContext = createContext();

// Create the modal provider component
export const ModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Function to open the modal
    const openModal = () => {
        console.log('openModal')
        setIsOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        console.log('closeModal')
        setIsOpen(false);
    };

    return (
        <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};

