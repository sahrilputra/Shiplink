'use client'
import React, { useState } from 'react'
import styles from '../styles.module.scss'
import { FilterIcons } from '@/components/icons/iconCollection'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/ui/searchBar'
import { Input } from '@/components/ui/input'
import { CategoriesList } from '../components/DndList/CategoriesList'
export default function ProductCategoriesPage() {

    return (
        <>

            <div className="flex flex-row gap-2 w-full">
                <div className={`${styles.carrier} w-full `}>
                    <div className="w justify-between flex flex-row">
                        <SearchBar />
                        <Button
                            variant="destructive"
                            className="px-3 "
                            size="sm"
                        >
                            <p className='text-xs'>New Categories</p>
                        </Button>
                    </div>
                </div>
            </div>
            <div className={`${styles.carrier} w-full`}>
                <div className={`${styles.listTable}  flex flex-col gap-1`}>
                    <CategoriesList />
                </div>
            </div>
        </>
    )
}
