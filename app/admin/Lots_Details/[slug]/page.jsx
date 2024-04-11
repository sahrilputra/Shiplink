'use client'
import React, { useEffect, useState } from 'react'
import styles from '../styles.module.scss'
import axios from 'axios'
import { LotsDetailsTable } from '../../transport/components/TransportTabled/LotsDetailsTable'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import NextLink from 'next/link'
export default function LotsDetails({ params }) {
    const [isSkeleton, setIsSkeleton] = useState(true);
    const [open, setOpen] = useState(false);
    const [lotsData, setLotsData] = useState([]);
    console.log("🚀 ~ LotsDetails ~ lotsData:", lotsData)
    const lostId = params.slug
    const [query, setQuery] = useState({
        keyword: "",
        date_start: "",
        date_end: "",
        tracking_id: "",
        lots_id: params.slug,
        status: "",
        page: 1,
        limit: 10,
        index: 0,
    });

    const [lotsQuery, setLotsQuery] = useState({
        keyword: "",
        date_start: "",
        date_end: "",
        lots_id: lostId,
        status: "",
        destination: "",
        page: 0,
        limit: 0,
        index: 0
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

    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.post(
                `/api/admin/transport/lots/details`,
                query
            );
            console.log(response)
            const data = await response.data;
            setData(data.package_info);
            setRowTotalData({
                page_limit: data.page_limit,
                page_total: data.page_total,
                total: data.total
            });
            setPagination(prevPagination => ({
                ...prevPagination,
                pageSize: data.page_limit, // Menyesuaikan pageSize dengan nilai page_limit dari data
            }));
            setIsSkeleton(false);
        } catch (error) {
            setIsSkeleton(false);
            console.log('Error:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [query]);

    useEffect(() => {
        const fetchLotsDetails = async () => {
            try {
                const response = await axios.post(
                    `/api/admin/transport/lots/list`,
                    lotsQuery
                );
                const data = await response.data;
                const filteredData = data.lots.filter(lot => lot.lots_id === lostId);
                setLotsData(filteredData[0]);
                console.log(data)
            } catch (error) {
                console.log('Error:', error);
            }
        }

        fetchLotsDetails();
    }, [lotsQuery, lostId])

    const reload = () => {
        setIsSkeleton(true);
        fetchData();
    }
    const handleSearchChange = (event) => {
        setQuery({
            ...query,
            keyword: event.target.value
        });
    };
    return (
        <>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.configHeader}>
                        <div className={styles.banner}>
                            {/* <div className={styles.icon}>
                                <Image
                                    src={"/backoffice/transport-blue.png"}
                                    width={40}
                                    height={40}
                                    alt='config icon'
                                />
                            </div> */}
                            <div className="flex flex-row justify-between w-full">
                                <div className={`${styles.title} flex flex-col`}>
                                    <h1 className=" text-zinc-900 text-sm font-bold ">
                                        Lot ID : {lotsData?.lots_id}
                                    </h1>
                                    <div className="text-blue-900 text-xs font-normal">
                                        <p>
                                            Origin : {lotsData?.warehouse_origin_name} WH -{" "}
                                            {lotsData?.country_name}
                                        </p>
                                        <p>
                                            Destination : {lotsData?.warehouse_destination_name} WH
                                            - {lotsData?.destination_name}
                                        </p>
                                        <div className="flex flex-row gap-3 pt-2">
                                            <div className="">
                                                <p>Status : {lotsData?.status}</p>
                                                <p>Pickup Schedule : {lotsData?.pickup_schedule}</p>
                                            </div>
                                            <div className="w-[5px]">
                                                <Separator
                                                    orientation="vertical"
                                                    className="w-[1.5px]"
                                                />
                                            </div>
                                            <div className="">
                                                <p>Trip Number : {lotsData?.trip_number}</p>
                                                <p>Total Items : {lotsData?.total_items}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-3">
                                    <NextLink
                                        href={`/admin/Lots_Details/view?lots_id=${lostId}`}
                                        passHref
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button variant="secondary" size="sm">
                                            <span className="text-xs">Print Lots</span>
                                        </Button>
                                    </NextLink>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.menus} text-xs`}>
                            <p></p>
                        </div>
                    </div>

                    <div className={styles.childContent}>
                        <div className={styles.carrier}>
                            <div
                                className={`${styles.carrier__container} flex flex-row justify-between items-center w-[100%]`}
                            ></div>

                            <div className={`${styles.listTable} flex flex-col gap-1`}>
                                <LotsDetailsTable
                                    data={data}
                                    setOpen={setOpen}
                                    handleSearchChange={handleSearchChange}
                                    isSkeleton={isSkeleton}
                                    lostId={lostId}
                                    reload={reload}
                                    pagination={pagination}
                                    rowTotalData={rowTotalData}
                                    handlerPaginationChange={handlerPaginationChange}
                                    query={query}
                                    setPagination={setPagination}
                                    lots_status={lotsData?.status}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
