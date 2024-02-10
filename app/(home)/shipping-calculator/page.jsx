'use client'
import React from 'react'
import styles from './styles.module.scss'
import { CardData } from '@/components/home/CardData'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
export default function Home() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.calculator}>
                        <div className="flex flex-col gap-5 justify-start text-left w-[90%] mx-auto ">
                            <h1 className=" text-myBlue text-lg font-bold">Shiiping Calculator</h1>
                            <h1 className=" text-black text-3xl font-bold">Simulate Your Shipping Cost</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non fermentum enim, nec finibus tellus.</p>
                        </div>

                        <div className="w-[90%] mx-auto py-5">
                            <p className='font-bold'>Select You Address</p>
                            <div className="flex flex-row gap-3 p-1 border border-zinc-300 w-max rounded-lg items-center text-sm">
                                <div className="bg-red-700 p-2 rounded-sm text-white">
                                    <p>Mailibox</p>
                                </div>
                                <div className=" p-2 rounded-sm ">
                                    <p>Book Address</p>
                                </div>
                                <div className=" p-2 rounded-sm ">
                                    <p>Custom Address</p>
                                </div>
                            </div>

                            <div className="py-3 flex flex-col gap-2">
                                <div className="form flex flex-col gap-1">
                                    <p className='font-bold'>Select Your Mailbox</p>
                                    <Input />
                                </div>
                                <div className="form flex flex-col gap-1">
                                    <p className='font-bold'>Package Weight *</p>
                                    <Input />
                                </div>
                                <div className="form flex flex-col gap-1">
                                    <p className='font-bold'>Package dimension *</p>
                                    <div className="flex flex-row gap-2">
                                        <Input
                                            id="length"
                                            className={`rounded-sm px-2 py-0 `}
                                            type="number"
                                            placeholder="length" />
                                        <Input
                                            id="length"
                                            className={`rounded-sm px-2 py-0 `}
                                            type="number"
                                            placeholder="length" />
                                        <Input
                                            id="length"
                                            className={`rounded-sm px-2 py-0 `}
                                            type="number"
                                            placeholder="length" />
                                    </div>
                                </div>
                                <div className="form flex flex-col gap-1 w-full">
                                    <p className='font-bold'>Reshipped to ... </p>
                                    <div className="flex flex-row gap-2 w-full">
                                        <div className="form flex flex-col gap-1 w-full">
                                            <p className='font-bold text-sm'>Country * </p>
                                            <Input
                                                id="length"
                                                className={`rounded-sm px-2 py-0 w-full`}
                                                type="number"
                                                placeholder="length" />
                                        </div>
                                        <div className="form flex flex-col gap-1 w-full">
                                            <p className='font-bold text-sm'>State / Province * </p>
                                            <Input
                                                id="length"
                                                className={`rounded-sm px-2 py-0  w-full`}
                                                type="number"
                                                placeholder="length" />
                                        </div>
                                    </div>
                                    <div className="flex flex-row gap-2 w-full">
                                        <div className="form flex flex-col gap-1 w-full">
                                            <p className='font-bold text-sm'>State / Province * </p>
                                            <Input
                                                id="length"
                                                className={`rounded-sm px-2 py-0 w-full`}
                                                type="number"
                                                placeholder="length" />
                                        </div>
                                        <div className="form flex flex-col gap-1 w-full">
                                            <p className='font-bold text-sm'>Zip/Postal Code * </p>
                                            <Input
                                                id="length"
                                                className={`rounded-sm px-2 py-0 w-full`}
                                                type="number"
                                                placeholder="length" />
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    variant='destructive'
                                >
                                    <p>Show Rates</p>
                                </Button>
                            </div>
                        </div>

                    </div>


                    <div className={styles.carrier}>
                        <div className="flex flex-row justify-between items-center">
                            <h3 className='text-2xl font-bold '>Rates</h3>
                            <div className="py-1 px-2 border border-[#5a5a5a]">
                                Refresh
                            </div>
                        </div>

                        <div className="py-5">
                            <div className="px-2 py-1 bg-red-700/20 text-red-700 border border-red-700 w-max">
                                Cheapest
                            </div>

                            <div className="py-5 flex flex-col gap-2">
                                <div className="p-1.5 flex flex-row gap-3 border border-zinc-300 rounded-md items-center">
                                    <Image
                                        alt='carrier'
                                        src='/assets/home/labels/icon/1.png'
                                        width={50}
                                        height={50}
                                        style={{ width: 50, height: 50 }}
                                    />
                                    <div className="flex flex-col gap-2">
                                        <p>Canada Post Regular Parcel</p>
                                        <div className="flex justify-between items-center">
                                            <p className='text-sm'>2 - 3 Days</p>
                                            <p className='text-bold '>CA$ 24.20</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-1.5 flex flex-row gap-3 border border-zinc-300 rounded-md items-center">
                                    <Image
                                        alt='carrier'
                                        src='/assets/home/labels/icon/1.png'
                                        width={50}
                                        height={50}
                                        style={{ width: 50, height: 50 }}
                                    />
                                    <div className="flex flex-col gap-2">
                                        <p>Canada Post Regular Parcel</p>
                                        <div className="flex justify-between items-center">
                                            <p className='text-sm'>2 - 3 Days</p>
                                            <p className='text-bold '>CA$ 24.20</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-1.5 flex flex-row gap-3 border border-zinc-300 rounded-md items-center">
                                    <Image
                                        alt='carrier'
                                        src='/assets/home/labels/icon/1.png'
                                        width={50}
                                        height={50}
                                        style={{ width: 50, height: 50 }}
                                    />
                                    <div className="flex flex-col gap-2">
                                        <p>Canada Post Regular Parcel</p>
                                        <div className="flex justify-between items-center">
                                            <p className='text-sm'>2 - 3 Days</p>
                                            <p className='text-bold '>CA$ 24.20</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
