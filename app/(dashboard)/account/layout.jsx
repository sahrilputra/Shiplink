'use client'
import React from 'react';
import styles from './styles.module.scss';
import { MenusComponents } from './components/MenusComponents';
import { PersonIcons } from '@/components/icons/iconCollection';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';


export default function AccountLayout({ children }) {
    return (
        <div className={styles.container}>
            <div className={styles.menus}>
                <div className={styles.profiles}>
                    <Avatar className="w-[80px] h-[80px]">
                        <AvatarImage src="https://source.boringavatars.com/beam" />
                        <AvatarFallback>SP</AvatarFallback>
                    </Avatar>
                    <div className="info py-5 flex flex-col justify-center items-center gap-[5px]">
                        <div className=" flex flex-row gap-3 items-center text-sm">
                            <PersonIcons width={15} height={15} />
                            <p className='font-medium '>Name</p>
                        </div>
                        <div className=" flex flex-row gap-3 items-center text-sm">
                            <Image
                                src={'/assets/subscription/premium.svg'}
                                width={20}
                                height={20}
                                alt='Subscription'
                            />
                            <p className='font-medium '>Premium</p>
                        </div>
                    </div>
                </div>
                <div className="separat p-3">
                    <Separator className="py-[1px]" />
                </div>
                <MenusComponents />
            </div>

            <div className={styles.main}>
                {children}
            </div>
        </div>
    )
}
