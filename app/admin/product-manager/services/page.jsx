'use client'
import React, { useEffect, useState } from 'react'
import styles from '../styles.module.scss'
import { NewServicesForms } from './components/Forms/NewServicesForms'
import { ServicesCards } from './components/ServicesCard'
import { ServiceList } from './components/Table/ServiceList'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
export default function ServicesPage() {
    const searchParams = useSearchParams()
    const service_id = searchParams.get('service_id') || ""
    console.log("🚀 ~ ServicesPage ~ service_id:", service_id)



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
        category_id: '',
        page: 1,
        limit: 10,
        index: 0,
    })

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const [rowTotalData, setRowTotalData] = useState({
        page_limit: 0,
        page_total: 0,
        total: 0
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
                    setData(response.data.services)
                    const data = response.data
                    setRowTotalData({
                        page_limit: data.page_limit,
                        page_total: data.page_total,
                        total: data.total
                    });
                    setPagination(prevPagination => ({
                        ...prevPagination,
                        pageSize: data.page_limit, // Menyesuaikan pageSize dengan nilai page_limit dari data
                    }));
                    setIsSkeleton(false)
                })
            } catch (error) {
                console.log("🚀 ~ error:", error)
            }
        }
        fetchData()
    }, [query])

    useEffect(() => {
        if (service_id !== "") {
            const findData = data.find((item) => item.service_id === service_id)
            console.log("🚀 ~ useEffect ~ findData", findData)
            setSelectedData(findData)
            // setFormsData({
            //     service_id: findData.service_id,
            //     item: findData.item,
            //     description: findData.description,
            //     price: findData.price,
            //     category: findData.category,
            //     category_id: findData.category_id,
            // })
        }
    }, [service_id, data])
    const handlerPaginationChange = (page) => {
        if (page >= 0) {
            console.log("🚀 ~ handlerPaginationChange ~ page:", page);
            setPagination(prevPagination => ({
                ...prevPagination,
                pageIndex: page,
            }));
            setQuery(prevQuery => ({
                ...prevQuery,
                page: page,
                index: page * prevQuery.limit
            }));
        }
    };
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

    const [selectedID, setSelectedID] = useState('')
    return (
        <>
            <div className="flex flex-row gap-2 w-full">
                <div className={`${styles.carrier} w-[70%]`}>
                    <div className={`${styles.listTable}  flex flex-col gap-1`}>
                        <h1 className=" text-sm font-bold">Services Details</h1>
                        <div className="px-[5px] py-[10px]">
                            <NewServicesForms
                                setFormsData={setFormsData}
                                data={selctedData}
                                reload={reload}
                            />
                        </div>
                    </div>
                </div>
                <div className={`${styles.carrier} w-[30%]`}>
                    <div className={`${styles.listTable}  flex flex-col gap-1`}>
                        <h1 className=" text-sm font-bold">Services Review</h1>
                        <div className="px-[5px] py-[5px]">
                            <ServicesCards formData={formsData} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${styles.carrier} w-full`}>
                <div className={`${styles.listTable}  flex flex-col gap-1`}>
                    <ServiceList
                        data={data}
                        isSkeleton={isSkeleton}
                        reload={reload}
                        setSelectedData={setSelectedData}
                        pagination={pagination}
                        setPagination={setPagination}
                        handlerPaginationChange={handlerPaginationChange}
                        rowTotalData={rowTotalData}
                        setRowTotalData={setRowTotalData}
                        query={query}
                        selectedID={selectedID}
                        setSelectedID={setSelectedID}
                    />
                </div>
            </div>
        </>
    );
}
