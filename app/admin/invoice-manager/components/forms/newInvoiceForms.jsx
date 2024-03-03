'use client'
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useForm, useFieldArray } from 'react-hook-form'
import styles from '../../styles.module.scss'
import InputMask from 'react-input-mask';
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
import { CheckIcon, Delete } from 'lucide-react'
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
    itemTax: yup.number(),
    itemTotal: yup.number(),
    itemDiscount: yup.number(),
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
            itemTax: 0,
            itemTotal: 0,
            itemDiscount: 0,

        },
        mode: "onChange",
    })

    const [customerData, setCustomerData] = useState([])
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState({
        keyword: "",
        page: 1,
        limit: 0,
        index: 0
    });

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

    useEffect(() => {
        fetchData();

    }, [query]);

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "items",
    });

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
                                                            id="InvoiceNo" className="text-xs" placeholder="Ex. C12345678" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </>
                                        )}
                                    />
                                    <FormField
                                        name="InvoiceDate"
                                        className="w-[60%] text-xs"
                                        control={form.control}
                                        render={({ field }) => (
                                            <>
                                                <FormItem className="space-y-1 w-full text-xs">
                                                    <FormLabel className="text-xs font-bold">Invoice Date</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            size="new"
                                                            id="InvoiceDate" className="text-xs" placeholder="Select Date" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </>
                                        )}
                                    />
                                </div>
                                <div className="nameWrapper flex flex-row gap-2 w-[100%] text-xs ">
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
                                                                <FormMessage />
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
                                                                <FormMessage />
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
                                                                <FormMessage />
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
                                                                <FormMessage />
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
                                                                <FormMessage />
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
                                                })
                                            }}
                                        >
                                            <p className='text-xs'>Add Other Content</p>
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
