/* eslint-disable @next/next/no-img-element */
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Magnifier from "react-magnifier";
import { Button } from '@/components/ui/button'


export const ImageDisplay = ({ open, setOpen, images = null }) => {
    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogDescription>
                        <div className="flex flex-row gap-4 items-center">
                            <div className="imageContainer flex flex-col w-[600px]  items-center">
                                <Carousel className="w-full ">
                                    <CarouselContent className=" ">
                                        {Array.from({ length: images?.length }).map((_, index) => (
                                            <CarouselItem key={index} className=" w-full h-full grow-1">
                                                <div className="w-full">
                                                    <Magnifier
                                                        className='image'
                                                        src={`https://sla.webelectron.com/api/Package/getimages?fullName=${images[index].images}`}
                                                        alt=""
                                                        width={600}
                                                        height={400}
                                                    />
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious className="left-[10px]" />
                                    <CarouselNext className="right-[10px]" />
                                </Carousel>

                            </div>
                        </div>
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </>

    )
}
