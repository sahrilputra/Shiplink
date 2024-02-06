import React from 'react'
import { TaxDetailsList } from './TaxDetailsList'

export const TaxDetails = () => {
    return (
        <>
            <div className=" w-full p-5 bg-white rounded-md border flex-col justify-start items-start gap-[15px] flex">
                <div className="text-sm text-zinc-800 font-bold leading-tight">Tax Types Details</div>
                <div className="flex-col w-full justify-start items-start gap-1 flex">
                    <TaxDetailsList />
                    <TaxDetailsList />
                    <TaxDetailsList />
                </div>
            </div>
        </>
    )
}
