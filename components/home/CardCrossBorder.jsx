import React from 'react'
import Image from 'next/image'
export const CardCrossBorder = () => {
    return (

        <div className="flex flex-col gap-10 justify-center items-center w-[100%] ">
            <div className="flex flex-col justify-center gap-5 p-5 w-[80%] rounded-md shadow-lg bg-white ">
                <div className="flex flex-row gap-5 items-center ">
                    <Image
                        src={'/assets/home/crossBorder/1.png'}
                        width={100}
                        height={100}
                        alt='Cross Border Image'
                        style={{ width: '50px', height: '50px', objectFit: 'cover', objectPosition: 'center' }}
                    />
                    <h4 className='font-bold text-xl text-black'>Register</h4>
                </div>
                <div className="text-[#5A5A5A]">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam asperiores quidem maxime aliquid officiis facilis. Error qui nesciunt cum earum fuga, cupiditate ab aperiam sequi, sapiente similique corrupti. Harum, hic?</p>
                </div>
            </div>
            <div className="flex flex-col gap-5 p-5 w-[80%] rounded-md shadow-lg bg-white ">
                <div className="flex flex-row gap-5 items-center">
                    <Image
                        src={'/assets/home/crossBorder/2.png'}
                        width={100}
                        height={100}
                        alt='Cross Border Image'
                        style={{ width: '50px', height: '50px', objectFit: 'cover', objectPosition: 'center' }}
                    />
                    <h4 className='font-bold text-xl text-black'>Shop</h4>
                </div>
                <div className="text-[#5A5A5A]">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam asperiores quidem maxime aliquid officiis facilis. Error qui nesciunt cum earum fuga, cupiditate ab aperiam sequi, sapiente similique corrupti. Harum, hic?</p>
                </div>
            </div>
            <div className="flex flex-col gap-5 p-5 w-[80%] rounded-md shadow-lg bg-white ">
                <div className="flex flex-row gap-5 items-center">
                    <Image
                        src={'/assets/home/crossBorder/3.png'}
                        width={100}
                        height={100}
                        alt='Cross Border Image'
                        style={{ width: '50px', height: '50px', objectFit: 'cover', objectPosition: 'center' }}
                    />
                    <h4 className='font-bold text-xl text-black'> Pick up or Receive</h4>
                </div>
                <div className="text-[#5A5A5A]">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam asperiores quidem maxime aliquid officiis facilis. Error qui nesciunt cum earum fuga, cupiditate ab aperiam sequi, sapiente similique corrupti. Harum, hic?</p>
                </div>
            </div>
        </div>
    )
}
