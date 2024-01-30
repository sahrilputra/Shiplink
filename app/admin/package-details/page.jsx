'use client'
import React, { useState } from 'react'
import styles from './styles.module.scss'
import { FilterIcons } from '@/components/icons/iconCollection'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/ui/searchBar'
import { Input } from '@/components/ui/input'
import { DatePickerWithRange } from '@/components/date/DateRangePicker'
import data from '../../../data/admin/packageEventData.json'
import Image from 'next/image'
import { EventTabled } from './components/EventTable'

export default function VerificationPages() {

    const [open, setOpen] = useState(false);

    const [selectedTab, setSelectedTab] = useState("All");
    console.log("parent : ", selectedTab)

    const filterData = selectedTab === 'All' ? data : data.filter(item => item.CustomsStatus === selectedTab);

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.configHeader}>
                    <div className={styles.banner}>
                        <div className={styles.icon}>
                            <Image
                                src={"/backoffice/verification-blue.png"}
                                width={40}
                                height={40}
                                alt='config icon'
                            />
                        </div>
                        <div className={`${styles.title} flex flex-col`}>
                            <h1 className=" text-zinc-900 text-sm font-bold ">Package Details</h1>
                            <p className=" text-blue-900 text-xs font-normal">Showing Details Package</p>
                        </div>
                    </div>
                </div>
                <div className={styles.childContent}>
                    <div className={`${styles.carrier} flex flex-row gap-2`}>
                        <div className="profileCard w-[30%] border border-neutral-200 rounded-md p-4">
                            <div className="head">
                                <p className=' text-myBlue font-base font-bold'>Package Details</p>
                            </div>
                            <div className="flex flex-col gap-1 py-2">
                                <div className="profiles flex flex-row justify-start items-center gap-3">
                                    <div className="imgContainer w-[30] h-[30] rounded-full">
                                        <img src="https://source.boringavatars.com/beam"
                                            alt="avatar"
                                            className='w-[30px] h-[30px] rounded-full object-cover'
                                        />
                                    </div>
                                    <div className="nameContainer">
                                        <p className='text-sm'>John Doe</p>
                                        <p className='text-xs text-myBlue'>View User Details</p>
                                    </div>
                                </div>

                                <div className="packageData flex flex-col gap-1 px-4 py-2">
                                    <div className="flex flex-col text-xs text-zinc-500">
                                        <p>Tracking Id</p>
                                        <p className='text-sm font-bold'>#12134214214</p>
                                    </div>
                                    <div className="flex flex-col text-xs text-zinc-500">
                                        <p>Package Status</p>
                                        <p className='text-sm font-bold'>Forward / Cross Border</p>
                                    </div>
                                    <div className="flex flex-col text-xs text-zinc-500">
                                        <p>Shipping Fees</p>
                                        <p className='text-sm font-bold'>$ 123.00</p>
                                    </div>
                                    <div className="flex flex-col text-xs text-zinc-500">
                                        <p>Register Date</p>
                                        <p className='text-sm font-bold'>12 Apr, 2023</p>
                                    </div>
                                    <div className="flex flex-col text-xs text-zinc-500">
                                        <p>Carrier </p>
                                        <p className='text-sm font-bold'>Feedex</p>
                                    </div>
                                    <div className="flex flex-col text-xs text-zinc-500">
                                        <p>Location</p>
                                        <p className='text-sm font-bold'>Toronto Warehouse</p>
                                        <p>#1231 | Row 1 | Section 2 | Lv. 4</p>
                                    </div>

                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="h-[30px]"
                                    >
                                        <p className=' text-xs'>Download Invoice</p>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="PackageInformation w-full border border-neutral-200 rounded-md p-4">
                            <div className="head">
                                <p className=' text-myBlue font-base font-bold'>Package Information</p>
                            </div>
                            <div className="flex flex-row gap-2">
                                <p>Action</p>
                            </div>
                            <div className="flex flex-row gap-1 py-2">
                                <div className="imageContainer flex flex-col">
                                    <p>Image Here</p>
                                </div>

                                <div className="flex flex-col">
                                    <p className="text-red-700 text-opacity-80 text-lg font-bold font-['Poppins']">#872812138328</p>
                                    <div className="flex flex-col text-xs text-zinc-500">
                                        <p>Package Weight</p>
                                        <p className='text-sm font-bold'>12 Ibs</p>
                                    </div>
                                    <div className="flex flex-col text-xs text-zinc-500">
                                        <p>Package Size</p>
                                        <p className='text-sm font-bold'>4 x 5 x 4 In</p>
                                    </div>
                                    <div className="flex flex-col text-xs text-zinc-500">
                                        <p>Total Item Price</p>
                                        <p className='text-sm font-bold'>$ 129.99</p>
                                    </div>
                                    <div className="flex flex-col text-xs text-zinc-500">
                                        <p>PARS</p>
                                        <p className='text-sm font-bold'>1234241241</p>
                                    </div>
                                    <div className="flex flex-col text-xs text-zinc-500">
                                        <p>Entry Number</p>
                                        <p className='text-sm font-bold'>12314-21321-3232</p>
                                    </div>
                                    <div className="flex flex-col text-xs text-zinc-500">
                                        <p>Manifest Number</p>
                                        <p className='text-sm font-bold'>1231112</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.childContent}>
                    <div className="head">
                        <p className=' text-myBlue font-base font-bold'>Package History</p>
                    </div>
                    <EventTabled data={data} />
                </div>
            </div>
        </>
    )
}
