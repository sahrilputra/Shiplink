import React from 'react'
import Image from 'next/image'
export const WhyCardsComponents = () => {
    return (
        <div className="flex flex-row justify-center gap-10 flex-wrap">
            <div className="flex flex-row justify-center items-center gap-[16px] p-[20px] w-[450px] rounded bg-white/5 ">
                <div className="left w-[100px]">
                    <Image
                        src={'/assets/home/web.png'}
                        height={70}
                        width={70}
                        alt='web'
                        style={{ width: "60px", height: "60px" }}
                    />
                </div>
                <div className="right text-white w-full flex flex-col gap-4">
                    <p className='text-lg font-bold'>
                        Website
                    </p>

                    <p className='font-extralight text-base'>
                        With our advanced website platform you can buy, track and control in real time, all in one place.
                    </p>
                </div>
            </div>

            <div className="flex flex-row justify-center items-center gap-[16px] p-[20px] w-[450px] rounded bg-white/5 ">
                <div className="left w-[100px]">
                    <Image
                        src={'/assets/home/icon1.png'}
                        height={70}
                        width={70}
                        alt='web'
                        style={{ width: "60px", height: "60px" }}
                    />
                </div>
                <div className="right text-white w-full flex flex-col gap-4">
                    <p className='text-lg font-bold'>
                        Online Payment
                    </p>

                    <p className='font-extralight text-base'>
                        Make your payments online for fast collection at branches and terminals.
                    </p>
                </div>
            </div>

            <div className="flex flex-row justify-center items-center gap-[16px] p-[20px] w-[450px] rounded bg-white/5 ">
                <div className="left w-[100px]">
                    <Image
                        src={'/assets/home/icon2.png'}
                        height={70}
                        width={70}
                        alt='web'
                        style={{ width: "60px", height: "60px" }}
                    />
                </div>
                <div className="right text-white w-full flex flex-col gap-4">
                    <p className='text-lg font-bold'>
                        By Weight
                    </p>

                    <p className='font-extralight text-base'>
                        You only pay for what it weighs, you do not pay for volumetric weight.
                    </p>
                </div>
            </div>

            <div className="flex flex-row justify-center items-center gap-[16px] p-[20px] w-[450px] rounded bg-white/5 ">
                <div className="left w-[100px]">
                    <Image
                        src={'/assets/home/icon3.png'}
                        height={70}
                        width={70}
                        alt='web'
                        style={{ width: "60px", height: "60px" }}
                    />
                </div>
                <div className="right text-white w-full flex flex-col gap-4">
                    <p className='text-lg font-bold'>
                        ShipLink Points
                    </p>

                    <p className='font-extralight text-base'>
                        You accumulate points that you can redeem for discounts on our services.
                    </p>
                </div>
            </div>

            <div className="flex flex-row justify-center items-center gap-[16px] p-[20px] w-[450px] rounded bg-white/5 ">
                <div className="left w-[100px]">
                    <Image
                        src={'/assets/home/icon4.png'}
                        height={70}
                        width={70}
                        alt='web'
                        style={{ width: "60px", height: "60px" }}
                    />
                </div>
                <div className="right text-white w-full flex flex-col gap-4">
                    <p className='text-lg font-bold'>
                        Branches
                    </p>

                    <p className='font-extralight text-base'>
                        Several terminals and branches in the US and Canada at your disposal
                    </p>
                </div>
            </div>

            <div className="flex flex-row justify-center items-center gap-[16px] p-[20px] w-[450px] rounded bg-white/5 ">
                <div className="left w-[100px]">
                    <Image
                        src={'/assets/home/icon5.png'}
                        height={70}
                        width={70}
                        alt='web'
                        style={{ width: "60px", height: "60px" }}
                    />
                </div>
                <div className="right text-white w-full flex flex-col gap-4">
                    <p className='text-lg font-bold'>
                        Tiered Rate
                    </p>

                    <p className='font-extralight text-base'>
                        The heavier your package, the cheaper your rate per pound.
                    </p>
                </div>
            </div>

        </div>
    )
}
