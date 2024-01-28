import React from 'react'
import { Menus } from './Menus'
import { MenuItems } from './MenusItem'
import { useRouter, usePathname } from 'next/navigation';

export const BinMenus = ({ selectedTab, isSelected }) => {
    const handleTabClick = (tabName) => {
        selectedTab(tabName);
    }
    return (
        <Menus>
            <div className="">
                <button
                    className={`${isSelected === "Bin" ? "border-b border-blue-900 font-bold   text-myBlue" : "text-sm  text-zinc-800 font-light"} text-sm  px-[15px] h-[25px] flex-col justify-center items-center gap-1 inline-flex`}
                    onClick={() => handleTabClick("Bin")}
                >
                    <div className="">Bin</div>
                </button>
            </div>
            <div className="">
                <button
                    onClick={() => handleTabClick("Unassigned")}
                    className={`${isSelected === "Unassigned" ? "border-b border-blue-900 font-bold  text-myBlue" : "text-zinc-800 font-light"} text-sm  px-[15px] h-[25px] flex-col justify-center items-center gap-1 inline-flex`}
                >
                    <div className="">Unassigned</div>
                </button>
            </div>
        </Menus>
    )
}
