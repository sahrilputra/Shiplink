import React from 'react'
import { Menus } from './Menus'
import { MenuItems } from './MenusItem'
import { useRouter, usePathname } from 'next/navigation';

export const SupportTicketsMenus = ({ selectedTab, isSelected }) => {
    const handleTabClick = (tabName) => {
        selectedTab(tabName);
    }
    return (
        <Menus>
            <div className="">
                <button
                    className={`${isSelected === "Open" ? "border-b border-blue-900 font-bold   text-myBlue" : "text-sm  text-zinc-800 font-light"} text-sm  px-[15px] h-[25px] flex-col justify-center items-center gap-1 inline-flex`}
                    onClick={() => handleTabClick("Open")}
                >
                    <div className="">Open</div>
                </button>
            </div>
            <div className="">
                <button
                    onClick={() => handleTabClick("Close")}
                    className={`${isSelected === "Close" ? "border-b border-blue-900 font-bold  text-myBlue" : "text-zinc-800 font-light"} text-sm  px-[15px] h-[25px] flex-col justify-center items-center gap-1 inline-flex`}
                >
                    <div className="">Close</div>
                </button>
            </div>
        </Menus>
    )
}
