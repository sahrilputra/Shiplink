/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { EventTabled } from './components/EventTable'
import { Dialog } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
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
import { PackageDialogDetails } from '../../custom-brokers/components/dialog/PackageDialogDetails'
import { MoreHorizontalIcon } from 'lucide-react'
import { UpdateStatus } from './components/dialog/UpdateStatus'
import { DeletePackage } from './components/dialog/DeletePackage'
import Link from 'next/link'
import { useToast } from '@/components/ui/use-toast'
import { EventTable } from './components/EventTable'
export default function VerificationPages({ params }) {
    console.log("Helo", params.slug)
    const { toast } = useToast()
    const [openDelete, setOpenDelete] = useState(false)
    const [openStatus, setOpenStatus] = useState(false);
    const [openInternal, setOpenInternal] = useState(false);
    const [openPackage, setOpenPackage] = useState(false);
    const [data, setData] = useState({});
    const [skeleton, setSkeleton] = useState(true);
    const [images, setImage] = useState([]);
    const [documents, setDocuments] = useState("");
    console.log("🚀 ~ VerificationPages ~ documents:", documents)
    const [query, setQuery] = useState({
        keyword: "",
        date_start: "",
        date_end: "",
        tracking_id: `${params.slug}`,
    });

    const fetchData = async () => {
        try {
            const response = await axios.post(
                `/api/admin/packages/list`,
                {
                    ...query,
                    tracking_id: `${params.slug}`,
                }
            );
            console.log("response", response)
            const responseData = await response.data.package_info[0];
            console.log(responseData)
            setDocuments(responseData.documents);
            setData(responseData);
            setImage(responseData.images);
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

    const [filteredImages, setFilteredImages] = useState([]);
    const [filterInvoice, setVilterInvoice] = useState([]);

    console.log("🚀 ~ ExpandedTable ~ filterInvoice:", filterInvoice)
    useEffect(() => {
        const removeInvImage = () => {
            if (images) {
                const filtered = images.filter(image => !isInvoiceImage(image.type));
                setFilteredImages(filtered);
            }
        };

        const removeNonInvoice = () => {
            if (images) {
                const filtered = images.filter(image => isInvoiceImage(image.type));
                setVilterInvoice(filtered);
            }
        };

        removeNonInvoice();
        removeInvImage();
    }, [images]);

    const isInvoiceImage = (type) => {
        return type.toLowerCase() === "invoices";
    };

    const reloadData = () => {
        fetchData();
        setSkeleton(true)
    }
    console.log("Images: ", filteredImages)

    const markDelivered = async () => {
        setSkeleton(true);
        try {
            const response = await axios.post(`/api/admin/packages/setStatus`,
                {
                    tracking_id: data?.tracking_id,
                    status: "Complete"
                });
            console.log("🚀 ~ handleSave ~ response:", response)
            if (response.status === 200) {
                toast({
                    title: 'Success',
                    desription: 'Pakcage has been marked as delivered!',
                })
                setSkeleton(false);
            }
            fetchData();
            setSkeleton(false);
        } catch (error) {
            setSkeleton(false);
            console.log('Error:', error);
            toast({
                title: 'Error',
                desription: 'An error occurred while updating package',
            })
        }
    }

    const profileImg = `https://sla.webelectron.com/api/Users/getprofileimages_usercode?user_code=${data?.customer_id}` || "none"
    console.log("🚀 ~ VerificationPages ~ profileImg:", profileImg)
    return (
        <>
            <DeletePackage open={openDelete} setOpen={setOpenDelete} deleteID={[data?.tracking_id]} />
            <UpdateStatus open={openStatus} setOpen={setOpenStatus} dataID={data?.tracking_id} statusNow={data?.status} reload={reloadData} />
            <PackageDialogDetails open={openPackage} setOpen={setOpenPackage} details={data} />
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
                                            :
                                            <>
                                                <img src={profileImg !== "none" ? profileImg : "'../../../assets/user-holder.svg'"}
                                                    alt="avatar"
                                                    onError={(e) => {
                                                        e.target.src = '../../../assets/user-holder.svg'; // Ganti dengan URL gambar default
                                                    }}
                                                    className='w-[30px] h-[30px] rounded-full object-cover border'
                                                />
                                            </>
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
                                        <p>Package ID</p>
                                        {skeleton ? <Skeleton className="w-[100px] h-[20px] rounded-md" /> : <p className='text-sm font-bold'>#{data?.tracking_id || "-"}</p>}
                                    </div>
                                    <div className="flex flex-col text-xs text-zinc-500">
                                        <p>Package Status</p>
                                        {skeleton ? <Skeleton className="w-[100px] h-[20px] rounded-md" /> : <p className='text-sm font-bold'>{data?.status || "-"}</p>}
                                    </div>
                                    {/* <div className="flex flex-col text-xs text-zinc-500">
                                        <p>Package Total Price</p>
                                        {skeleton ? <Skeleton className="w-[100px] h-[20px] rounded-md" /> : <p className='text-sm font-bold'>$ {data?.total_price || "-"}</p>}
                                    </div> */}
                                    <div className="flex flex-col text-xs text-zinc-500">
                                        <p>Tracking Number</p>
                                        {skeleton ? <Skeleton className="w-[100px] h-[20px] rounded-md" /> : <p className='text-sm font-bold'>{data?.barcode_tracking || "-"}</p>}
                                    </div>
                                    <div className="flex flex-col text-xs text-zinc-500">
                                        <p>Carrier </p>
                                        {skeleton ? <Skeleton className="w-[100px] h-[20px] rounded-md" /> : <p className='text-sm font-bold'>{data?.carrier_code || "-"}</p>}
                                    </div>
                                    <div className="flex flex-col text-xs text-zinc-500">
                                        <p>Arrival</p>
                                        {skeleton ? <Skeleton className="w-[100px] h-[20px] rounded-md" /> : <p className='text-sm font-bold'>{data?.warehouse_name_arrival} WR - {data?.country_name_arrival}</p>}
                                    </div>
                                    <div className="flex flex-col text-xs text-zinc-500">
                                        <p>Destination</p>
                                        {skeleton ? <Skeleton className="w-[100px] h-[20px] rounded-md" /> : <p className='text-sm font-bold'>{data?.warehouse_name_destination} WR - {data?.country_name_destination}</p>}
                                    </div>
                                    <div className="flex flex-col text-xs text-zinc-500">
                                        <p>Bin Location</p>
                                        {skeleton ? <Skeleton className="w-[100px] h-[20px] rounded-md" /> : <p className='text-sm font-bold'>{data?.bin_location === "undefined" || data?.bin_location === "Undefined" ? "-" : data?.bin_location}</p>}
                                    </div>

                                    {/* {documents === "" || documents === null ? (
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            className={`h-[30px] w-full ${documents === null ? "cursor-not-allowed disabled" : "cursor-pointer"}`}
                                            disabled={documents === "" || documents === null}
                                        >
                                            <p className=' text-xs'>Download Documents</p>
                                        </Button>
                                    ) : (
                                        <>
                                            <Link
                                                className={`${documents === null ? "cursor-not-allowed" : "cursor-pointer"}`}
                                                passHref href={`https://sla.webelectron.com/api/Package/downloadfile?fullName=${documents}`}
                                            >
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    className={`h-[30px] w-full`}
                                                >
                                                    <p className=' text-xs'>Download Documents</p>
                                                </Button>
                                            </Link>
                                        </>
                                    )
                                    } */}
                                    {/* 
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="h-[30px] w-full"
                                        onClick={markDelivered}
                                        disabled={data?.status === "Complete"}
                                    >
                                        <p className=' text-xs'>Mark As Delivered</p>
                                    </Button>

                                    <NextLink passHref href={`/admin/invoice-manager/invoice?customer=${data?.customer_id}&package_id=${data?.tracking_id}`} >
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            className="h-[30px] w-full"
                                            disabled={documents === ""}
                                        >
                                            <p className=' text-xs'>Send Invoice To User</p>
                                        </Button>
                                    </NextLink> */}



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
                                    <div className="">
                                        <Dialog>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        className="flex flex-row gap-3 "
                                                    >
                                                        <p className=' text-xs'>More Action</p>
                                                        <MoreHorizontalIcon width={15} height={15} />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent side={"bottom"} align={"end"} sideOffset={2}>
                                                    <DropdownMenuItem
                                                        variant="secondary"
                                                        size="sm"
                                                        className="text-xs text-myBlue cursor-pointer hover:bg-blue-50  focus:bg-blue-50 focus:text-myBlue"
                                                        onClick={markDelivered}
                                                        disabled={data?.status === "Complete"}
                                                    >
                                                        <p className=' text-xs'>Mark As Delivered</p>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => setOpenStatus(true)}
                                                        className="text-xs text-myBlue cursor-pointer hover:bg-blue-50  focus:bg-blue-50 focus:text-myBlue"
                                                    >
                                                        <p className=' text-xs'>Update Status</p>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="text-xs cursor-pointer"
                                                    >
                                                        <p className=' text-xs'>Send Invoice To User</p>
                                                    </DropdownMenuItem>
                                                    {
                                                        filterInvoice.length > 0 ? (
                                                            filterInvoice.map((item, index) => (
                                                                <NextLink key={index} href={`https://sla.webelectron.com/api/Package/getimages?fullName=${item.images}`} passHref target='_blank' rel='noopener noreferrer'>
                                                                    <DropdownMenuItem
                                                                        key={index}
                                                                        className="text-xs w-[200px] cursor-pointer"
                                                                        value={index}

                                                                    >
                                                                        Donwload Invoice {index > 1 && index + 1}
                                                                    </DropdownMenuItem>
                                                                </NextLink>
                                                            ))
                                                        ) : (
                                                            <DropdownMenuItem
                                                                disabled={true}
                                                                className="text-xs text-myBlue w-[200px] cursor-pointer "
                                                            >
                                                                No Invoice
                                                            </DropdownMenuItem>
                                                        )
                                                    }

                                                    <DropdownMenuItem
                                                        onClick={() => setOpenInternal(true)}
                                                    >
                                                        <p className=' text-xs cursor-pointer'>Download Internal Code</p>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => setOpenPackage(true)}
                                                        className="text-xs cursor-pointer">
                                                        <p className=' text-xs'>Download Package Information</p>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => setOpenDelete(true)}
                                                        className="text-xs text-red-700 cursor-pointer hover:bg-red-50 focus:bg-red-50 focus:text-red-700"
                                                    >
                                                        Delete Package
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </Dialog>
                                    </div>
                                </div>
                            </div>
                            {/* <CarouselItem key={index} className=" w-full h-full grow-1">
                                                                <div className="w-full">
                                                                    <Card>
                                                                        <img
                                                                            style={{ objectFit: "cover", width: '100%', height: '250px', borderRadius: '8px' }}
                                                                            src={`https://sla.webelectron.com/api/Package/getimages?fullName=${data?.images[index].images}`}
                                                                            alt=""
                                                                        />
                                                                    </Card>

                                                                </div>
                                                            </CarouselItem> */}
                            <div className="flex flex-row gap-4 py-2">
                                <div className="imageContainer flex flex-col w-[400px] items-center">

                                    {
                                        skeleton ? (
                                            <>
                                                <Skeleton className={"w-[100%] h-[250px]"} />
                                            </>
                                        ) : (
                                            <Carousel className="w-full ">
                                                <CarouselContent>
                                                    {
                                                        filteredImages?.length === 0 ? (
                                                            <CarouselItem key={1} className="w-full h-full grow-1">
                                                                <div className="p-1 w-full">
                                                                    <Card
                                                                        className="p-1 w-full"
                                                                    >
                                                                        <Image
                                                                            src={'/assets/img-placeholder.svg'}
                                                                            width={200}
                                                                            height={200}
                                                                            alt={`Image`}
                                                                            style={{ objectFit: "contain", width: '100%', height: '250px', }}
                                                                        />
                                                                    </Card>
                                                                </div>
                                                            </CarouselItem>
                                                        ) : null
                                                    }

                                                    {Array.from({ length: filteredImages?.length }).map((_, index) => (
                                                        <CarouselItem key={index} className="w-full h-full grow-1">
                                                            <div className="w-full">
                                                                <Card
                                                                    className="p-1 w-full"
                                                                >
                                                                    <img
                                                                        style={{ objectFit: "contain", width: '100%', height: '250px', }}
                                                                        src={`https://sla.webelectron.com/api/Package/getimages?fullName=${filteredImages[index].images}`}
                                                                        alt=""
                                                                    />

                                                                </Card>
                                                            </div>
                                                        </CarouselItem>
                                                    ))}
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
                                        <p>Package Total Price</p>
                                        <p className='text-sm font-bold'>$ {(data?.total_price < 1 ? "-" : data?.total_price) || "-"}</p>
                                    </div>
                                    <div className="flex flex-col text-xs text-zinc-500">
                                        <p>PARS</p>
                                        <p className='text-sm font-bold'>{data?.pars || "-"}</p>
                                    </div>
                                    <div className="flex flex-col text-xs text-zinc-500">
                                        <p>Entry Number</p>
                                        <p className='text-sm font-bold'>{data?.entry_number || "-"}</p>
                                    </div>
                                    <div className="flex flex-col text-xs text-zinc-500">
                                        <p>Manifest Number</p>
                                        <p className='text-sm font-bold'>{data?.manifiest_number || "-"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.history} mb-1 p-0 gap-[10px]`}>
                    <div className="head mt-2">
                        <p className=' text-myBlue font-base font-bold'>Package History</p>
                    </div>
                    <div className="mb-1">
                        <EventTable id={data?.tracking_id} status={data?.status} />
                    </div>
                </div>
            </div>
        </>
    )
}
