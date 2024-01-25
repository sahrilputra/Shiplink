import React from 'react'
import NextLink from 'next/link';

export const MenuItems = ({ title, isActive, onClick }) => {
    const toggleHandler = (title) => {
        onClick(title);
    }
    return (
        <div>
            {isActive ? (
                <button
                    className="px-[15px] h-[25px] flex-col justify-center items-center gap-1 inline-flex border-b border-blue-900"
                    onClick={onClick(title)}
                >
                    <div className="text-blue-900 text-sm font-normal">{title}</div>
                </button>
            ) : (
                <button
                    className="px-[15px] h-[25px] flex-col justify-center items-center gap-1 inline-flex"
                    onClick={onClick(title)}
                >
                    <div className="text-black text-sm ">{title}</div>
                </button>
            )}

        </div>
    )
}
