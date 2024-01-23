'use client';
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import Image from 'next/image'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
export const SavedAddressCard = ({ variant, addressBook, select, onClick, isSelected }) => {
    const [checkItem, setCheckItem] = useState(false);
    const [clickedCard, setClickedCard] = useState(null);

    const handleDataID = (id) => {
        setClickedCard(id);
        onClick(id);
    }
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
                            className={`py-[10px] w-full cursor-pointer transition-colors hover:bg-muted/80 px-[20px] min-w-[300px] shadow-md rounded-md border border-zinc-600 border-opacity-60 flex flex-row relative justify-start gap-4 items-center
                            ${isSelected ? 'bg-blue-100' : ''}
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
                                <p className=' text-sm font-semibold'>{country}</p>
                            </div>
                            <div className="separator w-3 h-[50px] ">
                                <Separator orientation="vertical" className="px-[1px]" />
                            </div>
                            <div className="content flex flex-col ">
                                <p className='text-sm font-bold'> {fullName} | <span className='font-normal text-zinc-600'>{address}</span></p>
                                <p className='text-sm font-medium text-zinc-600'>{state}, {postalCode}</p>
                                <p className='text-sm font-medium'>{phone}</p>
                                <p className='text-sm font-light underline text-zinc-600'>{email}</p>
                            </div>
                            {
                                isPrimary ? (
                                    <div className="px-[10px] py-[5px] border border-red-700 rounded-sm status absolute bottom-[10px] right-[10px]">
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
                            className={`${isSelected ? "bg-blue-100" : ""} cursor-pointer transition-colors hover:bg-muted/80 py-[15px] w-[300px] min-h-[200px] max-h-max px-[20px] shadow-md rounded-md border border-zinc-600 border-opacity-60 flex flex-col relative`}
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
                                <p className=' text-sm font-semibold'>{country}</p>
                            </div>

                            <div className="content flex flex-col text-sm text-zinc-600 ">
                                <p className='text-sm font-bold'>{fullName}</p>
                                <p className='text-sm text-zinc-600'>{address}</p>
                                <p>{state}, {postalCode}</p>
                                <p className='font-bold text-zinc-900'>{phone}</p>
                                <p className='text-sm font-light underline'>{email}</p>
                            </div>
                            {
                                isPrimary ? (
                                    <div className="px-[10px] py-[5px] border border-red-700 rounded-sm status absolute top-[10px] right-[10px]">
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
