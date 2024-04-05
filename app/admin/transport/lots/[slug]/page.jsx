'use client'
import React, { useEffect, useState } from 'react'
import styles from '../../styles.module.scss'
import { LotsDetailsTable } from '../../components/TransportTabled/LotsDetailsTable';
import axios from 'axios'
export default function LotsDetails({ params }) {
    const [isSkeleton, setIsSkeleton] = useState(true);
    const [open, setOpen] = useState(false);
    const lostId = params.slug
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
            />
          </div>
        </div>
      </>
    );
}
