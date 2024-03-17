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
import { Card } from '@/components/ui/card'
const imgPlaceHolder = '@/public/assets/img-placeholder.svg'
import { Skeleton } from '@/components/ui/skeleton'
export const ImageTable = ({ labelImg, wholeBoxImg, contentImg, images = null }) => {
    //  const images = [labelImg, wholeBoxImg, contentImg].filter(image => image !== null);
    console.log("Images: ", images)
    const [openImage, setOpenImage] = useState(false);

    return (
        <>
            <ImageDisplay open={openImage} setOpen={setOpenImage} images={images} />
            <Carousel>
                <CarouselContent>
                    {
                        images?.length === 0 ? (
                            <CarouselItem key={1} className="basis-1">
                                <div className="p-1">
                                    <Card
                                        className="p-1 w-[200px]"
                                    >
                                        <Image
                                            src={'/assets/img-placeholder.svg'}
                                            width={200}
                                            height={200}
                                            alt={`Image`}
                                            style={{ objectFit: "contain", width: '100%', height: '130px' }}
                                        />
                                    </Card>
                                </div>
                            </CarouselItem>
                        ) : null
                    }

                    {Array.from({ length: images?.length }).map((_, index) => (
                        <CarouselItem key={index} className="basis-1/3">
                            <div className="p-1">
                                <Card
                                    className="p-1 w-[200px]"
                                    onClick={() => { setOpenImage(true) }}
                                >
                                    <img
                                        style={{ objectFit: "contain", width: '100%', height: '130px' }}
                                        src={`https://sla.webelectron.com/api/Package/getimages?fullName=${images[index].images}`}
                                        alt=""
                                    />

                                </Card>
                            </div>
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