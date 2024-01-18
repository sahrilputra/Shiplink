import React from 'react'
import { Menus } from './Menus'
import { MenusItem } from './MenusItem'
import { SettingsIcon, MoneyIcons } from '@/components/icons/iconCollection'
import { useRouter, usePathname } from 'next/navigation';
import { BellIcon } from 'lucide-react'
export const MenusComponents = () => {
    const router = usePathname();
    return (
        <div className="p-3">
            <Menus>
                <MenusItem
                    className='p-3'
                    isActive={router === ("/account")}
                    href={'/account'}
                    title={'Setting Profiles'}
                    icon={<SettingsIcon width={20} height={20} />}
                />
                <MenusItem
                    isActive={router === "/account/notification"}
                    href={'/account/notification'}
                    title={'Notification'}
                    icon={<BellIcon width={20} height={20} />}
                />
                <MenusItem
                    isActive={router === "/account/billing"}
                    href={'/account/billing'}
                    title={'Billing'}
                    icon={<MoneyIcons width={20} height={20} />}
                />
            </Menus>
        </div>
    )
}
