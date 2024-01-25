import React from 'react'
import { Menus } from './Menus'
import { MenuItems } from './MenusItem'
import { useRouter, usePathname } from 'next/navigation';

export const VerificationMenus = () => {
    const router = usePathname();
    console.log(router)
    return (
        <Menus>
            <MenuItems
                isActive={router === "/admin/verification"}
                title="All"
                href="/admin/verification"
            />
            <MenuItems
                isActive={router === "/admin/verification/verified"}
                title="Verified"
                href="/admin/verification/verified"
            />
            <MenuItems
                isActive={router === "/admin/verification/unverified"}
                title="Unvarified"
                href="/admin/verification/unverified"
            />
        </Menus>
    )
}
