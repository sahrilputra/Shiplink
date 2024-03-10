import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
export const SkeletonAddressBook = () => {
    return (
        <>
            <div className="py-[10px] w-full cursor-pointer transition-colors hover:bg-muted/80 px-[20px] min-w-[300px] shadow-md rounded-md border border-zinc-600 border-opacity-60 flex flex-row relative justify-start gap-4 items-center">
                <div className="flex flex-col py-1 gap-2 items-center">
                    <Skeleton className={"w-[30px] h-[30px] rounded-full"} />
                    <Skeleton className={"w-[90px] h-[20px]"} />
                </div>

                <div className="separator w-3 h-[50px] ml-3">
                    <Separator orientation="vertical" className="px-[1px]" />
                </div>
                <div className="content flex w-[90%] flex-col gap-2">
                    <Skeleton className={"w-[30%] h-[20px]"} />
                    <Skeleton className={"w-[30%] h-[20px]"} />
                    <Skeleton className={"w-[30%] h-[20px]"} />

                </div>
            </div>
        </>
    )
}
