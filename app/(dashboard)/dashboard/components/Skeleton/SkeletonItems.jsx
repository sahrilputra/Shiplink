import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
export const SkeletonItems = () => {
    return (
        <div className='flex flex-row justify-between w-full rounded-md shadow-md border border-zinc-600 border-opacity-50 p-2 items-center' >
            <div className="flex flex-row justify-between w-[50%]">
                <div className="flex flex-row gap-2 ">
                    <Skeleton className={"w-[60px] h-[60px]"} />
                    <div className="flex flex-col gap-2 ">
                        <Skeleton className={"w-[120px] h-[14px]"} ></Skeleton>
                        <Skeleton className={"w-[80px] h-[14px]"} />
                        <Skeleton className={"w-[120px] h-[14px]"} />
                    </div>
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <div className="w-[36.14px] h-[100%]">
                        <Separator orientation="vertical" className="px-[1px] h-[100%] bg-zinc-600/50 " />
                    </div>
                    <div className="flex flex-row gap-2 ">
                        <div className="flex flex-col gap-2 ">
                            <Skeleton className={"w-[80px] h-[14px]"} />
                            <Skeleton className={"w-[120px] h-[14px]"} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row gap-2 items-center">
                <div className="flex flex-col gap-2">
                    <Skeleton className={"w-[120px] h-[18px]"} />
                    <Skeleton className={"w-[120px] h-[18px]"} />
                </div>
            </div>
        </div>
    )
}
