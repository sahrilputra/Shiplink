'use client'
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/tableDashboard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DeclareForms } from './DeclareForms'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'

export const DeclareContentInputs = ({
    forms,
    fields,
    append,
    remove,
    total,
    binData,
    data,
    package_id,
}) => {


    console.log("🚀 ~ package_content:", data)
    const router = useRouter()

    const handleBack = () => {
        if (window.history.length > 1) {
            router.back()
        } else {
            router.push(`/admin/package-details/${package_id}`)
        }
    }
    useEffect(() => {
        const subTotal = forms.watch('package_content.subTotal')
        console.log('subTotal', subTotal)
    }, [forms])
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
                        <DeclareForms
                            key={field.id}
                            index={index}
                            forms={forms}
                            handleRemoveContent={() => remove(index)}
                            data={data}
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
                                    itemID: '',
                                    qty: 1,
                                    value: 1,
                                    desc: '',
                                    hs_desc: '',
                                    hs_code: '',
                                    made_in: '',
                                    subTotal: 1,
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
                                <p className=' text-sm font-semibold'>${total}</p>

                            </div>
                            <div className="flex flex-row justify-center gap-4">
                                {/* <FormField
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
                                /> */}
                                {/* <NextLink passHref href={`/admin/package-details`}> */}
                                <Button
                                    variant="redOutline"
                                    type="button"
                                    className=" h-[30px] rounded-sm px-4 py-0"
                                    size="sm"
                                    onClick={() => handleBack()}
                                >
                                    <p className='text-xs'>Cancel</p>
                                </Button>
                                {/* </NextLink> */}
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
