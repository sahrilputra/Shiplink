
// ContentContext.js
import React, { createContext, useContext, useState } from 'react';

const DeclareContentContext = createContext();

export const useDeclareContentContext = () => {
    const context = useContext(DeclareContentContext);
    if (!context) {
        throw new Error('useDeclareContentContext must be used within a DeclareContentProvider');
    }
    return context;
};

export const DeclareContentProvider = ({ children }) => {
    const [declareContent, setDeclareContent] = useState([
        {
            itemID: 1,
            value: '',
            description: '',
            hsDescription: '',
            hsCode: '',
            madeIn: '',
        }
    ]);
    const addContent = () => {
        setDeclareContent(prevContent => [...prevContent,
        {
            itemID: prevContent.length,
            value: '',
            description: '',
            hsDescription: '',
            hsCode: '',
            madeIn: '',
        }
        ]);
    };

    const calculateTotal = () => {
        return declareContent.reduce((acc, item) => acc + parseFloat(item.value || 0), 0);
    };
    const removeContent = index => {
        setDeclareContent(prevContent =>
            prevContent.filter((_, i) => i !== index)
                .map((item, i) => ({ ...item, itemID: i + 1 })) // Update itemID
        );
    };
    return (
        <DeclareContentContext.Provider
            value={{ declareContent, addContent, removeContent }}
        >
            {children}
        </DeclareContentContext.Provider>
    );

};


// const addContent = () => {
//     form.setValue('DeclareContet', (prevDeclareContent) => [
//         ...prevDeclareContent,
//         {
//             itemID: "", // Generate unique ID for each item
//             qty: "",
//             value: "",
//             description: "",
//             hsDescription: "",
//             hsCode: "",
//             madeIn: "",
//         },
//     ]);
// };

