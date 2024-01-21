'use client';
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image from 'next/image'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
export const SavedAddressCard = ({ variant, addressBook, select, onClick, isSelected }) => {
    const [checkItem, setCheckItem] = React.useState(false);

    const handleCheck = () => {
        setCheckItem(!checkItem);
    }
    const {
        id,
        country,
        fullName,
        countryCode,
        address,
        city,
        postalCode,
        phone,
        email,
        state,
        isPrimary
    } = addressBook;


    const handleSelect = () => {
        onClick(id);
        select(id);
    }

    return (
        <>
            {
                variant === 'list' ? (
                    <>
                        <div
                            className={`py-[10px] w-full cursor-pointer hover:bg-slate-200/30 px-[20px] min-w-[300px] shadow-md rounded-md border border-zinc-600 border-opacity-60 flex flex-row relative justify-start gap-4 items-center
                            ${checkItem ? 'bg-blue-200/30' : ''}
                            `}
                            onClick={handleSelect}
                        >
                            <div className="Country w-[100px] flex flex-col justify-center items-center gap-2 py-[10px] text-center">
                                <div className="rounded-full border border-gray-300 w-[30px] h-[30px] object-cover">
                                    <img
                                        src={`https://flagcdn.com/${countryCode.toLowerCase()}.svg`}
                                        alt=""
                                        className='rounded-full  border border-gray-300  w-[30px] h-[30px] object-cover'
                                    />
                                </div>
                                {/* <Image
                                    src={'/assets/country/cad-flag.png'}
                                    width={80}
                                    height={80}
                                    style={{ objectFit: "cover" }}
                                    className='rounded-full border border-gray-300 w-[30px] h-[30px] object-cover'
                                    alt='country-flag'
                                /> */}
                                <p className=' text-md font-semibold'>{country}</p>
                            </div>
                            <div className="separator w-3 h-[50px] ">
                                <Separator orientation="vertical" className="px-[1px]" />
                            </div>
                            <div className="content flex flex-col ">
                                <p className='text-md font-semibold'> {fullName} | {address}</p>
                                <p>{state}, {postalCode}</p>
                                <p>{phone}</p>
                                <p className='text-sm font-light'>{email}</p>
                            </div>
                            {
                                isPrimary ? (
                                    <div className="p-1 border border-red-700 rounded-sm status absolute bottom-[10px] right-[10px]">
                                        <p className='font-light text-xs text-red-700'>Primary</p>
                                    </div>
                                ) : (
                                    <div className="status absolute top-[10px] right-[10px]">
                                        <Checkbox
                                            onCheckedChange={handleCheck}
                                        />
                                    </div>
                                )
                            }

                        </div>
                    </>
                ) : (
                    <>
                        <div
                            className="cursor-pointer hover:bg-slate-200/30 py-[15px] w-[300px] min-h-[240px] max-h-max px-[20px] shadow-md rounded-md border border-zinc-600 border-opacity-60 flex flex-col relative"
                            onClick={handleSelect}
                        >
                            <div className="Country flex flex-row justify-start items-center gap-2 py-[10px]">

                                <div className="rounded-full border border-gray-300 w-[30px] h-[30px] object-cover">
                                    <img
                                        src={`https://flagcdn.com/${countryCode.toLowerCase()}.svg`}
                                        alt=""
                                        className='rounded-full  border border-gray-300  w-[30px] h-[30px] object-cover'
                                    />
                                </div>
                                {/* <Image
                                    src={'/assets/country/cad-flag.png'}
                                    width={80}
                                    height={80}
                                    style={{ objectFit: "cover" }}
                                    className='rounded-full  border border-gray-300  w-[30px] h-[30px]'
                                    alt='country-flag'
                                /> */}
                                <p className=' text-md font-semibold'>{country}</p>
                            </div>

                            <div className="content flex flex-col ">
                                <p className='text-lg font-normal'>{fullName}</p>
                                <p className='text-md font-semibold'>{address}</p>
                                <p>{state}, {postalCode}</p>
                                <p>{phone}</p>
                                <p className='text-sm font-light'>{email}</p>
                            </div>
                            {
                                isPrimary ? (
                                    <div className="p-1 border border-red-700 rounded-sm status absolute top-[10px] right-[10px]">
                                        <p className='font-light text-xs text-red-700'>Primary</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="absolute top-[10px] right-[10px]">
                                            <Checkbox />
                                        </div>
                                    </>
                                )
                            }


                        </div>
                    </>
                )
            }


        </>
    )
}
