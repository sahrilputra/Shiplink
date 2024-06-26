'use client'
import React, { useState } from 'react'
import styles from './styles.module.scss'
import { FilterIcons } from '@/components/icons/iconCollection'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/ui/searchBar'
import { Input } from '@/components/ui/input'
import data from '../../../data/admin/userListData.json'
import { UserTable } from './components/table/UserTable'

export default function PermissionPage() {

    const [open, setOpen] = React.useState(false);

    return (
        <>

            <div className={styles.carrier}>
                <UserTable data={data} />
            </div>

        </>
    )
}
