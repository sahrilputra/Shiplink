'use client'
import React, { useEffect, useState, Suspense } from 'react'
import styles from '../styles.module.scss'
import { Button } from '@/components/ui/button'
import Image from 'next/image';
import { InvoiceForms } from '../components/forms/newInvoiceForms';
import { useSearchParams } from 'next/navigation'
import axios from 'axios';

export default function NewInvoice() {
    const searchParams = useSearchParams()
    const myParam = searchParams.get('customer')
    const package_id = searchParams.get('package_id') || ""
    const [open, setOpen] = useState(false);
    console.log("🚀 ~ ArrivalScanPage ~ router:", myParam)
    console.log("🚀 ~ ArrivalScanPage ~ package_id:", package_id)
    const [data, setData] = useState({});
    const [query, setQuery] = useState({
        keyword: "",
        date_start: "",
        date_end: "",
        tracking_id: `${package_id}`,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    `/api/admin/packages/list`,
                    {
                        ...query,
                        tracking_id: `${package_id}`,
                    }
                );
                const responseData = await response.data.package_info[0];
                console.log("response : ", responseData)
                setData(responseData);
            } catch (error) {
                console.log('Error:', error);
            }
        };
        if (package_id !== "") {
            fetchData();
        }
    }, [query, package_id]);
    return (
        <Suspense>
            <>
                <div className={styles.forms}>
                    <InvoiceForms customer={myParam} data={data} />
                </div>
            </>
        </Suspense>
    )
}
