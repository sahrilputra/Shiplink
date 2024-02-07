import React from 'react'
import Image from 'next/image'
export const ListCardComponents = () => {
    return (
        <div className="flex flex-col gap-4 justify-between">
            <div className="shadow flex flex-row items-center gap-[20px] px-[20px] py-[20px] bg-white rounded">
                <Image
                    src={'/assets/home/list1.png'}
                    width={50}
                    height={50}
                    alt='icon'
                    style={{ width: "56px", height: "56px" }}
                />

                <div className="flex flex-col gap-2">
                    <h3 className='text-xl font-bold text-black'>1. Get an Instant Quote</h3>
                    <p className='font-extralight text-base text-[#5A5A5A]'>Lorem ipsum dolor sit amet consectetur. Ultrices pulvinar sed purus sit. </p>
                </div>
            </div>
            <div className="shadow flex flex-row items-center gap-[20px] px-[20px] py-[20px] bg-white rounded">
                <Image
                    src={'/assets/home/list2.png'}
                    width={50}
                    height={50}
                    alt='icon'
                    style={{ width: "56px", height: "56px" }}
                />

                <div className="flex flex-col gap-2">
                    <h3 className='text-xl font-bold text-black'>2. Select Service and Carrier</h3>
                    <p className='font-extralight text-base text-[#5A5A5A]'>Lorem ipsum dolor sit amet consectetur. Ultrices pulvinar sed purus sit. </p>
                </div>
            </div>
            <div className="shadow flex flex-row items-center gap-[20px] px-[20px] py-[20px] bg-white rounded">
                <Image
                    src={'/assets/home/list3.png'}
                    width={50}
                    height={50}
                    alt='icon'
                    style={{ width: "56px", height: "56px" }}
                />

                <div className="flex flex-col gap-2">
                    <h3 className='text-xl font-bold text-black'>3. Print Label, Stick it On, and Ship</h3>
                    <p className='font-extralight text-base text-[#5A5A5A]'>Lorem ipsum dolor sit amet consectetur. Ultrices pulvinar sed purus sit. </p>
                </div>
            </div>
            <div className="shadow flex flex-row items-center gap-[20px] px-[20px] py-[20px] bg-white rounded">
                <Image
                    src={'/assets/home/list4.png'}
                    width={50}
                    height={50}
                    alt='icon'
                    style={{ width: "56px", height: "56px" }}
                />

                <div className="flex flex-col gap-2">
                    <h3 className='text-xl font-bold text-black'>4. Track it</h3>
                    <p className='font-extralight text-base text-[#5A5A5A]'>Lorem ipsum dolor sit amet consectetur. Ultrices pulvinar sed purus sit. </p>
                </div>
            </div>

        </div>

    )
}
