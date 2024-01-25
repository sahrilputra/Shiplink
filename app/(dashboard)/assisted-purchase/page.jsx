'use client'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import styles from './styles.module.scss'
import { AdTop } from '@/components/ads/adTop'
import { LinkIcons } from '@/components/icons/iconCollection'
import { Separator } from '@/components/ui/separator'
import { SearchPayments } from '@/components/ui/searchBar'
import { PaymentCard } from './components/PaymentCard'
import { Button } from '@/components/ui/button'
import { AssitedTableOrder } from './components/TableOrder/Table'
import data from '../../../data/AssistedPurchaseData.json'
import { OrderDetails } from './components/Details/OrderDetails'
export default function AssistedPurchasePage() {

    const [clickedID, setDataID] = useState(null)
    const [clickedData, setClickedData] = useState(null);
    const [key, setKey] = useState(0);
    const handleDataID = (id) => {
        const filterData = data.find((item) => item.id === id)
        setClickedData(filterData);
        setDataID(id);
        setKey((prevKey) => prevKey + 1);
    }

    console.log(clickedData)

    const CloseMenus = () => {
        setDataID(null);
    }
    const renderMenus = () => {
        if (clickedID !== null) {
            return <OrderDetails key={key} data={clickedData} onClose={CloseMenus} />
        } else {
            return <AdTop />
        }
    }
    return (
        <>
            <div className={styles.main}>
                <div className={styles.content}>
                    <div className="top">
                        <h1 className='m-2 text-lg font-bold'>Assisted Purchase</h1>
                        <p className='text-zinc-500 text-sm font-normal p-3'> Copy the link / URL of the items you would like and paste them into our order form, and we will do the rest. Your item will be purchased and delivered to your Mailbox.</p>
                    </div>
                    <div className={`${styles.forms} w-full form flex flex-row flex-wrap gap-8 p-3`}>
                        <div className=" flex-col w-[50%] justify-start items-center gap-2 inline-flex ">
                            <div className="form w-full">
                                <div className="text-zinc-800  font-medium leading-tight text-sm">Link of Product <span className="text-red-600 text-md font-semibold leading-tight">*</span></div>
                                <div className="w-full rounded-lg border border-neutral-200 justify-between items-center gap-3 inline-flex ">
                                    <div className="pl-[10px]">
                                        <LinkIcons
                                            width={15}
                                            height={15}
                                        />
                                    </div>
                                    <Input
                                        className="outline-none w-full border-none text-zinc-500 text-xs font-normal leading-tight"
                                        placeholder="Copy your link"
                                    />
                                </div>
                            </div>
                            <div className="form w-full">
                                <div><span className="text-zinc-800 text-sm font-medium ">Name of Product </span><span className="text-red-600 text-md font-medium  leading-tight">*</span></div>
                                <div className=" w-full rounded-lg border border-neutral-200 justify-between items-center gap-3 inline-flex">
                                    <Input
                                        className="outline-none w-full border-none  text-zinc-500 text-xs font-normal leading-tight"
                                        placeholder="Name of Product"
                                    />
                                </div>
                            </div>
                            <div className="flex w-full gap-5 flex-row justify-normal items-baseline">
                                <div className="form w-[20%]">
                                    <div><span className="text-zinc-800 text-sm font-medium  leading-tight">Qty </span><span className="text-red-600 text-md font-medium leading-tight">*</span></div>
                                    <div className=" w-full rounded-lg border border-neutral-200 justify-between items-center gap-3 inline-flex">
                                        <Input
                                            type="number"
                                            className="outline-none w-full border-none  text-zinc-500 text-xs font-normal leading-tight"
                                            placeholder="1"
                                        />
                                    </div>
                                </div>
                                <div className="form w-[80%]">
                                    <div><span className="text-zinc-800 text-sm font-medium  leading-tight">Product Price </span><span className="text-red-600 text-md font-medium   leading-tight">*</span></div>
                                    <div className=" w-full rounded-lg border border-neutral-200 justify-between items-center gap-3 inline-flex">
                                        <p className=' text-zinc-600 px-3 text-xs'>$</p>
                                        <Input
                                            type="number"
                                            className="outline-none w-full border-none  text-zinc-500 text-xs font-normal leading-tight"
                                            placeholder="100.00"
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className=" flex-col w-[40%] justify-start items-start gap-2 inline-flex">
                            <div className=" justify-start w-full flex flex-col">
                                <h2 className='text-sm'>Payment Method</h2>
                                <SearchPayments className="w-full" />
                            </div>
                            <PaymentCard />
                            <div className="w-full gap-3 justify-end items-center flex-row flex">
                                <Button
                                    variant="redOutline"
                                    size="sm"
                                    >
                                    <p className="text-xs">+ New Purchase</p>
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    className=""
                                >
                                    <p className="text-xs">ORDER</p>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${styles.ad}`}>
                    {
                        renderMenus()
                    }

                </div>
            </div >

            <div className="table bg-white w-full">
                <AssitedTableOrder data={data} handleData={handleDataID} />
            </div>
        </>
    )
}
