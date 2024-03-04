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



export const InvoiceForms = () => {

    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            InvoiceNo: "",
            InvoiceDate: "",
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
                setCustomerData(data.customer);
            } catch (error) {
                console.log('Error:', error);
            }
        };

        fetchData();
    }, [query]);

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

    const items = watch('items');
    const itemTax = parseFloat(watch('itemTax') || 0);
    const itemDiscount = parseFloat(watch('itemDiscount') || 0);
    const [subTotal, setSubTotal] = useState(0);
    console.log("🚀 ~ InvoiceForms ~ subTotal:", subTotal)
    useEffect(() => {
        const calculateSubTotal = (items) => {
            let subTotal = 0;
            items.forEach(item => {
                if (typeof item.itemQty === 'number' && typeof item.itemPrice === 'number') {
                    subTotal += (item.itemQty * item.itemPrice);
                }
            });
            return subTotal;
        };
        const subtotal = calculateSubTotal(form.getValues('items'));
        console.log("🚀 ~ useEffect ~ subtotal:", subtotal)
        if (!isNaN(subtotal)) {
            setValue('subtotal', subtotal);
        } else {
            setValue('subtotal', 0);
        }
        setSubTotal(subtotal);
    }, [form.getValues('items'), setValue]);

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
                                                        defaultValue={"CAD"}
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
                                {/* <div className="nameWrapper flex flex-row gap-2 w-[100%] text-xs ">
                                    <FormField
                                        className="w-[40%] "
                                        name="userPhone"
                                        control={form.control}
                                        render={({ field, formState }) => (
                                            <>
                                                <FormItem className="space-y-1 w-[40%] text-xs">
                                                    <FormLabel className=" font-bold">Phone Number</FormLabel>
                                                    <FormControl>
                                                        <InputMask
                                                            mask="+999 999 999 9999"
                                                            maskChar={null}
                                                            maskPlaceholder="0000.00.0000"
                                                            className={`text-xs h-[30px] pl-2`}

                                                            {...field}
                                                        >
                                                            {(inputProps) => (
                                                                <Input
                                                                    className="text-xs h-[30px] py-1 px-2 focus:ring-offset-0"
                                                                    id="customer_phone"
                                                                    type="text"
                                                                    placeholder="+1.000.000.0000"
                                                                    {...inputProps}

                                                                />
                                                            )}
                                                        </InputMask>
                                                    </FormControl>
                                                </FormItem>
                                            </>
                                        )}
                                    />
                                    <FormField
                                        name="userEmails"
                                        className="w-full text-xs"
                                        control={form.control}
                                        render={({ field }) => (
                                            <>
                                                <FormItem className="w-full space-y-1 text-xs">
                                                    <FormLabel className="text-xs font-bold">Email</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            size="new"
                                                            id="userEmails"
                                                            type="text"
                                                            className="text-xs"
                                                            placeholder="Emails" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </>
                                        )}
                                    />
                                </div> */}
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
                                        <Button
                                            variant="redOutline"
                                            type="button"
                                            className=" h-[30px] w-full rounded-sm px-4 py-0"
                                            size="sm"

                                        >
                                            <p className='text-xs'>Preview</p>
                                        </Button>
                                        <Button
                                            variant="redOutline"
                                            type="button"
                                            className=" h-[30px] w-full rounded-sm px-4 py-0"
                                            size="sm"
                                        >
                                            <p className='text-xs'>Download</p>
                                        </Button>
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
                                        <TableRow
                                            key={field.id}
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
                                                <FormField
                                                    className="w-[10%]"
                                                    name={`items[${index}].itemAmount`}
                                                    control={form.control}
                                                    render={({ field }) => (
                                                        <>
                                                            <FormItem className="text-xs">
                                                                <FormControl>
                                                                    <Input
                                                                        size="new"
                                                                        id="itemAmount" type="number" className="text-xs text-right" placeholder="$ 00.00" {...field} />
                                                                </FormControl>
                                                            </FormItem>
                                                        </>
                                                    )}
                                                />
                                            </TableCell>
                                            <TableCell className="w-[50px]">
                                                <Button
                                                    onClick={() => remove(index)}
                                                    variant="tableBlue"
                                                    size="xs"
                                                    type='button'
                                                    className=" px-[5px] h-[25px] text-[11px] text-myBlue flex flex-row justify-center gap-1 items-center">
                                                    <Delete width={15} height={15} />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
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
                                    <p className='font-bold text-myBlue'>$ {subTotal}</p>
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
                                                        <FormMessage />
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
                                                                        placeholder="Select Tax"
                                                                    />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                {
                                                                    taxList?.map((item, index) => (
                                                                        <SelectItem
                                                                            key={item.tax_id}
                                                                            value={item?.tax_rate}
                                                                            className="text-xs"
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
