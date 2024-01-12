'use client'
import { React, useState } from 'react'
import Image from 'next/image'
import { Checkbox } from 'flowbite-react'
export const TaxDetailsList = () => {
    const [checked, isChecked] = useState(false)
    const handleCheck = () => { isChecked(!checked) }
    return (
        <>
            <div
                className={`w-full p-2.5 rounded border border-neutral-200 justify-between items-center inline-flex
                    ${checked ? 'bg-blue-100' : 'bg-white'}`
                }>
                <div className="flex flex-row gap-5 justify-start items-center w-[80%]">
                    <Checkbox
                        color={'secondary'}
                        size={'md'}
                        onChange={handleCheck}
                    />
                    <div className="text-black text-md font-semibold font-['Poppins'] ">HST : 13 %</div>
                </div>
                <div className="inline-flex gap-3 justify-center items-center">
                    <div className="text-zinc-600 text-sm font-normal font-['Poppins'] leading-tight">HST123</div>
                    <button className="bg-sky-50 rounded h-[30px] w-[30px]">
                        <Image
                            src={'/icon/deleteIcon-blue.png'}
                            width={40}
                            height={40}
                            alt='deleteIcon-blue'
                            className='p-[2px]'
                        />
                    </button>
                </div>
            </div>
        </>
    )
}
