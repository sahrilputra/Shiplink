'use client'
import React, { useState } from 'react'
import styles from './styles.module.scss'
// import { CarrierList } from './components/carrierList'
// import Image from 'next/image'
import { FilterIcons } from '@/components/icons/iconCollection'
import { Button } from '@/components/ui/button'
import { SearchBar } from '@/components/ui/searchBar'
import { NewProductForms } from './components/Forms/ProductForms'
import { Input } from '@/components/ui/input'
import { ReviewCard } from './components/ReviewCard'
import { ProductListData } from './components/table/productList'
import data from '../../../data/admin/productData.json'
export default function Configuration() {
    const [choosenImage, setChoosenImage] = useState('');
    const [formsData, setFormsData] = useState({
        productID: '',
        item: '',
        brand: '',
        model: '',
        description: '',
        price: '',
        category: '',
        image: '',
    })

    // console.log("🚀 ~ Configuration ~ formsData:", formsData)

    return (
        <>

            <div className="flex flex-row gap-2 w-full">
                <div className={`${styles.carrier} w-[70%]`}>
                    <div className={`${styles.listTable}  flex flex-col gap-1`}>
                        <h1 className=' text-sm font-bold'>Product Details</h1>
                        <div className="px-[5px] py-[5px]">
                            <NewProductForms setFormsData={setFormsData} />
                        </div>
                    </div>
                </div>
                <div className={`${styles.carrier} w-[30%]`}>
                    <div className={`${styles.listTable}  flex flex-col gap-1`}>
                        <h1 className=' text-sm font-bold'>Product Review</h1>
                        <div className="px-[5px] py-[5px]">
                            <ReviewCard formsData={formsData} />
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
