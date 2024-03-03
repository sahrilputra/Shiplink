'use client'
import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'

import dynamic from 'next/dynamic'
import { InvoicePDF } from './components/InvoicePDF';
// Dynamic import PDFViewer component
const PDFViewer = dynamic(() => import('@react-pdf/renderer').then((module) => module.PDFViewer), {
    ssr: false // Set ssr option to false to prevent server-side rendering
});

export default function ViewInvoice({ params }) {

    console.log("params", params.slug)
    const [data, setData] = useState(null);
    const [query, setQuery] = useState({
        keyword: "",
        invoice_id: `${params.slug}`,
        page: 0,
        limit: 0,
        index: 0
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    `/api/admin/invoice/list`,
                    query
                );
                console.log("🚀 ~ fetchData ~ response:", response)
                const data = await response.data;
                setData(data.invoice);
            } catch (error) {
                console.log('Error:', error);
            }
        };

        fetchData();
    }, [query]);
    return (
        <div className="w-full h-full">
            <PDFViewer width="100%" height="100%" className="app">
                <InvoicePDF data={data} />
            </PDFViewer>
        </div>
    );
}