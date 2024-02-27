'use client'
import React, { useEffect, useState } from 'react'
import styles from '../../styles.module.scss'
import { LotsDetailsTable } from '../../components/DestinationTabled/LotsDetailsTable'
import Image from 'next/image'
import axios from 'axios'
export default function DestinationLotsPage({ params }) {
    const [isSkeleton, setIsSkeleton] = useState(true);
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState({
        keyword: "",
        date_start: "",
        date_end: "",
        tracking_id: "",
        lots_id: params.slug,
        status: "",
        page: 0,
        limit: 0,
        index: 0
    });
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
            setIsSkeleton(false);
        } catch (error) {
            setIsSkeleton(false);
            console.log('Error:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [query]);

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
            <div className={styles.wrapper}>
                <div className={styles.configHeader}>
                    <div className={styles.banner}>
                        <div className={styles.icon}>
                            <Image
                                src={"/backoffice/destination-blue.png"}
                                width={40}
                                height={40}
                                alt='Destination icon'
                            />
                        </div>
                        <div className={`${styles.title} flex flex-col`}>
                            <h1 className=" text-zinc-900 text-sm font-bold ">Destination Scan</h1>
                            <p className=" text-blue-900 text-sm font-light ">Showing Lots <span className='font-bold'>#{params.slug}</span></p>
                        </div>
                    </div>

                    <div className={`${styles.menus}`}>

                    </div>
                </div>

                <div className={styles.childContent}>
                    <div className={styles.carrier}>
                        <div className={styles.leftTabled}>
                            <LotsDetailsTable data={data} setOpen={setOpen} handleSearchChange={handleSearchChange} isSkeleton={isSkeleton} reload={reload} />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
