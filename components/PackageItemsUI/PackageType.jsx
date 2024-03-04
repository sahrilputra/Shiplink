import React from 'react'
import Image from 'next/image'

export const PackageType = ({ variant, notif }) => {

    return (
        <>
            <div className="w-[50px] h-[50px] p-2.5 bg-blue-900 rounded-md justify-center items-center gap-2.5 flex relative">

                {
                    notif && (
                        <div className="absolute top-[-7px] left-[-8px]">
                            <div className="bg-red-300/80 rounded-full w-5 h-5 relative flex items-center justify-center">
                                <div className="bg-red-700 rounded-full w-3 h-3" />
                            </div>
                        </div>
                    )
                }
                <div className="w-[30px] h-[30px] relative">
                    {
                        variant === 'Received' ? (
                            <Image
                                src={"/assets/incomingIcon.png"}
                                width={100}
                                height={100}
                                alt='mailbox icon'
                                className='object-contain p-1'
                            />
                        ) : variant === 'outgoing' ? (
                            <Image
                                src={"/assets/outgoing.png"}
                                width={100}
                                height={100}
                                alt='mailbox icon'
                                className='object-contain'
                            />
                        ) : variant === 'consolidate' ? (
                            <Image
                                src={"/assets/consolidateIcon.png"}
                                width={100}
                                height={100}
                                alt='mailbox icon'
                            />
                        ) : (
                            <Image
                                src={"/assets/incomingIcon.png"}
                                width={100}
                                height={100}
                                alt='mailbox icon'
                            />
                        )
                    }

                </div>
            </div>
        </>
    )
}
