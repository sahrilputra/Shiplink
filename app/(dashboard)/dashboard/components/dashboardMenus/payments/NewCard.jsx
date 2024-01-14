import React from 'react'
import Image from 'next/image'
import { ArrowDownIcon } from '@/components/icons/iconCollection';

export const NewCard = () => {
    return (
        <>
            <div className="w-[100%] flex-col justify-start items-start gap-4 flex mt-[20px]">
                <div className="h-[80px] w-full rounded-xl flex-col justify-center items-start gap-2 flex">
                    <div className=" text-neutral-900 text-base font-normal font-['Poppins']">Name On Card</div>
                    <input
                        className="self-stretch w-full h-[52px] px-4 py-2 bg-gray-50 rounded border border-gray-200 justify-start items-center gap-2 inline-flex text-zinc-900 text-base font-normal font-['Poppins']"
                        placeholder="John Doe"
                    />
                </div>
                <div className="rounded-xl flex-col justify-center items-start gap-2 flex">
                    <div className="self-stretch text-neutral-900 text-base font-normal font-['Poppins']">Card Number</div>
                    <div className="w-[476px] justify-start items-center gap-2 inline-flex">
                        <div className="w-[105px] h-[52px] px-4 py-2 bg-gray-50 rounded border border-gray-200 justify-between gap-2 items-center flex">
                            <Image
                                src={"/assets/payments/masterCard.png"}
                                width={100}
                                height={100}
                                alt='MasterCard'
                                className='w-[80%] h-[30px]'
                            />
                            <div className="w-[20%]">
                                <ArrowDownIcon />
                            </div>
                        </div>
                        <input
                            type='number'
                            className="w-[100%] h-[52px] px-4 py-2 bg-gray-50 rounded border border-gray-200 justify-start items-center gap-2 flex text-zinc-900 text-base font-normal font-['Poppins']"
                            placeholder="1231 1231  1231  1231  1231 "
                        />
                    </div>
                </div>
                <div className="justify-start items-start gap-4 inline-flex w-[100%]">
                    <div className="w-[100%]">
                        <div className="text-neutral-900 text-base font-normal font-['Poppins']">Expiration Date</div>
                        <input
                            type='text'
                            className="h-[52px] px-4 py-2 left-0 top-[32px] bg-gray-50 rounded border border-gray-200 justify-start items-center inline-flex text-black text-base font-normal font-['Poppins']"
                            placeholder="MM/YY"
                        />
                    </div>
                    <div className="w-[100%] relative">
                        <div className="text-neutral-900 text-base font-normal font-['Poppins']">Expiration Date</div>
                        <input
                            type='number'
                            className="h-[52px] px-4 py-2 left-0 top-[32px] bg-gray-50 rounded border border-gray-200 justify-start items-center inline-flex text-black text-base font-normal font-['Poppins']"
                            placeholder="123"
                        />
                    </div>
                </div>
                <div className="flex flex-col">

                    <div className="inline-flex gap-[10px]">
                        <input
                            id='saved_checkbox'
                            type="checkbox"
                            placeholder='Save this card'
                        />
                        <p>Save this Cards</p>
                    </div>
                </div>

                <div className="flex-col justify-start items-start gap-[15px] flex">
                    <div className="flex-col justify-start items-start gap-2.5 flex">
                        <div className="w-[460px] justify-between items-start inline-flex">
                            <div className="text-neutral-900 text-base font-normal font-['Poppins']">Sub Total</div>
                            <div className="w-[90px] text-right text-neutral-900 text-base font-normal font-['Poppins']">$25.00</div>
                        </div>
                        <div className="w-[460px] justify-between items-start inline-flex">
                            <div className="text-neutral-900 text-base font-normal font-['Poppins']">Tax</div>
                            <div className="w-[90px] text-right text-neutral-900 text-base font-normal font-['Poppins']">$5.00</div>
                        </div>
                    </div>
                    <div className="w-[470px] h-[0px] opacity-20 border border-black"></div>
                    <div className="w-[460px] justify-between items-start inline-flex">
                        <div className="text-neutral-900 text-base font-semibold font-['Poppins']">Total</div>
                        <div className="w-[90px] text-right text-neutral-900 text-base font-semibold font-['Poppins']">$30.00</div>
                    </div>
                </div>

            
            </div>

        </>
    )
}
