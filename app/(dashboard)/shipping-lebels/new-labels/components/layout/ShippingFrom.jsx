import React, { useState } from 'react'
import { ShippingFromForm } from '../forms/ShippingFromForm'
export const ShippingFrom = () => {
    const [clicked, isClicked] = useState(false);
    const toggleClicked = (clickedButtons) => {
        isClicked(clickedButtons);
    }
    return (
        <div className="">
            <div className=" w-full flex flex-row justify-between items-center">
                <p className='font-bold'>Ship From </p>
                <div className="">
                    <div className="p-1 rounded-md border w-max border-neutral-200 justify-start items-start gap-2.5 inline-flex ">
                        <button
                            type="button"
                            id='savedAddress'
                            className={`font-normal px-2.5 py-[8px] w-[120px] text-nowrap justify-center items-center gap-2.5 flex rounded hover:bg-red-100
                            ${clicked ? 'bg-none' : 'bg-red-700 text-white font-semiBold hover:bg-red-800'}`}
                            onClick={() => toggleClicked(false)}
                        >
                            <p className=" text-[11px] font-['Poppins'] leading-tight">Address Book</p>
                        </button>
                        <button
                            type="button"
                            id='newAddress'
                            className={`font-normal px-2.5 py-[8px] w-[120px] text-nowrap justify-center items-center gap-2.5 flex rounded hover:bg-red-100
                            ${clicked ? 'bg-red-700 text-white font-semiBold hover:bg-red-800' : 'bg-none'}`}
                            onClick={() => toggleClicked(true)}
                        >
                            <p className=" text-[11px] font-['Poppins'] leading-tight">Custom Address</p>
                        </button>
                    </div>
                </div>
            </div>

            <ShippingFromForm />
        </div>
    )
}
