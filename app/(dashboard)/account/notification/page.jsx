'use client'
import React, { useState } from 'react'
import styles from '../styles.module.scss'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { NotifTable } from '../components/notifTable/NotifTable'
export default function page() {

    return (
        <>
            <div className={styles.content}>
                <div className="header p-5 flex flex-col gap-2">
                    <h1 className='text-zinc-900 text-xl font-semiBold'>Notification Settings</h1>
                    <div className=" text-zinc-600 text-md font-normal px-2">Shape your parcel alerts, your way. Opt for emails, dashboard updates, both, or none – the choice is yours. Uncover the essence of notifications that tell your parcels tale. Welcome to a realm where alerts meet artistry. Your parcel, your rules.</div>
                </div>

                <div className="tableWrapper w-[90%] mx-auto">
                    <NotifTable className="w-[80%]" />
                </div>

            </div>
        </>
    )
}
