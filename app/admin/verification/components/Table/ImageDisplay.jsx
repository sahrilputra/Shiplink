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
import { Button } from '@/components/ui/button'

export const ImageDisplay = ({ open, setOpen }) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogDescription>
                    <div className="flex flex-row gap-4 items-center">
                        <div className="imageContainer flex flex-col w-[800px] items-center">
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
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}
