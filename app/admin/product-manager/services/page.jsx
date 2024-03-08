'use client'
import React, { useEffect, useState } from 'react'
import styles from '../styles.module.scss'
import { NewServicesForms } from './components/Forms/NewServicesForms'
import { ServicesCards } from './components/ServicesCard'
import { ServiceList } from './components/Table/ServiceList'
import axios from 'axios'
export default function ServicesPage() {
    const [formsData, setFormsData] = useState({
        service_id: '',
        item: '',
        description: '',
        price: '',
        category: '',
        category_id: '',
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
    console.log("🚀 ~ Configuration ~ selctedData:", selctedData)
    useEffect(() => {
        const fetchData = async () => {
            try {
                axios.post(`
                /api/admin/service/list`,
                    query
                ).then((response) => {
                    console.log("🚀 ~ ).then ~ response:", response)
                    setIsSkeleton(false)
                    setData(response.data.services)
                })
            } catch (error) {
                console.log("🚀 ~ error:", error)
            }
        }
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
    return (
        <>

            <div className="flex flex-row gap-2 w-full">
                <div className={`${styles.carrier} w-[70%]`}>
                    <div className={`${styles.listTable}  flex flex-col gap-1`}>
                        <h1 className=' text-sm font-bold'>Services Details</h1>
                        <div className="px-[5px] py-[10px]">
                            <NewServicesForms setFormsData={setFormsData} data={selctedData} reload={reload} />
                        </div>
                    </div>
                </div>
                <div className={`${styles.carrier} w-[30%]`}>
                    <div className={`${styles.listTable}  flex flex-col gap-1`}>
                        <h1 className=' text-sm font-bold'>Services Review</h1>
                        <div className="px-[5px] py-[5px]">
                            <ServicesCards formData={formsData} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${styles.carrier} w-full`}>
                <div className={`${styles.listTable}  flex flex-col gap-1`}>
                    <ServiceList data={data} isSkeleton={isSkeleton} reload={reload} setSelectedData={setSelectedData} />
                </div>
            </div>
        </>
    )
}
