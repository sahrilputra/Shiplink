'use client'
import React, { useState } from 'react'
import { FilterIcons } from '@/components/icons/iconCollection'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import styles from '../styles.module.scss'
import data from '../../../../data/admin/warehouseDataDetails.json'
import { WarehouseBinDataList } from '../components/table/warehouseDetails/BinListTable'
export default function Warehouse({ params }) {
    console.log("params : ", params.slug)

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.configHeader}>
                    <div className={styles.banner}>
                        <div className={styles.icon}>
                            <Image
                                src={"/backoffice/warehouse-blue.png"}
                                width={40}
                                height={40}
                                alt='config icon'
                            />
                        </div>
                        <div className={`${styles.title} flex flex-col`}>
                            <h1 className=" text-zinc-900 text-sm font-bold ">Warehouse Management</h1>
                            <p className=" text-blue-900 text-xs font-normal">10 Warehouse  | 5 Active </p>
                        </div>
                    </div>
                </div>
                <div className={styles.childContent}>
                    <div className={styles.carrier}>
                        <div className="flex flex-row w-full text-sm gap-3 justify-between">
                            <div className="imageContainer  ">
                                <Image
                                    src={'/backoffice/warehouseImage.png'}
                                    alt='warehouse image'
                                    width={300}
                                    height={300}
                                    className='w-[400px] h-full rounded-md'
                                />
                            </div>
                            <div className="chartContainer flex flex-col gap-2">
                                <div className="w-20 h-20">
                                    data1
                                </div>
                                <div className="w-20 h-20">
                                    data2
                                </div>
                            </div>

                            <div className="userList w-[250px] flex flex-col gap-1">
                                <div className="px-2.5 py-1.5 rounded-md w-full border border-neutral-200 flex-col justify-start items-start inline-flex">
                                    <div className="flex flex-row gap-3 items-center ">
                                        <div className="userImage ">
                                            <Image
                                                src={'/backoffice/warehouseImage.png'}
                                                alt='warehouse image'
                                                width={80}
                                                height={80}
                                                objectFit='cover'
                                                className='h-[50px] w-[50px] rounded-full'
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="text-zinc-600 text-opacity-70 text-xs font-normal font-['Poppins']">Head Officer</div>
                                            <div className="text-zinc-600 text-sm font-normal font-['Poppins']">John Doe</div>
                                            <div className="text-sky-700 text-xs font-normal font-['Poppins']">View User Details</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-2.5 py-1.5 rounded-md w-full border border-neutral-200 flex-col justify-start items-start inline-flex">
                                    <div className="flex flex-row gap-3 items-center ">
                                        <div className="userImage ">
                                            <Image
                                                src={'/backoffice/warehouseImage.png'}
                                                alt='warehouse image'
                                                width={80}
                                                height={80}
                                                objectFit='cover'
                                                className='h-[50px] w-[50px] rounded-full'
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="text-zinc-600 text-opacity-70 text-xs font-normal font-['Poppins']">Head Officer</div>
                                            <div className="text-zinc-600 text-sm font-normal font-['Poppins']">John Doe</div>
                                            <div className="text-sky-700 text-xs font-normal font-['Poppins']">View User Details</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-2.5 py-1.5 rounded-md w-full border border-neutral-200 flex-col justify-start items-start inline-flex">
                                    <div className="flex flex-row gap-3 items-center ">
                                        <div className="userImage ">
                                            <Image
                                                src={'/backoffice/warehouseImage.png'}
                                                alt='warehouse image'
                                                width={80}
                                                height={80}
                                                objectFit='cover'
                                                className='h-[50px] w-[50px] rounded-full'
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="text-zinc-600 text-opacity-70 text-xs font-normal font-['Poppins']">Head Officer</div>
                                            <div className="text-zinc-600 text-sm font-normal font-['Poppins']">John Doe</div>
                                            <div className="text-sky-700 text-xs font-normal font-['Poppins']">View User Details</div>
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="mt-2 w-full text-xs"
                                >
                                    Show All User
                                </Button>
                            </div>

                            <div className="flex flex-row gap-2">
                                <div className="flex-col justify-start items-start gap-1 inline-flex">
                                    <div className="flex-col justify-start items-start gap-0.5 flex">
                                        <div className="text-zinc-600 text-opacity-70 text-xs font-normal font-['Poppins']">warehouse Name</div>
                                        <div className="text-zinc-900 text-sm font-medium font-['Poppins']">Toronto Warehouse</div>
                                    </div>
                                    <div className="flex-col justify-start items-start gap-0.5 flex">
                                        <div className="text-zinc-600 text-opacity-70 text-xs font-normal font-['Poppins']">Total Package</div>
                                        <div className="w-[181px] text-zinc-900 text-sm font-medium font-['Poppins']">120 Package</div>
                                    </div>
                                    <div className="flex-col justify-start items-start gap-0.5 flex">
                                        <div className="text-zinc-600 text-opacity-70 text-xs font-normal font-['Poppins']">Time Operation</div>
                                        <div className="text-zinc-900 text-sm font-medium font-['Poppins']">$ 07.20 - 17.00</div>
                                    </div>
                                    <div className="flex-col justify-start items-start gap-0.5 flex">
                                        <div className="text-zinc-600 text-opacity-70 text-xs font-normal font-['Poppins']">Total Employees</div>
                                        <div className="w-[93px] text-zinc-900 text-sm font-medium font-['Poppins']">12</div>
                                    </div>
                                </div>

                                <div className="flex-col justify-start items-start gap-0.5 inline-flex">
                                    <div className="text-zinc-600 text-opacity-70 text-xs font-normal font-['Poppins']">Location</div>
                                    <div className="text-zinc-900 text-sm font-medium font-['Poppins']">Toronto</div>
                                    <div className="text-zinc-800 text-xs font-medium font-['Poppins']">ON Canada Postal <br />Code: M1X 2Y3<br />1234 Warehouse Street  Toronto</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.childContent}>
                    <WarehouseBinDataList data={data} />
                </div>
            </div>
        </>
    )
}
