import React from 'react'
import styles from './styles.module.scss'
import { Button } from '@/components/ui/button'
import { CardMembership } from './components/CardMembership'
export default function page() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.main}>
                    <h2 className='text-xl font-bold p-4 text-zinc-900 '>My Membership</h2>

                    <div className={`${styles.content} text-zinc-600`}>
                        <p className='text-2xl font-regular'>Your Status</p>
                        <h2 className='text-2xl font-bold'>Premium</h2>
                        <p className='text-md py-2'>Level 2 Discount Bonus</p>
                        <div className=" text-center">
                            <span className="text-zinc-600 text-lg font-normal  leading-snug">Your </span>
                            <span className="text-zinc-600 text-lg font-bold leading-snug">Premium</span>
                            <span className="text-zinc-600 text-lg font-normal leading-snug"> Membership will expired in 12 June 2023</span>
                        </div>
                        <div className="text-zinc-600 text-lg font-normal ">Get More benefit by upgrade your membership plans</div>
                        <div className="py-5">
                            <Button
                                variant="destructive"
                            >
                                <p className=' p-2 text-lg'>Upgrade</p>
                            </Button>
                        </div>
                    </div>
                </div>

                <div className={styles.membership}>
                    <div className="flex flex-row justify-between items-center gap-4">
                        <div className="right">
                            <CardMembership />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
