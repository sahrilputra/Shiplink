import React from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'

export const ReviewCard = () => {
    return (
        <div className="content  border border-neutral-200 rounded-tl-lg rounded-tr-lg">
            <div className="image w-[100%] h-[200px] rounded-md">
                <Image
                    src={'/assets/lakban.png'}
                    alt='label'
                    width={300}
                    height={300}
                    className='w-full h-full object-cover rounded-tl-lg rounded-tr-lg'
                />
            </div>

            <div className="product flex flex-col text-sm px-3 py-3">
                <div className="text-black text-base font-normal py-3">Product ID</div>
                <div className='flex flex-row gap-2' >
                    <p className="text-zinc-600 text-sm font-bold">Item # :</p>
                    <p>3M-678</p>
                </div>
                <div className='flex flex-row gap-2 text-sm' >
                    <p className="text-zinc-600 text-sm font-bold">Brand :</p>
                    <p>3M</p>
                    <p className="text-zinc-600 text-sm font-bold">Model :</p>
                    <p>Box Tape 4in 1802</p>
                </div>
                <div className='flex flex-row gap-2' >
                    <p className="text-zinc-600 text-sm font-bold">Desc :</p>
                    <p>4in Tape for boxes</p>
                </div>
                <div className="flex flex-row justify-between py-4">
                    <Badge className={"rounded-sm"} variant="outline">Category</Badge>
                    <p className='text-base'>$ 12.00</p>
                </div>
            </div>

        </div>

    )
}
