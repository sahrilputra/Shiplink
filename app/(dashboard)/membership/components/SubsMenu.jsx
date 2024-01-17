import React from 'react'

export const SubsMenu = ({ title, icon, price, children, month }) => {
    return (
        <>
            <div className="container px-[10px] gap-2">
                <div className="title">
                    <div className="flex flex-row gap-2 justify-start items-center">
                        {icon}
                        <div className="text-zinc-600 text-lg font-semibold">{title} <span className=' font-light'></span></div>
                    </div>
                </div>
                <div className="price py-[10px]">
                    <div className="text-myBlue text-2xl font-bold">{price}</div>
                </div>
                <div className="items flex flex-col gap-1">
                    {children}
                </div>
            </div>
        </>
    )
}
