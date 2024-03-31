'use client'
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useForm, useFieldArray } from 'react-hook-form'
import styles from '../../styles.module.scss'
import InputMask from 'react-input-mask';
import { Calendar } from "@/components/ui/calendar"
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
import { CalendarIcon, CheckIcon, Delete } from 'lucide-react'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import axios from 'axios';
import { Loaders } from '@/components/ui/loaders'
import { format } from "date-fns"
import { ContentForms } from './ContentForms'

const formSchema = yup.object().shape({
    InvoiceNo: yup.string(),
    InvoiceDate: yup.string(),
    InvoiceCurrency: yup.string(),
    InvoiceTerms: yup.string(),
    BilledToName: yup.string(),
    BilledToAddress: yup.string(),
    BilledToZip: yup.string(),
    BilledToCountry: yup.string(),
    ShippedToName: yup.string(),
    ShippedToAddress: yup.string(),
    ShippedToZip: yup.string(),
    ShippedToCountry: yup.string(),
    note: yup.string(),
    userName: yup.string(),
    userID: yup.string(),
    userPhone: yup.string(),
    userEmails: yup.string().email(),
    items: yup.array().of(
        yup.object().shape({
            itemDescription: yup.string(),
            itemQty: yup.number(),
            itemPrice: yup.number(),
            itemAmount: yup.number(),
            itemID: yup.string(),
        })
    ),
    subtotal: yup.number(),
    itemTax: yup.number(),
    itemTotal: yup.number(),
    itemDiscount: yup.number(),
})



export const InvoiceForms = ({ customer = null, data = null }) => {
    const today = format(new Date(), "yyyy-MM-dd");
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            InvoiceNo: "",
            InvoiceDate: today || "",
            InvoiceCurrency: "",
            InvoiceTerms: "",
            BilledToName: "",
            BilledToAddress: "",
            BilledToZip: "",
            BilledToCountry: "",
            ShippedToName: "",
            ShippedToAddress: "",
            ShippedToZip: "",
            ShippedToCountry: "",
            note: "",
            userName: "",
            userID: "",
            userCode: "",
            userPhone: "",
            userEmails: "",
            items: [
                {
                    itemDescription: "",
                    itemQty: 0,
                    itemPrice: 0,
                    itemAmount: 0,
                    itemID: "",
                }
            ],
            subtotal: 0,
            itemTax: 0,
            itemTotal: 0,
            itemDiscount: 0,

        },
        mode: "onChange",
    })

    const [customerData, setCustomerData] = useState([])
    const [loading, setLoading] = useState(false);
    const [taxList, setTaxList] = useState([]);
    const [query, setQuery] = useState({
        keyword: "",
        page: 1,
        limit: 0,
        index: 0
    });


    const [taxQuery, setTaxQuery] = useState({
        keyword: "",
        page: 1,
        limit: 0,
        index: 0
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    `/api/admin/customer_manager/list`,
                    query
                );
                console.log(response)
                const data = await response.data;
                console.log("🚀 ~ fetchData ~ data:", data)
                if (customer) {
                    const findCustomer = data.customer.find(item => item.customer_id === customer)
                    console.log("🚀 ~ fetchData ~ findCustomer:", findCustomer)
                    form.setValue("userName", findCustomer.customer_name)
                    form.setValue("userID", findCustomer.customer_id)
                    form.setValue("userEmails", findCustomer.email)
                    form.setValue("ShippedToName", findCustomer.customer_name)
                    form.setValue("ShippedToAddress", findCustomer.address)
                    form.setValue("ShippedToZip", findCustomer.postal_code)
                    form.setValue("ShippedToCountry", findCustomer.country_name)
                }
                setCustomerData(data.customer);
            } catch (error) {
                console.log('Error:', error);
            }
        };
        fetchData();

        if (data) {
            form.setValue(`items[0].itemDescription`, `Logistic Service For Package : ${data.tracking_id}`)
            form.setValue(`items[0].itemQty`, 1)
            form.setValue(`items[0].itemPrice`, data.total_price)
        }

    }, [query, data]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    `/api/admin/config/tax/list`,
                    taxQuery
                );
                console.log("🚀 ~ fetchData ~ response:", response)
                const data = await response.data;
                setTaxList(data.tax);
            } catch (error) {
                console.log('Error:', error);
            }
        };
        fetchData();
    }, [taxQuery])

    const { watch, getValues, setValue } = form;

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "items",
    });

    console.log("🚀 ~ InvoiceForms ~ fields:", fields)

    const items = watch('items');
    const itemTax = parseFloat(watch('itemTax') || 0);
    const itemDiscount = parseFloat(watch('itemDiscount') || 0);
    const [subTotal, setSubTotal] = useState(0);
    console.log("🚀 ~ InvoiceForms ~ subTotal:", subTotal)

    const onError = (error) => {
        console.log("Form Errors", error)
    }

    const handleSave = async (formData) => {
        console.log(formData)
        setLoading(true);
        try {
            const response = await axios.post(
                `/api/admin/invoice/setData`,
                formData
            );
            console.log("response from invoice manager : ", response.data)
            if (response.status === 200) {
                setLoading(false);
                console.log("Data has been saved")
            }
        } catch (error) {
            setLoading(false);
            console.log('Error:', error);
        }
    }

    const handleSubTotal = () => {
        console.log('running counting subtotal')
        let total = 0;
        fields.map((item, index) => {
            const itemAmount = form.watch(`items[${index}].itemAmount`)
            total += parseFloat(itemAmount)
        })
        setSubTotal(total)
        form.setValue('subtotal', total)
    }
    // Totals
    useEffect(() => {
        const calculateTotal = () => {

            // Apply tax
            const taxAmount = (form.getValues('subtotal') * form.getValues('itemTax')) / 100;

            // Apply discount
            const discountAmount = (form.getValues('subtotal') * form.getValues('itemDiscount')) / 100;

            // Calculate total
            const total = form.getValues('subtotal') + taxAmount - discountAmount;
            setValue("itemTotal", total);
            return total;
        };
        calculateTotal();
    }, [form.watch('subtotal'), form.watch('itemTax'), form.watch('itemDiscount')]);

    return (
        <>
            {
                loading && <Loaders />
            }
            <Form {...form}>
                <form

                    className='flex w-full gap-3 flex-col text-zinc-600'
                    action=""
                    onSubmit={form.handleSubmit(handleSave, onError)}
                >

                    <div className="flex w-full gap-3 flex-row">
                        {/* Left Form */}
                        <div className="w-[70%] left flex flex-col gap-2">
                            <div className="flex flex-col justify-start gap-2 w-full">
                                <div className="nameWrapper flex flex-row gap-2 w-full text-xs">
                                    <FormField
                                        className="w-full text-xs"
                                        name="InvoiceNo"
                                        control={form.control}
                                        render={({ field }) => (
                                            <>
                                                <FormItem className="space-y-1 w-[50%]">
                                                    <FormLabel className="text-xs font-bold">Invoice No *</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            size="new"
                                                            disabled={true}
                                                            id="InvoiceNo" className="text-xs" placeholder="Ex. C12345678" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </>
                                        )}
                                    />
                                    <FormField
                                        className="w-full text-xs"
                                        name="InvoiceCurrency"
                                        control={form.control}
                                        render={({ field }) => (
                                            <>
                                                <FormItem className="space-y-1 w-[50%]">
                                                    <FormLabel className="text-xs font-bold ">Select Currency</FormLabel>
                                                    <Select
                                                        className="w-full text-xs h-[30px]"
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger className="text-xs h-[30px] rounded-sm">
                                                                <SelectValue
                                                                    className="w-full text-xs h-[30px]"
                                                                    placeholder="Select currency"
                                                                />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem className="text-xs" value="CAD">CAD</SelectItem>
                                                            <SelectItem className="text-xs" value="USD">USD</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            </>
                                        )}
                                    />
                                    <FormField
                                        className="w-full text-xs"
                                        name="InvoiceTerms"
                                        control={form.control}
                                        render={({ field }) => (
                                            <>
                                                <FormItem className="space-y-1 w-[100%]">
                                                    <FormLabel className="text-xs font-bold ">Terms</FormLabel>
                                                    <Select
                                                        className="w-full text-xs h-[30px]"
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger className="text-xs h-[30px] rounded-sm">
                                                                <SelectValue
                                                                    className="w-full text-xs h-[30px]"
                                                                    placeholder="Select terms"
                                                                />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem className="text-xs" value="Today">Today</SelectItem>
                                                            <SelectItem className="text-xs" value="Next 30 Days">Next 30 Days</SelectItem>
                                                            <SelectItem className="text-xs" value="End of the month">End Of The Month</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            </>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        className="w-[100%] text-xs"
                                        name="InvoiceDate"
                                        render={({ field }) => (
                                            <FormItem className="space-y-1 w-full text-xs flex flex-col ">
                                                <FormLabel className="text-xs font-bold">Invoice Date</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={"outline"}
                                                                className={`w-[100%] pl-3 text-left text-xs shadow-none h-[30px] font-normal ${!field.value && "text-muted-foreground"}`}
                                                            >
                                                                {field.value ? (
                                                                    format(field.value, "yyyy-MM-dd")
                                                                ) : (
                                                                    <span>Pick a date</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage className="text-xs" />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                            </div>

                            <div className="w-full">
                                <Separator className="h-[2px]" />
                            </div>

                            <div className="flex flex-row justify-between gap-3">
                                {/* billedTo */}
                                <div className="flex flex-col gap-1  w-full">
                                    <h2 className='text-sm font-bold'>Billed To</h2>
                                    <div className="flex flex-row justify-between gap-2">
                                        <FormField
                                            className="w-full"
                                            name="BilledToName"
                                            control={form.control}
                                            render={({ field }) => (
                                                <>
                                                    <FormItem className="text-xs space-y-1 w-full">
                                                        <FormLabel className="text-xs font-bold text-zinc-600">Name</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                size="new"
                                                                id="BilledToName"
                                                                className="text-xs"
                                                                placeholder="Name"
                                                                {...field} />
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
                                                    <FormItem className="text-xs space-y-1 w-full">
                                                        <FormLabel className="text-xs font-bold text-zinc-600">Zip/Postal Code *</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                size="new"
                                                                id="BilledToZip" className="text-xs" placeholder="Eg. SA4S21JK21" {...field} />
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
                                                    <FormItem className="text-xs space-y-1 w-full">
                                                        <FormLabel className="text-xs font-bold text-zinc-600">Address</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                size="new"
                                                                id="BilledToAddress" className="text-xs" placeholder="Adress" {...field} />
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
                                                    <FormItem className="text-xs space-y-1 w-full">
                                                        <FormLabel className="text-xs font-bold text-zinc-600">Country</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                size="new"
                                                                id="BilledToCountry" className="text-xs" placeholder="Canada" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                </>
                                            )}
                                        />
                                    </div>
                                </div>


                                {/* shiipedTo */}
                                <div className="flex flex-col gap-1 w-full">
                                    <h2 className='text-sm font-bold'>Shipped To</h2>
                                    <div className="flex flex-row justify-between gap-3">
                                        <FormField
                                            className="w-full "
                                            name="ShippedToName"
                                            control={form.control}
                                            render={({ field }) => (
                                                <>
                                                    <FormItem className="text-xs space-y-1 w-full">
                                                        <FormLabel className="text-xs font-bold text-zinc-600">Name</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                size="new"
                                                                id="ShippedToName"
                                                                className="text-xs"
                                                                placeholder="Name"
                                                                {...field} />
                                                        </FormControl>
                                                        <FormMessage className="text-xs" />
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
                                                    <FormItem className="text-xs space-y-1 w-full">
                                                        <FormLabel className="text-xs font-bold text-zinc-600">Zip/Postal Code *</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                size="new"
                                                                id="ShippedToZip" className="text-xs" placeholder="Eg. SA4S21JK21" {...field} />
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
                                                    <FormItem className="text-xs space-y-1 w-full">
                                                        <FormLabel className="text-xs font-bold text-zinc-600">Address</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                size="new"
                                                                id="ShippedToAddress" className="text-xs" placeholder="Adress" {...field} />
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
                                                    <FormItem className=" text-xs space-y-1 w-full">
                                                        <FormLabel className="text-xs font-bold text-zinc-600">Country</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                size="new"
                                                                id="ShippedToCountry" className="text-xs" placeholder="Canada" {...field} />
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
                                            <FormItem className="text-xs space-y-1">
                                                <FormLabel className="text-xs font-bold  text-zinc-600">Note</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        size="new"
                                                        id="note" className="text-xs" placeholder="Note" {...field} />
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
                                    control={form.control}
                                    name="userName"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Customer </FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            size="new"
                                                            className={`w-[full] text-xs h-[30px] rounded-sm px-2 py-0 text-left justify-start ${!field.value && "text-muted-foreground"}`}
                                                        >
                                                            {field.value ? field.value : "Customer"}
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[300px] p-0">
                                                    <Command>
                                                        <CommandInput
                                                            placeholder="Search Customer..."
                                                            className="h-9 text-xs w-full"
                                                        />
                                                        <CommandEmpty className="text-xs text-center">No Customer found.</CommandEmpty>
                                                        <CommandGroup>
                                                            {customerData.map((item) => (
                                                                <CommandItem
                                                                    value={item.customer_name}
                                                                    key={item.customer_id}
                                                                    onSelect={() => {
                                                                        form.setValue("userName", item.customer_name)
                                                                        form.setValue("userID", item.customer_id)
                                                                        form.setValue("userEmails", item.email)
                                                                    }}
                                                                >
                                                                    <div className='text-xs w-full justify-between flex flex-row'>
                                                                        <p>{item.customer_id} | </p>
                                                                        <p>{item.customer_name}</p>
                                                                    </div>
                                                                    <CheckIcon
                                                                        className={cn(
                                                                            "ml-auto h-4 w-4",
                                                                            item.customer_name === field.value
                                                                                ? "opacity-100"
                                                                                : "opacity-0"
                                                                        )}
                                                                    />
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    className="w-full"
                                    name="userEmails"
                                    control={form.control}
                                    render={({ field }) => (
                                        <>
                                            <FormItem className=" text-xs space-y-1">
                                                <FormLabel className="text-xs font-bold text-zinc-600">Emails</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        size="new"
                                                        id="userEmails" type="emails" className="text-xs" placeholder="Emails" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        </>
                                    )}
                                />

                                <div className="button-group flex flex-col gap-2 py-2 w-full mx-auto">
                                    <div className="flex flex-row justify-between gap-3">
                                        {/* <Button
                                            variant="redOutline"
                                            type="button"
                                            className=" h-[30px] w-full rounded-sm px-4 py-0"
                                            size="sm"

                                        >
                                            <p className='text-xs'>Preview</p>
                                        </Button> */}
                                        {/* <Button
                                            variant="redOutline"
                                            type="button"
                                            className=" h-[30px] w-full rounded-sm px-4 py-0"
                                            size="sm"
                                        >
                                            <p className='text-xs'>Download</p>
                                        </Button> */}
                                    </div>
                                    <Button
                                        variant="destructive"
                                        type="submit"
                                        className=" h-[30px] rounded-sm px-4 py-0"
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
                            <TableHeader>
                                <TableHead className="w-[100px]">#</TableHead>
                                <TableHead>Item Name</TableHead>
                                <TableHead className="w-[100px]">Qty</TableHead>
                                <TableHead className="text-center w-[10%]">Price</TableHead>
                                <TableHead className="text-center w-[10%]">Total</TableHead>
                                <TableHead className="text-center"></TableHead>
                            </TableHeader>
                            <TableBody>
                                {
                                    fields.map((field, index) => (
                                        <ContentForms
                                            handleSubTotal={handleSubTotal}
                                            key={field.id}
                                            form={form}
                                            index={index}
                                            field={field}
                                            remove={() => remove(index)}
                                        />
                                    ))
                                }

                                <TableRow colSpan={8}>
                                    <TableCell colSpan={8}>
                                        <Button
                                            variant="softBlue"
                                            size="sm"
                                            type="button"
                                            className="px-4 h-7 py-3"
                                            onClick={() => {
                                                append({
                                                    itemID: fields.length + 1,
                                                    itemQty: 0,
                                                    itemPrice: 0,
                                                    itemAmount: 0,
                                                    itemDescription: "",
                                                })
                                            }}
                                        >
                                            <p className='text-xs'>Add Other Content</p>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>


                        <div className="w-full flex justify-end py-2">
                            <div className="w-[30%] flex justify-end flex-col gap-2 px-5">
                                <div className="flex flex-row justify-between items-center ">
                                    <p className='font-bold text-myBlue'>Subtotal</p>
                                    <p className='font-bold text-myBlue'>$ {form.watch('subtotal')}</p>
                                </div>
                                <Separator className="w-full" />
                                <div className="flex flex-row justify-between items-center ">
                                    <p className='font-bold w-full text-myBlue'>Discount</p>
                                    <div className="w-[50%]">
                                        <FormField
                                            name="itemDiscount"
                                            control={form.control}
                                            render={({ field }) => (
                                                <>
                                                    <FormItem className=" text-sm  space-y-1 flex flex-row items-center">
                                                        <p className='font-bold text-myBlue text-sm px-2'>%</p>
                                                        <FormControl className='flex flex-row items-center w-full'>
                                                            <Input
                                                                size="new"
                                                                id="itemDiscount"
                                                                className="text-xs "
                                                                type="number"
                                                                min="0"
                                                                placeholder="Add Discount"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                    </FormItem>
                                                </>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-row justify-between items-center ">
                                    <p className='font-bold w-full text-myBlue'>Tax</p>
                                    <div className="w-[50%]">
                                        <FormField
                                            className="w-full text-xs"
                                            name="itemTax"
                                            control={form.control}
                                            render={({ field }) => (
                                                <>
                                                    <FormItem className="space-y-1 w-[100%]">
                                                        <Select
                                                            className="w-full text-xs h-[30px]"
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger className="text-xs h-[30px] rounded-sm">
                                                                    <SelectValue
                                                                        className="w-full text-xs h-[30px]"
                                                                        placeholder={`Select Tax`}
                                                                    />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {
                                                                    taxList
                                                                        ?.filter((item, index, self) => self.findIndex(t => t.tax_rate === item.tax_rate) === index)
                                                                        .map((item, index) => (
                                                                            <SelectItem
                                                                                key={index}
                                                                                value={item?.tax_rate}
                                                                                className="text-xs"
                                                                                onClick={() => {
                                                                                    form.setValue('itemTax', item?.tax_rate)
                                                                                }}
                                                                            >
                                                                                {item?.tax_rate}
                                                                            </SelectItem>
                                                                        ))
                                                                }
                                                            </SelectContent>
                                                        </Select>
                                                    </FormItem>
                                                </>
                                            )}
                                        />
                                    </div>
                                </div>
                                <Separator className="w-full" />
                                <div className="flex flex-row justify-between items-center ">
                                    <p className='font-bold w-full text-myBlue'>Total Due</p>
                                    <p className='font-bold text-myBlue text-sm px-2 w-[50%]'>$ {form.getValues('itemTotal')}</p>
                                </div>
                            </div>

                        </div>
                    </div>

                </form>
            </Form >
        </>
    )
}
