import React from 'react'
import Image from 'next/image'
export const PromoTwo = () => {
    return (
        <div className="w-[378px] h-[665px] relative bg-white">
            <div className="h-[665px] left-0 top-0 absolute bg-white rounded-md" />
            <div className="left-[105px] top-[549px] absolute flex-col justify-start items-center gap-[13px] inline-flex">
                <div className="text-sky-700 text-xl font-normal font-['Poppins']">Follow Us</div>
                <div className="justify-start items-start gap-12 inline-flex">
                    <div className="w-6 h-6 relative" />
                    <div className="w-6 h-6 relative" />
                    <div className="w-6 h-6 relative" />
                </div>
            </div>
            <div className=" h-[99px] left-[58px] top-[74px] absolute text-center text-black text-xl font-semibold font-['Poppins']">If you have any questions or need any help, please contact us</div>
            <div className="left-[80px] top-[223px] absolute flex-col justify-center items-start gap-[21px] inline-flex">
                <div className="justify-start items-center gap-2.5 inline-flex">
                    <div className="w-[39px] h-[39px] relative" />
                    <div><span className="text-sky-800 text-sm font-normal font-['Poppins']">Contact Phone Number:<br /></span><span className="text-black text-sm font-normal font-['Poppins']">+1 234-345-7898</span></div>
                </div>
                <div className="justify-start items-center gap-2.5 inline-flex">
                    <div className=" h-9 py-[1.50px] justify-center items-center flex" />
                    <div><span className="text-sky-700 text-sm font-normal font-['Poppins']">Email Support:<br /></span><span className="text-black text-sm font-normal font-['Poppins']">support@shiplink.ca</span></div>
                </div>
            </div>

            <Image
                width={378}
                height={304}
                alt='Blue Bg'
                src={'/assets/blueBottom.png'}
                className='left-0 top-[203px] absolute opacity-80 rounded-[9px]'
            />
            {/* <img className="w-[378px] h-[304px] left-0 top-[203px] absolute opacity-80 rounded-[9px]" src="https://via.placeholder.com/378x304" /> */}
            <div className="h-12 px-10 left-[41px] top-[479px] absolute bg-red-700 rounded shadow justify-center items-center gap-2 inline-flex">
                <div className="text-white text-lg font-semibold font-['Poppins']">Support</div>
            </div>
        </div>
    )
}
