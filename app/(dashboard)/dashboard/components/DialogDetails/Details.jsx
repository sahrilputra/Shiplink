'use-client'
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import * as yup from 'yup'
import { Toast } from '@/components/ui/toast'
import { DetailsIcons } from '@/components/icons/iconCollection'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { CopyIcons } from '@/components/icons/iconCollection'
import { Card } from '@/components/ui/card'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export const DetailsModals = ({ item, date }) => {
    const images = item?.images || null

    const [copied, setCopied] = useState(false);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
            })
            .catch((err) => console.error('Error copying text: ', err));
    };
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        className="relative w-[40px] h-[40px] p-3 px-[5px] flex justify-center items-center"
                        variant="destructive"
                    >
                        <div className="w-[40px] h-[40px] p-3 relative">
                            <DetailsIcons width={30} height={30} className="w-[40px] h-[40px] px-2 absolute top-0 left-[-5px]" />
                        </div>
                    </Button>
                </DialogTrigger>
                <DialogContent className="w-max">

                    <DialogDescription className="font-normal text-black flex flex-row flex-wrap justify-between gap-5 w-[700px]">
                        <div className="imageContainer flex flex-col w-[400px] items-center">
                            <Carousel className="w-full ">
                                <CarouselContent className=" ">
                                    {Array.from({ length: images?.length }).map((_, index) => (
                                        <CarouselItem key={index} className=" w-full h-full grow-1">
                                            <div className="w-full">
                                                <Card>
                                                    <img
                                                        style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '10px' }}
                                                        src={`https://sla.webelectron.com/api/Package/getimages?fullName=${images[index].images}`}
                                                        alt="images"
                                                    />
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="left-[10px]" />
                                <CarouselNext className="right-[10px]" />
                            </Carousel>
                        </div>
                        <div className="Details w-[40%]">
                            <div className="wrap">
                                <h3 className=' text-[14px] text-lg'>Previewing Package</h3>
                                <p className=' text-[14px]'>#{item?.tracking_id}</p>
                                <p className='text-myBlue text-sm'>Shipping Mailbox</p>
                                <p className='text-red-700 flex flex-row gap-2 items-center justify-start'>{item?.carrier_code} {item?.barcode_tracking}
                                    <CopyIcons
                                        onClick={() => handleCopy(item?.barcode_tracking)}
                                        className="cursor-pointer" width={12} height={12}
                                    />
                                </p>
                            </div>

                            <div className="Information">
                                <h3 className=' text-[14px]'>Package Name</h3>
                                <p className=' text-[14px]'>{item?.package_length} x {item?.package_witdth} x {item?.package_height} {item?.package_height_unit}</p>
                                <p className='text-myBlue text-sm'>{item?.package_weight} {item?.package_weight_unit}</p>
                                <div className="wrap">
                                    <p className='text-xs text-zinc-500'>Shipped Date :</p>
                                    <p className='text-sm'>{date}</p>
                                    <p className='text-xs text-zinc-500'>Status :</p>
                                    <p className='text-sm'>{item?.status}</p>
                                    <p className='text-xs text-zinc-500'>Destination :</p>
                                    <p className='text-sm'>Boston, USA</p>
                                </div>
                            </div>

                            <div className="Action flex flex-row gap-3 mt-2">
                                <div className="flex flex-col justify-center gap-3 items-center">
                                    <p className='text-sm text-center'>Request More Images</p>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="w-[130px]"
                                    >
                                        Request
                                    </Button>
                                </div>
                                <div className=" w-2 h-[60px]">
                                    <Separator orientation="vertical" />
                                </div>
                                <div className="flex flex-col justify-center gap-3 items-center">
                                    <p className='text-sm text-center'>Consolidate Package</p>
                                    <Button
                                        variant="destructive"
                                        className="w-[130px]"
                                        size="sm"
                                    >
                                        Cancel Request
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </DialogDescription>
                    {/* <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter> */}
                </DialogContent>
            </Dialog>
        </>
    )
}
