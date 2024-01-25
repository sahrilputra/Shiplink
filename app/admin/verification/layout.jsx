"use client"
import React from 'react';
import styles from './styles.module.scss'
import Image from 'next/image';

import { VerificationMenus } from './components/menus/VerificationMenus';


export default function VerificationLayout({ children }) {

    return (
        <>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.configHeader}>
                        <div className={styles.banner}>
                            <div className={styles.icon}>
                                <Image
                                    src={"/backoffice/config-blue.png"}
                                    width={40}
                                    height={40}
                                    alt='config icon'
                                />
                            </div>
                            <div className={`${styles.title} flex flex-col`}>
                                <h1 className=" text-zinc-900 text-sm font-bold ">Verification</h1>
                                <p className=" text-blue-900 text-xs font-normal">Showing All Carriers</p>
                            </div>
                        </div>

                        <div className={`${styles.menus}`}>
                            <VerificationMenus />
                        </div>
                    </div>

                    <div className={styles.childContent}>
                        {children}
                    </div>
                </div>
            </div>

        </>
    )
}
