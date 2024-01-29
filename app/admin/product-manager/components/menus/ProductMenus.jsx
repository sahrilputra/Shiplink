import React from 'react'
import { Menus } from './Menus'
import { MenuItems } from './MenuItems'
import { useRouter, usePathname } from 'next/navigation';

export const ProductsMenus = () => {
  const router = usePathname();
  return (
    <Menus>
      <MenuItems
        isActive={router === "/admin/product-manager"}
        title="Products"
        href="/admin/product-manager"
      />
      <MenuItems
        isActive={router === "/admin/product-manager/services"}
        title="Services"
        href="/admin/product-manager/services"
      />
      <MenuItems
        isActive={router === "/admin/product-manager/categories"}
        title="Categories"
        href="/admin/product-manager/categories"
      />
    </Menus>
  )
}
