import React from 'react'
import { LucideArrowLeftCircle } from 'lucide-react'
export const Pagination = () => {
    return (
        <>
            <div className="h-9 px-1.5 justify-start items-start gap-2 inline-flex">
                <div className="w-10 h-9 px-3 py-2.5 bg-white rounded-md border border-black border-opacity-10 justify-center items-center flex">
                    {'<'}
                </div>
                <div className="w-10 h-9 py-1 bg-red-700 rounded-md flex-col justify-center items-center gap-2.5 inline-flex">
                    <div className="text-white text-sm font-semibold font-['Poppins'] leading-tight">1</div>
                </div>
                <div className="w-10 h-9 py-1 bg-white rounded-md border border-black border-opacity-10 flex-col justify-center items-center gap-2.5 inline-flex">
                    <div className="text-zinc-800 text-sm font-normal font-['Poppins'] leading-tight">2</div>
                </div>
                <div className="w-10 h-9 py-1 bg-white rounded-md border border-black border-opacity-10 flex-col justify-center items-center gap-2.5 inline-flex">
                    <div className="text-zinc-800 text-sm font-normal font-['Poppins'] leading-tight">3</div>
                </div>
                <div className="w-10 h-9 py-1 bg-white rounded-md border border-black border-opacity-10 flex-col justify-center items-center gap-2.5 inline-flex">
                    <div className="text-zinc-800 text-sm font-normal font-['Poppins'] leading-tight">...</div>
                </div>
                <div className="w-10 h-9 py-1 bg-white rounded-md border border-black border-opacity-10 flex-col justify-center items-center gap-2.5 inline-flex">
                    <div className="text-zinc-800 text-sm font-normal font-['Poppins'] leading-tight">10</div>
                </div>
                <div className="w-10 h-9 px-3 py-2.5 bg-white rounded-md border border-black border-opacity-10 justify-center items-center flex">
                    {'>'}
                </div>
            </div>
        </>
    )
}
