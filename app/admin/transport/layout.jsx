"use client"
import React from 'react';
import styles from './styles.module.scss'
import Image from 'next/image';

import { TransportMenus } from './components/menus/TransportMenus';

export default function TransportLayout({ children }) {

    return (
        <>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.configHeader}>
                        <div className={styles.banner}>
                            <div className={styles.icon}>
                                <Image
                                    src={"/backoffice/transport-blue.png"}
                                    width={40}
                                    height={40}
                                    alt='config icon'
                                />
                            </div>
                            <div className={`${styles.title} flex flex-col`}>
                                <h1 className=" text-zinc-900 text-sm font-bold ">Transport Preparation</h1>
                                <p className=" text-blue-900 text-xs font-normal">Showing All Carriers</p>
                            </div>
                        </div>

                        <div className={`${styles.menus}`}>
                            <TransportMenus />
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
