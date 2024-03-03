'use client'
import React, { useState } from 'react'
import styles from '../styles.module.scss'
import { AddressForms } from '../components/forms/AddressForm'
import { Separator } from '@/components/ui/separator'
import { CardForms } from '../components/forms/CardForms'
import { PaymentCards } from '../components/payments/PaymentCards'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"


export default function Page() {
    return (
        <>
            <div className={styles.content}>
                <div className="header p-5 flex flex-col gap-2">
                    <h1 className='text-zinc-900 text-base font-bold'>Billing Details</h1>
                </div>
                <div className="tableWrapper w-[90%] mx-auto">
                    <AddressForms  />
                </div>
                <div className="separator py-3 px-5">
                    <Separator className="py-[1px]" />
                </div>
                <div className="creditDetails p-5 flex flex-row gap-5 w-full justify-between">
                    <div className="w-full p-3">
                        <h1 className='text-zinc-900 text-base font-bold py-2'>New Credit Cards</h1>
                        <CardForms  />
                    </div>
                    <div className="separator">
                        <Separator orientation="vertical" className="px-[1px]" />
                    </div>

                    <div className="w-full p-3">
                        <h1 className='text-zinc-900 text-base font-bold py-2'>Saved Credit Cards</h1>
                        <div className="flex flex-col gap-3">
                            <PaymentCards />
                            <PaymentCards />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
