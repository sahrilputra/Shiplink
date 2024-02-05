'use client'
import React, { useState } from 'react'
import styles from '../styles.module.scss'
// import { CarrierList } from './components/carrierList'
// import Image from 'next/image'
import { FilterIcons } from '@/components/icons/iconCollection'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/ui/searchBar'
import { Input } from '@/components/ui/input'
import { ReviewCard } from '../components/ReviewCard' 
import data from '../../../../data/admin/productData.json'
import { ProductListData } from '../components/table/productList'
import { NewServicesForms } from './components/Forms/NewServicesForms'
import { ServicesCards } from './components/ServicesCard'
export default function ServicesPage() {
    return (
        <>

            <div className="flex flex-row gap-2 w-full">
                <div className={`${styles.carrier} w-[70%]`}>
                    <div className={`${styles.listTable}  flex flex-col gap-1`}>
                        <h1 className=' text-sm font-bold'>Services Details</h1>
                        <div className="px-[5px] py-[10px]">
                            <NewServicesForms />
                        </div>
                    </div>
                </div>
                <div className={`${styles.carrier} w-[30%]`}>
                    <div className={`${styles.listTable}  flex flex-col gap-1`}>
                        <h1 className=' text-sm font-bold'>Services Review</h1>
                        <div className="px-[5px] py-[5px]">
                            <ServicesCards />
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${styles.carrier} w-full`}>
                <div className={`${styles.listTable}  flex flex-col gap-1`}>
                    <ProductListData data={data} />
                </div>
            </div>
        </>
    )
}
