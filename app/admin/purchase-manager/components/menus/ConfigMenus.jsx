import React from 'react'
import { Menus } from './Menus'
import { MenuItems } from './MenuItems'
import { useRouter, usePathname } from 'next/navigation';

export const AssitedMenus = ({ selectedTab, isSelected }) => {
  const handleTabClick = (tabName) => {
    selectedTab(tabName);
  }
  return (
    <Menus>
      <div className="">
        <button
          className={`${isSelected === "Clearance Pending" ? "border-b border-blue-900 font-bold   text-myBlue" : "text-sm  text-zinc-800 font-light"} text-sm  px-[15px] h-[25px] flex-col justify-center items-center gap-1 inline-flex`}
          onClick={() => handleTabClick("Clearance Pending")}
        >
          <div className="">Pending</div>
        </button>
      </div>
      <div className="">
        <button
          onClick={() => handleTabClick("Cleared Custom")}
          className={`${isSelected === "Cleared Custom" ? "border-b border-blue-900 font-bold  text-myBlue" : "text-zinc-800 font-light"} text-sm  px-[15px] h-[25px] flex-col justify-center items-center gap-1 inline-flex`}
        >
          <div className="">Cleared</div>
        </button>
      </div>
    </Menus>
  )
}
