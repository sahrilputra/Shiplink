import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import styles from './styles.module.scss'
import { PhoneCallIcon, MailIcon, XIcon, InstagramIcon } from 'lucide-react'

export const PromoOne = () => {
    return (
        <>
            <div className={styles.adContainer}>
                <div className={`${styles.adTop} w-full  bg-white rounded-md flex items-center justify-center h-screen`}>
                    <div className="flex-col justify-start items-center gap-px inline-flex ">
                        <div className="text-zinc-600 text-xs font-normal ">Your Status</div>
                        <div className="text-zinc-900 text-sm font-semibold">Premium</div>
                        <div className="text-stone-900 text-xs font-normal ">Level 2 Discount Bonus</div>
                        <Button
                            className="px-10 py-[8px] h-[30px] mt-4"
                            variant="destructive"
                            size="xs"
                        >
                            <div className="text-white font-medium text-xs">Upgrade</div>
                        </Button>
                    </div>
                </div>

                <div className={`${styles.adBottom} w-full bg-white flex flex-col justify-around gap-3 rounded-md `}>
                    <div className="content w-[90%] flex flex-col justify-between items-center mx-auto gap-5">
                        <div className="text-center text-black text-sm font-semibold">If you have any questions or need any help, please contact us</div>
                        <div className=" flex-col justify-center items-center gap-[21px] inline-flex">
                            <div className="flex flex-row justify-start items-center gap-2.5">
                                <PhoneCallIcon className='w-[20px] h-[20px]' color='#00509D' />
                                <div><span className="text-sky-800 text-xs font-semiBold ">Contact Phone Number:<br /></span><span className="text-black text-sm font-normal ">+1 234-345-7898</span></div>
                            </div>
                            <div className="flex flex-row justify-start items-center gap-2.5">
                                <MailIcon className='w-[20px] h-[20px] ' color='#00509D' />
                                <div className='flex flex-col gap-0 space-y-1'>
                                    <span className="text-sky-800 text-xs font-semiBold space-y-1">
                                        Email Support:<br />
                                    </span>
                                    <span className="text-black text-sm font-normal space-y-1">
                                        support@shiplink.ca
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="bottom flex flex-col justify-center items-center gap-3 p-3">
                        <Button
                            variant="destructive"
                            className="px-10 h-[30px]"
                            size="xs"

                        >
                            <div className="text-white text-xs font-medium">Support</div>
                        </Button>
                        <p className='text-sky-800 font-normal text-xs text-center bg-none'>Follow Us</p>
                        <div className="flex flex-row justify-center items-center">
                            <XIcon className='w-[25px] h-[25px] text-sky-800' />
                            <XIcon className='w-[25px] h-[25px] text-sky-800' />
                            <XIcon className='w-[25px] h-[25px] text-sky-800' />
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
