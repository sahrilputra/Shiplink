import React from 'react'

export const ReferenceCard = () => {
    return (
        <>
            <div className=" w-[70%] h-[69px] flex flex-row items-center gap-3 ">
                <div className=" bg-white rounded-md border border-neutral-200 flex flex-row gap-4 items-center justify-between px-[10px] py-[10px] ">
                    <div className="text-black text-[20px] font-normal font-['Poppins']">User name, </div>
                    <div className="text-right text-zinc-600 text-opacity-50  font-normal font-['Poppins']">Joined : 12/12/2023</div>
                </div>
                <div className=" bg-white rounded-md border border-neutral-200 flex flex-row gap-2 justify-between px-[10px] py-[10px]">
                    <div className="text-black text-[20px] font-normal font-['Poppins']">$15</div>
                </div>
            </div>
        </>
    )
}
