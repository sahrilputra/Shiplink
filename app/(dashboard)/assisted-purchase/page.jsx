'use client'
import React from 'react'
import { Input } from '@/components/ui/input'
import styles from './styles.module.scss'
import { AdTop } from '@/components/ads/adTop'
import { LinkIcons } from '@/components/icons/iconCollection'
import { Separator } from '@/components/ui/separator'
import { SearchBar } from '@/components/ui/searchBar'
import { PaymentCard } from './components/PaymentCard'
import { Button } from '@/components/ui/button'
export default function page() {
    return (
        <>
            <div className={styles.main}>
                <div className={styles.content}>
                    <div className="top">
                        <h1 className='m-2 text-xl'>Assisted Purchase</h1>
                        <p className='text-zinc-500 text-md font-normal p-3'> Copy the link / URL of the items you would like and paste them into our order form, and we will do the rest. Your item will be purchased and delivered to your Mailbox.</p>
                    </div>
                    <div className={`${styles.forms} w-full form flex flex-row gap-5 p-3`}>
                        <div className=" flex-col w-[50%] justify-start items-center gap-2 inline-flex ">
                            <div className="form w-full">
                                <div className="text-zinc-800  font-medium leading-tight">Link of Product <span className="text-red-600 text-md font-semibold leading-tight">*</span></div>
                                <div className="w-full rounded-lg border border-neutral-200 justify-between items-center gap-3 inline-flex">
                                    <div className="pl-[10px]">
                                        <LinkIcons
                                            width={15}
                                            height={15}
                                        />
                                    </div>
                                    <Input
                                        className="outline-none w-full border-none  text-zinc-500 text-sm font-normal leading-tight"
                                        placeholder="Copy your link"
                                    />
                                </div>
                            </div>
                            <div className="form w-full">
                                <div><span className="text-zinc-800 text-md font-medium  leading-tight">Name of Product </span><span className="text-red-600 text-md font-medium  leading-tight">*</span></div>
                                <div className=" w-full rounded-lg border border-neutral-200 justify-between items-center gap-3 inline-flex">
                                    <Input
                                        className="outline-none w-full border-none  text-zinc-500 text-md font-normal leading-tight"
                                        placeholder="Name of Product"
                                    />
                                </div>
                            </div>
                            <div className="flex w-full gap-5 flex-row justify-normal items-baseline">
                                <div className="form w-[20%]">
                                    <div><span className="text-zinc-800 text-md font-medium  leading-tight">Qty </span><span className="text-red-600 text-md font-medium leading-tight">*</span></div>
                                    <div className="py-[2px] w-full rounded-lg border border-neutral-200 justify-between items-center gap-3 inline-flex">
                                        <Input
                                            type="number"
                                            className="outline-none w-full border-none  text-zinc-500 text-md font-normal leading-tight"
                                            placeholder="1"
                                        />
                                    </div>
                                </div>
                                <div className="form w-[80%]">
                                    <div><span className="text-zinc-800 text-md font-medium   leading-tight">Product Price </span><span className="text-red-600 text-md font-medium   leading-tight">*</span></div>
                                    <div className="py-[2px] w-full rounded-lg border border-neutral-200 justify-between items-center gap-3 inline-flex">
                                        <p className=' text-zinc-600 px-3'>$</p>
                                        <Input
                                            type="number"
                                            className="outline-none w-full border-none  text-zinc-500 text-md font-normal leading-tight"
                                            placeholder="100.00"
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className=" flex-col w-[50%] justify-start items-start gap-2 inline-flex">
                            <div className=" justify-start flex flex-col">
                                <h2>Payment Method</h2>
                                <SearchBar className="w-full" />
                            </div>
                            <PaymentCard />
                            <div className="w-full gap-3 justify-start items-center flex-row flex">
                                <Button
                                    variant="redOutline">
                                    + New Purchase
                                </Button>
                                <Button
                                    variant="destructive">
                                    <p>ORDER</p>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="">
                    <AdTop className="w-full h-full bg-white flex items-center justify-center" />
                </div>
            </div >

            <div className="table bg-white w-full">
                table here
            </div>
        </>
    )
}
