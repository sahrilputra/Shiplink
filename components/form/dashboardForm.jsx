import React from 'react'
import { ArrowBoldDownIcon } from '../icons/iconCollection'

export const InputNumber = () => {
    return (
        <div className="">
            <input
                type='number'
                className="
                w-[60px]
                py-1 rounded-sm justify-start items-center flex
                h-[31px]  border  border-gray-200
                grow bg-inputBg text-center
                text-neutral-900 text-sm font-normal font-['Poppins'] 
                outline-none"
                placeholder='1' />
        </div>
    )
}

export const InputNumberMoney = () => {

    return (
        <div className=" 
        max-w-[50px] min-w-[100px] 
         py-1 rounded-sm justify-start items-center flex
         h-[31px]  border  border-outline-input 
         bg-inputBg text-center
        text-neutral-900 text-sm font-normal font-['Poppins']
        ">
            <p className='px-2'>$</p>
            <input
                id='value'
                type='number'
                className="outline-none w-full bg-gray-100 text-center border-none h-[30px]"
                placeholder='1.00' />
        </div>
    )
}

export const InputDescription = () => {
    return (
        <div className="">
            <input
                type='text'
                className="
                px-[8px]
                max-w-[317px] min-w-[100px]
                py-1 rounded-sm justify-start items-center flex
                h-[31px]  border  border-gray-200
                grow bg-inputBg
                text-neutral-900 text-xs font-normal font-['Poppins'] 
                outline-none text-left"
                placeholder='Description' />
        </div>
    )
}


export const InputSearchHS = () => {
    return (
        <div className="">
            <input
                type='text'
                className="
                px-[8px]
                max-w-[317px] min-w-[100px]
                py-1 rounded-sm justify-start items-center flex
                h-[31px]  border  border-gray-200
                grow bg-inputBg
                text-neutral-900 text-xs font-normal font-['Poppins'] 
                outline-none text-left"
                placeholder='Search' />
        </div>
    )
}

export const InputHSCode = () => {
    return (
        <div className="">
            <input
                type='text'
                className="
                px-[8px]
                max-w-[50px] min-w-[100px]
                py-1 rounded-sm justify-start items-center flex
                h-[31px]  border  border-gray-200
                grow bg-inputBg
                text-neutral-900 text-xs font-normal font-['Poppins'] 
                outline-none text-left"
                placeholder='0000.00.0000' />
        </div>
    )
}

export const SelectMadeIn = () => {
    return (
        <div className="">
            <input
                type='text'
                className="
                px-[8px]
                max-w-[50px] min-w-[60px]
                py-1 rounded-sm justify-start items-center flex
                h-[31px]  border  border-gray-200
                grow bg-inputBg
                text-neutral-900 text-sm font-normal font-['Poppins'] 
                outline-none text-center"
                placeholder='CAD' />
        </div>
    )
}