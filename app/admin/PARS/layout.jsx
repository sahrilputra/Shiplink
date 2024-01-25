"use client"
import React from 'react';
import styles from './styles.module.scss'
import Image from 'next/image';

import { ParsMenus } from './components/ConfigMenus';


export default function PARSManagementMenus({ children }) {

    return (
        <>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.configHeader}>
                        <div className={styles.banner}>
                            <div className={styles.icon}>
                                <Image
                                    src={"/backoffice/PARS-blue.png"}
                                    width={40}
                                    height={40}
                                    alt='config icon'
                                />
                            </div>
                            <div className={`${styles.title} flex flex-col`}>
                                <h1 className=" text-zinc-900 text-sm font-bold ">PARS Management</h1>
                            </div>
                        </div>

                        <div className={`${styles.menus}`}>
                            <ParsMenus />
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
