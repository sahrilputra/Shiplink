'use client'
import React, { useState } from 'react'
import styles from './styles.module.scss'
import { CopyIcon, Share2Icon, FacebookIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Pagination } from './components/Pagination'
import { ReferenceCard } from './components/ReferenceCard'
import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'
export default function page() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { toast } = useToast();

    return (
        <>
            <div className={styles.main}>
                <div className={styles.content}>
                    <div className="top">
                        <h1 className='m-2 text-lg font-bold'>Refer a Friends</h1>
                        <p className='text-zinc-500 text-sm font-normal p-3'> Copy the refferal code below and send for family and friends. When they register with your code and ship their first order, both of you will receive a US $ 15 credit towards future shipments! </p>
                    </div>
                    <div className="mid px-3 py-2">
                        <div className="justify-start items-center gap-3.5 inline-flex py-5 ">
                            <div className="text-black text-[16px] font-bold">HFGDTHJNJ123</div>
                            <CopyIcon className='text-red-700'  width={15} height={15} />
                        </div>
                        <div className=" text-black text-sm font-semibold ">Or Share The Link to Your Social Media</div>
                        <div className=""><span className="text-zinc-600 text-xs font-normal">Invite Friends or Family to sign up using your link and you’ll get benefit of their earnings awarded in </span><span className="text-zinc-600 text-md font-bold font-['Poppins']">ShipLink.</span></div>
                        <div className="my-5 flex flex-row items-center gap-3">
                            <div className="px-[18px] py-[11px] rounded-lg border border-neutral-200 justify-start items-center gap-2.5 inline-flex">
                                <div className="text-black text-sm font-normal">shiplink.com/userHFGTHJNJ123</div>
                                <CopyIcon className='text-red-700 ' width={15} height={15} />
                            </div>
                            <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => {
                                    toast({
                                        title: 'Copied',
                                        description: 'Copied to clipboard',
                                    })
                                }}
                            >
                                <Share2Icon width={15} height={15} />
                            </Button>

                            <div className="">

                                <Button
                                    variant="outline"
                                    size="icon"
                                >
                                    <FacebookIcon width={15} height={15} />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                >
                                    <FacebookIcon width={15} height={15} />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                >
                                    <FacebookIcon width={15} height={15} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            <div className={`${styles.bottom} `}>
                <div className={styles.listFriends}>

                    <ReferenceCard />
                    <ReferenceCard />
                    <ReferenceCard />
                    <ReferenceCard />
                    <Pagination />

                </div>

                <div className={styles.moneyContent}>
                    <div className="wrap">
                        <div className="text-black text-lg font-semibold ">Here are your Referals that have joined</div>
                        <div className=" text-zinc-600 text-sm font-normal">Copy the refferal code below and send for family and friends. When they register with your code and ship their first order, both of you will receive a US $ 15 credit towards future shipments! </div>
                        <div className="flex flex-col py-[5px] px-[5px] rounded-md border border-neutral-200">
                            <div className="flex flex-row justify-center items-center">
                                <p>Mon</p>
                                <p className="text-center text-zinc-900 text-[28px] font-semibold ">Total Earn</p>
                            </div>
                            <p className="text-center text-black text-4xl font-medium ">$60</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
