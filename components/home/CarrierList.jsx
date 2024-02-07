import React from 'react'
import Image from 'next/image'

export const CarrierList = () => {
    return (
        <>
            <div className="flex flex-row gap-10 justify-between w-full flex-wrap">
                <div className="h-[60px] flex items-center">
                    <Image
                        src={'/assets/home/carrier/1.png'}
                        width={200}
                        height={200}
                        alt='carrier'
                        style={{ width: "155px", height: "56px", objectFit: 'contai' }}
                    />
                </div>
                <div className="h-[60px] flex items-center">
                    <Image
                        src={'/assets/home/carrier/3.png'}
                        width={200}
                        height={200}
                        alt='carrier'
                        style={{ width: "251px", height: "34px", objectFit: 'contai' }}
                    />
                </div>
                <div className="h-[60px] flex items-center">
                    <Image
                        src={'/assets/home/carrier/2.png'}
                        width={200}
                        height={200}
                        alt='carrier'
                        style={{ width: "203px", height: "32px", objectFit: 'contai' }}
                    />
                </div>
                <div className="h-[60px] flex items-center">
                    <Image
                        src={'/assets/home/carrier/4.png'}
                        width={200}
                        height={200}
                        alt='carrier'
                        style={{ width: "169px", height: "56px", objectFit: 'contai' }}
                    />
                </div>
                <div className="h-[60px] flex items-center">
                    <Image
                        src={'/assets/home/carrier/5.png'}
                        width={200}
                        height={200}
                        alt='carrier'
                        style={{ width: "231px", height: "38px", objectFit: 'contai' }}
                    />
                </div>
                <div className="h-[60px] flex items-center">
                    <Image
                        src={'/assets/home/carrier/6.png'}
                        width={200}
                        height={200}
                        alt='carrier'
                        style={{ width: "55px", height: "56px", objectFit: 'contai' }}
                    />
                </div>
            </div>

        </>
    )
}
