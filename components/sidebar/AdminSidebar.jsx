"use client";
import React, { useState } from "react";
import { SidebarMenu } from "./sidebarMenu";
import { SidebarItem } from "./sidebarItem";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import styles from "./styles.module.scss";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton"
import {
    ArrivalIcon, VerificationIcon, TransportIcon, ParsIcon,
    CustomBrokerIcon, CustomClearanceIcon, DestinationIcon, BinManagerIcon,
    InvoiceManagerIcon, AssistedPurchaseIcon, SupportTickets, WarehouseIcons, ProductManagerIcon,
    CustomerManagerIcon, UserPemissionIcon, ConfigIcon
} from './icon/adminIcon'
import { Separator } from "../ui/separator";
import { useMediaQuery } from "react-responsive";
export const AdminSidebar = () => {

    const [isClicked, setIsClicked] = useState(false);
    const router = usePathname();
    // w-[280px] min-h-max px-[5px]
    // min-h-max bg-white flex-col justify-start items-center gap-5 inline-flex

    const toggleClicked = () => {
        setIsClicked(true);
    }

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const isTable = useMediaQuery({ query: '(min-width: 1025px)' })
    const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' })


    return (
        <>
            <aside
                className={`pt-5 w-[280px] h-full bg-white flex-col justify-start items-center gap-5 flex z-[20]
             ${styles.sideBarRespon} 
             `}
            >
                <ScrollArea className="h-[100vh]">
                    <div className={` flex gap-3 flex-col pb-[30px] `}>
                        <div className="h-[50px]">
                            <div className={`${styles.logo} fixed bg-white mb-[10px] text-center h-[50px] w-[240px] flex flex-col gap-2 justify-items-center z-[25]`}>
                                <div className=" w-max h-max mx-auto bg-white ">
                                    <Image
                                        src={"/logo.png"}
                                        width={120}
                                        height={120}
                                        alt="shiplink Logo"
                                        className="mx-auto"
                                        style={{ width: '120px', height: '30px' }}
                                    />
                                    <div className="w-[200px] mt-2 flex items-center justify-center mx-auto">
                                        <Separator className='h-[2px]' />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <SidebarMenu title="" className="flex-col justify-start items-center flex ">
                            <div className="flex-col justify-end items-start gap-[2px] flex">
                                <SidebarItem
                                    onClick={toggleClicked}
                                    isClicked={isClicked}
                                    isActive={router === "/admin/arrival-scan"}
                                    title="Arrival Scan"
                                    icon={
                                        <ArrivalIcon
                                            width={23} height={23}
                                        />}
                                    href="/admin/arrival-scan"
                                />
                                <SidebarItem
                                    onClick={toggleClicked}
                                    isClicked={isClicked}
                                    isActive={router === "/admin/verification"}
                                    title="Verification"
                                    icon={
                                        <VerificationIcon width={23} height={23} />
                                    }
                                    href="/admin/verification"
                                />

                                <SidebarItem
                                    onClick={toggleClicked}
                                    isClicked={isClicked}
                                    isActive={router.startsWith("/admin/PARS")}
                                    title="PARS Management"
                                    icon={<ParsIcon className={"h-[25px] w-[25px]"} />}
                                    href="/admin/PARS"
                                />
                                <SidebarItem
                                    onClick={toggleClicked}
                                    isClicked={isClicked}
                                    isActive={router === "/admin/custom-brokers"}
                                    title="Custom Broker"
                                    icon={<CustomBrokerIcon
                                        width={25}
                                        height={25}
                                    />}
                                    href="/admin/custom-brokers"
                                />
                                <SidebarItem
                                    isActive={router.startsWith("/admin/transport")}
                                    title="Transport Prep"
                                    icon={<TransportIcon
                                        width={25}
                                        height={25}
                                    />}
                                    href="/admin/transport"
                                />
                                <SidebarItem
                                    isActive={router === "/admin/custom-clearance"}
                                    title="Custom Clearance"
                                    icon={<CustomClearanceIcon
                                        width={25}
                                        height={25}
                                        className="relative"
                                    />}
                                    href="/admin/custom-clearance"
                                />
                                <SidebarItem
                                    isActive={router === "/admin/destination"}
                                    title="Destination Scan"
                                    icon={
                                        <DestinationIcon
                                            width={25}
                                            height={25}
                                            className="relative"
                                        />
                                    }
                                    href="/admin/destination"
                                />
                                <SidebarItem
                                    isActive={router === "/admin/bin-management"}
                                    title="Bin Manager"
                                    icon={
                                        <BinManagerIcon
                                            width={25}
                                            height={25}
                                            className="relative"
                                        />
                                    }
                                    href="/admin/bin-management"
                                />
                                <SidebarItem
                                    isActive={router === "/admin/invoice-manager"}
                                    title="Invoice Manager"
                                    icon={
                                        <InvoiceManagerIcon
                                            width={25}
                                            height={25}
                                            className="relative"
                                        />
                                    }
                                    href="/admin/invoice-manager"
                                />
                                <SidebarItem
                                    isActive={router === "/admin/purchase-manager"}
                                    title="Assisted Purchase"
                                    icon={
                                        <AssistedPurchaseIcon
                                            width={25}
                                            height={25}
                                            className="relative"
                                        />
                                    }
                                    href="/admin/purchase-manager"
                                />
                                <SidebarItem
                                    isActive={router === "/admin/support-tickets"}
                                    title="Support Tickets"
                                    icon={
                                        <SupportTickets
                                            width={25}
                                            height={25}
                                            className="relative"
                                        />
                                    }
                                    href="/admin/support-tickets"
                                />
                                <SidebarItem
                                    isActive={router.startsWith("/admin/warehouse-manager")}
                                    title="Warehouse Manager"
                                    icon={<WarehouseIcons
                                        width={25}
                                        height={25}
                                        className="relative"
                                    />}
                                    href="/admin/warehouse-manager"
                                />

                                <SidebarItem
                                    isActive={router.startsWith("/admin/product-manager")}
                                    title="Product Manager"
                                    icon={<ProductManagerIcon
                                        width={25}
                                        height={25}
                                        className="relative"
                                    />}
                                    href="/admin/product-manager"
                                />

                                <SidebarItem
                                    isActive={router.startsWith("/admin/customers-manager")}
                                    title="Customer Manager"
                                    isLast="true"
                                    icon={
                                        <CustomerManagerIcon className={"h- [25px] w-[25px]"} />
                                    }
                                    href="/admin/customers-manager"
                                />
                            </div>
                        </SidebarMenu>
                        <SidebarMenu title="setting" className="flex-col justify-start items-center  flex">
                            <div className="flex-col justify-end items-start flex">
                                <SidebarItem
                                    isActive={router.startsWith("/admin/user-permission")}
                                    title="User and Permission"
                                    icon={
                                        <UserPemissionIcon
                                            width={25}
                                            height={25}
                                        />
                                    }
                                    href="/admin/user-permission"
                                />
                                <SidebarItem
                                    isActive={router.startsWith("/admin/configuration")}
                                    title="Configuration"
                                    isLast="true"
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
