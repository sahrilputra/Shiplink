"use client";
import React from "react";
import { SidebarMenu } from "./sidebarMenu";
import { SidebarItem } from "./sidebarItem";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import styles from "./styles.module.scss";
import { ScrollArea } from "../ui/scroll-area";
import {
    ArrivalIcon, VerificationIcon, TransportIcon, ParsIcon,
    CustomBrokerIcon, CustomClearanceIcon, DestinationIcon, BinManagerIcon,
    InvoiceManagerIcon, AssistedPurchaseIcon, SupportTickets, WarehouseIcons, ProductManagerIcon,
    CustomerManagerIcon, UserPemissionIcon, ConfigIcon
} from './icon/adminIcon'

import { useMediaQuery } from "react-responsive";
export const AdminSidebar = () => {
    const router = usePathname();
    // w-[280px] min-h-max px-[5px]
    // min-h-max bg-white flex-col justify-start items-center gap-5 inline-flex

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const isTable = useMediaQuery({ query: '(min-width: 1025px)' })
    const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' })

    return (
        <>
            <aside
                className={`pt-5 flex-col justify-start items-center gap-5 flex
             ${styles.sideBarRespon} 
             `}
            >
                <ScrollArea className="h-[100vh]">
                    <div className={` flex gap-3 flex-col pb-[100px] `}>
                        <div className={`text-center text-red-700 text-[28px] font-bold font-['Poppins'] ${styles.logo} `}>ShipLink</div>
                        <SidebarMenu title="" className="flex-col justify-start items-center flex">
                            <div className="flex-col justify-end items-start gap-2.5 flex">
                                <SidebarItem
                                    isActive={router === "/admin/dashboard"}
                                    title="Arrival Scan"
                                    icon={
                                        <ArrivalIcon
                                            className="w-[25px] h-[25px] relative"
                                        />}
                                    href="/admin/dashboard"
                                />
                                <SidebarItem
                                    isActive={router === "/mailbox"}
                                    title="Verification"
                                    icon={
                                        <VerificationIcon width={25} height={25} />
                                    }
                                    href="/mailbox"
                                />

                                <SidebarItem
                                    isActive={router === "/shipping-lebels"}
                                    title="PARS Management"
                                    icon={<ParsIcon className={"h-[25px] w-[25px]"} />}
                                    href="/shipping-lebels"
                                />
                                <SidebarItem
                                    isActive={router === "/saved-quotes"}
                                    title="Custom Broker"
                                    icon={<CustomBrokerIcon
                                        width={25}
                                        height={25}
                                    />}
                                    href="/saved-quotes"
                                />
                                <SidebarItem
                                    isActive={router === "/assisted-purchase"}
                                    title="Transport Preparation"
                                    icon={<TransportIcon
                                        width={25}
                                        height={25}
                                    />}
                                    href="/assisted-purchase"
                                />
                                <SidebarItem
                                    isActive={router === "/assisted-purchase"}
                                    title="Custom Clearance"
                                    icon={<CustomClearanceIcon
                                        width={25}
                                        height={25}
                                        className="relative"
                                    />}
                                    href="/assisted-purchase"
                                />
                                <SidebarItem
                                    isActive={router === "/assisted-purchase"}
                                    title="Destination Scan"
                                    icon={
                                        <DestinationIcon
                                            width={25}
                                            height={25}
                                            className="relative"
                                        />
                                    }
                                    href="/assisted-purchase"
                                />
                                <SidebarItem
                                    isActive={router === "/assisted-purchase"}
                                    title="Bin Manager"
                                    icon={
                                        <BinManagerIcon
                                            width={25}
                                            height={25}
                                            className="relative"
                                        />
                                    }
                                    href="/assisted-purchase"
                                />
                                <SidebarItem
                                    isActive={router === "/assisted-purchase"}
                                    title="Invoice Manager"
                                    icon={
                                        <InvoiceManagerIcon
                                            width={25}
                                            height={25}
                                            className="relative"
                                        />
                                    }
                                    href="/assisted-purchase"
                                />
                                <SidebarItem
                                    isActive={router === "/assisted-purchase"}
                                    title="Assisted Purchase"
                                    icon={
                                        <AssistedPurchaseIcon
                                            width={25}
                                            height={25}
                                            className="relative"
                                        />
                                    }
                                    href="/assisted-purchase"
                                />
                                <SidebarItem
                                    isActive={router === "/assisted-purchase"}
                                    title="Support Tickets"
                                    icon={
                                        <SupportTickets
                                            width={25}
                                            height={25}
                                            className="relative"
                                        />
                                    }
                                    href="/assisted-purchase"
                                />
                            </div>
                        </SidebarMenu>
                        <SidebarMenu title="setting" className="flex-col justify-start items-center gap-2.5 flex">
                            <div className="flex-col justify-end items-start gap-2.5 flex">
                                <SidebarItem
                                    isActive={router === "/#"}
                                    title="Warehouse Manager"
                                    icon={<WarehouseIcons
                                        width={25}
                                        height={25}
                                        className="relative"
                                    />}
                                    href="#"
                                />

                                <SidebarItem
                                    isActive={router === "/#"}
                                    title="Product Manager"
                                    icon={<ProductManagerIcon
                                        width={25}
                                        height={25}
                                        className="relative"
                                    />}
                                    href="#"
                                />

                                <SidebarItem
                                    isActive={router === "/#"}
                                    title="Customer Manager"
                                    icon={
                                        <CustomerManagerIcon className={"h-[25px] w-[25px]"} />
                                    }
                                    href="#"
                                />

                                <SidebarItem
                                    isActive={router === "/#"}
                                    title="User and Permission"
                                    icon={
                                        <UserPemissionIcon
                                            width={25}
                                            height={25}
                                        />
                                    }
                                    href="#"
                                />
                                <SidebarItem
                                    isActive={router.startsWith("/admin/configuration")}
                                    title="Configuration"
                                    icon={
                                        <ConfigIcon
                                            width={25}
                                            height={25}
                                        />
                                    }
                                    href="/admin/configuration"
                                />
                            </div>
                        </SidebarMenu>
                    </div>
                </ScrollArea>
            </aside>
        </>
    );
};
