'use client'
import React, { useState } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { ImageDisplay } from './ImageDisplay'
import Image from 'next/image'
export const ImageTable = () => {
    const [openImage, setOpenImage] = useState(false);
    return (
        <>
            <ImageDisplay open={openImage} setOpen={setOpenImage} />
            <Carousel>
                <CarouselContent className="flex items-center justify-center p-3">
                    <CarouselItem
                        className="basis-1/3"
                        onClick={() => setOpenImage(true)}
                    >
                        <Image
                            src={"/assets/packageImage/packagePicture.png"}
                            width={200}
                            height={200}
                            alt="img Pict"
                        />
                    </CarouselItem>
                    <CarouselItem
                        className="basis-1/3"
                        onClick={() => setOpenImage(true)}
                    >
                        <Image
                            src={"/assets/packageImage/packagePicture.png"}
                            width={200}
                            height={200}
                            alt="img Pict"
                        />
                    </CarouselItem>
                    <CarouselItem
                        className="basis-1/3"
                        onClick={() => setOpenImage(true)}
                    >
                        <Image
                            src={"/assets/packageImage/packagePicture.png"}
                            width={200}
                            height={200}
                            alt="img Pict"
                        />
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </>
    )
}
