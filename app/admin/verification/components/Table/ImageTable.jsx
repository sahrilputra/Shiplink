/* eslint-disable @next/next/no-img-element */
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
export const ImageTable = ({ labelImg, wholeBoxImg, contentImg, images = null }) => {
    //  const images = [labelImg, wholeBoxImg, contentImg].filter(image => image !== null);
    console.log("Images: ", images)
    const [openImage, setOpenImage] = useState(false);
    return (
        <>
            <ImageDisplay open={openImage} setOpen={setOpenImage} clickedImage={images} />
            <Carousel>
                <CarouselContent className="flex items-center justify-center p-3">
                    {images.map((image, index) => (

                        <CarouselItem
                            key={index}
                            className="basis-1/3"
                            onClick={() => setOpenImage(true)}
                        >
                            <img
                                style={{ objectFit: "cover", width: '200px', height: '130px' }}
                                src={`https://sla.webelectron.com/api/Package/getimages?fullName=${image.images}`}
                                alt=""
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

// <Image
//     src={image}
//     width={200}
//     height={200}
//     alt={`Image ${index}`}
//     style={{ objectFit: "cover", width: '200px', height: '130px' }}
// />