import React from 'react'
import { Menus } from './Menus'
import { MenuItems } from './MenuItems'
import { useRouter, usePathname } from 'next/navigation';

export const ConfigMenus = () => {
  const router = usePathname();
  console.log(router)
  return (
    <Menus>
      <MenuItems
        isActive={router === "/admin/configuration"}
        title="Carrier"
        href="/admin/configuration"
      />
      <MenuItems
        isActive={router === "/admin/configuration/tax"}
        title="Tax"
        href="/admin/configuration/tax"
      />
      <MenuItems
        isActive={router === "/admin/configuration/countries"}
        title="Countries"
        href="/admin/configuration/countries"
      />
      <MenuItems
        isActive={router === "/admin/configuration/province"}
        title="Province"
        href="/admin/configuration/province"
      />
      <MenuItems
        isActive={router === "/admin/configuration/services"}
        title="Services"
        href="/admin/configuration/services"
      />
      <MenuItems
        isActive={router === "/admin/configuration/payments"}
        title="Payments"
        href="/admin/configuration/payments"
      />
    </Menus>
  )
}
