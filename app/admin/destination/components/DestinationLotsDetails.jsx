'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import styles from '../styles.module.scss'
import { map } from 'zod'
import NextLink from 'next/link'
export const DestinationLotsDetails = ({ data }) => {
    return (
        <>
            <div className={`${styles.detailContainerContent} p-2 px-4 bg-sky-50 w-full`}>
                <div className="header py-3 flex flex-row justify-between items-center">
                    <h1 className='text-base font-bold text-myBlue'>Lots Details</h1>
                    <p className='text-sm '>{data?.LotsID}</p>
                </div>

                <div className="content py-1 w-[100%] text-sm ">
                    <div className="bg-zinc-100/70 border border-zinc-200 px-2 py-2 w-full text-xs">
                        <p>Lots Label : {data?.LotsLabel}</p>
                        <p>Total Package : {data?.TotalPackage}</p>
                        <p>Trip Number : {data?.TripNumber}</p>
                    </div>

                    <div className="buttonGroup py-3">
                        <NextLink href={"/admin/destination/lots/undefined"}>
                            <Button
                                variant="secondary"
                                size="sm"
                                className="h-[30px] w-full"
                            >
                                <p className='text-xs'>Load Lots</p>
                            </Button>
                        </NextLink>

                    </div>


                    <div className="Footer w-full bg-white border-[2px] border-zinc-200 rounded-sm">
                        <div className="header text-xs text-myBlue font-bold flex flex-row gap-3 justify-between w-full bg-blue-50 border rounded-sm border-zinc-100 p-2">
                            <p className='w-[40%]'>Date</p>
                            <p className="w-[60%]">Description</p>
                        </div>
                        <div className="list text-xs  bg-white border-b border-zinc-100 p-2">
                            {
                                data?.History.map((item, index) => {
                                    return (
                                        <>
                                            <div className="bg-white py-2 items-center border-b-[2px] border-zinc-100 flex flex-row gap-3 w-full justify-between ">
                                                <p className='text-[10px] w-[40%]'>{item?.date}</p>
                                                <div className="w-[60%]">
                                                    {item?.description}
                                                </div>
                                            </div>
                                        </>
                                    )
                                })

                            }
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
