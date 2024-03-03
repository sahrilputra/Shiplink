'use client'
import React, { useEffect, useState } from 'react'
import { Document, Page } from '@react-pdf/renderer'
import { InvoiceHead } from './InvoiceHead'
import { InvoiceUser } from './InvoiceUser'
import { InvoiceItemsTable } from './InvoiceItemsTable'
import axios from 'axios'

export const InvoicePDF = ({ id }) => {
    console.log(id)
    const [data, setData] = useState(null);
    const [query, setQuery] = useState({
        keyword: `${id}`,
        page: 0,
        limit: 0,
        index: 0
    });

    const fetchData = async () => {
        try {
            const response = await axios.post(
                `/api/admin/invoice/list`,
                query
            );
            console.log(response)
            const data = await response.data;
            setData(data.invoice);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [query]);
    return (
        <>
            <Document>
                <Page size="A4" style={{ padding: 20 }}>
                    <InvoiceHead />
                    <InvoiceUser />
                    <InvoiceItemsTable />
                </Page>
            </Document>
        </>
    )
}
