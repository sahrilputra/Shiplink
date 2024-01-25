import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'
export const ImageTable = () => {
    return (
        <>
            <Carousel>
                <CarouselContent className="flex items-center justify-center p-3">
                    <CarouselItem className="basis-1/3">
                        <Image
                            src={"/assets/packageImage/packagePicture.png"}
                            width={200}
                            height={200}
                            alt="img Pict"
                        />
                    </CarouselItem>
                    <CarouselItem className="basis-1/3">
                        <Image
                            src={"/assets/packageImage/packagePicture.png"}
                            width={200}
                            height={200}
                            alt="img Pict"
                        />
                    </CarouselItem>
                    <CarouselItem className="basis-1/3">
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
