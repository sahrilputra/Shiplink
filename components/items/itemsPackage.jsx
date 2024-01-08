import Image from 'next/image'
import React from 'react'

export default function ItemsPackage() {
    return (
        <div className="w-[734.14px] h-[88px] px-5 py-2.5 bg-white rounded-md shadow border border-zinc-600 border-opacity-50 justify-start items-center gap-20 inline-flex">
            <div className="justify-start items-center gap-[30px] flex">
                <div className="justify-start items-center gap-[15px] flex">
                    <div className="w-[50px] h-[50px] p-2.5 bg-sky-700 rounded-md justify-center items-center gap-2.5 flex">
                        <div className="w-[25px] h-[25px] relative">
                            <Image
                                src={"/assets/mailbox.svg"}
                                width={25}
                                height={25}
                                alt='mailbox icon'
                            />
                        </div>
                    </div>
                    <div className="flex-col justify-start items-start inline-flex">
                        <div className="text-black text-sm font-medium font-['Poppins']">#5635-342808</div>
                        <div className="text-sky-700 text-sm font-medium font-['Poppins']">Shipping Mailbox</div>
                        <div className="justify-start items-start gap-[9px] inline-flex">
                            <div className="text-zinc-600 text-sm font-medium font-['Poppins']">Express</div>
                            <div className="justify-start items-center gap-2.5 flex">
                                <div className="text-red-700 text-opacity-80 text-sm font-semibold font-['Poppins']">872812138328</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="justify-start items-start gap-[11px] flex">
                    <div className="w-[36.14px] h-[23.55px] relative">
                        <div class="border-l h-10 border-gray-700"></div>
                    </div>
                    <div className="w-[36.14px] h-[23.55px] relative">
                        <Image 
                        src={"/assets/USA.svg"}
                        width={66}
                        height={70}
                        className='left-[-10.19px] top-[-23.55px]'
                        alt='USA icon'
                        />
                    </div>
                    <div className="flex-col justify-start items-start gap-[5px] inline-flex">
                        <div className="justify-start items-start gap-[5px] inline-flex">
                            <div className="w-[30px] h-[5px] bg-green-400 rounded-[63px]" />
                            <div className="w-[30px] h-[5px] bg-green-400 rounded-[63px]" />
                            <div className="w-[30px] h-[5px] bg-neutral-200 bg-opacity-95 rounded-[63px]" />
                        </div>
                        <div><span className="text-zinc-600 text-[13px] font-medium font-['Poppins']">Shipped</span><span className="text-zinc-600 text-[13px] font-normal font-['Poppins']">, 12 jun, 2023</span></div>
                    </div>
                </div>
            </div>
            <div className="flex-col justify-start items-end gap-[5px] inline-flex">
                <div className="justify-start items-center gap-3.5 inline-flex">
                    <div className="justify-start items-center gap-[37px] flex">
                        <div className="w-[88px] h-[23px] px-2.5 py-[5px] bg-blue-200 rounded border border-blue-500 justify-center items-center gap-2.5 flex">
                            <div className="text-center text-blue-500 text-xs font-medium font-['Poppins']">Received</div>
                        </div>
                    </div>
                    <div className="p-[5px] flex-col justify-start items-end gap-1 inline-flex">
                        <div className="justify-start items-end gap-[22px] inline-flex">
                            <div className="h-3.5 justify-start items-start gap-2.5 flex" />
                        </div>
                    </div>
                </div>
                <div className="justify-end items-center gap-[15px] inline-flex">
                    <div className="h-[21px] justify-end items-center gap-2.5 flex">
                        <div className="text-right text-zinc-600 text-sm font-medium font-['Poppins']">Boston, USA</div>
                    </div>
                    <div className="w-6 h-3.5 flex-col justify-center items-center gap-2.5 inline-flex" />
                </div>
            </div>
        </div>
    )
}
