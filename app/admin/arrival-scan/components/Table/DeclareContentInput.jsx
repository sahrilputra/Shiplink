import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { TableCell, TableRow } from '@/components/ui/tableDashboard'
import { CheckIcon, XIcon } from 'lucide-react'
import React from 'react'

export const DeclareContentInput = ({ index, remove, forms, items }) => {
    return (
        <>
            <TableRow className="text-xs">
                <TableCell className="p-0 h-8 px-5 py-2 font-medium">
                    <FormField
                        className="w-full flex flex-row justify-center items-end"
                        name={`DeclareContet[${index}].qty`}
                        control={forms.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full text-sm">
                                    <FormControl>
                                        <Input id="width" className="text-xs h-9 py-0" type="number" placeholder="0" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </>
                        )}
                    />
                </TableCell>
                <TableCell className="p-0 h-8 px-5 py-2 ">
                    <FormField
                        className="w-full flex flex-row justify-center items-end"
                        name={`DeclareContet[${index}].value`}
                        control={forms.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full text-sm">
                                    <FormControl>
                                        <Input id="value" className="text-xs h-9 py-0" type="number" placeholder="0" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </>
                        )}
                    />
                </TableCell>
                <TableCell className="p-0 h-8 px-5 py-2 ">
                    <FormField
                        className="w-full flex flex-row justify-center items-end"
                        name={`DeclareContet[${index}].description`}
                        control={forms.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full text-sm">
                                    <FormControl>
                                        <Input id="description" className="text-xs h-9 py-0" placeholder="Description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </>
                        )}
                    />
                </TableCell >
                <TableCell className="p-0 h-8 px-5 py-2 ">
                    <FormField
                        className="w-full flex flex-row justify-center items-end"
                        name={`DeclareContet[${index}].hsDescription`}
                        control={forms.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full text-sm">
                                    <FormControl>
                                        <Input id="hsDescription" className="text-xs h-9 py-0" placeholder="HS Description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </>
                        )}
                    />
                </TableCell >
                <TableCell className="p-0 h-8 px-5 py-2 ">
                    <FormField
                        className="w-full flex flex-row justify-center items-end"
                        name={`DeclareContet[${index}].hsCode`}
                        control={forms.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full text-sm">
                                    <FormControl>
                                        <Input id="hsCode" className="text-xs h-9 py-0" type="number" placeholder="0" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </>
                        )}
                    />
                </TableCell>
                <TableCell className="p-0 h-8 px-5 py-2 ">
                    <FormField
                        className="w-full flex flex-row justify-center items-end"
                        name={`DeclareContet[${index}].madeIn`}
                        control={forms.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full text-sm">
                                    <FormControl>
                                        <Input id="madeIn" className="text-xs h-9 py-0" placeholder="CAD" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </>
                        )}
                    />
                </TableCell>
                <TableCell className="text-right w-[70px] p-0 h-8 px-5 py-2 ">
                    {
                        index > 0 ? (
                            <div className="flex flex-row justify-between gap-2 w-full">
                                <Button
                                    variant="softBlue"
                                    type="button"
                                    size="tableIcon"
                                    onClick={(e) => {
                                        remove()
                                        e.preventDefault()
                                    }}
                                    className="px-1 py-1 w-6 h-6"
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
