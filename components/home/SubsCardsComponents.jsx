import { CardItems } from '@/app/(dashboard)/membership/components/CardItems'
import { SubsMenu } from '@/app/(dashboard)/membership/components/SubsMenu'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'

export const SubsCardsComponents = () => {
    return (
        <>

            <div className="flex flex-row gap-10 w-full h-full flex-wrap  justify-center">
                <div className="p-4 bg-white rounded-md shadow-2xl border flex-col justify-between items-center inline-flex">
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
                            type={'landing'}
                            title={'Personal Dashboard'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Your US ShipLink Address'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Your Canadian ShipLink Address'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'SLA to SLA Cross-Border Services'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Package Forwarding Services'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Self Pick-Up at ShipLink Terminals'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Consolidation Services'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Discounted Shipping Labels'}
                        />
                    </SubsMenu>
                    <Button variant="destructive" className='w-[100%] mt-6 py-[10px] px-5'>
                        Subscribe
                    </Button>
                </div>
                <div className="p-4 bg-white rounded-md shadow-2xl border flex-col justify-between items-center inline-flex">
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
                            type={'landing'}
                            title={'Personal Dashboard'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Your US ShipLink Address'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Your Canadian ShipLink Address'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'SLA to SLA Cross-Border Services'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Package Forwarding Services'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Self Pick-Up at ShipLink Terminals'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Consolidation Services'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Level 2 Discount Shipping Labels'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Pallet Reception'}
                        />
                    </SubsMenu>
                    <Button variant="destructive" className='w-[100%] mt-6 py-[10px] px-5'>
                        Subscribe
                    </Button>
                </div>
                <div className="p-4 bg-white rounded-md shadow-2xl border flex-col justify-between items-center inline-flex">
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
                            type={'landing'}
                            title={'Personal Dashboard'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Your US ShipLink Address'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Your Canadian ShipLink Address'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'SLA to SLA Cross-Border Services'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Package Forwarding Services'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Self Pick-Up at ShipLink Terminals'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Consolidation Services'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Level 3 Discount Shipping Labels'}
                        />
                        <CardItems
                            type={'landing'}
                            title={'Pallet Reception'}
                        />
                        <CardItems
                            type={'landing'}
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
