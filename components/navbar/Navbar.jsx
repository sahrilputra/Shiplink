import React from 'react'
import Image from 'next/image'
export const Navbar = () => {
    return (
        <>
            {/*  */}
            <div className="w-full h-[68px] left-0 top-0 bg-white" />
            <div className="right-[150px] top-[9px] absolute justify-end items-center gap-[54px] inline-flex">
                <div className="justify-center items-center gap-6 flex">
                    <div className="justify-start items-center gap-1 flex">
                        <div className="justify-start items-center gap-1 flex">
                            <div className="justify-start items-start gap-2.5 flex">
                                <Image
                                    src={"/icon/notification.svg"}
                                    width={20}
                                    height={20}
                                    alt="notification icon"
                                />
                                <div className="justify-start items-center gap-1 flex">
                                    <div className="text-black text-base font-normal font-['Poppins']">Notification</div>
                                    <div className="w-6 h-6 relative" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="justify-start items-center gap-1 flex">
                    <div className="justify-start items-center gap-2 flex">
                        <div className="w-[18px] h-[18px] relative">
                            <div className="w-[18px] h-[18px] left-0 top-0 absolute">
                                <div className="w-[18px] h-[18px] left-0 top-0 absolute">
                                </div>
                            </div>
                        </div>
                        <div className="text-black text-base font-semibold font-['Poppins']">Eng</div>
                    </div>
                    <div className="w-6 h-6 relative" />
                </div>
                <div className="justify-start items-center gap-1 flex">
                    <div className="justify-start items-center gap-[13px] flex">
                        <div className="justify-start items-center gap-2.5 flex">
                            <div className="w-[105px] flex-col justify-start items-start inline-flex">
                                <div className="w-[143px] text-black text-base font-semibold font-['Poppins']">Username</div>
                                <div className="w-[143px] text-black text-sm font-light font-['Poppins']">Admin</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

