import React from 'react'
import { Menus } from './Menus'
import { MenuItems } from './MenuItems'
import { useRouter, usePathname } from 'next/navigation';

export const ParsMenus = () => {
  const router = usePathname();
  console.log(router)
  return (
    <Menus>
      <MenuItems
        isActive={router === "/admin/PARS"}
        title="Create Number"
        href="/admin/PARS"
      />
      <MenuItems
        isActive={router === "/admin/PARS/assignments"}
        title="Assignments"
        href="/admin/PARS/assignments"
      />
    </Menus>
  )
}
