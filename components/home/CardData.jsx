import React from 'react'
import Image from 'next/image'

export const CardData = () => {
    return (
        <>
            <div className=" flex flex-row gap-5 justify-between w-full">

                <div className="flex flex-col gap-5 w-[305px] h-[100%] border-[#E7E8EC] shadow-md border rounded-md p-5">
                    <Image
                        src={'/assets/home/about/img1.png'}
                        width={50}
                        height={50}
                        alt='icon'
                        style={{ width: '50px', height: '50px', objectFit: 'cover', objectPosition: 'center' }}
                    />
                    <p className='font-bold '>
                        World class business model using industry best practices
                    </p>
                </div>

                <div className="">
                    <div className="flex flex-col gap-5 w-[305px] h-[100%] border-[#E7E8EC] shadow-md border rounded-md p-5">
                        <Image
                            src={'/assets/home/about/img2.png'}
                            width={50}
                            height={50}
                            alt='icon'
                            style={{ width: '50px', height: '50px', objectFit: 'cover', objectPosition: 'center' }}
                        />
                        <p className='font-bold '>
                            Top Rated by customer reviews
                        </p>
                    </div>
                </div>
                <div className="">
                    <div className="flex flex-col gap-5 w-[305px] h-[100%] border-[#E7E8EC] shadow-md border rounded-md p-5">
                        <Image
                            src={'/assets/home/about/img3.png'}
                            width={50}
                            height={50}
                            alt='icon'
                            style={{ width: '50px', height: '50px', objectFit: 'cover', objectPosition: 'center' }}
                        />
                        <p className='font-bold '>
                            Established business with over 10 years of experience
                        </p>
                    </div>
                </div>
                <div className="">
                    <div className="flex flex-col gap-5 w-[305px] h-[100%] border-[#E7E8EC] shadow-md border rounded-md p-5">
                        <Image
                            src={'/assets/home/about/img4.png'}
                            width={50}
                            height={50}
                            alt='icon'
                            style={{ width: '50px', height: '50px', objectFit: 'cover', objectPosition: 'center' }}
                        />
                        <p className='font-bold '>
                            Terminals and Service across all North America
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
