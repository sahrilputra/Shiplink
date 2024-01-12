import React from 'react'

export const ProvinceList = () => {
    return (
        <>
            <div className="w-full p-2.5 justify-start items-center gap-2.5 inline-flex">
                <div className="text-black text-base font-medium font-['Poppins'] leading-tight">Province : </div>
            </div>
            <div className="w-full  h-[50px] px-2.5 py-[15px] bg-white rounded border border-neutral-200 flex-col justify-start items-start gap-3 flex">
                <div className="h-5 pl-[9px] pr-1.5 flex-col justify-start items-center gap-3 flex">
                    <div className="w-[308px] justify-start items-center gap-2.5 inline-flex">
                        <div><span className="text-black text-sm font-normal font-['Poppins'] leading-tight">Alberta</span><span className="text-black text-sm font-medium font-['Poppins'] leading-tight"> : </span><span className="text-black text-sm font-semibold font-['Poppins'] leading-tight">HST ( 13 % )</span></div>
                    </div>
                </div>
            </div>
            <div className="w-full  h-[50px] px-2.5 py-[15px] bg-blue-100 rounded border border-neutral-200 flex-col justify-start items-start gap-3 flex">
                <div className="h-5 pl-[9px] pr-1.5 flex-col justify-start items-center gap-3 flex">
                    <div className="w-[308px] justify-start items-center gap-2.5 inline-flex">
                        <div><span className="text-black text-sm font-normal font-['Poppins'] leading-tight">Ohio</span><span className="text-black text-sm font-medium font-['Poppins'] leading-tight"> : </span><span className="text-black text-sm font-semibold font-['Poppins'] leading-tight">HST ( 13 % )</span></div>
                    </div>
                </div>
            </div>
            <div className="w-full  h-[50px] px-2.5 py-[15px] bg-white rounded border border-neutral-200 flex-col justify-start items-start gap-3 flex">
                <div className="h-5 pl-[9px] pr-1.5 flex-col justify-start items-center gap-3 flex">
                    <div className="w-[308px] justify-start items-center gap-2.5 inline-flex">
                        <div><span className="text-black text-sm font-normal font-['Poppins'] leading-tight">Quebec : </span><span className="text-black text-sm font-medium font-['Poppins'] leading-tight">QST</span><span className="text-black text-sm font-semibold font-['Poppins'] leading-tight"> ( 9.96 % ) + HST 5 %</span></div>
                    </div>
                </div>
            </div>
            <div className="w-full h-[50px] px-2.5 py-[15px] bg-white rounded border border-neutral-200 flex-col justify-start items-start gap-3 flex">
                <div className="h-5 pl-[9px] pr-1.5 flex-col justify-start items-center gap-3 flex">
                    <div className="w-[308px] justify-start items-center gap-2.5 inline-flex">
                        <div><span className="text-black text-sm font-normal font-['Poppins'] leading-tight">Ontario : </span><span className="text-black text-sm font-medium font-['Poppins'] leading-tight">HST</span><span className="text-black text-sm font-semibold font-['Poppins'] leading-tight"> ( 11 % )</span><span className="text-black text-sm font-normal font-['Poppins'] leading-tight"> </span></div>
                    </div>
                </div>
            </div>
        </>
    )
}
