import React, { useState } from 'react'
import { TaxDetailsList } from './TaxDetailsList'
import { Button } from '@/components/ui/button'
export const TaxDetails = ({ close }) => {
    const [change, setChange] = useState(false)
    return (
        <>
            <div className=" w-full p-5 bg-white rounded-md border flex-col justify-start items-start gap-[15px] flex">
                <div className="text-sm text-zinc-800 font-bold leading-tight">Tax Types Details</div>
                <div className="flex-col w-full justify-start items-start gap-1 flex">
                    <TaxDetailsList setChange={setChange} />
                    <TaxDetailsList setChange={setChange} />
                    <TaxDetailsList setChange={setChange} />
                </div>

                <div className={`flex flex-row gap-5 justify-end items-end w-full ${change ? "" : "hidden"}`}>
                    <Button
                        variant="redOutline"
                        size="xs"
                        className="w-[80px] text-xs"
                        onClick={() => setChange(false)}
                    >
                        <p>Cancel</p>
                    </Button>
                    <Button
                        variant="destructive"
                        size="xs"
                        className="w-[80px] text-xs"
                    >
                        <p>Save</p>
                    </Button>
                </div>
            </div>
        </>
    )
}
