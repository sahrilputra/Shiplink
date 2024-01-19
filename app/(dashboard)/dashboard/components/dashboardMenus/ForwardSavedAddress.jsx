import { React, useState } from 'react'
import { SearchIcon } from '@/components/icons/iconCollection'
import Image from 'next/image'
import { Carrier } from './carrier/Carrier'
import { ForwardShippingOption } from './ForwardShippingOption'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Test } from './payments/Test'
export const ForwardSavedAddress = () => {
    const [confirm, setConfirm] = useState(false)

    const toggleConfirm = () => {
        setConfirm(!confirm)
    }



    return (
        <>
            <div type='text' className="w-[100%] h-10 px-[15px] py-2.5 bg-white rounded-md border border-neutral-200 justify-between items-center inline-flex">
                <input type="text" className='w-[90%] text-zinc-500 text-xs font-normal focus:outline-none border-none' placeholder='Search ...' />
                {/* <div className="text-zinc-500 text-xs font-normal font-['Poppins'] leading-tight">Search ...</div> */}
                <SearchIcon className="w-[10%]" />
            </div>
            <div className="px-[15px]  py-[15px]  bg-white rounded border border-neutral-200 border-opacity-95 flex-col justify-center items-center gap-[5px] flex">
                <div className="w-[100%]  justify-between items-start inline-flex">
                    <div className="text-sky-700 text-sm font-medium font-['Poppins'] leading-relaxed">Destination Address</div>
                    <div className="justify-start items-center gap-0.5 flex">
                        <div className="w-[20px] h-[20px] justify-center items-center flex">
                            <div className=" relative">
                                <Image
                                    src={"/icon/RedEditButtons.svg"}
                                    width={22}
                                    height={22}
                                    alt='edit button'
                                />
                            </div>
                        </div>
                        <div className="text-red-700 text-sm font-normal font-['Poppins'] leading-relaxed">Edit Address</div>
                    </div>
                </div>
                <div className="w-[100%] ">
                    <span className="text-zinc-900 text-xs font-medium font-['Poppins'] leading-[17.50px]">
                        FirstName LastName
                    </span>
                    <span className="text-zinc-900 text-xs font-normal font-['Poppins'] leading-[17.50px]">
                        | 781-491-0874 <br />
                    </span>
                    <span className="text-zinc-900 text-[14px] font-normal font-['Poppins'] leading-[17.50px]">
                        473 Amherst St. Unit 7193828 Las Vegas, NV, 82112, USA
                    </span>
                </div>
            </div>
            {/* <div className="p-2.5 flex-col justify-start items-start gap-2.5 flex">
                <div className="w-[297px] h-[0px] border-2 border-neutral-200"></div>
            </div> */}
            <div className="w-[312px] h-[0px] border border-neutral-200 border-opacity-60"></div>


            {confirm ? (
                <ForwardShippingOption />
            ) : (
                <div className="w-[100%]  h-10 flex-col justify-start items-end gap-2.5 inline-flex">
                   
                        <Button
                            onClick={toggleConfirm}
                            className="h-[35px] px-10 "
                            variant="secondary"
                        >
                            <p className="text-white text-xs font-medium ">Confirm</p>
                        </Button>
                  
                </div>
            )}

        </>

    )
}
