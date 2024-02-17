'use client'
import React, { useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/tableDashboard'
import { HSCodeForms, QtyForm, DescriptionForms, HSDescriptionForms, MadeInForms, ValueForms } from './inputForms'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CheckIcon, XIcon } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { DeclareContentInput } from './DeclareContentInput'
import { useDeclareContentContext } from '../Context/DeclareContentContext'

export const DeclareContet = ({
    forms,
    inputCount,
    totalInput
}) => {
    const { addContent, calculateTotal, removeContent } = useDeclareContentContext()
    const totalValue = calculateTotal();
    console.log("addContent", addContent)
    console.log('totalValue', totalValue)


    const handleRemoveContent = (index) => {
        removeContent(index);
    };

    return (
        <>
            <Table>
                <TableHeader className="bg-sky-50 border ">
                    <TableHead className="p-0 h-8 px-5 py-3 w-[100px] text-myBlue font-bold text-xs">Qty</TableHead>
                    <TableHead className="p-0 h-8 px-5 py-3 w-[100px] text-myBlue font-bold text-xs">Value</TableHead>
                    <TableHead className="p-0 h-8 px-5 py-3 text-myBlue font-bold text-xs">Description</TableHead>
                    <TableHead className="p-0 h-8 px-5 py-3 text-myBlue font-bold text-xs ">HS Description</TableHead>
                    <TableHead className="p-0 h-8 px-5 py-3 text-myBlue font-bold text-xs w-[140px]">HS Code</TableHead>
                    <TableHead className="p-0 h-8 px-5 py-3 text-myBlue font-bold text-xs w-[100px] ">Made in</TableHead>
                    <TableHead className="p-0 h-8 px-5 py-3 text-myBlue font-bold text-xs text-right w-[40px]"></TableHead>
                </TableHeader>
                <TableBody className="px-2">
                    {Array.from({ length: inputCount }).map((_, index) => (
                        <DeclareContentInput
                            forms={forms}
                            key={index}
                            index={index}
                            remove={() => removeContent(index)} // Mengubah prop remove menjadi fungsi yang memanggil handleRemoveContent dengan indeks yang sesuai
                        />
                    ))}

                </TableBody>
            </Table>
            <Table>
                <TableBody>
                    <TableRow className="text-xs h-4 w-full">
                        <TableCell className="p-0 px-5 py-2 w-[40px] font-medium h-8">
                            <Button
                                variant="softBlue"
                                size="sm"
                                type="button"
                                className="px-4 h-7 py-3"
                                onClick={(e) => {
                                    addContent()
                                    e.preventDefault()
                                }}
                            >
                                <p className='text-xs'>Add Other Content</p>
                            </Button>
                        </TableCell>
                    </TableRow>
                    <TableRow className="text-xs">
                        <TableCell className="font-medium flex flex-row justify-between w-full items-center p-0 px-5 py-2  ">
                            <div className="flex flex-row gap-4">
                                <p className=' text-sm font-bold text-myBlue'>Totals : </p>
                                <p className=' text-sm font-semibold'>${totalInput} </p>

                            </div>
                            <div className="flex flex-row justify-center gap-4">
                                <Select>
                                    <SelectTrigger className="text-xs w-[150px] h-[30px] rounded-sm px-2 py-0'">
                                        <SelectValue placeholder="Select Bin Location " className='text-xs' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem className="text-xs" value="light">Bin A</SelectItem>
                                        <SelectItem className="text-xs" value="dark">Bin B</SelectItem>
                                        <SelectItem className="text-xs" value="system">Bin C</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Button
                                    variant="destructive"
                                    type="submit"
                                    onClick={(e) => {
                                        e.preventDefault()
                                    }}
                                    className=" h-[30px] rounded-sm px-4 py-0"
                                    size="sm"

                                >
                                    <p className='text-xs'>Register Package</p>
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

        </>
    )
}
