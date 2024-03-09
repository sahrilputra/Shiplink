'use client'
/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { TableCell, TableRow } from '@/components/ui/tableDashboard'
import { CheckIcon, XIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import InputMask from 'react-input-mask';
import { v4 as uuidv4 } from 'uuid'
import CurrencyFormat from 'react-currency-format'

export const DeclareForms = ({
    forms,
    index,
    handleRemoveContent,
}) => {

    const setSubTotal = (value) => {
        // const qty = forms.getValues(`package_content[${index}].qty`);
        // console.log("🚀 ~ setSubTotal ~ qty:", qty)
        // const subTotal = qty * value;
        // console.log("🚀 ~ setSubTotal ~ subTotal:", subTotal)
        forms.setValue(`package_content[${index}].subTotal`, subTotal);
    }
    console.log("Subtotal: ", forms.getValues(`package_content[${index}].subTotal`))
    return (
        <>
            <TableRow className="text-xs px-2">
                <TableCell className="p-0 h-8 px-2 py-2 font-medium">
                    <FormField
                        className="w-full flex flex-row justify-center items-end"
                        name={`package_content[${index}].qty`}
                        control={forms.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full text-sm">
                                    <FormControl>
                                        <Input
                                            className="text-xs h-[30px] py-1 px-2 focus:ring-offset-0"
                                            id="qty"
                                            type="number"
                                            placeholder="1"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            </>
                        )}
                    />
                </TableCell>

                <TableCell className="p-0 h-8 px-2 py-2 ">
                    <FormField
                        className="w-full flex flex-row justify-center items-end"
                        name={`package_content[${index}].value`}
                        control={forms.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full text-sm">
                                    <FormControl>
                                        <CurrencyFormat
                                            className="text-xs h-[30px] py-1 px-2 focus:ring-offset-0"
                                            id="value"
                                            placeholder="$0.00"
                                            thousandSeparator={true}
                                            prefix="$"
                                            customInput={Input}
                                            onValueChange={(values) => {
                                                const { value } = values;
                                                const numericValue = parseFloat(value.replace(/\D/g, ''));
                                                field.onChange(numericValue);
                                                setSubTotal(values.floatValue);
                                            }}
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            </>
                        )}
                    />
                </TableCell>
                <TableCell className="p-0 h-8 px-2 py-2 ">
                    <FormField
                        className="w-full flex flex-row justify-center items-end"
                        name={`package_content[${index}].desc`}
                        control={forms.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full text-sm">
                                    <FormControl>
                                        <Input
                                            className="text-xs h-[30px] py-1 px-2 focus:ring-offset-0"
                                            id="desc"
                                            placeholder="Description" {...field} />
                                    </FormControl>
                                </FormItem>
                            </>
                        )}
                    />
                </TableCell >
                <TableCell className="p-0 h-8 px-2 py-2 ">
                    <FormField
                        className="w-full flex flex-row justify-center items-end"
                        name={`package_content[${index}].hs_desc`}
                        control={forms.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full text-sm">
                                    <FormControl>
                                        <Input
                                            className="text-xs h-[30px] py-1 px-2 focus:ring-offset-0"
                                            id="hs_desc" placeholder="HS Description" {...field} />
                                    </FormControl>
                                </FormItem>
                            </>
                        )}
                    />
                </TableCell >
                <TableCell className="p-0 h-8 px-2 py-2  w-[140px]">
                    <FormField
                        className="w-full flex flex-row justify-center items-end"
                        name={`package_content[${index}].hs_code`}
                        control={forms.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full text-xs">
                                    <FormControl>
                                        <InputMask
                                            mask="9999.99.9999" // Format yang diinginkan
                                            maskPlaceholder="0000.00.0000"
                                            className='text-xs h-[30px] pl-2'
                                            {...field}
                                        >
                                            {(inputProps) => (
                                                <Input
                                                    className="text-xs h-[30px] py-1 px-2 focus:ring-offset-0"
                                                    id="hs_code"
                                                    type="text"
                                                    placeholder="0000.00.0000"
                                                    {...inputProps}
                                                />
                                            )}
                                        </InputMask>

                                    </FormControl>
                                </FormItem>
                            </>
                        )}
                    />
                </TableCell>
                <TableCell className="p-0 h-8 px-2 py-2 w-[100px] ">
                    <FormField
                        className="w-full flex flex-row justify-center items-end"
                        name={`package_content[${index}].made_in`}
                        control={forms.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full text-sm">
                                    <FormControl>
                                        <Input
                                            max="3"
                                            className="text-xs h-[30px] py-1 px-2 focus:ring-offset-0 text-left uppercase"
                                            id="made_in" placeholder="CAN" {...field} />
                                    </FormControl>
                                </FormItem>
                            </>
                        )}
                    />
                </TableCell>
                <TableCell className="text-center  p-0 h-8 px-2 py-2 w-[40px] ">
                    {
                        index > 0 ? (
                            <div className="flex flex-row justify-between gap-2 w-full">
                                <Button
                                    variant="softBlue"
                                    type="button"
                                    size="tableIcon"
                                    className="px-1 py-1 w-6 h-6"
                                    onClick={handleRemoveContent}
                                >
                                    <XIcon className="w-4 h-4" />
                                </Button>
                            </div>
                        ) : (
                            <></>
                        )
                    }
                </TableCell>
            </TableRow>
        </>
    )
}
