'use client'
import React, { useState } from 'react'
import styles from './styles.module.scss'
// import { CarrierList } from './components/carrierList'
// import Image from 'next/image'
import { FilterIcons } from '@/components/icons/iconCollection'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/ui/searchBar'
import { Input } from '@/components/ui/input'
import { CustomerTable } from './components/table/CustomerTable'
import CreateNewCustomer from './components/dialog/CreateNewCustomer'
import data from '../../../data/admin/customerListData.json'
export default function CustomerPage() {

    const [open, setOpen] = React.useState(false);

    return (
        <>

            <div className={styles.carrier}>
                <CreateNewCustomer open={open} setOpen={setOpen} />
                <div className={`${styles.listTable} mt-[20px] flex flex-col gap-1`}>
                    <CustomerTable open={open} setOpen={setOpen} data={data} />
                </div>
            </div>

        </>
    )
}
