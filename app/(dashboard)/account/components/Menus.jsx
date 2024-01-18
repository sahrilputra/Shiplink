import React from 'react'

export const Menus = ({ children }) => {
    return (
        <div className="flex flex-col justify-start items-start w-full gap-2">
            {children}
        </div>
    )
}
