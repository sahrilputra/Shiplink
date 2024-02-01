'use client'
import React from 'react'
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
export const PackageDialogDetails = ({ open, setOpen }) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogDescription>
                    <div className="flex flex-row gap-4 items-center">
                        <div className="imageContainer flex flex-col w-[400px] items-center">
                            <Carousel className="w-full ">
                                <CarouselContent className=" ">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <CarouselItem key={index} className=" w-full h-full grow-1">
                                            <div className="w-full">
                                                <Image
                                                    src={'/assets/packageImage/packagePicture.png'}
                                                    width={500}
                                                    height={500}
                                                    alt='package image'
                                                    className='object-cover w-full rounded-md '
                                                />
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="left-[10px]" />
                                <CarouselNext className="right-[10px]" />
                            </Carousel>
                        </div>

                        <div className="flex flex-col w-[200px] ">
                            <DialogTitle className="font-bold text-left text-myBlue">
                                Package Details
                            </DialogTitle>
                            <p className="text-red-700 text-opacity-80 text-lg font-bold font-['Poppins']">#872812138328</p>
                            <div className="flex flex-col text-xs text-zinc-500">
                                <p>Package Weight</p>
                                <p className='text-sm font-bold'>12 Ibs</p>
                            </div>
                            <div className="flex flex-col text-xs text-zinc-500">
                                <p>Package Size</p>
                                <p className='text-sm font-bold'>4 x 5 x 4 In</p>
                            </div>
                            <div className="flex flex-col text-xs text-zinc-500">
                                <p>Total Item Price</p>
                                <p className='text-sm font-bold'>$ 129.99</p>
                            </div>
                            <div className="flex flex-col text-xs text-zinc-500">
                                <p>PARS</p>
                                <p className='text-sm font-bold'>1234241241</p>
                            </div>
                            <div className="flex flex-col text-xs text-zinc-500">
                                <p>Entry Number</p>
                                <p className='text-sm font-bold'>12314-21321-3232</p>
                            </div>
                            <div className="flex flex-col text-xs text-zinc-500">
                                <p>Manifest Number</p>
                                <p className='text-sm font-bold'>1231112</p>
                            </div>
                            <div className="flex flex-col text-xs text-zinc-500  py-3">
                                <Button
                                variant="destructive"
                                size="sm"
                                className="h-[30px]"
                                >
                                    <p className='text-xs'>Print Package Details</p>
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}
