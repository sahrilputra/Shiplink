'use client'
import React, { useEffect, useState } from 'react'
import { FilterIcons } from '@/components/icons/iconCollection'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import styles from '../styles.module.scss'
import data from '../../../../data/admin/warehouseDataDetails.json'
import { WarehouseBinDataList } from '../components/table/warehouseDetails/BinListTable'
import { DataChart } from '../components/charts/DataChart'
import axios from "axios";

export default function Warehouse({ params }) {
    console.log("params : ", params.slug)

    const [warehouse, setWarehouse] = useState({
        address: "",
        country_code: "",
        country_name: "",
        email: "",
        phone_number: "",
        warehouse_bullet_setting: "",
        warehouse_catalog: "",
        warehouse_id: "",
        warehouse_manager: "",
        warehouse_name: "",
    });
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState({
        keyword: `${params.slug}`,
        page: 1,
        limit: 0,
        index: 0
    });

    const fetchData = async () => {
        try {
            const response = await axios.post(
                `/api/admin/warehouse/list`,
                query
            );
            console.log(response)
            const data = await response.data;
            console.log(data)
            setWarehouse({
                address: data.warehouse[0].address,
                country_code: data.warehouse[0].country_code,
                country_name: data.warehouse[0].country_name,
                email: data.warehouse[0].email,
                phone_number: data.warehouse[0].phone_number,
                warehouse_bullet_setting: data.warehouse[0].warehouse_bullet_setting,
                warehouse_catalog: data.warehouse[0].warehouse_catalog,
                warehouse_id: data.warehouse[0].warehouse_id,
                warehouse_manager: data.warehouse[0].warehouse_manager,
                warehouse_name: data.warehouse[0].warehouse_name,
            });
            setLoading(false);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [query]);


    console.log("warehouse", warehouse)
    return (
        <>
            {
                loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className={styles.wrapper}>
                        <div className={styles.configHeader}>
                            <div className={styles.banner}>
                                <div className={styles.icon}>
                                    <Image
                                        src={"/backoffice/warehouse-blue.png"}
                                        width={40}
                                        height={40}
                                        alt='config icon'
                                    />
                                </div>
                                <div className={`${styles.title} flex flex-col`}>
                                    <h1 className=" text-zinc-900 text-sm font-bold ">Warehouse Details</h1>
                                    <p className=" text-blue-900 text-xs font-normal">Showing {warehouse ? (warehouse.warehouse_name) : "Warehouse_name"} Warehouse </p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.childContent}>
                            <div className={styles.carrier}>
                                <div className="flex flex-row w-full text-sm gap-3 justify-between">
                                    <div className="imageContainer  ">
                                        <Image
                                            src={'/backoffice/warehouseImage.png'}
                                            alt='warehouse image'
                                            width={300}
                                            height={300}
                                            className='w-[400px] h-full rounded-md'
                                        />
                                    </div>
                                    <div className="chartContainer flex flex-col gap-2">
                                        <div className="w-[300px]">
                                            <DataChart />
                                        </div>
                                    </div>

                                    {/* <div className="userList w-[250px] flex flex-col gap-1">
                                    <div className="px-2.5 py-1.5 rounded-md w-full border border-neutral-200 flex-col justify-start items-start inline-flex">
                                        <div className="flex flex-row gap-3 items-center ">
                                            <div className="userImage ">
                                                <Image
                                                    src={'/backoffice/warehouseImage.png'}
                                                    alt='warehouse image'
                                                    width={80}
                                                    height={80}
                                                    objectFit='cover'
                                                    className='h-[50px] w-[50px] rounded-full'
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="text-zinc-600 text-opacity-70 text-xs font-normal font-['Poppins']">Head Officer</div>
                                                <div className="text-zinc-600 text-sm font-normal font-['Poppins']">John Doe</div>
                                                <div className="text-sky-700 text-xs font-normal font-['Poppins']">View User Details</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-2.5 py-1.5 rounded-md w-full border border-neutral-200 flex-col justify-start items-start inline-flex">
                                        <div className="flex flex-row gap-3 items-center ">
                                            <div className="userImage ">
                                                <Image
                                                    src={'/backoffice/warehouseImage.png'}
                                                    alt='warehouse image'
                                                    width={80}
                                                    height={80}
                                                    objectFit='cover'
                                                    className='h-[50px] w-[50px] rounded-full'
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="text-zinc-600 text-opacity-70 text-xs font-normal font-['Poppins']">Head Officer</div>
                                                <div className="text-zinc-600 text-sm font-normal font-['Poppins']">John Doe</div>
                                                <div className="text-sky-700 text-xs font-normal font-['Poppins']">View User Details</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-2.5 py-1.5 rounded-md w-full border border-neutral-200 flex-col justify-start items-start inline-flex">
                                        <div className="flex flex-row gap-3 items-center ">
                                            <div className="userImage ">
                                                <Image
                                                    src={'/backoffice/warehouseImage.png'}
                                                    alt='warehouse image'
                                                    width={80}
                                                    height={80}
                                                    objectFit='cover'
                                                    className='h-[50px] w-[50px] rounded-full'
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="text-zinc-600 text-opacity-70 text-xs font-normal font-['Poppins']">Head Officer</div>
                                                <div className="text-zinc-600 text-sm font-normal font-['Poppins']">John Doe</div>
                                                <div className="text-sky-700 text-xs font-normal font-['Poppins']">View User Details</div>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="mt-2 w-full text-xs"
                                    >
                                        Show All User
                                    </Button>
                                </div> */}

                                    <div className="flex flex-row gap-2">
                                        <div className="flex-col justify-start items-start gap-1 inline-flex">
                                            <div className="flex-col justify-start items-start gap-0.5 flex">
                                                <div className="text-zinc-600 text-opacity-70 text-xs font-normal font-['Poppins']">Warehouse Name</div>
                                                <div className="text-zinc-900 text-sm font-medium font-['Poppins']">Warehouse {warehouse ? (warehouse.country_name) : "warehouse_name"}</div>
                                            </div>
                                            <div className="flex-col justify-start items-start gap-0.5 flex">
                                                <div className="text-zinc-600 text-opacity-70 text-xs font-normal font-['Poppins']">Total Package</div>
                                                <div className="w-[181px] text-zinc-900 text-sm font-medium font-['Poppins']">120 Package</div>
                                            </div>
                                            <div className="flex-col justify-start items-start gap-0.5 flex">
                                                <div className="text-zinc-600 text-opacity-70 text-xs font-normal font-['Poppins']">Time Operation</div>
                                                <div className="text-zinc-900 text-sm font-medium font-['Poppins']">$ 07.20 - 17.00</div>
                                            </div>
                                            <div className="flex-col justify-start items-start gap-0.5 flex">
                                                <div className="text-zinc-600 text-opacity-70 text-xs font-normal font-['Poppins']">Total Employees</div>
                                                <div className="w-[93px] text-zinc-900 text-sm font-medium font-['Poppins']">12</div>
                                            </div>
                                        </div>

                                        <div className="flex-col justify-start items-start gap-0.5 inline-flex">
                                            <div className="text-zinc-600 text-opacity-70 text-xs font-normal font-['Poppins']">Location</div>
                                            <div className="text-zinc-900 text-sm font-medium font-['Poppins']">{warehouse ? (warehouse.country_name) : ("USA")}</div>
                                            <div className="text-zinc-800 text-xs font-medium font-['Poppins']">{warehouse ? (warehouse.country_code) : ("undefined")} <br />{warehouse ? (warehouse.address) : ('1234 Warehouse Street  Toronto')}<br /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.childContent}>
                            <WarehouseBinDataList data={data} />
                        </div>
                    </div>
                )}

        </>
    )
}
