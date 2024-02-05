import React from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'

export const ReviewCard = () => {
    return (
        <div className="content  border border-neutral-200 rounded-tl-lg rounded-tr-lg shadow-sm">
            <div className="image w-[100%] h-[150px] rounded-md">
                <Image
                    src={'/assets/lakban.png'}
                    alt='label'
                    width={300}
                    height={200}
                    style={{ objectFit: 'cover', height: '150px', width: '100%' }}
                    className=' object-cover rounded-tl-lg rounded-tr-lg'
                />
            </div>

            <div className="product flex flex-col text-sm px-3 py-1">
                <div className="text-black text-sm font-normal py-2">Product ID</div>
                <div className='flex flex-row gap-2' >
                    <p className="text-zinc-600 text-xs font-bold">Item # :</p>
                    <p className="text-xs">3M-678</p>
                </div>
                <div className='flex flex-row gap-2 text-xs' >
                    <p className="text-zinc-600 text-xs font-bold">Brand :</p>
                    <p className="text-xs">3M</p>

                </div>
                <div className='flex flex-row gap-2' >
                    <p className="text-zinc-600 text-xs font-bold">Model :</p>
                    <p className="text-xs">Box Tape 4in 1802</p>
                </div>
                <div className='flex flex-row gap-2' >
                    <p className="text-zinc-600 text-xs font-bold">Desc :</p>
                    <p className="text-xs">4in Tape for boxes</p>
                </div>
                <div className="flex flex-row justify-between py-4">
                    <Badge className={"rounded-sm"} variant="outline">Category</Badge>
                    <p className='text-sm'>$ 12.00</p>
                </div>
            </div>

        </div>

    )
}
