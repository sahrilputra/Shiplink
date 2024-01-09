import React from 'react'
import { Sidebar } from '@/components/sidebar/sidebar'
import ItemsPackage from '@/components/items/itemsPackage'
import Image from 'next/image'
import styles from './styles.module.scss'
export default function dashboard() {
    return (
        <>

            <div className={styles.item_container}>
                <div className={styles.items}>
                    <ItemsPackage />
                    <ItemsPackage />
                    <ItemsPackage />
                </div>
            </div>

        </>
    )
}
