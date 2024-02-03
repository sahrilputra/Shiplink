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

export const DeclareContet = ({ setOpen }) => {
    const [inputCount, setInputCount] = useState(1);

    const removeContent = (index) => {
        setInputCount(inputCount - 1)
    }

    const addContent = () => {
        setInputCount(inputCount + 1)

    }
    return (
        <>
            <Table>
                <TableHeader className="bg-sky-50 border ">
                    <TableHead className="p-0 h-8 px-5 py-3  w-[100px] text-myBlue font-bold text-sm">Qty</TableHead>
                    <TableHead className="p-0 h-8 px-5 py-3  w-[100px] text-myBlue font-bold text-sm">Value</TableHead>
                    <TableHead className="p-0 h-8 px-5 py-3  text-myBlue font-bold text-sm">Description</TableHead>
                    <TableHead className="p-0 h-8 px-5 py-3  text-myBlue font-bold text-sm ">HS Description</TableHead>
                    <TableHead className="p-0 h-8 px-5 py-3  w-[200px] text-myBlue font-bold text-sm ">HS Code</TableHead>
                    <TableHead className="p-0 h-8 px-5 py-3  w-[100px] text-myBlue font-bold text-sm ">Made in</TableHead>
                    <TableHead className="p-0 h-8 px-5 py-3  text-myBlue font-bold text-sm text-right"></TableHead>
                </TableHeader>
                <TableBody>
                    {
                        Array.from({ length: inputCount }).map((_, index) => (
                            <DeclareContentInput key={index} index={index} remove={removeContent} />
                        ))
                    }
                </TableBody>
            </Table>
            <Table>
                <TableBody>
                    <TableRow className="text-xs h-4 w-full">
                        <TableCell className="p-0 px-5 py-2  font-medium h-8">
                            <Button
                                variant="softBlue"
                                size="sm"
                                className="px-4 h-7 py-3"
                                onClick={() => addContent()}
                            >
                                <p className='text-xs'>Add Other Conten</p>
                            </Button>
                        </TableCell>
                    </TableRow>
                    <TableRow className="text-xs">
                        <TableCell className="font-medium flex flex-row justify-between w-full items-center p-0 px-5 py-2  ">
                            <div className="flex flex-row gap-4">
                                <p className=' text-base font-bold text-myBlue'>Totals : </p>
                                <p className=' text-base font-semibold'>$123.00 </p>

                            </div>
                            <div className="flex flex-row justify-center gap-4">
                                <Select>
                                    <SelectTrigger className="text-xs w-[150px]">
                                        <SelectValue placeholder="Select Bin Location " className='text-xs' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="light">Bin A</SelectItem>
                                        <SelectItem value="dark">Bin B</SelectItem>
                                        <SelectItem value="system">Bin C</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => setOpen(true)}
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
