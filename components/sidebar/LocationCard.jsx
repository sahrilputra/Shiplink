"use client";
import { React, useState } from 'react'

export const LocationCard = () => {
    const [clicked, isClicked] = useState(true);

    const toggleClicked = (clickedButtons) => {
        isClicked(clickedButtons);
    }

    return (
        <>
            <div className="w-[80%] mx-auto flex flex-col p-1 rounded-md border border-neutral-200 justify-center items-center my-3">
                <div className="p-1 rounded-md border border-neutral-200 justify-start items-start gap-2.5 inline-flex">
                    <button
                        id='savedAddress'
                        className={`w-[80px] font-normal px-2.5 py-[8px] justify-center items-center gap-2.5 flex rounded
                            ${clicked ? 'bg-none' : 'bg-red-700 text-white font-semibold'}`}
                        onClick={() => toggleClicked(false)}
                    >
                        <p className=" text-xs font-['Poppins'] leading-tight">USA</p>
                    </button>
                    <button
                        id='newAddress'
                        className={`w-[80px] font-normal px-2.5 py-[8px] justify-center items-center gap-2.5 flex rounded
                            ${clicked ? 'bg-red-700 text-white font-semibold' : 'bg-none'}`}
                        onClick={() => toggleClicked(true)}
                    >
                        <p className=" text-xs font-['Poppins'] leading-tight">Canada</p>
                    </button>
                </div>

                <div className="w-full p-3">
                    {clicked ? (
                        <div className="flex flex-col justify-start  ">
                            <p className='font-normal text-sm text-black'>FirstName LastName</p>
                            <div className="font-regular text-xs">
                                <p>123 Street Name</p>
                                <p>Unit/Apt # </p>
                                <p>City, State, Zipcode</p>
                                <p>Canada</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col justify-start ">
                            <p className='font-normal text-sm text-black'>FirstName LastName</p>
                            <div className="font-regular text-xs">
                                <p>123 Street Name</p>
                                <p>Unit/Apt # </p>
                                <p>City, State, Zipcode</p>
                                <p>USA</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

