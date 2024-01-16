import React from 'react'
import styles from './styles.module.scss'
import { Button } from '../ui/button'
export const AdTop = () => {
    return (
        <>
            <div className={`${styles.adTop} w-[378px] min-w-full h-full  bg-white rounded-md flex items-center justify-center`}>
                <div className="flex-col justify-start items-center gap-px inline-flex ">
                    <div className="text-zinc-600 text-lg font-normal ">Your Status</div>
                    <div className="text-zinc-900 text-[26px] font-semibold">Premium</div>
                    <div className="text-stone-900 text-lg font-normal ">Level 2 Discount Bonus</div>
                    <Button
                        className="px-10 py-2.5"
                        variant="destructive"
                        size="sm"
                    >
                        <div className="text-white font-medium">Upgrade</div>
                    </Button>
                </div>
            </div>
        </>
    )
}
