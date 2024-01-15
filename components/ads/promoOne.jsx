import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import styles from './styles.module.scss'
import { PhoneCallIcon, MailIcon, XIcon, InstagramIcon } from 'lucide-react'

export const PromoOne = () => {
    return (
        <>
            <div className={styles.adContainer}>
                <div className={`${styles.adTop} w-[378px] min-w-full  bg-white rounded-md flex items-center justify-center`}>
                    <div className="flex-col justify-start items-center gap-px inline-flex ">
                        <div className="text-zinc-600 text-lg font-normal ">Your Status</div>
                        <div className="text-zinc-900 text-[26px] font-semibold">Premium</div>
                        <div className="text-stone-900 text-lg font-normal ">Level 2 Discount Bonus</div>
                        <Button
                            className="px-10 py-2.5"
                            variant="destructive"
                            size="sm"
                        >
                            <div className="text-white font-medium">Upgrade</div>
                        </Button>
                    </div>
                </div>

                <div className={`${styles.adBottom} w-[378px] bg-white flex flex-col justify-around gap-3 rounded-md `}>
                    <div className="content w-[90%] flex flex-col justify-between items-center mx-auto gap-5">
                        <div className="text-center text-black text-md font-semibold">If you have any questions or need any help, please contact us</div>
                        <div className=" flex-col justify-center items-center gap-[21px] inline-flex">
                            <div className="flex flex-row justify-start items-center gap-2.5">
                                <PhoneCallIcon className='w-[25px] h-[25px]' color='#00509D' />
                                <div><span className="text-sky-800 text-sm font-semiBold ">Contact Phone Number:<br /></span><span className="text-black text-sm font-normal ">+1 234-345-7898</span></div>
                            </div>
                            <div className="flex flex-row justify-start items-center gap-2.5">
                                <MailIcon className='w-[25px] h-[25px] ' color='#00509D' />
                                <div><span className="text-sky-800 text-sm font-semiBold font-['Poppins']">Email Support:<br /></span><span className="text-black text-sm font-normal">support@shiplink.ca</span></div>
                            </div>
                        </div>

                    </div>
                    <div className="bottom flex flex-col justify-center items-center gap-3 p-3">
                        <Button
                            variant="destructive"
                            className="px-10 "
                        >
                            <div className="text-white text-md font-medium">Support</div>
                        </Button>
                        <p className='text-sky-800 font-normal text-md text-center bg-none'>Follow Us</p>
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
