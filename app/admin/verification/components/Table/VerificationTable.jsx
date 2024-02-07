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
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

const formSchema = yup.object().shape({
    itemID: yup.string(),
    qty: yup.number(),
    value: yup.number(),
    description: yup.string(),
    hsDescription: yup.string(),
    hsCode: yup.string(),
    madeIn: yup.string(),
})
export function VerificationTable({ data, isOpen, setOpen }) {

    const [expandedRow, setExpandedRow] = useState(null);

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

    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            itemID: "",
            qty: "",
            value: "",
            description: "",
            hsDescription: "",
            hsCode: "",
            madeIn: "",
        },
        mode: "onChange",
    })
    return (
        <Table>
            <TableHeader className="text-sm">
                <TableHead className=" text-xs w-[100px]">Tracking ID</TableHead>
                <TableHead className="  text-xs ">Customer Name</TableHead>
                <TableHead className="  text-xs ">Origin</TableHead>
                <TableHead className="  text-xs ">Destination</TableHead>
                <TableHead className="  text-xs text-center">Last Update</TableHead>
                <TableHead className="  text-xs ">Customs Status</TableHead>
                <TableHead className="  text-xs w-[30px]"></TableHead>
            </TableHeader>
            <TableBody className="text-xs">
                {
                    data.map((item, index) => (
                        <>
                            <TableRow key={item.id} className={`${expandedRow === index && "bg-blue-100 hover:bg-blue-100"}`} >
                                <TableCell className="font-medium text-xs">{item.TrackingID}</TableCell>
                                <TableCell className="font-medium text-xs">{item.CustomerName}</TableCell>
                                <TableCell className="font-medium text-xs">{item.Origin}</TableCell>
                                <TableCell className="font-medium text-xs">{item.Destination}</TableCell>
                                <TableCell className="text-right text-xs">{item.UpdateDate}</TableCell>
                                <TableCell className="text-right text-xs" >
                                    <VerifiedStatus param={item.CustomsStatus} />
                                </TableCell>
                                <TableCell className="w-[30px] text-right text-xs">

                                    <Button
                                        variant="tableBlue"
                                        size="tableIcon"
                                        className={`rounded-sm w-max px-[5px] h-[25px]`}
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
                                    <Form {...form}>
                                        <form
                                            className='flex gap-2 flex-col text-zinc-600'
                                            action=""></form>
                                        <TableRow key={`expanded_${item.id}`} className="bg-blue-50 hover:bg-blue-50">
                                            <TableCell className="font-medium" colSpan={7}>
                                                <div className="w-[80%] flex justify-center items-center mx-auto">
                                                    <ImageTable />
                                                </div>
                                                {
                                                    isEdit ? (
                                                        <EditForms forms={form} counter={editCount} />
                                                    ) : (
                                                        < ExpandedTable />
                                                    )
                                                }
                                            </TableCell>
                                        </TableRow>
                                        <TableRow className="bg-blue-100 hover:bg-blue-100 ">
                                            <TableCell className="font-medium p-0 h-7 px-5 py-2" colSpan={7}>
                                                {
                                                    isEdit ? (
                                                        <EditMode cancel={toggleCancel} increaseContent={setEditCount} />
                                                    ) : (
                                                        <TableAction edit={toggleEdit} />
                                                    )
                                                }
                                            </TableCell>
                                        </TableRow>
                                    </Form>
                                </>
                            )}
                        </>
                    ))
                }
            </TableBody >

        </Table>
    )
}
