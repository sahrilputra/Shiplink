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
          className={`${isSelected === "Pending" ? "border-b border-blue-900 font-bold   text-myBlue" : "text-sm  text-zinc-800 font-light"} text-sm  px-[15px] h-[25px] flex-col justify-center items-center gap-1 inline-flex`}
          onClick={() => handleTabClick("Pending")}
        >
          <div className="">Pending</div>
        </button>
      </div>
      <div className="">
        <button
          onClick={() => handleTabClick("Complete")}
          className={`${isSelected === "Complete" ? "border-b border-blue-900 font-bold  text-myBlue" : "text-zinc-800 font-light"} text-sm  px-[15px] h-[25px] flex-col justify-center items-center gap-1 inline-flex`}
        >
          <div className="">Completed</div>
        </button>
      </div>
    </Menus>
  )
}
