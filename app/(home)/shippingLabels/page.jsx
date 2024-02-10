'use client'
import React from 'react'
import styles from '../../styles.module.scss'
import { CardData } from '@/components/home/CardData'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { CardCrossBorder } from '@/components/home/CardCrossBorder'
import { ShippingLabels } from '@/components/home/ShippingLabels'
import { Button } from '@/components/ui/button'
export default function Home() {
    return (
        <>
            <div className={styles.container}>
                <div className="flex flex-col text-center justify-start gap-[32px] pt-[90px] w-full bg-[#FFFFF] py-10">
                    <div className="flex flex-col gap-5 justify-start text-left w-[90%] mx-auto pt-10">
                        <h1 className=" text-myBlue text-3xl font-bold">Shipping Labels</h1>
                        <h1 className=" text-black text-lg font-bold">How it Works</h1>
                    </div>
                </div>
                {/* seection */}
                <div className={`py-10 gap-10 bg-white`} >
                    <ShippingLabels />
                </div>
            </div>
        </>
    )
}
