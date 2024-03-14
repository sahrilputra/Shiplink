'use client'
import React, { useState, useEffect } from 'react'
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
import { ScrollArea } from '@/components/ui/scroll-area'
import { DeclareContentInput } from './DeclareContentInput'
import axios from 'axios'
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
    total,
    binData,
    reset
}) => {

    const [countryList, setCountryList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    `/api/admin/config/countries/list`,
                    {
                        "keyword": "",
                        "page": 0,
                        "limit": 0,
                        "index": 0,
                    }
                );
                console.log("🚀 ~ response:", response);
                setCountryList(response.data.country);
            } catch (error) {
                console.log("🚀 ~ error:", error);
                fetchData();
            }
        };
        fetchData();
    }, [])

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
                            countryList={countryList}
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
                                onClick={() => append({
                                    qty: 0,
                                    value: 0,
                                })}
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
                                                    <ScrollArea className="h-[150px]">
                                                        {
                                                            binData.map((bin, index) => (
                                                                <SelectItem className="text-xs" value={bin.bins_id} key={index}>{bin.bins_id}</SelectItem>
                                                            ))
                                                        }
                                                    </ScrollArea>
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
