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
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, useFieldArray } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Skeleton } from "@/components/ui/skeleton";

export function VerificationTable({ data, isOpen, setOpen, isSkeleton, reloadData }) {

    const [expandedRow, setExpandedRow] = useState(null);

    const [newContet, setNewContent] = useState({})
    const [isEdit, setIsEdit] = useState(false);
    const [editCount, setEditCount] = useState(1);

    const toggleEdit = () => {
        setIsEdit(!isEdit)
    }
    const toggleCancel = () => {
        setIsEdit(false)
    }
    const toggleRow = (index) => {
        if (expandedRow === index) {
            setExpandedRow(null);
        } else {
            setExpandedRow(index);
        }
    };
    return (
        <Table>
            <TableHeader className="text-sm">
                <TableHead className=" text-xs w-[100px]">Tracking ID</TableHead>
                <TableHead className="  text-xs ">Customer Name</TableHead>
                <TableHead className="  text-xs ">Origin</TableHead>
                <TableHead className="  text-xs ">Destination</TableHead>
                <TableHead className="  text-xs text-center">Last Update</TableHead>
                <TableHead className="  text-center text-xs w-[150px] ">Customs Status</TableHead>
                <TableHead className="  text-xs w-[30px]"></TableHead>
            </TableHeader>
            <TableBody className="text-xs">
                {
                    isSkeleton ? (
                        <>
                            <TableRow>
                                <TableCell className="text-center">
                                    <Skeleton className={"w-full rounded h-[30px]"} />
                                </TableCell>
                                <TableCell className="text-center">
                                    <Skeleton className={"w-full rounded h-[30px]"} />
                                </TableCell>
                                <TableCell className="text-center">
                                    <Skeleton className={"w-full rounded h-[30px]"} />
                                </TableCell>
                                <TableCell className="text-center">
                                    <Skeleton className={"w-full rounded h-[30px]"} />
                                </TableCell>
                                <TableCell className="text-center">
                                    <Skeleton className={"w-full rounded h-[30px]"} />
                                </TableCell>
                                <TableCell className="text-center">
                                    <Skeleton className={"w-full rounded h-[30px]"} />
                                </TableCell>
                                <TableCell className="text-center">
                                    <Skeleton className={"w-full rounded h-[30px]"} />
                                </TableCell>
                            </TableRow>
                        </>
                    ) : (
                        <>
                            {
                                data.map((item, index) => (
                                    <>
                                        <TableRow key={item.id} className={`${expandedRow === index && "bg-blue-100 hover:bg-blue-100"}`} >
                                            <TableCell className="font-medium text-xs">{item.tracking_id}</TableCell>
                                            <TableCell className="font-medium text-xs">{item.customer_name}</TableCell>
                                            <TableCell className="font-medium text-xs">{item.Origin}</TableCell>
                                            <TableCell className="font-medium text-xs">{item.Destination}</TableCell>
                                            <TableCell className="text-right text-xs">{item.updated_at}</TableCell>
                                            <TableCell className="text-center text-xs w-[150px] " >
                                                <VerifiedStatus param={item.status} />
                                            </TableCell>
                                            <TableCell className="w-[30px] text-right text-xs">
                                                <Button
                                                    variant="tableBlue"
                                                    size="tableIcon"
                                                    type="button"
                                                    className={` w-max px-[5px] h-[25px]`}
                                                    onClick={() => toggleRow(index)}
                                                >
                                                    <ArrowDownV2Icons
                                                        width={15}
                                                        height={15}
                                                        className={` text-myBlue outline-myBlue fill-myBlue ${expandedRow === index ? 'rotate-180' : ''}`}
                                                    />
                                                </Button>

                                            </TableCell>
                                        </TableRow>
                                        {expandedRow === index && (
                                            <>
                                                <TableRow key={`expanded_${item.id}`} className="bg-blue-50 hover:bg-blue-50">
                                                    <TableCell className="font-medium" colSpan={7}>
                                                        <div className="w-[80%] flex justify-center items-center mx-auto py-3">
                                                            <ImageTable images={item.images} />
                                                        </div>
                                                        {

                                                            isEdit ? (
                                                                <EditForms counter={editCount} data={item.content} edit={toggleEdit} cancel={toggleCancel} trackingID={item.tracking_id} reloadData={reloadData} />
                                                            ) : (
                                                                <ExpandedTable content={item.content} item={item} edit={toggleEdit} trackingID={item.tracking_id} reloadData={reloadData} />
                                                            )
                                                        }

                                                    </TableCell>
                                                </TableRow>
                                                {/* <TableRow className="bg-blue-100 hover:bg-blue-100 ">
                                                    <TableCell className="font-medium p-0 h-7 px-5 py-2" colSpan={7}>
                                                        {
                                                            isEdit ? (
                                                                <EditMode cancel={toggleCancel} increaseContent={setEditCount} />
                                                            ) : (
                                                                <TableAction edit={toggleEdit} item={item} />
                                                            )
                                                        }
                                                    </TableCell>
                                                </TableRow> */}
                                            </>
                                        )}
                                    </>
                                ))
                            }
                        </>
                    )
                }

            </TableBody >

        </Table>
    )
}
