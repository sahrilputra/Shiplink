'use client'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'
import { UserForms } from './components/forms/UserForms'
import { MenusComponents } from './components/MenusComponents';
import { PersonIcons } from '@/components/icons/iconCollection';
import { Separator } from '@/components/ui/separator';
import { Edit } from 'lucide-react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
export default function Page() {
    const { data: session } = useSession()

    console.log("🚀 ~ Page ~ session:", session)

    return (
        <>
            <div className={styles.content}>
                <div className={styles.wrapperForm}>
                    <div className="forms w-full">
                        <UserForms data={session} />
                    </div>
                </div>
            </div>
        </>
    )
}
