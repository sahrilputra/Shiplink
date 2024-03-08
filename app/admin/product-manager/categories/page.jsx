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
                    <CategoryList selected={selected} setSelected={setSelected} />
                </div>
                <div className={" px-[15px] bg-white rounded border border-neutral-200"}>
                    {
                        selected === 'Product'
                            ? <ProductItemTable />
                            : <ServiceItemTable category_id={categoryId} />
                    }
                </div>
            </div>
        </>
    )
}

// <>

//     <div className="flex flex-row gap-2 w-full">
//         <div className={`${styles.carrier} w-full `}>
//             <div className="w justify-between flex flex-row">
//                 <SearchBar />
//                 <Button
//                     variant="destructive"
//                     className="px-3 "
//                     size="sm"
//                 >
//                     <p className='text-xs'>New Categories</p>
//                 </Button>
//             </div>
//         </div>
//     </div>
//     <div className={`${styles.carrier} w-full`}>
//         <div className={`${styles.listTable}  flex flex-col gap-1`}>
//             <CategoriesList />
//         </div>
//     </div>
// </>