import Image from 'next/image'
import React from 'react'

export const TableMembership = ({ plans }) => {
    console.log("🚀 ~ MembershipTag ~ plans:", plans)

    const plan = plans.toLowerCase()
    return (
        <>
            {
                plan === 'free' ? (
                    <div className="bg-green-50 border border-green-200 rounded-sm text-xs flex flex-row gap-2 px-2 py-0.5 items-center">
                        <Image
                            src={'/assets/subscription/free.svg'}
                            width={15}
                            height={15}
                            alt='Subscription'
                        />
                        <p className='font-medium textxs'>{plans}</p>
                    </div>
                ) : plan === 'premium' ? (
                    <div className="bg-green-50 border border-green-200 rounded-sm text-xs flex flex-row gap-2 px-2 py-0.5 items-center">
                        <Image
                            src={'/assets/subscription/premium.svg'}
                            width={15}
                            height={15}
                            alt='Subscription'
                        />
                        <p className='font-medium'>{plans}</p>
                    </div>
                ) : plan === 'personal' || plan === 'Personal' ? (
                    <div className="bg-blue-50 border border-blue-200 rounded-sm text-xs flex flex-row gap-2 px-2 py-0.5 items-center">
                        <Image
                            src={'/assets/subscription/premium.svg'}
                            width={15}
                            height={15}
                            alt='Subscription'
                        />
                        <p className='font-medium'>{plans}</p>
                    </div>
                ) : plan === 'business' ? (
                    <div className="bg-red-50 border border-red-200 rounded-sm text-xs flex flex-row gap-2 px-2 py-0.5 items-center">
                        <Image
                            src={'/assets/subscription/business.svg'}
                            width={15}
                            height={15}
                            alt='Subscription'
                        />
                        <p className='font-medium'>{plans}</p>
                    </div>
                ) : (
                    <div className="bg-green-50 border border-green-200 rounded-sm text-xs flex flex-row gap-2 px-2 py-0.5 items-center">
                        <Image
                            src={'/assets/subscription/free.svg'}
                            width={15}
                            height={15}
                            alt='Subscription'
                        />
                        <p className='font-medium'>Free</p>
                    </div>
                )
            }

        </>
    )
}
