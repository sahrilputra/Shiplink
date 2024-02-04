import { SearchBar } from '@/components/ui/searchBar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/tableDashboard'
import React from 'react'
import { usePDF } from 'react-to-pdf';
import ReactToPrint, { useReactToPrint } from "react-to-print"
import data from '../../../../../data/admin/TransportLotsData.json'
export const LotsDucoments = ({ data, isDownload, dataID }) => {
    console.log("data : ", data)

    const { toPDF, targetRef } = usePDF({ filename: `Lots-${dataID}.pdf` });
    const handleDownload = () => {
        toPDF()
    }
    // const findData = data.find((item) => item.LotsID === dataID)

    isDownload && handleDownload()
    return (
        <Table className="border border-zinc-300 rounded-sm" ref={targetRef}>
            <TableHeader className="text-sm">
                <TableHead className=" w-[80px]">Lots ID</TableHead>
                <TableHead className=" ">Lots Labels</TableHead>
                <TableHead className=" ">Destination</TableHead>
                <TableHead className=" w-[130px]">Documents</TableHead>
                <TableHead className=" w-[180px]">Manifest</TableHead>
                <TableHead className=" w-[180px]">Status</TableHead>
                <TableHead className=" w-[140px]"></TableHead>
            </TableHeader>
            <TableBody className="text-xs">
                {/* {
                    data.map((item, index) => (
                        <>
                            <TableRow key={item.id} className={`${expandedRows[index] && "bg-blue-200 hover:bg-blue-200"} h-[50px]`} >
                                <TableCell className="font-medium p-0 h-7 px-5 py-2">{item.LotsID}</TableCell>
                                <TableCell className="font-medium p-0 h-7 px-5 py-2">{item.LotsLabel}</TableCell>
                                <TableCell className="font-medium p-0 h-7 px-5 py-2">{item.Destination}</TableCell>
                                <TableCell className="font-medium p-0 h-7 px-5 py-2">{item.Documents}</TableCell>
                                <TableCell className="font-medium p-0 h-7 px-5 py-2">{item.Manifest}</TableCell>
                                <TableCell className="font-medium p-0 h-7 px-5 py-2">{item.Status}</TableCell>

                            </TableRow>
                        </>
                    ))
                } */}
            </TableBody>
        </Table>
    )
}
