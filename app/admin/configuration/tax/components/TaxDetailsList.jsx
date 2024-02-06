'use client'
import { React, useState } from 'react'
import Image from 'next/image'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { DeleteIcons } from '@/components/icons/iconCollection'
export const TaxDetailsList = () => {
    const [checked, isChecked] = useState(false)
    const handleCheck = () => { isChecked(!checked) }
    return (
        <>
            <div
                className={`w-full px-4 py-2 rounded border border-zinc-300 justify-between items-center inline-flex
                    ${checked ? 'bg-blue-100' : 'bg-white'}`
                }>
                <div className="flex flex-row gap-4 justify-start items-center w-[80%]">
                    <Checkbox className="w-4 h-4" />
                    <div className="text-black text-[13px] font-semibold ">HST : 13 %</div>
                </div>
                <div className="inline-flex gap-3 justify-center items-center">
                    <div className="text-zinc-600 text-xs leading-tight">HST123</div>
                    <Button
                        variant="tableBlue"
                        size="tableIcon"
                        className={`rounded-[3px] w-max px-[5px] h-[25px]`}
                    >
                        <DeleteIcons width={15} height={15} className={` text-myBlue outline-myBlue fill-myBlue rounded-sm  `} />
                    </Button>
                </div>
            </div>
        </>
    )
}
