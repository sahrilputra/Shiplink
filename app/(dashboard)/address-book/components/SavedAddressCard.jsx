'use client';
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import Image from 'next/image'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
export const SavedAddressCard = ({ variant, addressBook, select, onClick, isSelected, setDeleteID, deleteID }) => {

    const [isChecked, setIsChecked] = useState(false);

    const handleDataID = (id) => {
        setClickedCard(id);
        onClick(id);
    }
    const [selectedDelete, setSelectedDelete] = useState([]);

    const handleCheck = (id) => {
        console.log("🚀 ~ handleCheck ~ id:", id)
        setSelectedDelete([...selectedDelete, id])
    }


    const [isClicked, setIsClicked] = useState(false);
    const {
        my_address_id,
        country,
        full_name,
        country_name,
        streat_address,
        city,
        postal_code,
        phone_number,
        email,
        province_name,
        primary_address
    } = addressBook;


    const handleSelect = () => {
        onClick(my_address_id);
        select(my_address_id);
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
                                        src={`https://flagcdn.com/w640/ca.png`}
                                        alt=""
                                        className='rounded-full  border border-gray-300  w-[30px] h-[30px] object-cover'
                                    />
                                </div>
                                <p className=' text-sm font-semibold'>{country_name}</p>
                            </div>
                            <div className="separator w-3 h-[50px] ">
                                <Separator orientation="vertical" className="px-[1px]" />
                            </div>
                            <div className="content flex flex-col ">
                                <p className='text-sm font-bold'> {full_name} | <span className='font-normal text-zinc-600'>{streat_address}</span></p>
                                <p className='text-sm font-medium text-zinc-600'>{province_name}, {postal_code}</p>
                                <p className='text-sm font-medium'>{phone_number}</p>
                                <p className='text-sm font-light underline text-zinc-600'>{email}</p>
                            </div>
                            {
                                primary_address === "true" ? (
                                    <div className="px-[10px] py-[5px] border border-red-700 rounded-sm status absolute bottom-[10px] right-[10px]">
                                        <p className='font-light text-xs text-red-700'>Primary</p>
                                    </div>
                                ) : (
                                    <div className="status absolute top-[10px] right-[10px]">
                                        <Checkbox
                                            onCheckedChange={(value) => {
                                                return value
                                                    ? setDeleteID([...deleteID, my_address_id])
                                                    : setDeleteID(deleteID.filter((id) => id !== my_address_id))
                                            }}
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
                                        src={`https://flagcdn.com/w640/ca.png`}
                                        alt=""
                                        className='rounded-full  border border-gray-300  w-[30px] h-[30px] object-cover'
                                    />
                                    {/* <img
                                        src={`https://flagcdn.com/${countryCode.toLowerCase()}.svg`}
                                        alt=""
                                        className='rounded-full  border border-gray-300  w-[30px] h-[30px] object-cover'
                                    /> */}
                                </div>
                                <p className=' text-sm font-semibold'>{country}</p>
                            </div>

                            <div className="content flex flex-col text-sm text-zinc-600 ">
                                <p className='text-sm font-bold'>{full_name}</p>
                                <p className='text-sm text-zinc-600'>{streat_address}</p>
                                <p>{province_name}, {postal_code}</p>
                                <p className='font-bold text-zinc-900'>{phone_number}</p>
                                <p className='text-sm font-light underline'>{email}</p>
                            </div>
                            {
                                primary_address === "true" ? (
                                    <div className="px-[10px] py-[5px] border border-red-700 rounded-sm status absolute top-[10px] right-[10px]">
                                        <p className='font-light text-xs text-red-700'>Primary</p>
                                    </div>
                                ) : (
                                    <div className="absolute top-[10px] right-[10px]">
                                        <Checkbox
                                            onCheckedChange={(value) => {
                                                return value
                                                    ? setDeleteID([...deleteID, my_address_id])
                                                    : setDeleteID(deleteID.filter((id) => id !== my_address_id))
                                            }}
                                        />
                                    </div>
                                )
                            }


                        </div>
                    </>
                )
            }


        </>
    )
}
