"use client"
import React from 'react';
import styles from './styles.module.scss'
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ConfigMenus } from './components/ConfigMenus';


export default function ConfigurationMenus({ children }) {
    const router = usePathname();
    const [subTitle, setSubTitle] = React.useState('')
    React.useEffect(() => {
        if (router === "/admin/configuration") {
            setSubTitle('Showing All Carriers')
        } else if (router === "/admin/configuration/tax") {
            setSubTitle('Manage Tax')
        } else if (router === "/admin/configuration/countries") {
            setSubTitle('Manage Countries')
        } else if (router === "/admin/configuration/province") {
            setSubTitle('Manage and Config Province ')
        } else if (router === "/admin/configuration/services") {
            setSubTitle('Manage Services')
        } else if (router === "/admin/configuration/payments") {
            setSubTitle('Config Payment')
        }
    }, [router])

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
                                <h1 className=" text-zinc-900 text-sm font-bold ">Configuration</h1>
                                <p className=" text-blue-900 text-xs font-normal">{subTitle}</p>
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
