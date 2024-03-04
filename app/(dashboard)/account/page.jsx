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
                
                    <div className="forms w-full">
                        <UserForms />
                    </div>
                </div>
            </div>
        </>
    )
}
