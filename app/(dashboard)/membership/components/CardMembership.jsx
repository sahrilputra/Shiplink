import React from 'react'

export const CardMembership = () => {
    return (
        <>
            <div className="w-[340px] p-6 bg-white rounded-lg shadow border border-zinc-600 border-opacity-60 flex-col justify-between items-center inline-flex">
                <div className="self-stretch h-[428px] flex-col justify-start items-start gap-5 flex">
                    <div className="flex-col justify-center items-start gap-4 flex">
                        <div className="justify-center items-center gap-4 inline-flex">
                            <div className="w-8 h-8 relative" />
                            <div className="text-center text-neutral-900 text-xl font-semibold font-['Poppins']">Free</div>
                        </div>
                        <div className="text-center text-sky-700 text-[32px] font-semibold font-['Poppins'] tracking-tight">$0</div>
                    </div>
                    <div className="self-stretch h-[248px] flex-col justify-center items-center gap-2 flex">
                        <div className="self-stretch justify-start items-center gap-2 inline-flex">
                            <div className="w-4 h-4 px-[0.06px] pt-[2.83px] pb-[2.31px] justify-center items-center flex" />
                            <div className="text-zinc-600 text-base font-normal font-['Poppins']">Personal Dashboard</div>
                        </div>
                        <div className="self-stretch justify-start items-center gap-2 inline-flex">
                            <div className="w-4 h-4 px-[0.06px] pt-[2.83px] pb-[2.31px] justify-center items-center flex" />
                            <div className="text-zinc-600 text-base font-normal font-['Poppins']">Your US ShipLink Address</div>
                        </div>
                        <div className="self-stretch justify-start items-center gap-2 inline-flex">
                            <div className="w-4 h-4 px-[0.06px] pt-[2.83px] pb-[2.31px] justify-center items-center flex" />
                            <div className="text-zinc-600 text-base font-normal font-['Poppins']">Your Canadian ShipLink Address</div>
                        </div>
                        <div className="self-stretch justify-start items-center gap-2 inline-flex">
                            <div className="w-4 h-4 px-[0.06px] pt-[2.83px] pb-[2.31px] justify-center items-center flex" />
                            <div className="text-zinc-600 text-base font-normal font-['Poppins']">SLA to SLA Cross-Border Services</div>
                        </div>
                        <div className="self-stretch justify-start items-center gap-2 inline-flex">
                            <div className="w-4 h-4 px-[0.06px] pt-[2.83px] pb-[2.31px] justify-center items-center flex" />
                            <div className="text-zinc-600 text-base font-normal font-['Poppins']">Package Forwarding Services</div>
                        </div>
                        <div className="self-stretch justify-start items-center gap-2 inline-flex">
                            <div className="w-4 h-4 px-[0.06px] pt-[2.83px] pb-[2.31px] justify-center items-center flex" />
                            <div className="text-zinc-600 text-base font-normal font-['Poppins']">Self Pick-Up at ShipLink Terminals</div>
                        </div>
                        <div className="self-stretch justify-start items-center gap-2 inline-flex">
                            <div className="w-4 h-4 px-[0.06px] pt-[2.83px] pb-[2.31px] justify-center items-center flex" />
                            <div className="text-zinc-600 text-base font-normal font-['Poppins']">Consolidation Services</div>
                        </div>
                        <div className="self-stretch justify-start items-center gap-2 inline-flex">
                            <div className="w-4 h-4 px-[0.06px] pt-[2.83px] pb-[2.31px] justify-center items-center flex" />
                            <div className="text-zinc-600 text-base font-normal font-['Poppins']">Discounted Shipping Labels</div>
                        </div>
                    </div>
                </div>
                <div className="self-stretch h-12 px-10 bg-red-700 rounded shadow justify-center items-center gap-2 inline-flex">
                    <div className="text-white text-lg font-semibold font-['Poppins']">Subscribe</div>
                </div>
            </div>

        </>
    )
}
