import React from 'react'
import Image from 'next/image'
export const CardsComponents = () => {
    return (
        <div className="wrap flex flex-row gap-[30px]  justify-between w-[100%] h-max">
            <div className="p-6 bg-white rounded-md shadow-md  w-[90%] ">
                <div className="flex flex-col gap-[20px]">
                    <div className="imgageContent">
                        <Image
                            width={56}
                            height={56}
                            alt='Icons'
                            src={'/assets/home/Register.png'}
                            style={{ width: "56px", height: "56px" }}
                        />
                    </div>

                    <div className="gap-[16px] flex flex-col ">
                        <h3 className='font-bold text-xl'>1. Register</h3>
                        <p className='text-base text-[#5A5A5A]'>Register for free and get your new shipping address to receive your purchases online.</p>
                    </div>
                </div>
            </div>

            <div className="p-6 bg-white rounded-md shadow-md   w-[90%] ">
                <div className="flex flex-col gap-[20px]">
                    <div className="imgageContent">
                        <Image
                            width={56}
                            height={56}
                            alt='Icons'
                            src={'/assets/home/Shop.png'}
                            style={{ width: "56px", height: "56px" }}
                        />
                    </div>

                    <div className="gap-[16px] flex flex-col ">
                        <h3 className='font-bold text-xl'>2. Shop</h3>
                        <p className='text-base text-[#5A5A5A]'>Shop at your favorite online store and use your new local shipping address</p>
                    </div>
                </div>
            </div>
            <div className="p-6 bg-white rounded-md shadow-md w-[90%]  ">
                <div className="flex flex-col gap-[20px]">
                    <div className="imgageContent">
                        <Image
                            width={56}
                            height={56}
                            alt='Icons'
                            src={'/assets/home/Pickup.png'}
                            style={{ width: "56px", height: "56px" }}
                        />
                    </div>

                    <div className="gap-[16px] flex flex-col ">
                        <h3 className='font-bold text-xl'>3. Pick up or Receive</h3>
                        <p className='text-base text-[#5A5A5A]'>Pick up your purchases at your ShipLink Mailbox branch or Receive them at your door via our cross-border transfer service</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
