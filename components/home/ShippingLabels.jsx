import React from 'react'
import Image from 'next/image'
export const ShippingLabels = () => {
    return (
        <>
            <div className="flex flex-col gap-16 items-center justify-start">
                <div className="flex flex-row gap-5 bg-white border border-zinc-300 w-[90%] p-10 rounded-md">
                    <Image
                        src={"/assets/home/labels/img1.png"}
                        alt='image 1'
                        width={300}
                        height={240}
                        style={{ width: '300px', height: '240px' }}
                    />

                    <div className="flex flex-col gap-5">
                        <Image
                            src={"/assets/home/labels/icon/1.png"}
                            alt='icon 1'
                            width={40}
                            height={40}
                            style={{ width: '40px', height: '40px' }}
                        />

                        <div className="flex flex-col gap-3">
                            <p className='font-bold text-xl text-black'>Get an Instant Quote</p>
                            <p className='text-base font-[#5A5A5A] '>Lorem ipsum dolor sit amet consectetur. Massa non lectus dictumst consequat massa molestie ipsum mauris. Id arcu dolor integer et ultrices. Enim ipsum ridiculus a a. Metus adipiscing purus scelerisque tortor tempor pretium turpis rhoncus.</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-5 bg-white border border-zinc-300 w-[90%] p-10 rounded-md">
                    <div className="flex flex-col gap-5">
                        <Image
                            src={"/assets/home/labels/icon/2.png"}
                            alt='icon 1'
                            width={40}
                            height={40}
                            style={{ width: '40px', height: '40px' }}
                        />

                        <div className="flex flex-col gap-3">
                            <p className='font-bold text-xl text-black'>Select Service and Carrier</p>
                            <p className='text-base font-[#5A5A5A] '>Lorem ipsum dolor sit amet consectetur. Massa non lectus dictumst consequat massa molestie ipsum mauris. Id arcu dolor integer et ultrices. Enim ipsum ridiculus a a. Metus adipiscing purus scelerisque tortor tempor pretium turpis rhoncus.</p>
                        </div>
                    </div>
                    <Image
                        src={"/assets/home/labels/img2.png"}
                        alt='image 1'
                        width={300}
                        height={240}
                        style={{ width: '300px', height: '240px' }}
                    />
                </div>
                <div className="flex flex-row gap-5 bg-white border border-zinc-300 w-[90%] p-10 rounded-md">
                    <Image
                        src={"/assets/home/labels/img3.png"}
                        alt='image 1'
                        width={300}
                        height={240}
                        style={{ width: '300px', height: '240px' }}
                    />
                    <div className="flex flex-col gap-5">
                        <Image
                            src={"/assets/home/labels/icon/3.png"}
                            alt='icon 1'
                            width={40}
                            height={40}
                            style={{ width: '40px', height: '40px' }}
                        />

                        <div className="flex flex-col gap-3">
                            <p className='font-bold text-xl text-black'>Print Label, Stick it On, and Ship</p>
                            <p className='text-base font-[#5A5A5A] '>Lorem ipsum dolor sit amet consectetur. Massa non lectus dictumst consequat massa molestie ipsum mauris. Id arcu dolor integer et ultrices. Enim ipsum ridiculus a a. Metus adipiscing purus scelerisque tortor tempor pretium turpis rhoncus.</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-5 bg-white border border-zinc-300 w-[90%] p-10 rounded-md">
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-3">
                            <Image
                                src={"/assets/home/labels/icon/4.png"}
                                alt='icon 1'
                                width={40}
                                height={40}
                                style={{ width: '40px', height: '40px' }}
                            />
                            <p className='font-bold text-xl text-black'>Track it</p>
                            <p className='text-base font-[#5A5A5A] '>Lorem ipsum dolor sit amet consectetur. Massa non lectus dictumst consequat massa molestie ipsum mauris. Id arcu dolor integer et ultrices. Enim ipsum ridiculus a a. Metus adipiscing purus scelerisque tortor tempor pretium turpis rhoncus.</p>
                        </div>

                    </div>
                    <Image
                        src={"/assets/home/labels/img4.png"}
                        alt='image 1'
                        width={300}
                        height={240}
                        style={{ width: '300px', height: '240px' }}
                    />
                </div>
            </div>
        </>
    )
}
