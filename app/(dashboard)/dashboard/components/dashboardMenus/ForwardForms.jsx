import React from 'react'
import { Button } from '@/components/ui/button'
export const ForwardForms = () => {
    return (
        <>
            <div className="flex-col justify-start items-start gap-0.5 flex">
                <div><span className="text-zinc-800 text-sm font-semibold font-['Poppins'] leading-tight">Full Name </span><span className="text-red-600 text-sm font-semibold font-['Poppins'] leading-tight">*</span></div>
                <input
                    id='name'
                    type='text'
                    className="w-[316px] px-2.5 py-3 bg-white rounded-md border border-neutral-200 justify-start items-center gap-2.5 inline-flex text-zinc-500 text-sm font-normal font-['Poppins'] leading-tight outline-none"
                    placeholder='Input Name'

                />

            </div>
            <div className="flex-col justify-start items-start gap-0.5 flex">
                <div><span className="text-zinc-800 text-sm font-semibold font-['Poppins'] leading-tight">Street Address </span><span className="text-red-600 text-sm font-semibold font-['Poppins'] leading-tight">*</span></div>
                <input
                    id='streetAddress'
                    type='text'
                    className="w-[316px] px-2.5 py-3 bg-white rounded-md border border-neutral-200 justify-start items-center gap-2.5 inline-flex text-zinc-500 text-sm font-normal font-['Poppins'] leading-tight outline-none"
                    placeholder='Street Address'

                />
            </div>
            <div className="flex-col justify-start items-start gap-0.5 flex">
                <div><span className="text-zinc-800 text-sm font-semibold font-['Poppins'] leading-tight">Email </span><span className="text-red-600 text-sm font-semibold font-['Poppins'] leading-tight">*</span></div>
                <input
                    id='email'
                    type='email'
                    className="w-[316px] px-2.5 py-3 bg-white rounded-md border border-neutral-200 justify-start items-center gap-2.5 inline-flex text-zinc-500 text-sm font-normal font-['Poppins'] leading-tight outline-none"
                    placeholder='Email'
                />
            </div>
            <div className="flex-col justify-start items-start gap-0.5 flex">
                <div><span className="text-zinc-800 text-sm font-semibold font-['Poppins'] leading-tight">Phone </span><span className="text-red-600 text-sm font-semibold font-['Poppins'] leading-tight">*</span></div>
                <input
                    id='phone'
                    type='number'
                    className="w-[316px] px-2.5 py-3 bg-white rounded-md border border-neutral-200 justify-start items-center gap-2.5 inline-flex text-zinc-500 text-sm font-normal font-['Poppins'] leading-tight outline-none"
                    placeholder='Phone Number'
                />
            </div>
            <div className="flex-col justify-start items-start gap-[15px] flex">
                <div className="justify-start items-start gap-2.5 inline-flex">
                    <div className="flex-col justify-start items-start gap-0.5 inline-flex">
                        <div><span className="text-zinc-800 text-sm font-semibold font-['Poppins'] leading-tight">Country </span><span className="text-red-600 text-sm font-semibold font-['Poppins'] leading-tight">*</span></div>
                        <input
                            id='country'
                            type='text'
                            placeholder='Country'
                            className="w-[151px] px-2.5 py-3 bg-white rounded-md border border-neutral-200 justify-start items-center gap-2.5 inline-flex text-zinc-500 text-sm font-normal font-['Poppins'] leading-tight outline-none"
                        />
                    </div>
                    <div className="flex-col justify-start items-start gap-0.5 inline-flex">
                        <div><span className="text-zinc-800 text-sm font-semibold font-['Poppins'] leading-tight">City </span><span className="text-red-600 text-sm font-semibold font-['Poppins'] leading-tight">*</span></div>
                        <input
                            id='city'
                            type='text'
                            placeholder='City'
                            className="w-[151px] px-2.5 py-3 bg-white rounded-md border border-neutral-200 justify-start items-center gap-2.5 inline-flex text-zinc-500 text-sm font-normal font-['Poppins'] leading-tight outline-none"
                        />
                    </div>
                </div>
            </div>
            <div className="justify-start items-start gap-2.5 inline-flex">
                <div className="flex-col justify-start items-start gap-0.5 inline-flex">
                    <div><span className="text-zinc-800 text-sm font-semibold font-['Poppins'] leading-tight">State </span><span className="text-red-600 text-sm font-semibold font-['Poppins'] leading-tight">*</span></div>
                    <input
                        id='state'
                        type='text'
                        placeholder='State/Province'
                        className="w-[151px] px-2.5 py-3 bg-white rounded-md border border-neutral-200 justify-start items-center gap-2.5 inline-flex text-zinc-500 text-sm font-normal font-['Poppins'] leading-tight outline-none"
                    />
                </div>
                <div className="flex-col justify-start items-start gap-0.5 inline-flex">
                    <div><span className="text-zinc-800 text-sm font-semibold font-['Poppins'] leading-tight">Zip / Postal Code </span><span className="text-red-600 text-sm font-semibold font-['Poppins'] leading-tight">*</span></div>
                    <input
                        id='zipCode'
                        type='text'
                        placeholder='Zip Code'
                        className="w-[151px] px-2.5 py-3 bg-white rounded-md border border-neutral-200 justify-start items-center gap-2.5 inline-flex text-zinc-500 text-sm font-normal font-['Poppins'] leading-tight outline-none"
                    />
                </div>
            </div>
            <div className="flex-col justify-start items-end gap-[7px] flex">
                <div className="w-[312px] h-[0px] border border-neutral-200 border-opacity-60"></div>
                <Button
                    className="h-[35px] px-10"
                    variant="secondary">
                    <div className="text-white text-xs font-medium font-['Poppins']">Confirm</div>
                </Button>
            </div>
        </>
    )
}
