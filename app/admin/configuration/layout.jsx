"use client"
import React from 'react';
import styles from './styles.module.scss'
import Image from 'next/image';

import { ConfigMenus } from './components/ConfigMenus';


export default function ConfigurationMenus({ children }) {
    
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
                                <h1 className=" text-zinc-900 text-sm font-semibold font-['Poppins']">Configuration</h1>
                                <p className=" text-secondary text-xs font-normal font-['Poppins']">Showing All Carriers</p>
                            </div>
                        </div>

                        <div className={`${styles.menus}`}>
                            <ConfigMenus />
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
