'use client'
import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/tableDashboard'
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

export const BrokerDeclareContent = ({ setOpen }) => {
    return (
        <>
            <Table>
                <TableHeader className="bg-sky-50 ">
                    <TableHead className="w-[100px] text-myBlue font-bold text-xs">Qty</TableHead>
                    <TableHead className="w-[100px] text-myBlue font-bold text-xs">Value</TableHead>
                    <TableHead className="text-myBlue font-bold text-xs">Description</TableHead>
                    <TableHead className="text-myBlue font-bold text-xs ">HS Description</TableHead>
                    <TableHead className="w-[200px] text-myBlue font-bold text-xs ">HS Code</TableHead>
                    <TableHead className="w-[100px] text-myBlue font-bold text-xs ">Made in</TableHead>
                </TableHeader>
                <TableBody>
                    <TableRow className="text-xs bg-white">
                        <TableCell className="font-medium text-xs p-0 py-[10px] px-[12px]">
                            <p>1</p>
                        </TableCell>
                        <TableCell className="font-medium text-xs p-0 py-[10px] px-[12px]">
                            <p>$120.00</p>
                        </TableCell>
                        <TableCell className="font-medium text-xs p-0 py-[10px] px-[12px]">
                            <p>Description</p>
                        </TableCell>
                        <TableCell className="font-medium text-xs p-0 py-[10px] px-[12px]">
                            <p>HS Description</p>
                        </TableCell>
                        <TableCell className="font-medium text-xs p-0 py-[10px] px-[12px]">
                            <p>HS Code</p>
                        </TableCell>
                        <TableCell className="font-medium text-xs p-0 py-[10px] px-[12px]">
                            <p>CAD</p>
                        </TableCell>

                    </TableRow>
                </TableBody>
            </Table>
            <Table>
                <TableBody>
                    <TableRow className="text-xs h-4 w-full bg-white">
                        <TableCell className="font-medium h-8 p-0 py-2 px-5 ">
                            <div className="flex justify-between w-full">
                                <div className="flex flex-row gap-4">
                                    <p className=' text-sm font-bold text-myBlue'>Totals : </p>
                                    <p className=' text-sm font-semibold'>$123.00 </p>

                                </div>
                                <div className="flex flex-row gap-4">
                                    <p className=' text-sm font-bold text-myBlue'>PARS : </p>
                                    <p className=' text-sm font-semibold'>213131231</p>
                                </div>
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow className="text-xs">
                        <TableCell className="font-medium flex flex-row justify-between w-full items-center bg-sky-50 p-0 py-2 px-5">
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => setOpen(true)}
                            >
                                <p className='text-xs'>Package Details</p>
                            </Button>
                            <div className="">
                                <Select>
                                    <SelectTrigger className="text-xs p-0 px-0 py-0 focus:ring-0 border border-zinc-200 ">
                                        <div className="flex flex-row gap-[-3px] items-center  w-[200px] justify-between">
                                            <p className='bg-blue-900 rounded-tl-sm rounded-bl-sm text-xs text-white items-center p-3 my-auto '>Invoice</p>
                                            <SelectValue placeholder="Download Invoice " className='text-xs border-none outline-none items-start justify-start flex' />
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="light">Invoice A</SelectItem>
                                        <SelectItem value="dark">Invoice B</SelectItem>
                                        <SelectItem value="system">Invoice C</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-row gap-[-3px] w-max border border-zinc-200">
                                <p className='bg-blue-900 rounded-tl-sm rounded-bl-sm text-xs text-white items-center p-3 my-auto '>Entry Number</p>
                                <Input type="text" className="border-none pl-3 w-[150px] focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0" />
                            </div>
                            <div className="flex flex-row justify-center gap-4  ">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => setOpen(true)}
                                >
                                    <p className='text-xs'>Save</p>
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
    )
}
