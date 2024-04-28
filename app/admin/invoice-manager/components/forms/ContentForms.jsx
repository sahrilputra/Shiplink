/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/tableDashboard'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import { CalendarIcon, CheckIcon, Delete } from 'lucide-react'
import { Input } from '@/components/ui/input'
export const ContentForms = ({ form, index, field, remove, handleSubTotal }) => {

    useEffect(() => {
        const qty = form.watch(`items[${index}].qty`)
        const price = form.watch(`items[${index}].price`)
        form.setValue(`items[${index}].total`, qty * price)
        handleSubTotal();

    }, [form.watch(`items[${index}].qty`), form.watch(`items[${index}].price`), index])
    return (
        <>
            <TableRow
                index={index}
            >
                <TableCell className="font-medium">
                    <FormField
                        className="w-full"
                        name={`items[${index}].itemID`}
                        control={form.control}
                        disabled={true}
                        render={({ field }) => (
                            <>
                                <FormItem className="text-xs">
                                    <FormControl>
                                        <Input
                                            size="new"
                                            id="itemID" className="text-xs" placeholder="1" {...field} />
                                    </FormControl>

                                </FormItem>
                            </>
                        )}
                    />
                </TableCell>
                <TableCell>
                    <FormField
                        className="w-full"
                        name={`items[${index}].description`}
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="text-xs">
                                    <FormControl>
                                        <Input
                                            size="new"
                                            id="description" className="text-xs" placeholder="Description" {...field} />
                                    </FormControl>

                                </FormItem>
                            </>
                        )}
                    />
                </TableCell>
                <TableCell>
                    <FormField
                        className="w-[100px]"
                        name={`items[${index}].qty`}
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="text-xs">
                                    <FormControl>
                                        <Input
                                            size="new"
                                            id="qty" type="number" className="text-xs" placeholder="1" {...field} />
                                    </FormControl>
                                </FormItem>
                            </>
                        )}
                    />
                </TableCell>
                <TableCell>
                    <FormField
                        className="w-[10%]"
                        name={`items[${index}].price`}
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="text-xs">
                                    <FormControl>
                                        <Input
                                            size="new"
                                            id="price" type="number" className="text-xs text-right" placeholder="$ 00.00" {...field} />
                                    </FormControl>
                                </FormItem>
                            </>
                        )}
                    />
                </TableCell>
                <TableCell>
                    <p className='text-right'>$ {form.watch(`${`items[${index}].total`}`)}</p>
                    {/* <FormField
                        className="w-[10%]"
                        name={`items[${index}].total`}
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="text-xs">
                                    <FormControl>
                                        <Input
                                            size="new"
                                            id="total"
                                            type="number"
                                            className="text-xs text-right"
                                            placeholder="$ 00.00" {...field} />
                                    </FormControl>
                                </FormItem>
                            </>
                        )}
                    /> */}
                </TableCell>
                <TableCell className="w-[50px]">
                    {
                        index > 0 && (
                            <Button
                                onClick={() => {
                                    remove(),
                                    handleSubTotal()
                                }}
                                variant="tableBlue"
                                size="xs"
                                type='button'
                                className=" px-[5px] h-[25px] text-[11px] text-myBlue flex flex-row justify-center gap-1 items-center">
                                <Delete width={15} height={15} />
                            </Button>
                        )
                    }
                </TableCell>
            </TableRow>
        </>
    )
}
