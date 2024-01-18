'use client'
import React, { useState } from 'react'
import styles from './styles.module.scss'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'
import { UserForms } from './components/forms/UserForms'
import { Edit } from 'lucide-react'
export default function page() {

    return (
        <>
            <div className={styles.content}>
                <div className={styles.wrapperForm}>
                    <div className="Image w-full flex justify-center py-[20px]">
                        <div className="relative">
                            <Avatar className="w-[80px] h-[80px]">
                                <AvatarImage src="https://source.boringavatars.com/beam" />
                                <AvatarFallback>SP</AvatarFallback>
                            </Avatar>
                            <div className="absolute p-2 rounded-full bg-slate-100 border border-myBlue text-myBlue bottom-0 right-0">
                                <Edit width={15} height={15} />
                            </div>
                        </div>
                    </div>

                    <div className="forms w-full">
                        <UserForms />
                    </div>
                </div>
            </div>
        </>
    )
}
