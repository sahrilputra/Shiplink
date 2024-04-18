"use client";
import React, { useState } from "react";
import { SidebarMenu } from "./sidebarMenu";
import { SidebarItem } from "./sidebarItem";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import styles from "./styles.module.scss";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrivalIcon,
  VerificationIcon,
  TransportIcon,
  ParsIcon,
  CustomBrokerIcon,
  CustomClearanceIcon,
  DestinationIcon,
  BinManagerIcon,
  InvoiceManagerIcon,
  AssistedPurchaseIcon,
  SupportTickets,
  WarehouseIcons,
  ProductManagerIcon,
  CustomerManagerIcon,
  UserPemissionIcon,
  ConfigIcon,
} from "./icon/adminIcon";
import { Separator } from "../ui/separator";
import { useMediaQuery } from "react-responsive";
import { Package2 } from "lucide-react";
export const AdminSidebar = () => {
  const [isClicked, setIsClicked] = useState(false);
  const router = usePathname();
  // w-[280px] min-h-max px-[5px]
  // min-h-max bg-white flex-col justify-start items-center gap-5 inline-flex

  const toggleClicked = () => {
    setIsClicked(true);
  };

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTable = useMediaQuery({ query: "(min-width: 1025px)" });
  const isDesktop = useMediaQuery({ query: "(min-width: 1440px)" });

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
              <div
                className={`${styles.logo} fixed bg-white mb-[10px] text-center h-[50px] w-[230px] flex flex-col gap-2 justify-items-center z-[25]`}
              >
                <div className=" w-max h-max mx-auto bg-white ">
                  <Image
                    src={"/logo.png"}
                    width={120}
                    height={120}
                    alt="shiplink Logo"
                    className="mx-auto"
                    style={{ width: "120px", height: "30px" }}
                  />
                  <div className="w-[200px] mt-2 flex items-center justify-center mx-auto">
                    <Separator className="h-[2px]" />
                  </div>
                </div>
              </div>
            </div>

            <SidebarMenu
              title=""
              className="flex-col justify-start items-center flex "
            >
              <div className="flex-col justify-end items-start gap-[5px] flex">
                <SidebarItem
                  isActive={router === "/admin/package-details"}
                  title="Dashboard"
                  icon={<Package2 width={22} height={22} />}
                  href="/admin/package-details"
                />

                <SidebarItem
                  isActive={router === "/admin/arrival-scan"}
                  title="Arrival Scan"
                  icon={<ArrivalIcon width={20} height={20} />}
                  href="/admin/arrival-scan"
                />

                <SidebarItem
                  isActive={router === "/admin/verification"}
                  title="Verification"
                  icon={<VerificationIcon width={20} height={20} />}
                  href="/admin/verification"
                />

                <SidebarItem
                  isActive={router === "/admin/custom-brokers"}
                  title="Customs Broker"
                  icon={<CustomBrokerIcon width={23} height={23} />}
                  href="/admin/custom-brokers"
                />

                <SidebarItem
                  isActive={router.startsWith("/admin/transport")}
                  title="Transport"
                  icon={<TransportIcon width={23} height={23} />}
                  href="/admin/transport"
                />

                <SidebarItem
                  isActive={router === "/admin/custom-clearance"}
                  title="Custom Clearance"
                  icon={
                    <CustomClearanceIcon
                      width={23}
                      height={23}
                      className="relative"
                    />
                  }
                  href="/admin/custom-clearance"
                />
                <SidebarItem
                  isActive={router === "/admin/destination"}
                  title="Destination Scan"
                  icon={
                    <DestinationIcon
                      width={23}
                      height={23}
                      className="relative"
                    />
                  }
                  href="/admin/destination"
                />
                <SidebarItem
                  isActive={router === "/admin/purchase-manager"}
                  title="Assisted Purchase"
                  icon={
                    <AssistedPurchaseIcon
                      width={23}
                      height={23}
                      className="relative"
                    />
                  }
                  href="/admin/purchase-manager"
                />
                <SidebarItem
                  isActive={router.startsWith("/admin/customers-manager")}
                  title="Customers"
                  icon={<CustomerManagerIcon width={23} height={23} />}
                  href="/admin/customers-manager"
                />

                <SidebarItem
                  isActive={router === "/admin/invoice-manager"}
                  title="Invoices"
                  icon={
                    <InvoiceManagerIcon
                      width={23}
                      height={23}
                      className="relative"
                    />
                  }
                  href="/admin/invoice-manager"
                />

                <SidebarItem
                  isActive={router.startsWith("/admin/product-manager")}
                  title="Products & Services"
                  icon={
                    <ProductManagerIcon
                      width={23}
                      height={23}
                      className="relative"
                    />
                  }
                  href="/admin/product-manager"
                />

                <SidebarItem
                  isActive={router === "/admin/bin-management"}
                  title="Bin Manager"
                  icon={
                    <BinManagerIcon
                      width={23}
                      height={23}
                      className="relative"
                    />
                  }
                  href="/admin/bin-management"
                />

                <SidebarItem
                  isActive={router.startsWith("/admin/warehouse-manager")}
                  title="Warehouses"
                  icon={
                    <WarehouseIcons
                      width={23}
                      height={23}
                      className="relative"
                    />
                  }
                  href="/admin/warehouse-manager"
                />

                <SidebarItem
                  isActive={router === "/admin/support-tickets"}
                  title="Support Tickets"
                  isLast="true"
                  icon={
                    <SupportTickets
                      width={23}
                      height={23}
                      className="relative"
                    />
                  }
                  href="/admin/support-tickets"
                />
              </div>
            </SidebarMenu>
            <SidebarMenu
              title="setting"
              className="flex-col justify-start items-center  flex"
            >
              <div className="flex-col justify-end items-start gap-[5px] flex">
                <SidebarItem
                  onClick={toggleClicked}
                  isClicked={isClicked}
                  isActive={router.startsWith("/admin/PARS")}
                  title="PARS & PAPS"
                  icon={<ParsIcon className={"h-[25px] w-[25px]"} />}
                  href="/admin/PARS"
                />
                <SidebarItem
                  isActive={router.startsWith("/admin/user-permission")}
                  title="Users & Permissions"
                  icon={<UserPemissionIcon width={23} height={23} />}
                  href="/admin/user-permission"
                />
                <SidebarItem
                  isActive={router.startsWith("/admin/configuration")}
                  title="Configuration"
                  isLast="true"
                  icon={<ConfigIcon width={23} height={23} />}
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


// <ScrollArea className="h-[100vh]">
// <div className={` flex gap-3 flex-col pb-[30px] `}>
//   <div className="h-[50px]">
//     <div
//       className={`${styles.logo} fixed bg-white mb-[10px] text-center h-[50px] w-[230px] flex flex-col gap-2 justify-items-center z-[25]`}
//     >
//       <div className=" w-max h-max mx-auto bg-white ">
//         <Image
//           src={"/logo.png"}
//           width={120}
//           height={120}
//           alt="shiplink Logo"
//           className="mx-auto"
//           style={{ width: "120px", height: "30px" }}
//         />
//         <div className="w-[200px] mt-2 flex items-center justify-center mx-auto">
//           <Separator className="h-[2px]" />
//         </div>
//       </div>
//     </div>
//   </div>

//   <SidebarMenu
//     title=""
//     className="flex-col justify-start items-center flex "
//   >
//     <div className="flex-col justify-end items-start gap-[5px] flex">
//       <SidebarItem
//         isActive={router === "/admin/package-details"}
//         title="Dashboard"
//         icon={<Package2 width={22} height={22} />}
//         href="/admin/package-details"
//       />

//       <SidebarItem
//         isActive={router === "/admin/arrival-scan"}
//         title="Arrival Scan"
//         icon={<ArrivalIcon width={20} height={20} />}
//         href="/admin/arrival-scan"
//       />

//       <SidebarItem
//         isActive={router === "/admin/verification"}
//         title="Verification"
//         icon={<PackageCheck width={22} height={22} />}
//         href="/admin/verification"
//       />

//       <SidebarItem
//         isActive={router === "/admin/custom-brokers"}
//         title="Customs Broker"
//         icon={<Stamp width={22} height={22} />}
//         href="/admin/custom-brokers"
//       />

//       <SidebarItem
//         isActive={router.startsWith("/admin/transport")}
//         title="Transport"
//         icon={<Truck width={22} height={22} />}
//         href="/admin/transport"
//       />

//       <SidebarItem
//         isActive={router === "/admin/custom-clearance"}
//         title="Custom Clearance"
//         icon={
//           <Megaphone
//             width={22}
//             height={22}
//             className="relative -rotate-12"
//           />
//         }
//         href="/admin/custom-clearance"
//       />
//       <SidebarItem
//         isActive={router === "/admin/destination"}
//         title="Destination Scan"
//         icon={
//           <PackageSearchIcon
//             width={22}
//             height={22}
//             className="relative"
//           />
//         }
//         href="/admin/destination"
//       />
//       <SidebarItem
//         isActive={router === "/admin/purchase-manager"}
//         title="Assisted Purchase"
//         icon={
//           <ShoppingBag
//             width={22}
//             height={22}
//             className="relative"
//           />
//         }
//         href="/admin/purchase-manager"
//       />
//       <SidebarItem
//         isActive={router.startsWith("/admin/customers-manager")}
//         title="Customers"
//         icon={<UsersRound width={23} height={23} />}
//         href="/admin/customers-manager"
//       />

//       <SidebarItem
//         isActive={router === "/admin/invoice-manager"}
//         title="Invoices"
//         icon={
//           <Newspaper 
//             width={22}
//             height={22}
//             className="relative"
//           />
//         }
//         href="/admin/invoice-manager"
//       />

//       <SidebarItem
//         isActive={router.startsWith("/admin/product-manager")}
//         title="Products & Services"
//         icon={
//           <ProductManagerIcon
//             width={23}
//             height={23}
//             className="relative"
//           />
//         }
//         href="/admin/product-manager"
//       />

//       <SidebarItem
//         isActive={router === "/admin/bin-management"}
//         title="Bin Manager"
//         icon={
//           <BinManagerIcon
//             width={23}
//             height={23}
//             className="relative"
//           />
//         }
//         href="/admin/bin-management"
//       />

//       <SidebarItem
//         isActive={router.startsWith("/admin/warehouse-manager")}
//         title="Warehouses"
//         icon={
//           <WarehouseIcons
//             width={23}
//             height={23}
//             className="relative"
//           />
//         }
//         href="/admin/warehouse-manager"
//       />

//       <SidebarItem
//         isActive={router === "/admin/support-tickets"}
//         title="Support Tickets"
//         isLast="true"
//         icon={
//           <SupportTickets
//             width={23}
//             height={23}
//             className="relative"
//           />
//         }
//         href="/admin/support-tickets"
//       />
//     </div>
//   </SidebarMenu>
//   <SidebarMenu
//     title="setting"
//     className="flex-col justify-start items-center  flex"
//   >
//     <div className="flex-col justify-end items-start gap-[5px] flex">
//       <SidebarItem
//         onClick={toggleClicked}
//         isClicked={isClicked}
//         isActive={router.startsWith("/admin/PARS")}
//         title="PARS & PAPS"
//         icon={<ParsIcon className={"h-[25px] w-[25px]"} />}
//         href="/admin/PARS"
//       />
//       <SidebarItem
//         isActive={router.startsWith("/admin/user-permission")}
//         title="Users & Permissions"
//         icon={<UserPemissionIcon width={23} height={23} />}
//         href="/admin/user-permission"
//       />
//       <SidebarItem
//         isActive={router.startsWith("/admin/configuration")}
//         title="Configuration"
//         isLast="true"
//         icon={<ConfigIcon width={23} height={23} />}
//         href="/admin/configuration"
//       />
//     </div>
//   </SidebarMenu>
// </div>
// </ScrollArea>