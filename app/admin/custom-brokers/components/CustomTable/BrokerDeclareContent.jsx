'use client'
import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/tableDashboard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CheckIcon, XIcon } from 'lucide-react'
import { PackageDialogDetails } from '../dialog/PackageDialogDetails'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export const BrokerDeclareContent = ({ }) => {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <PackageDialogDetails open={open} setOpen={setOpen} />
            <Table>
                <TableHeader className="bg-sky-50 ">
                    <TableHead className="w-[100px] text-myBlue font-bold text-xs p-0 h-8 px-5 py-2 ">Qty</TableHead>
                    <TableHead className="w-[100px] text-myBlue font-bold text-xs p-0 h-8 px-5 py-2 ">Value</TableHead>
                    <TableHead className="text-myBlue font-bold text-xs p-0 h-8 px-5 py-2 ">Description</TableHead>
                    <TableHead className="text-myBlue font-bold text-xs p-0 h-8 px-5 py-2  ">HS Description</TableHead>
                    <TableHead className="w-[200px] text-myBlue font-bold text-xs p-0 h-8 px-5 py-2  ">HS Code</TableHead>
                    <TableHead className="w-[100px] text-myBlue font-bold text-xs p-0 h-8 px-5 py-2  ">Made in</TableHead>
                </TableHeader>
                <TableBody>
                    <TableRow className="text-xs bg-white">
                        <TableCell className="font-medium text-xs p-0 h-7 px-5 py-2">
                            <p>1</p>
                        </TableCell>
                        <TableCell className="font-medium text-xs p-0 h-7 px-5 py-2">
                            <p>$120.00</p>
                        </TableCell>
                        <TableCell className="font-medium text-xs p-0 h-7 px-5 py-2">
                            <p>Description</p>
                        </TableCell>
                        <TableCell className="font-medium text-xs p-0 h-7 px-5 py-2">
                            <p>HS Description</p>
                        </TableCell>
                        <TableCell className="font-medium text-xs p-0 h-7 px-5 py-2">
                            <p>HS Code</p>
                        </TableCell>
                        <TableCell className="font-medium text-xs p-0 h-7 px-5 py-2">
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
                                size="xs"
                                onClick={() => setOpen(true)}
                            >
                                <p className='text-xs'>Package Details</p>
                            </Button>
                            <div className="">
                                <Select>
                                    <SelectTrigger className="p-0 px-0 h-8 text-xs focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 border-zinc-300 w-[250px] pr-2">
                                        <p className='bg-blue-900 rounded-tl-sm rounded-bl-sm text-xs text-white my-auto h-full flex items-center px-3'>Invoice</p>
                                        <SelectValue placeholder="Download Invoice " className='text-xs h-full border-none pl-3 w-[250px] rounded-tr-none rounded-br-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0" ' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="light">Invoice A</SelectItem>
                                        <SelectItem value="dark">Invoice B</SelectItem>
                                        <SelectItem value="system">Invoice C</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-row gap-[-3px] w-max border border-zinc-300 rounded-md h-8 items-center ">
                                <p className='bg-blue-900 rounded-tl-sm rounded-bl-sm text-xs text-white my-auto h-full flex items-center px-3'>Entry Number</p>
                                <Input type="text" className="h-full border-none pl-3 w-[150px] rounded-tl-none rounded-bl-none rounded-tr-md rounded-br-md focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0" />
                            </div>
                            <div className="flex flex-row justify-center gap-4  ">
                                <Button
                                    variant="secondary"
                                    className="px-3"
                                    size="xs"
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
