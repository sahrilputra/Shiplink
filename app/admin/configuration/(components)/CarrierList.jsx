'use client'
import { React, useState } from 'react'
import Image from 'next/image'
// import { ToggleSwitch } from 'flowbite-react'

export const CarrierList = () => {
    const [togled, setTogled] = useState(true);


    return (
        <>
            <div className="w-[100%] h-[61px] px-2.5 py-[5px] bg-white rounded-md border border-neutral-200 justify-between items-center inline-flex font-poppins">
                <div className="px-10 justify-start items-center gap-[100px] flex">
                    <div className="w-[105px] p-2.5 flex-col justify-start items-start gap-2.5 inline-flex">
                        <Image
                            src={'/assets/courrier/feedex.png'}
                            width={80}
                            height={30}
                            alt='feedex icon'
                        />
                    </div>
                    <div className="justify-start items-center gap-[54px] flex">
                        <div className="justify-center items-center gap-[41px] flex">
                            <div className="h-[21px] justify-start items-end gap-[120px] flex">
                                <div className="text-zinc-600 text-sm font-normal font-poppins">FedEx</div>
                            </div>
                        </div>
                        <div className="justify-center items-center gap-[41px] flex">
                            <div className="h-[21px] justify-start items-end gap-[120px] flex">
                                <div className="text-zinc-600 text-sm font-normal font-poppins">U.S Domestic</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" justify-between items-center flex flex-row gap-5">
                    {/* <ToggleSwitch
                        checked={togled}
                        onChange={setTogled}
                        // color={'bg-secondary border-secondary '}
                        // className='bg-secondary'
                    /> */}
                    <button className="px-2.5 py-[5px] bg-sky-50 rounded justify-center items-center gap-2.5 flex">
                        <p className="text-secondary text-xs font-medium ">Edit</p>
                    </button>

                </div>
            </div>
        </>
    )
}
