import React from 'react'
// import { Checkbox } from 'flowbite-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
export const NewType = () => {
    return (
        <>
            <div className="w-[100%] flex-col justify-start items-start gap-2.5 inline-flex">
                <div className="w-full px-2.5 justify-start items-end gap-2.5 inline-flex flex-wrap">
                    <div className="justify-start items-end gap-[5px] flex">
                        <div className="flex-col justify-start items-start gap-[3px] inline-flex">
                            <div><span className="text-zinc-800 text-sm font-semibold font-['Poppins'] leading-tight">Tax Name </span><span className="text-red-700 text-sm font-semibold font-['Poppins'] leading-tight">*</span></div>
                            <input
                                id='tax-name'
                                type='text'
                                placeholder='Tax Name'
                                className="w-36 h-10 p-2.5 bg-white rounded border border-neutral-200 justify-start items-center gap-2 inline-flex text-zinc-500 text-sm font-normal font-['Poppins']" />
                        </div>
                    </div>
                    <div className="justify-start items-end gap-[5px] flex">
                        <div className="flex-col justify-start items-start gap-[3px] inline-flex">
                            <div><span className="text-zinc-800 text-sm font-semibold font-['Poppins'] leading-tight">Abbreviation </span><span className="text-red-700 text-sm font-semibold font-['Poppins'] leading-tight">*</span></div>
                            <input
                                id='hst'
                                type='text'
                                placeholder='HST'
                                maxLength={4}
                                className="w-36 h-10 p-2.5 uppercase bg-white rounded border border-neutral-200 justify-start items-center gap-2 inline-flex text-zinc-500 text-sm font-normal font-['Poppins']" />
                        </div>
                    </div>
                    <div className="justify-start items-end gap-[5px] flex">
                        <div className="flex-col justify-start items-start gap-[3px] inline-flex">
                            <div><span className="text-zinc-800 text-sm font-semibold font-['Poppins'] leading-tight">Tax Number </span><span className="text-red-700 text-sm font-semibold font-['Poppins'] leading-tight">*</span></div>
                            <input
                                id='tax-number'
                                type='number'
                                placeholder='Tax Number'
                                className="w-36 h-10 p-2.5 bg-white rounded border border-neutral-200 justify-start items-center gap-2 inline-flex text-zinc-500 text-sm font-normal font-['Poppins']" />
                        </div>
                    </div>
                    <div className="justify-start items-end gap-[5px] flex">
                        <div className="flex-col justify-start items-start gap-[3px] inline-flex">
                            <div className="text-zinc-800 text-sm font-semibold font-['Poppins'] leading-tight">Tax Rate</div>
                            <div className="w-[145px] h-10 px-2.5 bg-white rounded border border-neutral-200 justify-start items-center gap-2 inline-flex">
                                <div className="text-black text-lg font-medium font-['Poppins'] leading-tight">%</div>
                                <div className="w-[19px] h-[0px] origin-top-left rotate-90 border border-neutral-200"></div>
                                <input
                                    id='tax-rate'
                                    type='number'
                                    placeholder='0.00'
                                    className="w-[100%] px-1 text-zinc-500 text-sm font-normal font-['Poppins'] leading-tight outline-none border-none focus:ring-0"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" justify-between items-start inline-flex">
                    <div className="justify-end items-center gap-2.5 flex">
                        <div className="h-3.5 justify-start items-start gap-2.5 flex" />
                        <Checkbox size={'sm'} />
                        <div className="text-zinc-700 text-sm font-normal font-['Poppins'] leading-tight">Show Tax Number on Invoice</div>
                    </div>
                </div>
                <div className=" w-full px-[22px] justify-end items-end gap-2.5 inline-flex">
                    <div className="justify-end items-start gap-[22px] flex">
                        <Button
                            variant="redOutline"
                            className="w-[137px] h-10 px-8 rounded ">
                            <div className="text-red-700 text-sm ">Cancel</div>
                        </Button>
                        <Button
                            variant="destructive"
                            className="w-[137px] h-10 px-8 ">
                            <div className="text-white text-sm">Save</div>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
