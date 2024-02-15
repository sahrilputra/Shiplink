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
export const ImageTable = ({ labelImg, wholeBoxImg, contentImg }) => {
     const images = [labelImg, wholeBoxImg, contentImg].filter(image => image !== null);
    const [openImage, setOpenImage] = useState(false);
    return (
        <>
            <ImageDisplay open={openImage} setOpen={setOpenImage} />
            <Carousel>
                <CarouselContent className="flex items-center justify-center p-3">
                    {images.map((image, index) => (
                        <CarouselItem
                            key={index}
                            className="basis-1/3"
                            onClick={() => setOpenImage(true)}
                        >
                            <Image
                                src={image}
                                width={200}
                                height={200}
                                alt={`Image ${index}`}
                                style={{ objectFit: "cover", width: '200px', height: '130px' }}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </>
    )
}
