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
    const [categoryId, setCategoryId] = useState("C0-002")
    const [categoryName, setCategoryName] = useState("");
    return (
        <>
            <div className={styles.container}>
                <div className={styles.category}>
                    <CategoryList
                        selected={selected}
                        setSelected={setSelected}
                        setItemID={setCategoryId}
                        itemID={categoryId}
                        setCategoryName={setCategoryName}
                    />
                </div>
                <div
                    className={" px-[15px] bg-white rounded border border-neutral-200"}
                >
                    {
                        selected === "Product" ? (
                            <ProductItemTable
                                categoryName={categoryName}
                                category_id={categoryId}
                            />
                        ) : (
                            <ServiceItemTable
                                categoryName={categoryName}
                                category_id={categoryId}
                            />
                        )
                    }
                </div>
            </div>
        </>
    );
}