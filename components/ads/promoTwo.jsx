import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import styles from './styles.module.scss'
import { PhoneCallIcon, MailIcon, XIcon, InstagramIcon } from 'lucide-react'
export const PromoTwo = () => {
    return (
        <div className={`${styles.adBottom} w-[378px] h-full bg-white flex flex-col justify-between gap-3 `}>
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
    )
}
