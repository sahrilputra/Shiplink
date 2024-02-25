
'use client'
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { UserProfileForms } from './components/userForms'
import { InvoiceList } from './components/invoiceData/invoiceList'
import { PaymentCards } from './components/PaymentsCard'
import { CustomerPackageList } from './components/userPackageData/dataList'
import listData from '../../../../data/admin/CustomerPackageDataList.json'
import { MoreAction } from './components/menus/MoreAction'
import axios from 'axios'

export default function UserPage({ params }) {

    console.log("hello :", params.slug)
    const [query, setQuery] = useState({
        keyword: `${params.slug}`,
        page: 0,
        limit: 0,
        index: 0

    })
    const [data, setData] = useState({})
    const [skeleton, setSkeleton] = useState(true);

    const fethcData = async () => {
        try {
            const response = await axios.post(
                `/api/admin/customer_manager/list`,
                query
            );
            console.log(response)
            const responseData = await response.data.customer
            setData(responseData)
            setSkeleton(false)
        } catch (error) {
            setSkeleton(false)
            console.log("Error", error)
        }
    }

    useEffect(() => {
        fethcData();
    }, [query])


    console.log("hello data : ", data)
    const [moreOpen, setMoreOpen] = useState(false);
    const toggleMoreOpen = () => {
        setMoreOpen(!moreOpen)
    }


    return (
        <>
            <div className="w-full">

                <div className="wrapper w-full flex flex-row justify-between gap-2 h-ful ">
                    <div className="left w-[30%] ">
                        <div className="content border bg-blue-200 border-neutral-200 rounded-md text-sm flex flex-col gap-1 justify-center items-center h-full" >
                            <div className="rounded-full m-3 mb-2 text-sm">
                                <img src="https://source.boringavatars.com/beam"
                                    alt="avatar"
                                    className='w-[50px] h-[50px] rounded-full object-cover'
                                />
                            </div>

                            <p className='font-bold text-sm'>Jemth Smith</p>
                            <p className=' text-zinc-600 text-sm'>#1234567</p>
                            <div className="text-xs text-zinc-600 text-center">
                                <p>Jhonsmith@gmail.com</p>
                                <p>(+1) 781-491-0874</p>
                            </div>

                            <div className="bg-green-50 border border-green-200 rounded-sm text-xs mt-3">
                                <p className='px-3 py-2'>Free</p>
                            </div>

                            <div className="ButtonGroup flex flex-col gap-2 py-3">

                                <Button
                                    variant="destructive"
                                    size="xs"
                                    className=""
                                >
                                    <p className='text-xs'>Edit Profiles</p>
                                </Button>
                                <MoreAction />
                            </div>
                        </div>
                    </div>
                    <div className="center w-[100%]">
                        <UserProfileForms />
                    </div>

                    <div className="right  h-full w-[40%]">
                        <div className="flex flex-col gap-1">
                            <div className="payments flex flex-col">
                                <PaymentCards />
                                <PaymentCards />
                                <Button
                                    variant="tableBlue"
                                    size="sm"
                                    className="w-full"
                                >
                                    <p className='text-xs'>Show All User Payment Method</p>
                                </Button>
                            </div>

                            <div className="Invoice">
                                {/* <InvoiceList /> */}
                                <Button
                                    variant="tableBlue"
                                    size="sm"
                                    className="w-full"
                                >
                                    <p className='text-xs'>Show All User Invoice History</p>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full">
                <CustomerPackageList data={listData} />
            </div>
        </>
    )
}
