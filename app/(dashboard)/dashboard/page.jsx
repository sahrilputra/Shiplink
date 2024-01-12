'use client'
import React, { useState } from 'react'
import ItemsPackage from '@/components/items/itemsPackage'
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
