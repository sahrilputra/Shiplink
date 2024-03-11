import React, { useState } from 'react'
import { DetailsModals } from '../DialogDetails/Details'
import Image from 'next/image'
import { PaymentsDialog } from '../dashboardMenus/PaymentsV2/Payments'
import { Button } from '@/components/ui/button'
import { Separator } from '@radix-ui/react-dropdown-menu'
import format from 'date-fns/format';

export const ExpandItems = ({ item, handleButtonClick, selectedButton, buttonEnabled, reload }) => {
    const [openHoldPickup, setOpenHoldPickup] = useState(false)
    const formattedDate = format(new Date(item?.updated_at), 'dd MMM yyyy');

    console.log("My Fking ID : ", item?.tracking_id)
    return (
        <>
            <PaymentsDialog open={openHoldPickup} setOpen={setOpenHoldPickup} trackingId={item?.tracking_id} key={item?.lots_id} />
            <div className="flex flex-row justify-between items-center gap-5 relative pt-2 ">
                <div className="justify-start items-center gap-[15px] flex">
                    <DetailsModals item={item} date={formattedDate} />
                    <div className="flex-col justify-start items-start gap-px inline-flex">
                        <div className="text-black text-xs font-semiBold ">{item?.customer_name}</div>
                        <div className="text-zinc-600 text-xs ">{item?.package_length} x {item?.package_witdth} x {item?.package_height} {item?.package_height_unit}</div>
                        <div className="text-zinc-600 text-xs ">{item?.package_weight} {item?.package_weight_unit}</div>
                    </div>
                </div>
                <div className="flex-col justify-start items-start gap-2.5 inline-flex">
                    <div className="justify-between items-start inline-flex ">
                        <div className={`text-zinc-900 text-sm font-semiBold ${  item?.status !== 'Received' ? "hidden" : "block"}`}>Confirm Your Order</div>
                    </div>
                    {
                        item?.status === 'in transit' ? (
                            <>
                                <div className="justify-between items-center gap-5 flex rounded-sm flex-row flex-wrap border border-zinc-400/30 px-[10px] py-[10px] w-full">
                                    <div className="flex-row flex justify-start items-center gap-2 w-max pr-6 ">
                                        <div className="w-[30px] h-[30px]">
                                            <Image
                                                src={'/assets/courrier/canadian.png'}
                                                width={100}
                                                height={100}
                                                alt='canadian icon'
                                            />
                                        </div>
                                        <p className='text-xs'>Canada Post Regular Parcel</p>
                                    </div>
                                    <div className=" w-max px-2 text-xs text-zinc-500 flex flex-col">
                                        <p className='w-max'>Estimate 14-16 Apr</p>
                                        <p className='w-max'>Tracking ID #1231231231</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {
                                    item?.status !== 'Received'
                                        ? (
                                            <>
                                            </>
                                        ) : (
                                            <div className="justify-start items-start gap-1 inline-flex flex-wrap">
                                                <Button
                                                    variant={`${selectedButton === "Hold Pickup" ? "destructive" : (buttonEnabled ? "destructive" : "disable")}`}
                                                    className="w-[140px] px-3 py-[5px] justify-center items-center gap-2.5 flex"
                                                    size="xs"
                                                    onClick={() => {
                                                        setOpenHoldPickup(true)
                                                        handleButtonClick("Hold Pickup")
                                                    }}
                                                >
                                                    <div className="text-justify text-white text-xs font-semiBold ">Hold for Pickup</div>
                                                </Button>
                                                <Button
                                                    variant={`${selectedButton === "Cross Border Pickup" ? "destructive" : (buttonEnabled ? "destructive" : "disable")}`}
                                                    className="w-[140px] px-3 py-[5px]  justify-center items-center gap-2.5 flex"
                                                    onClick={() => handleButtonClick("Cross Border Pickup")}
                                                    size="xs"
                                                >
                                                    <div className="text-justify text-white text-xs font-semiBold ">Cross Border Pickup</div>
                                                </Button>
                                                <Button
                                                    disabled={true}
                                                    variant={`${selectedButton === "Forward Package" ? "destructive" : (buttonEnabled ? "destructive" : "disable")}`}
                                                    className="w-[140px]  justify-center items-center gap-2.5 flex"
                                                    size="xs"
                                                    onClick={() => handleButtonClick("Forward Package")}
                                                >
                                                    <div className="text-justify text-white text-xs font-semiBold ">Forward Package</div>
                                                </Button>
                                                <Button
                                                    disabled={true}
                                                    variant={`${selectedButton === "Cross Border Forward" ? "destructive" : (buttonEnabled ? "destructive" : "disable")}`}
                                                    className="w-[140px] px-3 py-[5px]  justify-center items-center gap-2.5 flex"
                                                    size="xs"
                                                    onClick={() => handleButtonClick("Cross Border Forward")}
                                                >
                                                    <div className="text-justify text-white text-xs font-semiBold ">Cross Border Forward</div>
                                                </Button>
                                            </div>
                                        )
                                }

                                <div className="w-[100%]">
                                    <Separator className="py-[1.5px]" />
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    )
}
