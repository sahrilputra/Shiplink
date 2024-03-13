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
        const qty = form.watch(`items[${index}].itemQty`)
        const price = form.watch(`items[${index}].itemPrice`)
        form.setValue(`items[${index}].itemAmount`, qty * price)
        handleSubTotal();

    }, [form.watch(`items[${index}].itemQty`), form.watch(`items[${index}].itemPrice`), index])
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
                        name={`items[${index}].itemDescription`}
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="text-xs">
                                    <FormControl>
                                        <Input
                                            size="new"
                                            id="itemDescription" className="text-xs" placeholder="Description" {...field} />
                                    </FormControl>

                                </FormItem>
                            </>
                        )}
                    />
                </TableCell>
                <TableCell>
                    <FormField
                        className="w-[100px]"
                        name={`items[${index}].itemQty`}
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="text-xs">
                                    <FormControl>
                                        <Input
                                            size="new"
                                            id="itemQty" type="number" className="text-xs" placeholder="1" {...field} />
                                    </FormControl>
                                </FormItem>
                            </>
                        )}
                    />
                </TableCell>
                <TableCell>
                    <FormField
                        className="w-[10%]"
                        name={`items[${index}].itemPrice`}
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="text-xs">
                                    <FormControl>
                                        <Input
                                            size="new"
                                            id="itemPrice" type="number" className="text-xs text-right" placeholder="$ 00.00" {...field} />
                                    </FormControl>
                                </FormItem>
                            </>
                        )}
                    />
                </TableCell>
                <TableCell>
                    <p className='text-right'>$ {form.watch(`${`items[${index}].itemAmount`}`)}</p>
                    {/* <FormField
                        className="w-[10%]"
                        name={`items[${index}].itemAmount`}
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="text-xs">
                                    <FormControl>
                                        <Input
                                            size="new"
                                            id="itemAmount"
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
