/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { EventTabled } from './components/EventTable'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import axios from 'axios'
import { Skeleton } from '@/components/ui/skeleton'
import NextLink from 'next/link'
import { Card } from '@/components/ui/card'
import { InternalCode } from './components/dialog/InternalCode'
export default function VerificationPages({ params }) {
    console.log("Helo", params.slug)

    const [openInternal, setOpenInternal] = useState(false);
    const [data, setData] = useState({});
    const [skeleton, setSkeleton] = useState(true);
    const [query, setQuery] = useState({
        keyword: `${params.slug}`,
        date_start: "",
        date_end: "",
        tracking_id: "",
    });

    const fetchData = async () => {
        try {
            const response = await axios.post(
                `/api/admin/packages/list`,
                query
            );
            console.log(response)
            const responseData = await response.data.package_info[0];
            console.log(responseData)
            setData(responseData);
            setSkeleton(false)
        } catch (error) {
            setSkeleton(false)
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [query]);

    console.log("data : ", data)
    console.log("data : ", data[0]?.customer_name)

    const weigthType = data?.package_weight_unit || "Ibs";
    const heightType = data?.package_height_unit || "In";
    return (
        <>
            <InternalCode open={openInternal} setOpen={setOpenInternal} trackingID={data?.tracking_id} name={data?.customer_name} userID={data?.customer_id} />
            <div className={styles.wrapper}>
                <div className={styles.configHeader}>
                    <div className={styles.banner}>
                        <div className={styles.icon}>
                            <Image
                                src={"/backoffice/verification-blue.png"}
                                width={40}
                                height={40}
                                alt='config icon'
                            />
                        </div>
                        <div className={`${styles.title} flex flex-col`}>
                            <h1 className=" text-zinc-900 text-sm font-bold ">Package Details</h1>
                            <p className=" text-blue-900 text-xs font-normal">Showing Details Package</p>
                        </div>
                    </div>
                </div>
                <div className={styles.childContent}>
                    <div className={`${styles.carrier} flex flex-row gap-2`}>
                        <div className="profileCard w-[30%] border border-neutral-200 rounded-md p-4">
                            <div className="head">
                                <p className=' text-myBlue font-base font-bold'>Package Details</p>
                            </div>
                            <div className="flex flex-col gap-1 py-2">
                                <div className="profiles flex flex-row justify-start items-center gap-3">
                                    <div className="imgContainer w-[30] h-[30] rounded-full">
                                        {skeleton
                                            ? <Skeleton className="w-[30px] h-[30px] rounded-full object-cover" />
                                            : <img src="https://source.boringavatars.com/beam"
                                                alt="avatar"
                                                className='w-[30px] h-[30px] rounded-full object-cover'
                                            />
                                        }
                                    </div>
                                    <div className="nameContainer">
                                        {skeleton
                                            ? (
                                                <>
                                                    <Skeleton className="w-[100px] h-[20px] rounded-md" />
                                                </>
                                            )
                                            : (
                                                <>
                                                    <p className='text-sm'>{data?.customer_name || ""}</p>
                                                    <NextLink href={`/admin/customers-manager/${data?.customer_id}`}>
                                                        <p className='text-xs text-myBlue'>View User Details</p>
                                                    </NextLink>

                                                </>
                                            )
                                        }

                                    </div>
                                </div>

                                <div className="packageData flex flex-col gap-1 px-4 py-2">
                                    <div className="flex flex-col text-xs text-zinc-500">
                                        <p>Tracking Id</p>
                                        {skeleton ? <Skeleton className="w-[100px] h-[20px] rounded-md" /> : <p className='text-sm font-bold'>#{data?.tracking_id || ""}</p>}
                                    </div>
                                    <div className="flex flex-col text-xs text-zinc-500">
                                        <p>Package Status</p>
                                        {skeleton ? <Skeleton className="w-[100px] h-[20px] rounded-md" /> : <p className='text-sm font-bold'>{data?.status || ""}</p>}
                                    </div>
                                    <div className="flex flex-col text-xs text-zinc-500">
                                        <p>Shipping Fees</p>
                                        {skeleton ? <Skeleton className="w-[100px] h-[20px] rounded-md" /> : <p className='text-sm font-bold'>$ {data?.shipping_fees || ""}</p>}
                                    </div>
                                    <div className="flex flex-col text-xs text-zinc-500">
                                        <p>Register Date</p>
                                        {skeleton ? <Skeleton className="w-[100px] h-[20px] rounded-md" /> : <p className='text-sm font-bold'>{data?.register_date || "undefined"}</p>}
                                    </div>
                                    <div className="flex flex-col text-xs text-zinc-500">
                                        <p>Carrier </p>
                                        {skeleton ? <Skeleton className="w-[100px] h-[20px] rounded-md" /> : <p className='text-sm font-bold'>{data?.carrier_code || "undefined"}</p>}
                                    </div>
                                    <div className="flex flex-col text-xs text-zinc-500">
                                        <p>Location</p>
                                        <p className='text-sm font-bold'>Toronto Warehouse</p>
                                        {skeleton ? <Skeleton className="w-[100px] h-[20px] rounded-md" /> : <p className='text-xs'>Bin : {data?.bin_location}</p>}
                                    </div>

                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="h-[30px]"
                                    >
                                        <p className=' text-xs'>Download Invoice</p>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="PackageInformation w-full border border-neutral-200 rounded-md p-4 flex flex-col gap-5">
                            <div className="flex flex-row gap-3 justify-between items-center">
                                <div className="head">
                                    <p className=' text-myBlue font-base font-bold'>Package Information</p>
                                </div>
                                <div className="flex flex-row gap-2">
                                    <NextLink href={`/admin/package-details/edit/${data?.tracking_id}`}>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                        >
                                            <p className=' text-xs'>Edit Package</p>
                                        </Button>
                                    </NextLink>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => setOpenInternal(true)}
                                    >
                                        <p className=' text-xs'>Download Internal Code</p>
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                    >
                                        <p className=' text-xs'>Download Package Information</p>
                                    </Button>
                                </div>
                            </div>
                            <div className="flex flex-row gap-4 py-2">
                                <div className="imageContainer flex flex-col w-[400px] items-center">
                                    {
                                        skeleton ? (
                                            <>
                                                <Skeleton className={"w-[100%] h-[250px]"} />
                                            </>
                                        ) : (
                                            <Carousel className="w-full ">
                                                <CarouselContent className=" ">
                                                    <>
                                                        {Array.from({ length: data?.images.length }).map((_, index) => (
                                                            <CarouselItem key={index} className=" w-full h-full grow-1">
                                                                <div className="w-full">
                                                                    <Card>
                                                                        <img
                                                                            style={{ objectFit: "cover", width: '100%', height: '250px', borderRadius: '8px' }}
                                                                            src={`https://sla.webelectron.com/api/Package/getimages?fullName=${data?.images[index].images}`}
                                                                            alt=""
                                                                        />
                                                                    </Card>

                                                                </div>
                                                            </CarouselItem>
                                                        ))}
                                                    </>


                                                </CarouselContent>
                                                <CarouselPrevious className="left-[10px]" />
                                                <CarouselNext className="right-[10px]" />
                                            </Carousel>
                                        )
                                    }

                                </div>

                                <div className="flex flex-col ">
                                    <div className="text-red-700 text-opacity-80 text-lg font-bold font-['Poppins']">
                                        {skeleton
                                            ? <Skeleton />
                                            : (
                                                <>
                                                    #{data?.barcode_tracking}
                                                </>
                                            )
                                        }
                                    </div>
                                    <div className="flex flex-col text-xs text-zinc-500">
                                        <p>Package Weight</p>
                                        <p className='text-sm font-bold'>{data?.package_weight} {data?.package_weight_unit}</p>
                                    </div>
                                    <div className="flex flex-col text-xs text-zinc-500">
                                        <p>Package Size</p>
                                        <p className='text-sm font-bold'>{data?.package_length} x {data?.package_witdth} x {data?.package_height}  {data?.package_height_unit}</p>
                                    </div>
                                    <div className="flex flex-col text-xs text-zinc-500">
                                        <p>Total Item Price</p>
                                        <p className='text-sm font-bold'>$ {data?.total_price}</p>
                                    </div>
                                    <div className="flex flex-col text-xs text-zinc-500">
                                        <p>PARS</p>
                                        <p className='text-sm font-bold'>{data?.pars || "undefined"}</p>
                                    </div>
                                    <div className="flex flex-col text-xs text-zinc-500">
                                        <p>Entry Number</p>
                                        <p className='text-sm font-bold'>{data?.entry_number || "undefined"}</p>
                                    </div>
                                    <div className="flex flex-col text-xs text-zinc-500">
                                        <p>Manifest Number</p>
                                        <p className='text-sm font-bold'>{data?.manifest || "undefined"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.childContent}>
                    <div className="head">
                        <p className=' text-myBlue font-base font-bold'>Package History</p>
                    </div>
                    {/* <EventTabled data={data} /> */}
                </div>
            </div>
        </>
    )
}
