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
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
export const DeclareContet = ({
    forms,
    fields,
    append,
    remove,
    total
}) => {


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
                <TableBody>
                    {fields.map((field, index) => (
                        <DeclareContentInput
                            key={field.id}
                            index={index}
                            forms={forms}
                            handleRemoveContent={() => remove(index)}
                            itemID={field.itemID}
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
                                onClick={() => append({})}
                            >
                                <p className='text-xs'>Add Other Content</p>
                            </Button>
                        </TableCell>
                    </TableRow>
                    <TableRow className="text-xs">
                        <TableCell className="font-medium flex flex-row justify-between w-full items-center p-0 px-5 py-2  ">
                            <div className="flex flex-row gap-4">
                                <p className=' text-sm font-bold text-myBlue'>Totals : </p>
                                <p className=' text-sm font-semibold'>$ {total}</p>

                            </div>
                            <div className="flex flex-row justify-center gap-4">
                                <FormField
                                    control={forms.control}
                                    name="bin_location"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="text-xs w-[150px] h-[30px] rounded-sm px-2 py-0'">
                                                        <SelectValue placeholder="Select Bin Location" className='text-xs' defaultValue={"Unregister"} />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem className="text-xs" value="A">Bin A</SelectItem>
                                                    <SelectItem className="text-xs" value="B">Bin B</SelectItem>
                                                    <SelectItem className="text-xs" value="C">Bin C</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    variant="destructive"
                                    type="submit"
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
