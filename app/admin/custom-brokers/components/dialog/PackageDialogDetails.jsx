/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useRef, useState } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useReactToPrint } from 'react-to-print'
import Magnifier from "react-magnifier";
export const PackageDialogDetails = ({ open, setOpen, details }) => {
    console.log("Details : ", details)
    const sizeType = details?.package_height_unit || "Ibs"
    const images = details?.images || null
    console.log("Images : ", images)
    const [filteredImages, setFilteredImages] = useState([]);
    useEffect(() => {
        const removeInvImage = () => {
            if (images) {
                const filtered = images.filter(image => !isInvoiceImage(image.type));
                setFilteredImages(filtered);
            }
        };

        removeInvImage();
    }, [images]);

    const isInvoiceImage = (type) => {
        return type.toLowerCase() === "invoices";
    };

    // PDF Print
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent ref={componentRef} close={false}>
                <DialogDescription>
                    <div className="flex flex-row gap-4 items-center">
                        <div className="imageContainer flex flex-col w-[400px] items-center">
                            <Carousel className="w-full ">
                                <CarouselContent>
                                    {
                                        filteredImages?.length > 0 ? (
                                            Array.from({ length: filteredImages?.length }).map((_, index) => (
                                                <CarouselItem key={index} className=" w-full h-full grow-1">
                                                    <div className="w-full">
                                                        <Card>
                                                            <div className="flex">
                                                                <Magnifier
                                                                    className='image'
                                                                    src={`https://sla.webelectron.com/api/Package/getimages?fullName=${filteredImages[index].images}`}
                                                                    alt=""
                                                                    width={600}
                                                                    height={250}
                                                                />
                                                            </div>
                                                        </Card>
                                                    </div>
                                                </CarouselItem>
                                            ))
                                        ) : (
                                            <CarouselItem className=" w-full h-full grow-1">
                                                <Card>
                                                    <Image
                                                        src={'/assets/img-placeholder.svg'}
                                                        alt="placeholder"
                                                        width={400}
                                                        height={300}
                                                        style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '10px' }}
                                                    />
                                                </Card>
                                            </CarouselItem>
                                        )
                                    }

                                </CarouselContent>
                                {/* <CarouselContent className=" ">
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
                                </CarouselContent> */}
                                <CarouselPrevious className="left-[10px]" />
                                <CarouselNext className="right-[10px]" />
                            </Carousel>
                        </div>

                        <div className="flex flex-col w-[200px] ">
                            <DialogTitle className="font-bold text-left text-myBlue">
                                Package Details
                            </DialogTitle>
                            <p className="text-red-700 text-opacity-80 text-lg font-bold font-['Poppins']">#{details?.tracking_id || "undefined"}</p>
                            <div className="flex flex-col text-xs text-zinc-500">
                                <p>Package Weight</p>
                                <p className='text-sm font-bold'>{details?.package_weight || "0"} {details?.package_weight_unit || "Ibs"}</p>
                            </div>
                            <div className="flex flex-col text-xs text-zinc-500">
                                <p>Package Size</p>
                                <p className='text-sm font-bold'>{details?.package_length || "0"} x {details?.package_height || "0"} x {details?.package_witdth || "0"} {sizeType}</p>
                            </div>
                            <div className="flex flex-col text-xs text-zinc-500">
                                <p>Total Item Price</p>
                                <p className='text-sm font-bold'>$ {details?.total_price || "0"}</p>
                            </div>
                            <div className="flex flex-col text-xs text-zinc-500">
                                <p>PARS</p>
                                <p className='text-sm font-bold'>{details?.parspaps_number || "-"}</p>
                            </div>
                            <div className="flex flex-col text-xs text-zinc-500">
                                <p>Entry Number</p>
                                <p className='text-sm font-bold'>{details?.entry_number || "-"}</p>
                            </div>
                            <div className="flex flex-col text-xs text-zinc-500">
                                <p>Manifest Number</p>
                                <p className='text-sm font-bold'>{details?.manifiest_number || "-"}</p>
                            </div>
                            <div className="flex flex-row gap-2 text-xs text-zinc-500  py-3">
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    className="h-[30px] w-full"
                                    type="button"
                                    onClick={handlePrint}
                                >
                                    <p className='text-xs'>Print</p>
                                </Button>
                                <Button
                                    variant="redOutline"
                                    size="sm"
                                    className="h-[30px] w-full"
                                    type="button"
                                    onClick={() => setOpen(false)}
                                >
                                    <p className='text-xs'>Close</p>
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}
