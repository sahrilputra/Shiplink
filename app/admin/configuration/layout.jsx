"use client"
import React from 'react';
import styles from './styles.module.scss'
import Image from 'next/image';

import { useRouter, usePathname } from 'next/navigation';


export default function ConfigurationMenus({ children }) {
    const router = usePathname();
    console.log(router)
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
                            <button className="w-[93px] h-[25px] px-2.5 flex-col justify-center items-center gap-1 inline-flex">
                                <div className="text-secondary text-sm font-medium font-['Poppins']">Carrier</div>
                            </button>
                            <button className="w-[93px] h-[25px] px-2.5 flex-col justify-center items-center gap-1 inline-flex">
                                <div className="text-secondary text-sm font-medium font-['Poppins']">Tax</div>
                            </button>
                            <button className="w-[93px] h-[25px] px-2.5 flex-col justify-center items-center gap-1 inline-flex">
                                <div className="text-secondary text-sm font-medium font-['Poppins']">Coutries</div>
                            </button>
                            <button className="w-[93px] h-[25px] px-2.5 flex-col justify-center items-center gap-1 inline-flex">
                                <div className="text-secondary text-sm font-medium font-['Poppins']">Province</div>
                            </button>
                            <button className="w-[93px] h-[25px] px-2.5 flex-col justify-center items-center gap-1 inline-flex">
                                <div className="text-secondary text-sm font-medium font-['Poppins']">Services</div>
                            </button>

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
