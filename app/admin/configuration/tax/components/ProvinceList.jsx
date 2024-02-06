import React from 'react'

export const ProvinceList = () => {
    return (
        <>
            <div className="w-full justify-start gap-1 flex flex-col">
                <div className="text-black text-sm font-bold ">Province : </div>
                <div className="w-full px-2.5 py-[10px] bg-white rounded border border-zinc-300 flex-col justify-start items-start gap-3 flex">
                    <div className="w-full justify-start items-center gap-2.5 inline-flex text-black text-xs ">
                        <p>Alberta :</p>
                        <p className="text-black text-xs font-semibold font-['Poppins'] ">HST ( 13 % )</p></div>
                </div>
                <div className="w-full px-2.5 py-[10px] bg-white rounded border border-zinc-300 flex-col justify-start items-start gap-3 flex">
                    <div className="w-full justify-start items-center gap-2.5 inline-flex text-black text-xs ">
                        <p>Ohio :</p>
                        <p className="text-black text-xs font-semibold font-['Poppins'] ">HST ( 13 % )</p></div>
                </div>
                <div className="w-full px-2.5 py-[10px] bg-blue-50 rounded border border-zinc-300 flex-col justify-start items-start gap-3 flex">
                    <div className="w-full justify-start items-center gap-2.5 inline-flex text-black text-xs ">
                        <p>Quebec :</p>
                        <p className="text-black text-xs font-semibold font-['Poppins'] ">QST ( 9.96 % ) + HST 5 %</p></div>
                </div>
                <div className="w-full px-2.5 py-[10px] bg-white rounded border border-zinc-300 flex-col justify-start items-start gap-3 flex">
                    <div className="w-full justify-start items-center gap-2.5 inline-flex text-black text-xs ">
                        <p>Ontario  :</p>
                        <p className="text-black text-xs font-semibold font-['Poppins'] ">HST ( 11 % )</p>
                    </div>
                </div>
            </div>
        </>
    )
}
