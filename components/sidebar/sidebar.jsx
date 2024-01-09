"use client"
import React from 'react'
import { SidebarMenu } from './sidebarMenu'
import { SidebarItem } from './sidebarItem'
import Image from 'next/image'
import { useRouter, usePathname } from "next/navigation";

export const Sidebar = () => {
    const router = usePathname();

    return (
        <>
            <aside className={`w-[280px] h-screen  px-[5px] pt-5 bg-white flex-col justify-start items-center gap-5 inline-flex`}>
                <div className={`flex gap-3 flex-col `}>
                    <div className="text-center text-red-700 text-[28px] font-bold font-['Poppins'] ">ShipLink</div>
                    <SidebarMenu title="" className="flex-col justify-start items-center flex">
                        <div className="flex-col justify-end items-start gap-2.5 flex">
                            <SidebarItem
                                isActive={router === "/dashboard"}
                                title="Dashboard"
                                icon={<Image
                                    src={"/Sidebar/dashboard.svg"}
                                    width={25}
                                    height={25}
                                    alt='dashboard icon'
                                />}
                                href="/dashboard"
                            />
                            <SidebarItem
                                isActive={router === "/shipping-mailbox"}
                                title="Shipping Mailbox"
                                icon={<Image
                                    src={"/Sidebar/IconShippingMailbox.svg"}
                                    width={25}
                                    height={25}
                                    alt='dashboard icon'
                                />}
                                href="#"
                            />

                            <SidebarItem
                                isActive={router === "/shipping-lebels"}
                                title="Shipping Lebels"
                                icon={<Image
                                    src={"/Sidebar/IconShippingLebel.svg"}
                                    width={25}
                                    height={25}
                                    alt='dashboard icon'
                                />}
                                href="#"
                            />
                            <SidebarItem
                                isActive={router === "/#"}
                                title="Saved Quotes"
                                icon={<Image
                                    src={"/Sidebar/IconSavedQuote.svg"}
                                    width={25}
                                    height={25}
                                    alt='dashboard icon'
                                />}
                                href="#"
                            />
                            <SidebarItem
                                isActive={router === "/#"}
                                title="Assisted Purchase"
                                icon={<Image
                                    src={"/Sidebar/IconAssistedPurhase.svg"}
                                    width={25}
                                    height={25}
                                    alt='Icon Assisted Purhase icon'
                                />}
                                href="#"
                            />
                        </div>
                    </SidebarMenu>
                    <SidebarMenu title="setting" className="flex-col justify-start items-center gap-2.5 flex">
                        <div className="flex-col justify-end items-start gap-2.5 flex">
                            <SidebarItem
                                isActive={router === "/#"}
                                title="Address Book"
                                icon={<Image
                                    src={"/Sidebar/IconMyAddresses.svg"}
                                    width={25}
                                    height={25}
                                    alt='Icon Assisted Purhase icon'
                                />}
                                href="#"
                            />

                            <SidebarItem
                                isActive={router === "/#"}
                                title="Saved Box Sizes"
                                icon={<Image
                                    src={"/Sidebar/IconSavedBox.svg"}
                                    width={25}
                                    height={25}
                                    alt='Icon Assisted Purhase icon'
                                />}
                                href="#"
                            />

                            <SidebarItem
                                isActive={router === "/#"}
                                title="Membership Plan"
                                icon={<Image
                                    src={"/Sidebar/IconReferFriend.svg"}
                                    width={25}
                                    height={25}
                                    alt='Icon Assisted Purhase icon'
                                />}
                                href="#"
                            />

                            <SidebarItem
                                isActive={router === "/#"}
                                title="Account Details"
                                icon={<Image
                                    src={"/Sidebar/IconAcountDetails.svg"}
                                    width={25}
                                    height={25}
                                    alt='Icon Assisted Purhase icon'
                                />}
                                href="#"
                            />

                            <SidebarItem
                                isActive={router === "/#"}
                                title="Billing History"
                                icon={<Image
                                    src={"/Sidebar/IconBillingHistory.svg"}
                                    width={25}
                                    height={25}
                                    alt='Icon Assisted Purhase icon'
                                />}
                                href="#"
                            />

                            <SidebarItem
                                isActive={router === "/#"}
                                title="Refer Friends"
                                icon={<Image
                                    src={"/Sidebar/IconReferFriend.svg"}
                                    width={25}
                                    height={25}
                                    alt='Icon Assisted Purhase icon'
                                />}
                                href="#"
                            />

                            <SidebarItem
                                isActive={router === "/#"}
                                title="Support"
                                icon={<Image
                                    src={"/Sidebar/IconSupport.svg"}
                                    width={25}
                                    height={25}
                                    alt='Icon Assisted Purhase icon'
                                />}
                                href="#"
                            />
                        </div>
                    </SidebarMenu>
                </div>
            </aside>

        </>
    )
}
