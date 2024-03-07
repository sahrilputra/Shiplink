/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'

export const ReviewCard = ({ formsData }) => {

    const img = formsData?.image
    console.log("🚀 ~ ReviewCard ~ img:")
    return (
        <div className="content  border border-neutral-200 rounded-tl-lg rounded-tr-lg shadow-sm">
            <div className="image w-[100%] h-[130px] rounded-md">
                {/* <img
                    src={`${img}`}
                    alt=""
                    className=' object-cover rounded-tl-lg rounded-tr-lg'
                    style={{ objectFit: 'cover', height: '130px', width: '100%' }}
                /> */}
                <Image
                    src={`${img}`}
                    alt='label'
                    width={300}
                    height={200}
                    style={{ objectFit: 'cover', height: '130px', width: '100%' }}
                    className=' object-cover rounded-tl-lg rounded-tr-lg'
                />
            </div>

            <div className="product flex flex-col text-sm px-3 py-1">
                <div className="text-black text-sm font-normal py-1">Product ID : {formsData?.productID}</div>
                <div className='flex flex-row gap-2' >
                    <p className="text-zinc-600 text-xs font-bold">Item # :</p>
                    <p className="text-xs"> {formsData?.item}</p>
                </div>
                <div className='flex flex-row gap-2 text-xs' >
                    <p className="text-zinc-600 text-xs font-bold">Brand :</p>
                    <p className="text-xs"> {formsData?.brand}</p>

                </div>
                <div className='flex flex-row gap-2' >
                    <p className="text-zinc-600 text-xs font-bold">Model :</p>
                    <p className="text-xs">{formsData?.model}</p>
                </div>
                <div className='flex flex-row gap-2' >
                    <p className="text-zinc-600 text-xs font-bold">Desc :</p>
                    <p className="text-xs">{formsData?.description}</p>
                </div>
                <div className="flex flex-row justify-between py-4">
                    <Badge className={"rounded-sm"} variant="outline">{formsData?.category ? formsData?.category : "Category"}</Badge>
                    <p className='text-sm'>$ {formsData?.price}</p>
                </div>
            </div>

        </div>

    )
}
