import React from 'react'
import { Menus } from './Menus'
import { MenuItems } from './MenusItem'
import { useRouter, usePathname } from 'next/navigation';

export const VerificationMenus = ({ selectedTab, isSelected, handlerTab }) => {
    const handleTabClick = (tabName) => {
        selectedTab(tabName);
    }
    return (
        <Menus>
            <div className="">
                <button
                    onClick={() => handlerTab("Unverified")}
                    className={`${isSelected === "Unverified" ? "border-b border-blue-900 font-bold  text-myBlue" : "text-zinc-800 font-light"} text-sm  px-[15px] h-[25px] flex-col justify-center items-center gap-1 inline-flex`}
                >
                    <div className="">Unverified</div>
                </button>

            </div>
            <div className="">
                <button
                    onClick={() => handlerTab("Verified")}
                    className={`${isSelected === "Verified" ? "border-b border-blue-900 font-bold  text-myBlue" : "text-zinc-800 font-light"} text-sm  px-[15px] h-[25px] flex-col justify-center items-center gap-1 inline-flex`}
                >
                    <div className="">Verified</div>
                </button>
            </div>
            <div className="">
                <button
                    className={`${isSelected === "All" ? "border-b border-blue-900 font-bold   text-myBlue" : "text-sm  text-zinc-800 font-light"} text-sm  px-[15px] h-[25px] flex-col justify-center items-center gap-1 inline-flex`}
                    onClick={() => handlerTab("All")}
                >
                    <div className="">All</div>
                </button>
            </div>
        </Menus>
    )
}
