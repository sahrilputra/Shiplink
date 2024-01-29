"use client"
import React from 'react';
import styles from './styles.module.scss'
import Image from 'next/image';
import { ProductsMenus } from './components/menus/ProductMenus';


export default function ConfigurationMenus({ children }) {

    return (
        <>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.configHeader}>
                        <div className={styles.banner}>
                            <div className={styles.icon}>
                                <Image
                                    src={"/backoffice/productManager-blue.png"}
                                    width={40}
                                    height={40}
                                    alt='config icon'
                                />
                            </div>
                            <div className={`${styles.title} flex flex-col`}>
                                <h1 className=" text-zinc-900 text-sm font-bold ">Product Manager</h1>
                            </div>
                        </div>

                        <div className={`${styles.menus}`}>
                            <ProductsMenus />
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
