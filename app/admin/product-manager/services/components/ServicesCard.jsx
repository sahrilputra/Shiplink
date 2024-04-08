import React from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'

export const ServicesCards = ({ formData }) => {
    console.log("🚀 ~ ServicesCards ~ formData:", formData)
    return (
        <div className="content  border border-neutral-200 rounded-md shadow">
            <div className="product flex flex-col text-xs gap-2 px-3 py-3">
                <div className="text-black font-normal py-1 text-sm">Services ID : {formData?.service_id}</div>
                <div className='flex flex-row gap-2' >
                    <p className="text-zinc-600 font-bold text-xs">Item # :</p>
                    <p>{formData?.item}</p>
                </div>
                <div className='flex flex-row gap-2' >
                    <p className="text-zinc-600 font-bold">Desc : </p>
                    <p>{formData?.description}</p>
                </div>
                <div className='flex flex-row  py-1' >
                    <p className='text-sm'>$ {formData?.price}</p>
                </div>
                <div className="flex flex-row justify-between py-2">
                    <Badge className={"rounded-sm text-xs"} variant="outline"> {formData?.category}</Badge>
                </div>
            </div>

        </div>

    )
}
