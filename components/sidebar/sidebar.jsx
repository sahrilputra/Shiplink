"use client";
import React from "react";
import { SidebarMenu } from "./sidebarMenu";
import { SidebarItem } from "./sidebarItem";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { SwitchButton } from "../buttons/SwitchButton";
import { LocationCard } from "./LocationCard";
import styles from "./styles.module.scss";
import { ScrollArea } from "../ui/scroll-area";
import {
    DashboardIcon,
    MailboxIcon,
    ShippingLabelIcon,
    SavedQuoteIcon,
    AssistedPurchaseIcon,
    AddressBookIcon,
    SavedBoxIcon,
    AccountDetailsIcon,
    MembershipIcon,
    BillingHistoryIcon,
    ReferFriendsIcon,
    SupportIcons,
} from "./icon/clientIcon";
import { Separator } from "../ui/separator";
import { useMediaQuery } from "react-responsive";
export const Sidebar = () => {
    const router = usePathname();
    // w-[280px] min-h-max px-[5px]
    // min-h-max bg-white flex-col justify-start items-center gap-5 inline-flex

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
                    <div className={`flex gap-3 flex-col `}>
                        <div className="h-[50px]">
                            <div className={`${styles.logo} fixed bg-white mb-[10px] text-center h-[50px] w-[230px] flex flex-col gap-2 justify-items-center z-[25]`}>
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

                        <SidebarMenu
                            title=""
                            className="flex-col justify-start items-center flex"
                        >
                            <div className="flex-col justify-end items-start gap-[5px] flex">
                                <SidebarItem
                                    isActive={router === "/dashboard"}
                                    title="Dashboard"
                                    icon={<DashboardIcon width={20} height={20} fill="#00000" stroke="#00000" />}
                                    href="/dashboard"
                                />
                                <SidebarItem
                                    isActive={router === "/mailbox"}
                                    title="Shipping Mailbox"
                                    icon={<MailboxIcon width={20} height={20} />}
                                    href="/mailbox"
                                />

                                <SidebarItem
                                    isActive={router === "/shipping-lebels"}
                                    title="Shipping Labels"
                                    icon={<ShippingLabelIcon width={20} height={20} />}
                                    href="/shipping-lebels"
                                />
                                <SidebarItem
                                    isActive={router === "/saved-quotes"}
                                    title="Saved Quotes"
                                    icon={<SavedQuoteIcon width={20} height={20} />}
                                    href="/saved-quotes"
                                />
                                <SidebarItem
                                    isActive={router === "/assisted-purchase"}
                                    title="Assisted Purchase"
                                    icon={<AssistedPurchaseIcon width={20} height={20} />}
                                    href="/assisted-purchase"
                                    isLast={true}
                                />
                            </div>
                        </SidebarMenu>
                        <SidebarMenu
                            title="setting"
                            className="flex-col justify-start items-center flex"
                        >
                            <div className="flex-col justify-end items-start gap-[5px] flex">
                                <SidebarItem
                                    isActive={router === "/address-book"}
                                    title="Address Book"
                                    icon={<AddressBookIcon width={20} height={20} />}
                                    href="/address-book"
                                />

                                <SidebarItem
                                    isActive={router === "/saved-box"}
                                    title="Saved Box Sizes"
                                    icon={
                                        <SavedBoxIcon
                                            width={20}
                                            height={20}
                                        />
                                    }
                                    href="/saved-box"
                                />

                                <SidebarItem
                                    isActive={router === "/membership"}
                                    title="Membership Plan"
                                    icon={
                                        <MembershipIcon
                                            width={20}
                                            height={20}

                                        />
                                    }
                                    href="/membership"
                                />

                                <SidebarItem
                                    isActive={router.startsWith("/account")}
                                    title="Account Details"
                                    icon={
                                        <AccountDetailsIcon
                                            width={20}
                                            height={20}
                                        />
                                    }
                                    href="/account"
                                />

                                <SidebarItem
                                    isActive={router === "/billing-history"}
                                    title="Billing History"
                                    icon={
                                        <BillingHistoryIcon
                                            width={20}
                                            height={20}
                                        />
                                    }
                                    href="/billing-history"
                                />

                                <SidebarItem
                                    isActive={router === "/reference"}
                                    title="Refer Friends"
                                    icon={
                                        <ReferFriendsIcon
                                            width={20}
                                            height={20}
                                        />
                                    }
                                    href="/reference"
                                />

                                <SidebarItem
                                    isActive={router === "/support"}
                                    title="Support"
                                    isLast={true}
                                    icon={
                                        <SupportIcons
                                            width={20}
                                            height={20}
                                        />
                                    }
                                    href="/support"
                                />
                            </div>

                            {isDesktop ? (
                                <SidebarMenu
                                    title={"card"}
                                    className="w-[90%] flex items-center justify-center my-3 "
                                >
                                    <LocationCard />
                                </SidebarMenu>
                            ) : (
                                <>
                                </>
                            )}
                        </SidebarMenu>
                    </div>
                </ScrollArea>
            </aside>
        </>
    );
};
