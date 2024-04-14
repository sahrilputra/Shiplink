/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'

export const ReviewCard = ({ formsData, setSelectedData }) => {

    const img = formsData?.image
    console.log("🚀 ~ ReviewCard ~ img:", img)
    return (
        <div className=" border border-neutral-200 rounded-tl-lg rounded-tr-lg shadow-sm flex flex-col justify-between">
            <div className=" w-[100%] h-[200px] rounded-md">
                <img
                    src={`${img ? img : '../../../assets/img-placeholder.svg'}`}
                    alt=""
                    className=' object-cover rounded-tl-lg rounded-tr-lg image'
                    style={{ objectFit: 'cover', height: '200px', width: '100%', imageRendering: 'pixelated', imageRendering: 'crisp-edges', imageRendering: 'auto' }}
                />
                {/* <Image
                    src={`${img ? img : '/assets/img_placeholder.png'}`}
                    alt='label'
                    width={300}
                    height={200}
                    style={{ objectFit: 'cover', height: '130px', width: '100%' }}
                    className=' object-cover rounded-tl-lg rounded-tr-lg'
                /> */}
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
