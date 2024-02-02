import React from 'react'
import { Button } from '@/components/ui/button'
export const MemberList = () => {
    return (
        <>
            <div className="flex flex-col rounded-sm border border-zinc-300 px-2 py-2 w-full h-full">
                <div className="text-xs w-full rounded-sm bg-myBlue py-2 px-2 border border-zinc-300 text-white text-center">
                    <p>Showing All Members In same Warehouse</p>
                </div>

                <div className="py-2 text-xs flex flex-col gap-2">
                    <div className="flex flex-row justify-between items-center rounded-sm border border-zinc-300 py-2 px-2 ">
                        <p className='text'>Jhon Smith</p>
                        <p className='text-neutral-500'>Last Seen : 1 Hours ago</p>
                    </div>
                    <div className="flex flex-row justify-between items-center rounded-sm border border-zinc-300 py-2 px-2">
                        <p>Jhon Smith</p>
                        <p className='text-neutral-500'>Last Seen : 1 Hours ago</p>
                    </div>
                    <div className="flex flex-row justify-between items-center rounded-sm border border-zinc-300 py-2 px-2">
                        <p>Jhon Smith</p>
                        <p className='text-neutral-500'>Last Seen : 1 Hours ago</p>
                    </div>
                </div>
                <div className="w-full">

                    <Button
                        variant="softBlue"
                        size="sm"
                        className="w-full text-xs"
                    >
                        <p>Show All Employee</p>
                    </Button>
                </div>
            </div>
        </>
    )
}
