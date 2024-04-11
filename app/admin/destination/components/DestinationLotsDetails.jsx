'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import styles from '../styles.module.scss'
import { map } from 'zod'
import NextLink from 'next/link'
export const DestinationLotsDetails = ({ data }) => {
    console.log("DATA : ", data)
    const isButtonDisabled = !data || Object.keys(data).length === 0;
    return (
        <>
            <div className={`${styles.detailContainerContent} p-2 px-4 bg-sky-50 w-full`}>
                <div className="header py-3 flex flex-row justify-between items-center">
                    <h1 className='text-base font-bold text-myBlue'>Lots Details</h1>
                    <p className='text-sm '>{data?.lots_id}</p>
                </div>

                <div className="content py-1 w-[100%] text-sm ">
                    <div className="bg-white/95 border border-zinc-200 px-2 py-2 w-full text-xs leading-4 flex flex-col gap-1.5 rounded">
                        <p>Lot Label : {data?.label}</p>
                        <p>Total Package : {data?.total_items}</p>
                        <p>Trip Number : {data?.trip_number}</p>
                        <p>Lot Origin : {data?.warehouse_origin_name} WH - {data?.country_name}</p>
                        <p>Lot Destination : {data?.destination_name}</p>
                        <p>Lot Location : {data?.warehouse_name_position} WH - {data?.country_code_position}</p>
                        <p>Last Update : {data?.updated_at}</p>
                        <div className='flex flex-row'>
                            <p>Documents :</p>
                            {
                                data?.documents ? (
                                    <NextLink
                                        href={`https://sla.webelectron.com/api/Package/getimages?fullName=/Assets/doc/lots/${data?.documents}`}
                                        passHref
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <p className='underline text-myBlue px-1'> View</p>
                                    </NextLink>
                                ) :
                                    null
                            }
                        </div>
                    </div>

                    <div className="buttonGroup py-3">
                        {isButtonDisabled ? (
                            <Button
                                variant="secondary"
                                size="sm"
                                className="h-[30px] w-full"
                                disabled
                            >
                                <p className='text-xs'>Load Lots</p>
                            </Button>
                        ) : (
                            <NextLink href={`/admin/Lots_Details/${data?.lots_id}`}>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="h-[30px] w-full"
                                    disabled={isButtonDisabled}
                                >
                                    <p className='text-xs'>Load Lots</p>
                                </Button>
                            </NextLink>
                        )}

                    </div>

                    {/* <div className="Footer w-full bg-white border-[2px] border-zinc-200 rounded-sm">
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
                    </div> */}
                </div>

            </div>
        </>
    )
}
