import React from 'react'
import Image from 'next/image'
import { ChevronRight, Mail } from 'lucide-react'

export const HomeFooter = () => {
    return (
        <div className="conten w-[100%]">
            <div className="wrap py-11 w-[90%] mx-auto flex flex-row justify-between gap-10">
                <div className="left">
                    <div className="">
                        <h3 className='font-[800] text-3xl font-[Poppins] text-red-700'>Shiplink</h3>
                        <div className="flex flex-col py-4 gap-[16px]">
                            <p className='text-base font-regular text-[#5A5A5A]'>Email Support</p>
                            <div className="flex flex-row gap-3 items-center">
                                <Mail width={20} height={20} />
                                <div className="text-base">Support@Shiplink.com</div>
                            </div>
                        </div>

                        <div className="flex flex-col py-4 gap-[16px]">
                            <p className='text-base font-regular text-[#5A5A5A]'>Follow Us</p>
                            <div className="flex flex-row gap-5">
                                <Image
                                    src={'/assets/home/Socials/fb.png'}
                                    width={40}
                                    height={40}
                                    alt='facebook'
                                    style={{ width: '25px', height: '25px' }}
                                />
                                <Image
                                    src={'/assets/home/Socials/x.png'}
                                    width={40}
                                    height={40}
                                    alt='facebook'
                                    style={{ width: '25px', height: '25px' }}
                                />
                                <Image
                                    src={'/assets/home/Socials/ig.png'}
                                    width={40}
                                    height={40}
                                    alt='facebook'
                                    style={{ width: '25px', height: '25px' }}
                                />
                            </div>
                        </div>


                    </div>
                </div>

                <div className="right flex flex-row gap-3 justify-between w-[30%]">
                    <div className="flex flex-col gap-5">
                        <div className="item flex flex-row gap-2 items-center">
                            <ChevronRight className='text-red-700 w-[15px] h-[15px]' />
                            <p>About</p>
                        </div>
                        <div className="item flex flex-row gap-2 items-center">
                            <ChevronRight className='text-red-700 w-[15px] h-[15px]' />
                            <p>Support</p>
                        </div>
                        <div className="item flex flex-row gap-2 items-center">
                            <ChevronRight className='text-red-700 w-[15px] h-[15px]' />
                            <p>Membership</p>
                        </div>
                        <div className="item flex flex-row gap-2 items-center">
                            <ChevronRight className='text-red-700 w-[15px] h-[15px]' />
                            <p>How it works</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="item flex flex-row gap-2 items-center">
                            <ChevronRight className='text-red-700 w-[15px] h-[15px]' />
                            <p>Shipping Calculator</p>
                        </div>
                        <div className="item flex flex-row gap-2 items-center">
                            <ChevronRight className='text-red-700 w-[15px] h-[15px]' />
                            <p>Prohibited Items</p>
                        </div>
                        <div className="item flex flex-row gap-2 items-center">
                            <ChevronRight className='text-red-700 w-[15px] h-[15px]' />
                            <p>Contact</p>
                        </div>
                        <div className="item flex flex-row gap-2 items-center">
                            <ChevronRight className='text-red-700 w-[15px] h-[15px]' />
                            <p>Info</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full bg-[#2E2E2E] text-white py-[24px] font-regular">
                <div className="flex flex-row gap-5 justify-evenly w-[90%] mx-auto">
                    <p>
                        © 2023  ShipLink.ca
                    </p>
                    <div className=" flex flex-row gap-4 font-regular">

                        <p>Terms and Conditions</p>
                        <p> | </p>
                        <p>Privacy Policy</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
