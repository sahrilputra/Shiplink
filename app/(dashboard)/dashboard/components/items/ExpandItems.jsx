/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { DetailsModals } from '../DialogDetails/Details'
import Image from 'next/image'
import { PaymentsDialog } from '../dashboardMenus/PaymentsV2/Payments'
import { Button } from '@/components/ui/button'
import { Separator } from '@radix-ui/react-dropdown-menu'
import format from 'date-fns/format';
import { EntryNumber } from '../ActionGroup/Action'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm, useFieldArray } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { CopyIcon } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import axios from 'axios'
import { Loaders } from '@/components/ui/loaders'
import { Skeleton } from '@/components/ui/skeleton'
const formSchema = yup.object().shape({
    entry_number: yup.string(),
    tracking_id: yup.string(),
})



export const ExpandItems = (
    {
        item,
        handleButtonClick,
        selectedButton,
        buttonEnabled,
        reload,
        tracking_id,
        toggleExpanded,
        service,
        pauseFetch,
    }) => {
    console.log("🚀 ~ item:", item)


    const { toast } = useToast()
    const [openHoldPickup, setOpenHoldPickup] = useState(false)
    const warehouseDestination = item?.warehouse_destination
    console.log("🚀 ~ countryCodeDestination:", warehouseDestination)
    const formattedDate = format(new Date(item?.updated_at), 'dd MMM yyyy');
    const countryCode = item?.country_code_destination?.slice(0, 2).toLowerCase() || "";
    const [loading, setLoading] = useState(false)


    const [query, setQuery] = useState({
        keyword: warehouseDestination,
        page: 0,
        limit: 0,
        index: 0,
    })
    const [warehouse, setWarehouse] = useState(null)
    console.log("🚀 ~ warehouse:", warehouse)

    useEffect(() => {
        const fetchWarehouse = async () => {
            try {
                const response = await axios.post(
                    `/api/admin/warehouse/list`,
                    {
                        ...query,
                        keyword: warehouseDestination,
                    }
                );
                // console.log("🚀 ~ warehouseDestination ~ responseData:", response)
                const responseData = response.data;
                setWarehouse(responseData.warehouse[0])
            } catch (error) {
                console.log(error);
            }
        }
        fetchWarehouse();

    }, [query, warehouseDestination])


    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            entry_number: "",
            tracking_id: item?.tracking_id || "",
        },
        mode: "onChange",
    })

    const handleCopy = (textToCopy) => {
        navigator.clipboard.writeText(textToCopy);
        toast({
            title: `PARS/PAPS Number Copied!`,
            status: 'success',
        });
    };

    const handleSave = async (formData) => {
        setLoading(true)
        console.log("dikirim", formData)
        try {
            const response = await axios.post(
                `/api/admin/customs_broker/setData`,
                formData
            );
            console.log("🚀 ~ handleSave ~ response:", response)
            if (response.data.status === false) {
                toast({
                    title: `Error ${tracking_id}!`,
                    description: response.data.message,
                    status: 'success',
                });
            } else {
                toast({
                    title: `Succes Added Entry Number For ${tracking_id}!`,
                    description: response.data.message,
                    status: 'success',
                });
            }
            pauseFetch(false)
            setLoading(false)
            reload();
        } catch (error) {
            console.log('Error', error);
            setLoading(false)
            toast({
                title: 'Error Cannot Change Status!',
                description: 'An error occurred while Assign the Entry Number.',
                status: 'error',
            });
        }
        toggleExpanded();
    };
    return (
        <>
            <PaymentsDialog
                open={openHoldPickup}
                setOpen={setOpenHoldPickup}
                trackingId={item?.tracking_id}
                key={item?.tracking_id}
                reload={reload}
                type={"Hold Pickup"}
                toggleExpanded={toggleExpanded}
            />

            {
                loading && <Loaders />
            }
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
                        <div className={`text-zinc-900 text-sm font-semiBold ${item?.status !== 'Received' ? "hidden" : "block"} text-xs`}>Confirm Your Order</div>
                    </div>
                    {
                        item?.services === "Cross Border Pickup" && item?.status === "Declared" && item?.entry_number === "1234" ? (
                            <>
                                <div className="flex flex-row justify-between">
                                    <Form {...form}>
                                        <form>
                                            <div className="flex flex-row justify-between gap-5 items-center">
                                                <div className="flex flex-row gap-2 items-center">
                                                    <p className='text-zinc-500 font-bold text-sm'>PARS/PAPS :</p>
                                                    <p
                                                        className='text-red-700 font-semi-bold text-sm'
                                                        style={{ fontFamily: 'roboto' }}
                                                    >
                                                        {item?.parspaps_number}
                                                    </p>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        type="button"
                                                        className=' w-[30px] h-[30px]'
                                                        onClick={() => handleCopy(item?.parspaps_number)}
                                                    >
                                                        <CopyIcon width={14} height={14} className='text-red-700' />
                                                    </Button>
                                                </div>
                                                <div className="">
                                                    <EntryNumber forms={form} />
                                                </div>
                                                <Button
                                                    variant={'destructive'}
                                                    className="w-[120px]  justify-center items-center gap-2.5 flex"
                                                    size="xs"
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleSave(form.getValues());
                                                    }}
                                                >
                                                    <div className="text-justify text-white text-xs font-semiBold ">Register</div>
                                                </Button>
                                            </div>
                                        </form>
                                    </Form>
                                </div>
                            </>
                        ) : (
                            null
                        )
                    }
                    {
                        item?.status_id === 11 ? (
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
                        ) : item?.status_id !== 12 && item.status_id !== 2 && item.status_id !== 1 && item.status_id !== 11 && item?.entry_number !== "1234" ? (
                            <>
                                <div className="justify-between items-center gap-5 flex rounded-sm flex-row flex-wrap border border-zinc-400/30 px-[10px] py-[10px] w-full">
                                    <div className="flex-row flex justify-start items-center gap-2 w-max pr-6 ">
                                        {
                                            warehouse ? (
                                                <>
                                                    <div className="w-[40px] h-[35px] flex items-center">
                                                        <img
                                                            src={`https://flagcdn.com/h20/${countryCode}.png`}
                                                            alt="country icon"
                                                            style={{ width: '40px', objectFit: 'contain', }}
                                                            className='border h-fit w-[40px]'
                                                        />
                                                    </div>
                                                    <div className=" w-max px-2 text-xs flex flex-col">
                                                        <p className='w-max'>Ship To {item?.warehouse_name_destination || "-"} Warehouse</p>
                                                        {
                                                            <p className='w-max'>{warehouse?.address || "-"} </p>
                                                        }
                                                        {/* <p className='w-max'>{warehouse?.address || "-"} </p> */}
                                                    </div>
                                                </>
                                            ) : (
                                                <Skeleton className='w-[250px] h-[35px]' />
                                            )
                                        }

                                    </div>
                                    <div className=" w-max px-2 text-xs text-zinc-500 flex flex-col">
                                        {/* <p className='w-max'>Estimate 14-16 Apr</p>
                                    <p className='w-max'>Tracking ID #1231231231</p> */}
                                    </div>
                                </div>
                            </>
                        ) : item?.status_id === 12 || item.status_id === 2 ? (
                            <>
                                <div className="justify-between items-center gap-5 flex rounded-sm flex-row flex-wrap border border-zinc-400/30 px-[10px] py-[10px] w-full">
                                    <div className="flex-row flex justify-start items-center gap-2 w-max pr-6 ">
                                        {
                                            warehouse ? (
                                                <>
                                                    <div className="w-[40px] h-[35px] flex items-center">
                                                        <img
                                                            src={`https://flagcdn.com/h20/${countryCode}.png`}
                                                            alt="country icon"
                                                            style={{ width: '40px', objectFit: 'contain', }}
                                                            className='border h-fit w-[40px]'
                                                        />
                                                    </div>
                                                    <div className=" w-max px-2 text-xs flex flex-col">
                                                        <p className='w-max'>Ready To Pickup At {item?.warehouse_name_destination || "-"} Warehouse</p>
                                                        {
                                                            <p className='w-max'>{warehouse?.address || "-"} </p>
                                                        }
                                                        {/* <p className='w-max'>{warehouse?.address || "-"} </p> */}
                                                    </div>
                                                </>
                                            ) : (
                                                <Skeleton className='w-[250px] h-[35px]' />
                                            )
                                        }

                                    </div>
                                    <div className=" w-max px-2 text-xs text-zinc-500 flex flex-col">
                                        {/* <p className='w-max'>Estimate 14-16 Apr</p>
                                <p className='w-max'>Tracking ID #1231231231</p> */}
                                    </div>
                                </div>
                            </>
                        ) :
                            (
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
