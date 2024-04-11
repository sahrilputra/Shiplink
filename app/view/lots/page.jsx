'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { PrintDocument } from './components/Docs/PrintDocument'
import axios from 'axios'
function ViewLotsDocs() {
    const searchParams = useSearchParams()
    const myParam = searchParams.get('lots_id')
    console.log("🚀 ~ ViewLotsDocs ~ myParam:", myParam)

    const [open, setOpen] = useState(false);
    const [lotsData, setLotsData] = useState([]);
    console.log("🚀 ~ LotsDetails ~ lotsData:", lotsData)

    const [lotsQuery, setLotsQuery] = useState({
        keyword: "",
        date_start: "",
        date_end: "",
        lots_id: myParam,
        status: "",
        destination: "",
        page: 0,
        limit: 0,
        index: 0
    })
    useEffect(() => {
        const fetchLotsDetails = async () => {
            try {
                const response = await axios.post(
                    `/api/admin/transport/lots/list`,
                    lotsQuery
                );
                const data = await response.data;
                const filteredData = data.lots.filter(lot => lot.lots_id === myParam);
                setLotsData(filteredData[0]);
                console.log(data)
            } catch (error) {
                console.log('Error:', error);
            }
        }

        fetchLotsDetails();
    }, [lotsQuery, myParam])

    return (
        <div style={{ width: "100%", height: "100vh" }} className="">
            <PrintDocument data={lotsData} lots_id={myParam} />
        </div>
    )
}

export default ViewLotsDocs