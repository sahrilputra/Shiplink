import React from 'react'
import { Menus } from './Menus'
import { MenuItems } from './MenuItems'
import { useRouter, usePathname } from 'next/navigation';

export const CustomerManagerMenus = () => {
  const router = usePathname();
  return (
    <Menus>
      <MenuItems
        isActive={router === "/admin/customers-manager"}
        title="Customers"
        href="/admin/customers-manager"
      />
    </Menus>
  )
}
