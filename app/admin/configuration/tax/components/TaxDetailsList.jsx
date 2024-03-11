'use client'
import { React, useEffect, useState } from 'react'
import Image from 'next/image'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { DeleteIcons } from '@/components/icons/iconCollection'
import { Select } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

export const TaxDetailsList = ({ setChange, data, handleClick, taxAssignID }) => {
    const [checked, isChecked] = useState(null)

    useEffect(() => {
        if (taxAssignID === data?.tax_assignment_id) {
            isChecked(true)
        } else {
            isChecked(false)
        }
    }, [taxAssignID])

    const handleCheck = () => {
        if (checked) {
            isChecked(false)
            setChange(false)
        } else {
            isChecked(true)
            setChange(true)
        }
    };
    return (
        <>
            <div

                className={`w-full px-4 py-2 rounded border border-zinc-300 justify-between items-center inline-flex
                    ${checked ? 'bg-blue-100' : 'bg-white'}`
                }>
                <div className="flex flex-row gap-4 justify-start items-center w-[80%]">
                    <Switch
                        checked={checked}
                        onCheckedChange={() => {
                            handleCheck()
                        }} />
                    <div className="text-black text-[13px] font-semibold ">{data?.abbreviation} : {'%'}{data?.tax_rate}</div>
                </div>
                <div className="inline-flex gap-3 justify-center items-center">
                    <div className="text-zinc-600 text-xs leading-tight">{data?.tax_assignment_id}</div>
                    <Button
                        variant="tableBlue"
                        size="tableIcon"
                        className={`rounded-[3px] w-max px-[5px] h-[25px]`}
                        onClick={() => { handleClick(data?.tax_assignment_id) }}
                    >
                        <DeleteIcons width={15} height={15} className={` text-myBlue outline-myBlue fill-myBlue rounded-sm  `} />
                    </Button>
                </div>
            </div>
        </>
    )
}
