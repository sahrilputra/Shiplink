import React from 'react'
import { Menus } from './Menus'
import { MenuItems } from './MenuItems'
import { useRouter, usePathname } from 'next/navigation';

export const TransportMenus = () => {
  const router = usePathname();
  console.log(router)
  return (
    <Menus>
      <MenuItems
        isActive={router === "/admin/transport"}
        title="Single Item"
        href="/admin/transport"
      />
      <MenuItems
        isActive={router === "/admin/transport/lots"}
        title="Lots"
        href="/admin/transport/lots"
      />
    </Menus>
  )
}
