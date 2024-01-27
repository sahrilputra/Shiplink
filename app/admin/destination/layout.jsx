"use client"
import React from 'react';
import styles from './styles.module.scss'
import Image from 'next/image';


export default function DestinationLayouts({ children }) {

    return (
        <>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.configHeader}>
                        <div className={styles.banner}>
                            <div className={styles.icon}>
                                <Image
                                    src={"/backoffice/destination-blue.png"}
                                    width={40}
                                    height={40}
                                    alt='Destination icon'
                                />
                            </div>
                            <div className={`${styles.title} flex flex-col`}>
                                <h1 className=" text-zinc-900 text-sm font-bold ">Destination Scan</h1>
                                <p className=" text-blue-900 text-sm font-light ">15 Lots</p>
                            </div>
                        </div>

                        <div className={`${styles.menus}`}>
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
