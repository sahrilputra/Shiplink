'use client'
import React, { useState } from 'react'
import styles from './styles.module.scss'
import { FilterIcons } from '@/components/icons/iconCollection'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/ui/searchBar'
import { Input } from '@/components/ui/input'
import { PARSForms } from './components/forms/PARSForms'
import { Separator } from '@/components/ui/separator'
import data from '../../../data/admin/PARSData.json'
import { PARSTable } from './components/ListTable/PARSTabled'
import { Checkbox } from '@/components/ui/checkbox'
import { EditSequences } from './components/dialog/EditSequences'
import { DeleteSequences } from './components/dialog/DeleteSequences'
export default function PARSPage() {

    const [deletOpen, setDeleteOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);


    const handleDelete = () => {
        setDeleteOpen(!deletOpen);
    }
    const handleEdit = () => {
        setEditOpen(!editOpen);
    }

    const handleDeleteClose = () => {
        setDeleteOpen(false);
    }


    return (
        <>
            <div className={styles.carrier}>
                <div className={`${styles.carrier__container} flex flex-row justify-between items-center w-[100%]`}>
                    <div className="flex flex-col gap-3 w-[100%]">
                       
                        <div className="px-2">
                            <PARSForms />
                        </div>
                    </div>
                </div>
                <div className="w-full py-5 px-2">
                    <Separator className="h-[3px]" />
                </div>
                <div className={`${styles.listTable} flex flex-col gap-1`}>
                    <PARSTable  handlerEdit={handleEdit} handlerDelete={handleDelete} />
                </div>
                <EditSequences open={editOpen} setOpen={setEditOpen} />
              
            </div>
        </>
    )
}
