import React, { useEffect, useState } from 'react'
import { Document, Page } from '@react-pdf/renderer'
import { LotsHead } from './LotsHead'
import { LotsBody } from './LotsBody'
import axios from 'axios'
export const LotsPDF = ({ data, lots_id }) => {
    console.log("🚀 ~ LotsPDF ~ data:", data?.lots_id)
    const lostId = lots_id
    const [packageData, setPackageData] = useState([])
    console.log("🚀 ~ LotsPDF ~ packageData:", packageData)
    const [total, setTotal] = useState(data?.total_items)
    const [query, setQuery] = useState({
        keyword: "",
        date_start: "",
        date_end: "",
        tracking_id: "",
        lots_id: lostId || lots_id,
        status: "",
        page: 1,
        limit: 0,
        index: 0,
    });

    useEffect(() => {
        console.log("🚀 ~ LotsPDF ~ query:", query)
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    `/api/admin/transport/lots/details`,
                    query
                );
                console.log("RESPONSE", response)
                const data = await response.data;
                setPackageData(data.package_info);
            } catch (error) {
                console.log('Error:', error);
            }
        };
        fetchData();
    }, [query])

    return (
        <>
            <Document>
                <Page size="A4" style={{ padding: 20 }}>
                    <LotsHead data={data} />
                    <LotsBody package_data={packageData} />
                </Page>
            </Document>
        </>
    )
}
