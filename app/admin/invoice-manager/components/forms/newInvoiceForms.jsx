'use client'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import styles from '../../styles.module.scss'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/tableDashboard'
import { Delete } from 'lucide-react'

const formSchema = yup.object().shape({
    InvoiceNo: yup.string(),
    InvoiceDate: yup.string(),
    InvoiceCurrency: yup.string(),
    InvoiceTerms: yup.string(),
    BilledToName: yup.string().email(),
    BilledToAddress: yup.string().email(),
    BilledToZip: yup.string(),
    BilledToCountry: yup.string(),
    ShippedToName: yup.string(),
    ShippedToAddress: yup.string(),
    ShippedToZip: yup.string(),
    ShippedToCountry: yup.string(),
    note: yup.string(),
    userName: yup.string(),
    userEmails: yup.string().email(),
    itemDescription: yup.string(),
    itemQty: yup.string(),
    itemPrice: yup.string(),
    itemAmount: yup.string(),
    itemTax: yup.string(),
    itemTotal: yup.string(),
    itemDiscount: yup.string(),
    itemID: yup.string(),
})



export const InvoiceForms = () => {

    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            InvoiceNo: " ",
            InvoiceDate: " ",
            InvoiceCurrency: " ",
            InvoiceTerms: " ",
            BilledToName: " ",
            BilledToAddress: " ",
            BilledToZip: " ",
            BilledToCountry: " ",
            ShippedToName: " ",
            ShippedToAddress: " ",
            ShippedToZip: " ",
            ShippedToCountry: " ",
            note: "",
            userName: "",
            userEmails: "",
            itemDescription: "",
            itemQty: "",
            itemPrice: "",
            itemAmount: "",
            itemTax: "",
            itemTotal: "",
            itemDiscount: "",
            itemID: "",
        },
        mode: "onChange",
    })
    return (
        <>
            <Form {...form}>
                <form
                    className='flex w-full gap-3 flex-col text-zinc-600'
                    action="">

                    <div className="flex w-full gap-3 flex-row">
                        {/* Left Form */}
                        <div className="w-[70%] left flex flex-col gap-4">
                            <div className="flex flex-col justify-start gap-2 w-full">
                                <div className="nameWrapper flex flex-row gap-4 w-full text-sm">
                                    <FormField
                                        className="w-full text-sm"
                                        name="InvoiceNo"
                                        control={form.control}
                                        render={({ field }) => (
                                            <>
                                                <FormItem className="w-[50%] text-sm">
                                                    <FormLabel className="text-sm font-bold">Invoice No *</FormLabel>
                                                    <FormControl>
                                                        <Input id="InvoiceNo" className="text-sm" placeholder="Ex. C12345678" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </>
                                        )}
                                    />
                                    <FormField
                                        name="InvoiceDate"
                                        className="w-[60%] text-sm"
                                        control={form.control}
                                        render={({ field }) => (
                                            <>
                                                <FormItem className="w-full text-sm">
                                                    <FormLabel className="text-sm font-bold">Invoice Date</FormLabel>
                                                    <FormControl>
                                                        <Input id="InvoiceDate" className="text-sm" placeholder="Select Date" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </>
                                        )}
                                    />
                                </div>
                                <div className="nameWrapper flex flex-row gap-4 w-[100%] text-sm ">
                                    <FormField
                                        className="w-[40%] text-sm"
                                        name="InvoiceCurrency"
                                        control={form.control}
                                        render={({ field }) => (
                                            <>
                                                <FormItem className="w-[50%] text-sm">
                                                    <FormLabel className="text-sm font-bold">Phone Number</FormLabel>
                                                    <FormControl>
                                                        <Input id="InvoiceCurrency" type="number" className="text-sm" placeholder="Currency" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </>
                                        )}
                                    />
                                    <FormField
                                        name="InvoiceTerms"
                                        className="w-full text-sm"
                                        control={form.control}
                                        render={({ field }) => (
                                            <>
                                                <FormItem className="w-full text-sm">
                                                    <FormLabel className="text-sm font-bold">Email</FormLabel>
                                                    <FormControl>
                                                        <Input id="InvoiceTerms" type="text" className="text-sm" placeholder="Select Currency" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="w-full">
                                <Separator className="h-[2px]" />
                            </div>

                            <div className="flex flex-row justify-between gap-3">

                                {/* billedTo */}
                                <div className="flex flex-col gap-2">
                                    <h2 className='text-base font-bold'>Billed To</h2>
                                    <div className="flex flex-row justify-between gap-3">
                                        <FormField
                                            className="w-full"
                                            name="BilledToName"
                                            control={form.control}
                                            render={({ field }) => (
                                                <>
                                                    <FormItem className="text-sm">
                                                        <FormLabel className="text-sm font-bold text-zinc-600">Barcode / Tracking</FormLabel>
                                                        <FormControl>
                                                            <Input id="BilledToName" className="text-sm" placeholder="Name" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                </>
                                            )}
                                        />
                                        <FormField
                                            className="w-full"
                                            name="BilledToZip"
                                            control={form.control}
                                            render={({ field }) => (
                                                <>
                                                    <FormItem className="text-sm">
                                                        <FormLabel className="text-sm font-bold text-zinc-600">Zip/Postal Code *</FormLabel>
                                                        <FormControl>
                                                            <Input id="BilledToZip" className="text-sm" placeholder="Eg. SA4S21JK21" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                </>
                                            )}
                                        />
                                    </div>
                                    <div className="flex flex-row justify-between gap-3">
                                        <FormField
                                            className="w-full"
                                            name="BilledToAddress"
                                            control={form.control}
                                            render={({ field }) => (
                                                <>
                                                    <FormItem className="text-sm">
                                                        <FormLabel className="text-sm font-bold text-zinc-600">Address</FormLabel>
                                                        <FormControl>
                                                            <Input id="BilledToAddress" className="text-sm" placeholder="Adress" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                </>
                                            )}
                                        />
                                        <FormField
                                            className="w-full"
                                            name="BilledToCountry"
                                            control={form.control}
                                            render={({ field }) => (
                                                <>
                                                    <FormItem className="w-[60%] text-sm">
                                                        <FormLabel className="text-sm font-bold text-zinc-600">Country</FormLabel>
                                                        <FormControl>
                                                            <Input id="BilledToCountry" className="text-sm" placeholder="Canada" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                </>
                                            )}
                                        />
                                    </div>
                                </div>


                                {/* shiipedTo */}
                                <div className="flex flex-col gap-2">
                                    <h2 className='text-base font-bold'>Shipped To</h2>
                                    <div className="flex flex-row justify-between gap-3">
                                        <FormField
                                            className="w-full"
                                            name="ShippedToName"
                                            control={form.control}
                                            render={({ field }) => (
                                                <>
                                                    <FormItem className="text-sm">
                                                        <FormLabel className="text-sm font-bold text-zinc-600">Barcode / Tracking</FormLabel>
                                                        <FormControl>
                                                            <Input id="ShippedToName" className="text-sm" placeholder="Name" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                </>
                                            )}
                                        />
                                        <FormField
                                            className="w-full"
                                            name="ShippedToZip"
                                            control={form.control}
                                            render={({ field }) => (
                                                <>
                                                    <FormItem className="text-sm">
                                                        <FormLabel className="text-sm font-bold text-zinc-600">Zip/Postal Code *</FormLabel>
                                                        <FormControl>
                                                            <Input id="ShippedToZip" className="text-sm" placeholder="Eg. SA4S21JK21" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                </>
                                            )}
                                        />
                                    </div>
                                    <div className="flex flex-row justify-between gap-3">
                                        <FormField
                                            className="w-full"
                                            name="ShippedToAddress"
                                            control={form.control}
                                            render={({ field }) => (
                                                <>
                                                    <FormItem className="text-sm">
                                                        <FormLabel className="text-sm font-bold text-zinc-600">Address</FormLabel>
                                                        <FormControl>
                                                            <Input id="ShippedToAddress" className="text-sm" placeholder="Adress" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                </>
                                            )}
                                        />
                                        <FormField
                                            className="w-full"
                                            name="ShippedToCountry"
                                            control={form.control}
                                            render={({ field }) => (
                                                <>
                                                    <FormItem className="w-[60%] text-sm">
                                                        <FormLabel className="text-sm font-bold text-zinc-600">Country</FormLabel>
                                                        <FormControl>
                                                            <Input id="ShippedToCountry" className="text-sm" placeholder="Canada" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                </>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full">
                                <Separator className="h-[2px]" />
                            </div>

                            <div className="note flex flex-col justify-start gap-2 w-full">
                                <FormField
                                    className="w-full"
                                    name="note"
                                    control={form.control}
                                    render={({ field }) => (
                                        <>
                                            <FormItem className="text-sm">
                                                <FormLabel className="text-sm font-bold text-zinc-600">Note</FormLabel>
                                                <FormControl>
                                                    <Input id="note" className="text-sm" placeholder="Note" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        </>
                                    )}
                                />
                            </div>

                        </div>

                        {/* Right Form */}
                        <div className={`${styles.rightForms} w-[30%] flex flex-col px-2 py-2 `}>
                            <div className="px-3 py-2">
                                <p className='text-base font-bold '>Send Invoice To</p>
                            </div>

                            <div className="flex flex-col w-full gap-2 px-3">
                                <FormField
                                    className="w-full"
                                    name="userName"
                                    control={form.control}
                                    render={({ field }) => (
                                        <>
                                            <FormItem className="text-sm">
                                                <FormLabel className="text-sm font-bold text-zinc-600">User Name</FormLabel>
                                                <FormControl>
                                                    <Input id="userName" className="text-sm" placeholder="UserName" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        </>
                                    )}
                                />
                                <FormField
                                    className="w-full"
                                    name="userEmails"
                                    control={form.control}
                                    render={({ field }) => (
                                        <>
                                            <FormItem className=" text-sm">
                                                <FormLabel className="text-sm font-bold text-zinc-600">Emails</FormLabel>
                                                <FormControl>
                                                    <Input id="userEmails" type="emails" className="text-sm" placeholder="Emails" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        </>
                                    )}
                                />

                                <div className="button-group flex flex-col gap-2 py-3 w-full mx-auto">
                                    <div className="flex flex-row justify-between gap-3">
                                        <Button
                                            variant="redOutline"
                                            size="sm"
                                            className="w-full"
                                        >
                                            <p className='text-xs'>Preview</p>
                                        </Button>
                                        <Button
                                            variant="redOutline"
                                            size="sm"
                                            className="w-full"
                                        >
                                            <p className='text-xs'>Download</p>
                                        </Button>
                                    </div>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                    >
                                        <p className='text-xs'>Send</p>
                                    </Button>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Table */}
                    <div className="w-full">
                        <Table>
                            <TableCaption>A list of your recent invoices.</TableCaption>
                            <TableHeader>
                                <TableHead className="w-[100px]">#</TableHead>
                                <TableHead>Item Name</TableHead>
                                <TableHead>Qty</TableHead>
                                <TableHead className="text-center">Price</TableHead>
                                <TableHead className="text-center">Total</TableHead>
                                <TableHead className="text-center"></TableHead>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium">
                                        <FormField
                                            className="w-full"
                                            name="itemID"
                                            control={form.control}
                                            render={({ field }) => (
                                                <>
                                                    <FormItem className="text-sm">
                                                        <FormControl>
                                                            <Input id="itemID" className="text-sm" placeholder="1" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                </>
                                            )}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <FormField
                                            className="w-full"
                                            name="itemDescription"
                                            control={form.control}
                                            render={({ field }) => (
                                                <>
                                                    <FormItem className="text-sm">
                                                        <FormControl>
                                                            <Input id="itemDescription" className="text-sm" placeholder="Description" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                </>
                                            )}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <FormField
                                            className="w-full"
                                            name="itemQty"
                                            control={form.control}
                                            render={({ field }) => (
                                                <>
                                                    <FormItem className="text-sm">
                                                        <FormControl>
                                                            <Input id="itemQty" type="number" className="text-sm" placeholder="1" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                </>
                                            )}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <FormField
                                            className="w-full"
                                            name="itemPrice"
                                            control={form.control}
                                            render={({ field }) => (
                                                <>
                                                    <FormItem className="text-sm">
                                                        <FormControl>
                                                            <Input id="itemPrice" type="number" className="text-sm" placeholder="$ 00.00" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                </>
                                            )}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <FormField
                                            className="w-full"
                                            name="itemAmount"
                                            control={form.control}
                                            render={({ field }) => (
                                                <>
                                                    <FormItem className="text-sm">
                                                        <FormControl>
                                                            <Input id="itemAmount" type="number" className="text-sm" placeholder="$ 00.00" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                </>
                                            )}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="tableBlue"
                                            className=" px-[5px] h-[25px] text-[11px] text-myBlue flex flex-row justify-center gap-1 items-center">
                                            <Delete width={15} height={15} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow colSpan={8}>
                                    <TableCell colSpan={8}>
                                        <Button
                                            variant="tableBlue"
                                            className=" px-[5px] h-[35px] text-[11px] text-myBlue flex flex-row justify-center gap-1 items-center">
                                            <p>Add Other Content</p>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

                </form>
            </Form >
        </>
    )
}
