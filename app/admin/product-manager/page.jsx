'use client'
import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'
// import { CarrierList } from './components/carrierList'
// import Image from 'next/image'
import { NewProductForms } from './components/Forms/ProductForms'
import { ReviewCard } from './components/ReviewCard'
import { ProductList } from './components/table/productList'
// import data from '../../../data/admin/productData.json'
import axios from 'axios'
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


    const [isSkeleton, setIsSkeleton] = useState(true)
    const [query, setQuery] = useState({
        keyword: '',
        page: 0,
        limit: 0,
        index: 0,
        category_id: ''
    })

    const [data, setData] = useState([])
    const [selctedData, setSelectedData] = useState(null)
    const [selectedID, setSelectedID] = useState("");
    console.log("🚀 ~ Configuration ~ selctedData:", selctedData)
    const fetchData = async () => {
        try {
            axios.post(`
            /api/admin/product/listProduct`,
                query
            ).then((response) => {
                console.log("🚀 ~ ).then ~ response:", response)
                setIsSkeleton(false)
                setData(response.data.products)
            })
        } catch (error) {
            console.log("🚀 ~ error:", error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [query])

    const reload = () => {
        setIsSkeleton(true)
        setQuery({
            keyword: '',
            page: 0,
            limit: 0,
            index: 0,
            category_id: ''
        })
    }

    const handleSearch = (e) => {
        console.log("🚀 ~ handleSearch ~ e:", e.target.value)
        e.preventDefault()
        setQuery({
            keyword: e.target.value
        })

        if (e.target.value === '') {
            setQuery({
                keyword: '',
                page: 0,
                limit: 0,
                index: 0,
                category_id: ''
            })
            fetchData()
        }
    }
    // console.log("🚀 ~ Configuration ~ formsData:", formsData)

    return (
        <>
            <div className="flex flex-row gap-2 w-full">
                <div className={`${styles.carrier} w-[70%]`}>
                    <div className={`${styles.listTable}  flex flex-col gap-1`}>
                        <h1 className=" text-sm font-bold">Product Details</h1>
                        <div className="px-[5px] py-[5px]">
                            <NewProductForms
                                setFormsData={setFormsData}
                                data={selctedData}
                                setSelectedData={setSelectedData}
                                reload={reload}
                            />
                        </div>
                    </div>
                </div>
                <div className={`${styles.carrier} w-[30%]`}>
                    <div className={`${styles.listTable}  flex flex-col gap-1`}>
                        <h1 className=" text-sm font-bold">Product Review</h1>
                        <div className="px-[5px] py-[5px]">
                            <ReviewCard
                                formsData={formsData}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${styles.carrier} w-full`}>
                <div className={`${styles.listTable}  flex flex-col gap-1`}>
                    <ProductList
                        handleSearch={handleSearch}
                        data={data}
                        isSkeleton={isSkeleton}
                        setSelectedData={setSelectedData}
                        reload={reload}
                        formDataId={selctedData}
                        selectedID={selectedID}
                        setSelectedID={setSelectedID}
                    />
                </div>
            </div>
        </>
    );
}
