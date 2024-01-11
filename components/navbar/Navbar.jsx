/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Image from 'next/image'
export const Navbar = () => {
    return (
        <>
            {/*  */}
            <div className="w-full h-[68px] left-0 top-0 bg-white" >
                <div className="justify-end items-center gap-10 flex py-3 px-10">
                    <button className="justify-start items-center gap-3 flex">
                        <div className="text-black text-sm font-normal font-['Poppins']">Ship</div>
                        <div className="relative" >
                            <Image
                                src={"/icon/blackArrowIcon.svg"}
                                width={10}
                                height={10}
                                alt="arrow icon"
                            />
                        </div>
                    </button>
                    <button className="justify-start items-center gap-3 flex">
                        <div className="text-black text-sm font-normal font-['Poppins']">Track</div>
                        <div className="relative" >
                            <Image
                                src={"/icon/blackArrowIcon.svg"}
                                width={10}
                                height={10}
                                alt="arrow icon"
                            />
                        </div>
                    </button>
                    <button className="justify-start items-center gap-3 flex">
                        <div className="text-black text-sm font-normal font-['Poppins']">Support</div>
                        <div className="relative" >
                            <Image
                                src={"/icon/blackArrowIcon.svg"}
                                width={10}
                                height={10}
                                alt="arrow icon"
                            />
                        </div>
                    </button>

                    <button className="justify-start items-center gap-3 flex">
                        <Image
                            src={"/assets/country/uk-flag.png"}
                            width={20}
                            height={20}
                            alt="uk-flag"
                        />
                        <div className="text-black text-sm font-semibold font-['Poppins']">Eng</div>
                        <div className="relative" >
                            <Image
                                src={"/icon/blackArrowIcon.svg"}
                                width={12}
                                height={12}
                                alt="arrow icon"
                            />
                        </div>
                    </button>

                    <button className="flex flex-row gap-3 justify-center items-center">
                        <img
                            src="https://source.boringavatars.com/beam"
                            className='rounded-full w-[35px] h-[35px]'
                            alt="user image"
                        />
                        <div className="flex flex-col justify-start text-left">
                            <div className=" text-black text-sm font-semibold font-['Poppins']">User, </div>
                            <div className=" text-black text-sm font-light font-['Poppins']">Premium</div>
                        </div>
                        <div className="justify-center items-center inline-flex" >
                            <Image
                                src={"/icon/blackArrowIcon.svg"}
                                width={12}
                                height={12}
                                alt="arrow icon"
                            />
                        </div>
                    </button>
                </div>
            </div>
        </>
    )
}

