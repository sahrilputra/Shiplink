'use client'
import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/tableDashboard"
import { Button } from "@/components/ui/button"
import { ExpandedTable } from "./ExpandedTable";
import { TableAction } from "./TableAction";
import { ArrowDownV2Icons } from "@/components/icons/iconCollection";
import { EditMode } from "./EditMode";
import { VerifiedStatus } from "../status/VerifiedStatus";
import { EditForms } from "./EditForms";
import { ImageTable } from "./ImageTable";
export function VerificationTable({ data, isOpen, setOpen }) {

    const [expandedRows, setExpandedRows] = useState([]);

    const [isEdit, setIsEdit] = useState(false);
    const [editCount, setEditCount] = useState(1);
    
    const toggleEdit = () => {
        setIsEdit(!isEdit)
    }
    const toggleCancel = () => {
        setIsEdit(false)
    }
    const toggleRow = (index) => {
        const newExpandedRows = [...expandedRows];
        newExpandedRows[index] = !newExpandedRows[index];
        setExpandedRows(newExpandedRows);
    };
    return (
        <Table>
            <TableHeader className="text-sm">
                <TableHead className="w-[100px]">Tracking ID</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Origin</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead className="text-right">Last Update</TableHead>
                <TableHead className="">Customs Status</TableHead>
                <TableHead className="w-[30px]"></TableHead>
            </TableHeader>
            <TableBody className="text-xs">
                {
                    data.map((item, index) => (
                        <>
                            <TableRow key={item.id} className={`${expandedRows[index] && "bg-blue-200 hover:bg-blue-200"}`} >
                                <TableCell className="font-medium">{item.TrackingID}</TableCell>
                                <TableCell>{item.CustomerName}</TableCell>
                                <TableCell>{item.Origin}</TableCell>
                                <TableCell>{item.Destination}</TableCell>
                                <TableCell className="text-right">{item.UpdateDate}</TableCell>
                                <TableCell>
                                    <VerifiedStatus param={item.CustomsStatus} />
                                </TableCell>
                                <TableCell className="w-[30px]">

                                    <Button
                                        variant="tableBlue"
                                        size="tableIcon"
                                        className={`rounded-sm w-max px-[5px] h-[25px]`}
                                        onClick={() => toggleRow(index)}
                                    >
                                        <ArrowDownV2Icons
                                            width={15}
                                            height={15}
                                            className={` text-myBlue outline-myBlue fill-myBlue ${expandedRows[index] ? 'rotate-180' : ''}`}
                                        />
                                    </Button>

                                </TableCell>
                            </TableRow>
                            {expandedRows[index] && (
                                <>
                                    <TableRow key={`expanded_${item.id}`} className="bg-blue-100 hover:bg-blue-100">
                                        <TableCell className="font-medium" colSpan={7}>
                                            <div className="w-[80%] flex justify-center items-center mx-auto">
                                                <ImageTable />
                                            </div>
                                            {
                                                isEdit ? (
                                                    <EditForms counter={editCount} />
                                                ) : (
                                                    < ExpandedTable />
                                                )
                                            }
                                        </TableCell>
                                    </TableRow>
                                    <TableRow className="bg-blue-200 hover:bg-blue-200">
                                        <TableCell className="font-medium" colSpan={7}>
                                            {
                                                isEdit ? (
                                                    <EditMode cancel={toggleCancel} increaseContent={setEditCount} />
                                                ) : (
                                                    <TableAction edit={toggleEdit} />
                                                )
                                            }
                                        </TableCell>
                                    </TableRow>
                                </>
                            )}
                        </>
                    ))
                }
            </TableBody>

        </Table>
    )
}
