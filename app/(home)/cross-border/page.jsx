'use client'
import React from 'react'
import styles from '../../styles.module.scss'
import { CardData } from '@/components/home/CardData'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { CardCrossBorder } from '@/components/home/CardCrossBorder'
import { Button } from '@/components/ui/button'
export default function Home() {
    return (
        <>
            <div className={styles.container}>
                <div className="flex flex-col text-center justify-start gap-[32px] pt-[90px] w-full bg-[#FFFFF] py-20">
                    <div className="flex flex-col gap-5 justify-start text-left w-[90%] mx-auto pt-10">
                        <h1 className=" text-myBlue text-3xl font-bold">Cross-Border Mailbox</h1>
                        <div className="text-[#5A5A5A] text-base">
                            <p>Lorem ipsum dolor sit amet consectetur. Massa non lectus dictumst consequat massa molestie ipsum mauris. Id arcu dolor integer et ultrices. Enim ipsum ridiculus a a. Metus adipiscing purus scelerisque tortor tempor pretium turpis rhoncus.</p>
                        </div>

                        <div className="flex flex-col gap-5">
                            <h1 className=" text-black text-lg font-bold">How it Works</h1>
                            <p className='text-[#5A5A5A] text-base'>With our Cross-Border Mailbox service you receive your packages and documents within their originating country in the most convenient, fast and economical way. With your ShipLink address you can make purchases online at your favorite stores, subscribe to magazines, receive correspondence and much more without the extra costs of international shipping and brokerage surcharges for items worth less than $800.</p>
                        </div>
                    </div>
                </div>
                {/* seection */}
                <div className={`${styles.works} py-20 gap-10 bg-gradient-to-br from-blue-50 to-white`} >
                    <div className="">
                        <h2 className="text-2xl text-black font-bold text-center">
                            Start Buy and Receive with us !
                        </h2>
                        <div className="mt-10">
                            <CardCrossBorder />
                        </div>
                        <div className="mt-20 mx-auto text-center items-center">
                            <Button
                                variant="destructive"
                                size="lg"
                                className="rounded px-20"
                            >
                                <p className="text-base">Get My Account</p>
                            </Button>
                        </div>
                    </div>
                </div>


            </div>

        </>
    )
}
