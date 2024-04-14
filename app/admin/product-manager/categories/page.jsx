'use client'
import React, { useState } from 'react'
import styles from './styles.module.scss'
import { FilterIcons } from '@/components/icons/iconCollection'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/ui/searchBar'
import { Input } from '@/components/ui/input'
import { CategoryList } from './components/CategoryList'
import { ProductItemTable } from './components/Tabled/ProductItemTable'
import { ServiceItemTable } from './components/Tabled/ServiceItemTable'
export default function ProductCategoriesPage() {
    const [selected, setSelected] = useState("Product")
    const [categoryId, setCategoryId] = useState("")
    return (
        <>
            <div className={styles.container}>
                <div className={styles.category}>
                    <CategoryList
                        selected={selected}
                        setSelected={setSelected}
                        setItemID={setCategoryId}
                        itemID={categoryId}
                    />
                </div>
                <div
                    className={" px-[15px] bg-white rounded border border-neutral-200"}
                >
                    {
                        selected === "Product" ? (
                            <ProductItemTable category_id={categoryId} />
                        ) : (
                            <ServiceItemTable category_id={categoryId} />
                        )
                    }
                </div>
            </div>
        </>
    );
}