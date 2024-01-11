import React from 'react'

export const Menus = ({ title, children }) => {
    return (
        <div className="flex flex-col">
            {children}
        </div>
    )
}
