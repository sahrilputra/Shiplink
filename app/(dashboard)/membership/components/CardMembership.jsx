import React from 'react'
import { CheckIcon } from 'lucide-react'
import { CardItems } from './CardItems'
import { SubsMenu } from './SubsMenu'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
export const CardMembership = () => {
    return (
        <>
            <div className="flex flex-row gap-2 w-full h-full flex-wrap  justify-center">
                <div className="p-3  bg-white rounded-lg shadow-md border border-zinc-600 border-opacity-60 flex-col justify-between items-center inline-flex">
                    <SubsMenu
                        title={"Free"}
                        price={"$0"}
                        icon={<Image
                            src={'/assets/subscription/free.svg'}
                            width={25}
                            height={25}
                            alt='free'
                        />}
                    >
                        <CardItems
                            title={'Personal Dashboard'}
                        />
                        <CardItems
                            title={'Your US ShipLink Address'}
                        />
                        <CardItems
                            title={'Your Canadian ShipLink Address'}
                        />
                        <CardItems
                            title={'SLA to SLA Cross-Border Services'}
                        />
                        <CardItems
                            title={'Package Forwarding Services'}
                        />
                        <CardItems
                            title={'Self Pick-Up at ShipLink Terminals'}
                        />
                        <CardItems
                            title={'Consolidation Services'}
                        />
                        <CardItems
                            title={'Discounted Shipping Labels'}
                        />
                    </SubsMenu>
                    <Button variant="destructive" className='w-[100%] mt-6 py-[10px] px-5'>
                        Subscribe
                    </Button>
                </div>

                <div className="p-3  bg-white rounded-lg shadow-md border border-zinc-600 border-opacity-60 flex-col justify-between items-center inline-flex">
                    <SubsMenu
                        month={"/month"}
                        title={"Premium"}
                        price={"$9.99"}
                        icon={<Image
                            src={'/assets/subscription/premium.svg'}
                            width={25}
                            height={25}
                            alt='free'
                        />}
                    >
                        <CardItems
                            title={'Personal Dashboard'}
                        />
                        <CardItems
                            title={'Your US ShipLink Address'}
                        />
                        <CardItems
                            title={'Your Canadian ShipLink Address'}
                        />
                        <CardItems
                            title={'SLA to SLA Cross-Border Services'}
                        />
                        <CardItems
                            title={'Package Forwarding Services'}
                        />
                        <CardItems
                            title={'Self Pick-Up at ShipLink Terminals'}
                        />
                        <CardItems
                            title={'Consolidation Services'}
                        />
                        <CardItems
                            title={'Level 2 Discount Shipping Labels'}
                        />
                        <CardItems
                            title={'Pallet Reception'}
                        />
                    </SubsMenu>
                    <Button variant="destructive" className='w-[100%] mt-6 py-[10px] px-5'>
                        Subscribe
                    </Button>
                </div>

                <div className="p-3  bg-white rounded-lg shadow-md border border-zinc-600 border-opacity-60 flex-col justify-between items-center inline-flex">
                    <SubsMenu
                        month={"/month"}
                        title={"Business"}
                        price={"$99.99"}
                        icon={<Image
                            src={'/assets/subscription/business.svg'}
                            width={25}
                            height={25}
                            alt='free'
                        />}
                    >
                        <CardItems
                            title={'Personal Dashboard'}
                        />
                        <CardItems
                            title={'Your US ShipLink Address'}
                        />
                        <CardItems
                            title={'Your Canadian ShipLink Address'}
                        />
                        <CardItems
                            title={'SLA to SLA Cross-Border Services'}
                        />
                        <CardItems
                            title={'Package Forwarding Services'}
                        />
                        <CardItems
                            title={'Self Pick-Up at ShipLink Terminals'}
                        />
                        <CardItems
                            title={'Consolidation Services'}
                        />
                        <CardItems
                            title={'Level 3 Discount Shipping Labels'}
                        />
                        <CardItems
                            title={'Pallet Reception'}
                        />
                        <CardItems
                            title={'Account Manager'}
                        />
                    </SubsMenu>
                    <Button variant="destructive" className='w-[100%] mt-6 py-[10px] px-5'>
                        Subscribe
                    </Button>
                </div>

            </div>
        </>
    )
}
