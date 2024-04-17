"use client"
import Image from 'next/image'
import { React, useState } from 'react'
import { CrossBorder, CrossBorderTable } from './CrossBorder';
// import { Checkbox, Button } from 'flowbite-react';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowDownIcon } from '@/components/icons/iconCollection';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { PackageType } from '@/components/PackageItemsUI/PackageType';
import { DetailsIcons } from '@/components/icons/iconCollection';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { DialogContent } from '@radix-ui/react-dialog';
import { DetailsModals } from '../DialogDetails/Details';
import { PackageStatus } from '@/components/PackageItemsUI/PackageStatus';
import { PackageIndicator } from '@/components/PackageItemsUI/PackageIndicator';
import { CopyIcons } from '@/components/icons/iconCollection';
import { useToast } from '@/components/ui/use-toast';

import { ExpandItems } from './ExpandItems';
import format from 'date-fns/format';


export const ItemsPackage = ({ onClickButton, item, onExpand, isExpand, reload }) => {
    const { toast } = useToast();

    const {
        barcode_tracking,
        bin_location,
        carrier_code,
        content,
        carrierType,
        customer_email,
        customer_id,
        customer_name,
        customer_phone,
        entry_number,
        images,
        lots_id,
        manifiest_number,
        package_height,
        package_height_unit,
        package_length,
        package_weight,
        package_witdth,
        package_weight_unit,
        total_price,
        tracking_id,
        updated_at,
        status,
        status_id,
        status_forcustomer,
        date,
        time,
        country_name_arrival,
        country_code_arrival,
        warehouse_name_arrival,
        warehouse_destination,
        warehouse_name_destination,
        country_code_destination,
        country_name_destination,
    } = item;
    console.log("🚀 ~ ItemsPackage ~ status:", status, status_forcustomer, tracking_id)

    const formattedDate = format(new Date(updated_at), 'dd MMM yyyy');
    const [isExpanded, setIsExpanded] = useState(false);

    // button Control 
    const [selectedButton, setSelectedButton] = useState(null);
    const [buttonEnabled, setButtonEnabled] = useState(true);
    const [clicked, setIsClicked] = useState(false);
    const [openHoldPickup, setOpenHoldPickup] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
            })
            .catch((err) => console.error('Error copying text: ', err));
    };

    const toggleExpanded = () => {
        onExpand(tracking_id); // Call onExpand to toggle expanded state in the parent component
        setIsExpanded(!isExpanded);
        onClickButton(null);
        if (isExpand === false) {
            setSelectedButton(null)
            setButtonEnabled(true);

        }
    };

    const toggleClicked = (op) => {
        onExpand(op)
        setIsExpanded(true)
    }



    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
        onClickButton(buttonName);
        setButtonEnabled(false); // Disable other buttons when one is clicked
    };

    return (
        <>
            <div
                onClick={() => {
                    if (!isExpand) {
                        toggleClicked(tracking_id);
                    }
                }}
                className={`
            container  w-full px-5 py-2.5 bg-white rounded-md shadow-md border border-zinc-600 border-opacity-50 
            ${isExpand
                        ? "hover:bg-white cursor-default"
                        : "hover:bg-gray-300/10 cursor-pointer"
                    }
            `}
            >
                <div className="flex flex-row justify-between items-center gap-5 relative">
                    <div className="justify-start items-center gap-[15px] flex">
                        <PackageType
                            variant={status_id}
                            notif={`${status_id === 1 ? "notif" : ""}`}
                        />
                        <div className="flex-col justify-start items-start inline-flex w-[200px]">
                            <div className="text-black text-sm font-semiBold">
                                {tracking_id}
                            </div>
                            <div className="text-sky-700 text-xs font-semiBold">
                                Shipping Mailbox
                            </div>
                            <div className="justify-start items-start inline-flex">
                                <div className="justify-start items-center gap-2.5 flex">
                                    <div className="text-zinc-600 text-sm font-semiBold">
                                        {carrier_code}
                                    </div>
                                    <p className="text-red-700 text-opacity-80 text-sm font-bold">
                                        {barcode_tracking}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-1 h-100% flex items-end justify-center flex-col">
                        <Button
                            variant="ghost"
                            className="w-[30px] h-[30px]"
                            size="icon"
                            onClick={() => {
                                handleCopy(tracking_id);
                                toast({
                                    title: "Copied!",
                                    description: `Copy Tracking Number ${tracking_id}.`,
                                });
                            }}
                        >
                            <CopyIcons width={15} height={15} />
                        </Button>
                    </div>
                    <div className=" w-2/3 justify-start items-center gap-[10px] flex">
                        <div className="w-[36.14px] h-[50px]">
                            <Separator
                                orientation="vertical"
                                className="px-[1px] h-[100%] bg-zinc-600/50 "
                            />
                        </div>
                        <div className="flex flex-row items-center gap-3">
                            <div className="w-[36.14px] h-[23.55px] relative">
                                {country_code_arrival === "USA" ? (
                                    <>
                                        <Image
                                            src={"/assets/country/USA-flag.png"}
                                            width={66}
                                            height={70}
                                            className="left-[-10.19px] top-[-23.55px]"
                                            alt="USA icon"
                                            style={{
                                                width: "25px",
                                                height: "15px",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </>
                                ) : country_code_arrival === "CAN" ? (
                                    <>
                                        <Image
                                            src={"/assets/country/cad-flag.png"}
                                            width={66}
                                            height={70}
                                            className="left-[-10.19px] top-[-23.55px]"
                                            alt="USA icon"
                                            style={{
                                                width: "25px",
                                                height: "15px",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Image
                                            src={"/assets/country/USA-flag.png"}
                                            width={66}
                                            height={70}
                                            className="left-[-10.19px] top-[-23.55px]"
                                            alt="USA icon"
                                            style={{
                                                width: "25px",
                                                height: "15px",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </>
                                )}
                            </div>
                            <div className="flex-col w-full justify-start items-start gap-[5px] inline-flex">
                                <PackageIndicator
                                    status_id={status_id}
                                    status={status}
                                    status_forcustomer={status_forcustomer}
                                    packageID={tracking_id}
                                />
                                <div>
                                    <span className=" w-[150px] text-zinc-600 text-[13px] font-b">
                                        Shipped
                                    </span>
                                    <span className="text-zinc-600 text-xs font-normal">
                                        , {formattedDate}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rightItems gap-5 flex flex-row  w-2/3 justify-end relative">
                        <div className="flex flex-col justify-end items-end ">
                            <PackageStatus variant={status} status_id={status_id} />
                            <div className="h-[30px]  justify-end items-center gap-2.5 flex">
                                <div className="text-right text-zinc-600 text-xs ">
                                    {warehouse_destination
                                        ? `WR ${warehouse_destination}, `
                                        : ""}{" "}
                                    {country_code_destination
                                        ? `${country_code_destination}`
                                        : ""}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-end items-center ">
                            <div className="">
                                <Checkbox />
                            </div>
                            <div className="w-[30px] h-[30px]">
                                {/* <button aria-label="arrow" size='small' className={` ${isExpanded ? 'rotate-180' : ''}`} onClick={toggleExpanded}>
                   */}
                                <Button
                                    aria-label="arrow"
                                    variant="ghost"
                                    size="small"
                                    className={`w-[30px] h-[30px] ${isExpand ? "rotate-180" : ""
                                        }`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleExpanded();
                                    }}
                                >
                                    <ArrowDownIcon />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {isExpand ? (
                    <div className="expanded transition-transform ease-in-out ">
                        <ExpandItems
                            tracking_id={tracking_id}
                            handleButtonClick={handleButtonClick}
                            item={item}
                            selectedButton={selectedButton}
                            buttonEnabled={buttonEnabled}
                            reload={reload}
                            toggleExpanded={toggleExpanded}
                        />

                        <div className="w-[100%] flex justify-center align-middle mx-auto ">
                            {
                                status_id === 1
                                    ? null :
                                    (
                                        <>
                                            {selectedButton === "Cross Border Forward" ? (
                                                <CrossBorderTable
                                                    toggleExpanded={toggleExpanded}
                                                    tracking_id={tracking_id}
                                                    reload={reload}
                                                    arrivalCode={country_code_arrival}
                                                />
                                            ) : selectedButton === "Cross Border Pickup" ? (
                                                <>
                                                    <CrossBorderTable
                                                        toggleExpanded={toggleExpanded}
                                                        tracking_id={tracking_id}
                                                        reload={reload}
                                                        arrivalCode={country_code_arrival}
                                                    />
                                                </>
                                            ) : selectedButton === "Forward Package" ? (
                                                <>
                                                    <CrossBorderTable
                                                        toggleExpanded={toggleExpanded}
                                                        tracking_id={tracking_id}
                                                        reload={reload}
                                                        arrivalCode={country_code_arrival}
                                                    />
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                        </>
                                    )
                            }
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
}
