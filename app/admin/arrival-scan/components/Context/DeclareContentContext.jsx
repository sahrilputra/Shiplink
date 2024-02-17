import React, { createContext, useContext, useState } from 'react';

const DeclareContentContext = createContext();

export const useDeclareContentContext = () => useContext(DeclareContentContext);

export const DeclareContentProvider = ({ children }) => {
    const [inputCount, setInputCount] = useState(1);
    const [declareContent, setDeclareContent] = useState([]);

    const addContent = () => {
        setInputCount(prevCount => prevCount + 1);
        setDeclareContent(prevContent => [
            ...prevContent,
            {
                itemID: '',
                qty: '',
                value: '',
                description: '',
                hsDescription: '',
                hsCode: '',
                madeIn: '',
            },
        ]);
    };

    const calculateTotal = () => {
        return declareContent.reduce((acc, item) => acc + parseFloat(item.value || 0), 0);
    };

    const removeContent = index => {
        setInputCount(prevCount => prevCount - 1);
        setDeclareContent(prevContent =>
            prevContent.filter((_, i) => i !== index)
        );
    };

    return (
        <DeclareContentContext.Provider
            value={{ inputCount, setInputCount, declareContent, addContent, removeContent, calculateTotal }}
        >
            {children}
        </DeclareContentContext.Provider>
    );
};