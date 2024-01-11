"use client"
import { React, useState } from 'react'
import { ForwardForms } from './ForwardForms';
import { ForwardSavedAddress } from './ForwardSavedAddress';
export const ForwadPakage = () => {
    const [clicked, isClicked] = useState(true);

    const toggleClicked = (clickedButtons) => {
        isClicked(clickedButtons);
    }


    return (
        <>
            <div className="w-[378px] h-full px-[31px] pt-[18px] bg-white rounded-md flex-col justify-start items-center inline-flex">
                <div className="self-stretch flex-col justify-start items-start gap-[15px] inline-flex">
                    <div className="text-zinc-900 text-lg font-semibold font-['Poppins']">Forward Package</div>
                    {/* switch button */}
                    <div className="p-1 rounded-md border border-neutral-200 justify-start items-start gap-2.5 inline-flex">
                        <button
                            id='savedAddress'
                            className={`font-normal px-2.5 py-[8px] justify-center items-center gap-2.5 flex rounded
                            ${clicked ? 'bg-none' : 'bg-red-700 text-white font-semibold'}`}
                            onClick={() => toggleClicked(false)}
                        >
                            <p className=" text-xs font-['Poppins'] leading-tight">Address Book</p>
                        </button>
                        <button
                            id='newAddress'
                            className={`font-normal px-2.5 py-[8px] justify-center items-center gap-2.5 flex rounded
                            ${clicked ? 'bg-red-700 text-white font-semibold' : 'bg-none'}`}
                            onClick={() => toggleClicked(true)}
                        >
                            <p className=" text-xs font-['Poppins'] leading-tight">New Address</p>
                        </button>
                    </div>

                    {clicked
                        ? (
                            <>
                                <ForwardForms />
                            </>
                        ) : (
                            <>
                                <ForwardSavedAddress />
                            </>
                        )}

                </div>
            </div>

        </>
    )
}
