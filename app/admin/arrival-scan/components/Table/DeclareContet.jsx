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

export const DeclareContet = ({ setOpen, forms, removeContent, addContent, inputCount }) => {
    console.log('declereContentID', forms.getValues('DeclareContet'))
    return (
        <>
            <Table>
                <TableHeader className="bg-sky-50 border ">
                    <TableHead className="p-0 h-8 px-5 py-3  w-[100px] text-myBlue font-bold text-xs">Qty</TableHead>
                    <TableHead className="p-0 h-8 px-5 py-3  w-[100px] text-myBlue font-bold text-xs">Value</TableHead>
                    <TableHead className="p-0 h-8 px-5 py-3  text-myBlue font-bold text-xs">Description</TableHead>
                    <TableHead className="p-0 h-8 px-5 py-3  text-myBlue font-bold text-xs ">HS Description</TableHead>
                    <TableHead className="p-0 h-8 px-5 py-3  w-[200px] text-myBlue font-bold text-xs ">HS Code</TableHead>
                    <TableHead className="p-0 h-8 px-5 py-3  w-[100px] text-myBlue font-bold text-xs ">Made in</TableHead>
                    <TableHead className="p-0 h-8 px-5 py-3  text-myBlue font-bold text-xs text-right w-[40px]"></TableHead>
                </TableHeader>
                <TableBody className="px-2">
                    {Array.from({ length: inputCount }).map((_, index) => (
                        <DeclareContentInput
                            forms={forms}
                            key={index}
                            index={index}
                            remove={removeContent(index)}
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
                                    type="button"
                                    size="sm"
                                    onClick={(e) => {
                                        setOpen(true)
                                        e.preventDefault()
                                    }}
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
