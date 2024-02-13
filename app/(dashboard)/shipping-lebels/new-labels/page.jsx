'use client'
import { PromoOne } from '@/components/ads/promoOne'
import React from 'react'
import styles from '../styles.module.scss'
import { ShippingFrom } from './components/layout/ShippingFrom'
import { ShippingTo } from './components/layout/ShippingTo'
import { Separator } from '@/components/ui/separator'
import { BottomForm } from './components/forms/BottomForm'
import { Rates } from './components/Rates/Rates'

export default function NewShippingLabel({ }) {
    return (
        <>
            <div className={styles.main}>
                <div className={`p-5 flex flex-row gap-3 w-full justify-between `}>
                    <div className="w-[45%]">
                        <ShippingFrom />
                    </div>
                    <div className=" w-[20px]">
                        <Separator orientation="vertical" className=" border-[1px] text-zinc-500" />
                    </div>
                    <div className="w-[45%]">
                        <ShippingTo />
                    </div>
                </div>
                <div className=" p-5 w-full">
                    <BottomForm />
                </div>
            </div>

            <div className={styles.rightPanel}>
                <div className={styles.rightPanelHeader}>
                    <div className="ads h-[100%] rounded-[6px] bg-white w-full">
                        <Rates />
                    </div>
                </div>
            </div>
        </>
    )
}
