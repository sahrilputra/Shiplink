'use client'
import React from 'react'
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
export const DeclareContet = ({ setOpen }) => {
    return (
        <>
            <Table>
                <TableHeader className="bg-sky-50 ">
                    <TableHead className="w-[100px] text-myBlue font-bold text-sm">Qty</TableHead>
                    <TableHead className="w-[100px] text-myBlue font-bold text-sm">Value</TableHead>
                    <TableHead className="text-myBlue font-bold text-sm">Description</TableHead>
                    <TableHead className="text-myBlue font-bold text-sm ">HS Description</TableHead>
                    <TableHead className="w-[200px] text-myBlue font-bold text-sm ">HS Code</TableHead>
                    <TableHead className="w-[100px] text-myBlue font-bold text-sm ">Made in</TableHead>
                    <TableHead className="text-myBlue font-bold text-sm text-right"></TableHead>
                </TableHeader>
                <TableBody>
                    <TableRow className="text-xs">
                        <TableCell className="font-medium">
                            <Input id="value" className="text-xs" placeholder="0" type="number" />
                        </TableCell>
                        <TableCell>
                            <Input id="value" className="text-xs" placeholder="0" type="number" />
                        </TableCell>
                        <TableCell>
                            <Input id="value" className="text-xs" placeholder="Description" />
                        </TableCell>
                        <TableCell>
                            <Input id="value" className="text-xs" placeholder="Search" />
                        </TableCell>
                        <TableCell>
                            <Input id="value" className="text-xs" placeholder="0" type="number" />
                        </TableCell>
                        <TableCell>
                            <Input id="value" className="text-xs" placeholder="CAD" />
                        </TableCell>
                        <TableCell className="text-right">
                            <div className="flex flex-row gap-2">
                                <Button
                                    variant="softBlue"
                                    size="tableIcon"
                                    className=""
                                >
                                    <CheckIcon className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="softBlue"
                                    size="tableIcon"
                                >
                                    <XIcon className="w-4 h-4" />
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Table>
                <TableBody>
                    <TableRow className="text-xs h-4 w-full">
                        <TableCell className="font-medium h-8">
                            <Button
                                variant="softBlue"
                                size="sm"
                            >
                                <p className='text-xs'>Add Other Conten</p>
                            </Button>
                        </TableCell>
                    </TableRow>
                    <TableRow className="text-xs">
                        <TableCell className="font-medium flex flex-row justify-between w-full items-center ">
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
