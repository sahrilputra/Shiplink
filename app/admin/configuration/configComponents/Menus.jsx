import React from 'react'

export const Menus = ({ title, children }) => {
    return (
        <div className="flex flex-row">
            {children}
        </div>
    )
}
