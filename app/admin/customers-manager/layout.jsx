"use client"
import React, { useState } from 'react';
import styles from './styles.module.scss'
import Image from 'next/image';
import { NextRouter } from 'next/router';
import { CustomerManagerMenus } from './components/menus/CustomerMenus';
import { Params } from './components/params';
export default function CustomerLayout({ children }) {
    const [show, setShow] = useState(false)
    return (
        <>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={`${show === "true" ? styles.configHeader  : styles.banerHeight} `} >
                        <div className={styles.banner}>
                            <div className={styles.icon}>
                                <Image
                                    src={"/backoffice/customer-blue.png"}
                                    width={40}
                                    height={40}
                                    alt='config icon'
                                />
                            </div>
                            <div className={`${styles.title} flex flex-col`}>
                                <h1 className=" text-zinc-900 text-sm font-semibold ">Customer Management</h1>
                                <Params setShow={setShow} />
                            </div>
                        </div>
                        <div className={`${styles.menus}`}>
                            {
                                show === "true" ? (
                                    <CustomerManagerMenus />
                                ) : (
                                    null
                                )
                            }
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
