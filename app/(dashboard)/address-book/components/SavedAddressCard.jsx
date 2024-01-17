import React from 'react'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
export const SavedAddressCard = ({variant}) => {
    return (
        <>
            {
                variant === 'list' ? (
                    <>
                        <div className="py-[10px] w-full px-[20px] min-w-[300px] shadow-md rounded-md border border-zinc-600 border-opacity-60 flex flex-row relative justify-start gap-4 items-center">
                            <div className="Country flex flex-col justify-center items-center gap-2 py-[10px]">
                                <Image
                                    src={'/assets/country/cad-flag.png'}
                                    width={80}
                                    height={80}
                                    style={{ objectFit: "cover" }}
                                    className='rounded-full border border-gray-300 w-[30px] h-[30px] object-cover'
                                    alt='country-flag'
                                />
                                <p className=' text-md font-semibold'>Canada</p>
                            </div>
                            <div className="separator w-3 h-5 m-2 ">
                                <Separator orientation="vertical" decorative="" />
                            </div>
                            <div className="content flex flex-col ">
                                <p className='text-md font-semibold'>123 Birchwood Lane, Apt 4D, Springfield</p>
                                <p>IL, 62701</p>
                                <p>217-555-9876</p>
                                <p className='text-sm font-light'>john.smith@email.com</p>
                            </div>
                            <div className="p-1 border border-red-700 rounded-sm status absolute bottom-[10px] right-[10px]">
                                <p className='font-light text-xs text-red-700'>Primary</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="py-[15px] px-[20px] shadow-md rounded-md border border-zinc-600 border-opacity-60 flex flex-col relative">
                            <div className="Country flex flex-row justify-start items-center gap-2 py-[10px]">
                                <Image
                                    src={'/assets/country/cad-flag.png'}
                                    width={80}
                                    height={80}
                                    style={{ objectFit: "cover" }}
                                    className='rounded-full  border border-gray-300  w-[30px] h-[30px]'
                                    alt='country-flag'
                                />
                                <p className=' text-md font-semibold'>Canada</p>
                            </div>

                            <div className="content flex flex-col ">
                                <p className='text-md font-semibold'>123 Birchwood Lane, Apt 4D, Springfield</p>
                                <p>IL, 62701</p>
                                <p>217-555-9876</p>
                                <p className='text-sm font-light'>john.smith@email.com</p>
                            </div>

                            <div className="p-1 border border-red-700 rounded-sm status absolute top-[10px] right-[10px]">
                                <p className='font-light text-xs text-red-700'>Primary</p>
                            </div>

                        </div>
                    </>
                )
            }


        </>
    )
}
