import React from 'react'
import NextLink from 'next/link';

export const MenuItems = ({ title, isActive, href }) => {
    return (
        <NextLink
            href={href}
        >

            {isActive ? (
                <button className="px-[15px] h-[25px] flex-col justify-center items-center gap-1 inline-flex border-b border-secondary">
                    <div className="text-secondary text-sm font-medium">{title}</div>
                </button>
            ) : (
                <button className="px-[15px] h-[25px] flex-col justify-center items-center gap-1 inline-flex">
                    <div className="text-black text-sm font-normal">{title}</div>
                </button>
            )}

        </NextLink>
    )
}
