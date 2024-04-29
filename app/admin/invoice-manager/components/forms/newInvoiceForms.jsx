'use client'
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useForm, useFieldArray } from 'react-hook-form'
import styles from '../../styles.module.scss'
import InputMask from 'react-input-mask';
import { Calendar } from "@/components/ui/calendar"
import { ScrollArea } from '@/components/ui/scroll-area'
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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import axios from 'axios';
import { Loaders } from '@/components/ui/loaders'
import { format, set } from "date-fns"
import { ContentForms } from './ContentForms'
import { useToast } from '@/components/ui/use-toast'
import { PopoverClose } from '@radix-ui/react-popover'

const formSchema = yup.object().shape({
    InvoiceNo: yup.string(),
    InvoiceDate: yup.string(),
    InvoiceCurrency: yup.string(),
    InvoiceTerms: yup.string(),
    BilledToName: yup.string().required("Billed To Name is required"),
    BilledToAddress: yup.string().required("Billed To Address is required"),
    BilledToZip: yup.string().required("Billed To Zip is required"),
    BilledToCountry: yup.string(),
    ShippedToName: yup.string().required("Shipped To Name is required"),
    ShippedToAddress: yup.string().required("Shipped To Address is required"),
    ShippedToZip: yup.string().required("Shipped To Zip is required"),
    ShippedToCountry: yup.string(),
    note: yup.string(),
    userName: yup.string(),
    userID: yup.string(),
    userPhone: yup.string(),
    userEmails: yup.string().email().required("Email is required"),
    items: yup.array().of(
        yup.object().shape({
            description: yup.string(),
            qty: yup.number(),
            price: yup.number(),
            total: yup.number(),
            itemID: yup.string(),
        })
    ),
    subtotal: yup.number(),
    itemTax: yup.number(),
    tax_id: yup.string(),
    itemTotal: yup.number(),
    itemDiscount: yup.number(),
    action: yup.string(),
})



export const InvoiceForms = ({ customer = null, data = null }) => {

    const [openSelect, setOpenSelect] = useState(false)
    const [openDate, setOpenDate] = useState(false)
    const { toast } = useToast();
    console.log("🚀 ~ InvoiceForms ~ data:", data)
    const today = format(new Date(), "yyyy-MM-dd");
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            InvoiceNo: "",
            InvoiceDate: today || "",
            InvoiceCurrency: "CAD",
            InvoiceTerms: "Upon Receipt",
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
                    description: "",
                    qty: 0,
                    price: 0,
                    total: 0,
                    itemID: "",
                }
            ],
            subtotal: 0,
            itemTax: 0,
            tax_id: "",
            itemTotal: 0,
            itemDiscount: 0,
            action: "add",
        },
        mode: "onChange",
    })

    // useEffect(() => {
    //     if (data) {
    //         form.setValue('InvoiceNo', data.invoice_no)
    //         form.setValue('InvoiceDate', data.invoice_date)
    //         form.setValue('InvoiceCurrency', data.currency)
    //         form.setValue('InvoiceTerms', data.terms)
    //         form.setValue('BilledToName', data.billed_name)
    //         form.setValue('BilledToAddress', data.billed_address)
    //         form.setValue('BilledToZip', data.billed_zip)
    //         form.setValue('BilledToCountry', data.billed_country)
    //         form.setValue('ShippedToName', data.shipped_name)
    //         form.setValue('ShippedToAddress', data.shipped_address)
    //         form.setValue('ShippedToZip', data.shipped_zip)
    //         form.setValue('ShippedToCountry', data.shipped_country)
    //         form.setValue('note', data.note)
    //         form.setValue('userEmails', data.email)
    //         form.setValue('userName', data.shipped_name)
    //         form.setValue('userID', data.user_code)
    //         form.setValue('items', data.items)
    //         form.setValue('subtotal', data.subtotal)
    //         form.setValue('itemTax', data.tax)
    //         form.setValue('itemTotal', data.total)
    //         form.setValue('itemDiscount', data.discount)
    //         form.setValue("action", "edit");
    //     } else {
    //         null
    //     }
    // }, [data])

    const [customerData, setCustomerData] = useState([])
    const [loading, setLoading] = useState(false);
    const [taxList, setTaxList] = useState([]);
    const [query, setQuery] = useState({
        keyword: "",
        page: 1,
        limit: 0,
        index: 0
    });

    // useEffect(() => {

    //     const formatDate = format(form.watch('InvoiceDate'), "yyyy-MM-dd")
    //     form.setValue('InvoiceDate', formatDate)

    // }, [form.watch('InvoiceDate')])


    // console.log("DATE", form.watch('InvoiceDate'))
    const handleSearchCustomer = (e) => {
        console.log("Search Customer : ", e)
        setQuery({
            ...query,
            keyword: e,
        });
    }

    // const findCountry

    const [taxQuery, setTaxQuery] = useState({
        keyword: "",
        country_code: "CAN",
        province_code: "",
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
                    form.setValue("action", "edit")
                }
                setCustomerData(data.customer);
            } catch (error) {
                console.log('Error:', error);
            }
        };
        fetchData();

        if (data !== null && data.tracking_id !== undefined) {
            form.setValue(`items[0].description`, `Logistic Service For Package : ${data.tracking_id}`)
            form.setValue(`items[0].qty`, 1)
            form.setValue(`items[0].price`, data.total_price)
        }

    }, [query, data]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    `/api/admin/config/tax/typeDetails`,
                    taxQuery
                );
                console.log("🚀 ~ fetchData ~ response:", response)
                const data = await response.data;
                setTaxList(data.taxassignment);
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


    const [disbaleBilled, setDisbaleBilled] = useState(false)
    const [customerBilled_id, setCustomerBilled_id] = useState("")
    const [customerBilledData, setCustomerBilledData] = useState(null)

    const getCustomerBilledData = async () => {
        setDisbaleBilled(true)
        form.resetField('itemTax')
        try {
            const response = await axios.post(
                `/api/customerAPI/payments/getBilling`,
                {
                    user_code: customerBilled_id,
                    limit: 1,
                }
            )
            const data = response.data;
            const firstBilling = data.billing.length > 0 ? data.billing[0] : null;
            console.log("🚀 ~ fetchUserData ~ data:", firstBilling)
            setCustomerBilledData(firstBilling);
            setDisbaleBilled(false)
        } catch (e) {
            console.log(e)
            setDisbaleBilled(false)
        }
    }

    useEffect(() => {
        if (customerBilled_id) {
            getCustomerBilledData();
        } else {
            setCustomerBilledData(null);
            form.setValue('BilledToName', "");
            form.setValue('BilledToAddress', "");
            form.setValue('BilledToZip', "");
            form.setValue('BilledToCountry', "");
        }
    }, [customerBilled_id]);

    useEffect(() => {
        if (customerBilledData) {
            form.setValue('BilledToName', customerBilledData?.name);
            form.setValue('BilledToAddress', customerBilledData?.street_address);
            form.setValue('BilledToZip', customerBilledData?.postal_code);
            form.setValue('BilledToCountry', customerBilledData?.country_name);
            if (customerBilledData?.country_name) {
                findCoutryByNameToCode(customerBilledData?.country_name)
            }
        } else {
            form.setValue('BilledToName', "");
            form.setValue('BilledToAddress', "");
            form.setValue('BilledToZip', "");
            form.setValue('BilledToCountry', "");
        }
    }, [customerBilledData, form]);

    const [countryCode, setCountryCode] = useState("")
    console.log("🚀 ~ InvoiceForms ~ countryCode:", countryCode)

    useEffect(() => {
        findCoutryByNameToCode(form.watch('BilledToCountry'));
    }, [form.watch('BilledToCountry')])

    const findCoutryByNameToCode = async (name) => {
        console.log("findCoutryByNameToCode")
        try {
            const response = await axios.post(
                `/api/admin/config/countries/list`,
                {
                    keyword: name,
                    province_code: "",
                    page: 0,
                    limit: 0,
                    index: 0,
                }
            )
            console.log("🚀 ~ findCoutryByNameToCode ~ response:", response)
            const data = response.data;
            const findCountry = data.country.find(item => item.country_name === name || item.country_code === name)
            console.log("🚀 ~ findCoutryByNameToCode ~ findCountry:", findCountry)
            setCountryCode(findCountry?.country_code)
            setTaxQuery({
                country_code: findCountry?.country_code
            })

        } catch (e) {
            console.log(e)
        }
    }

    // console.log("🚀 ~ InvoiceForms ~ TAX ID:", form.watch('tax_id'))
    // useEffect(() => {
    //     if (form.watch('BilledToCountry')) {
    //         findCoutryByNameToCode(form.watch('BilledToCountry'))
    //         setTaxQuery({
    //             ...taxQuery,
    //             keyword: countryCode
    //         })
    //     }
    // }, [countryCode, form.watch('BilledToCountry')])

    const items = watch('items');
    const itemTax = parseFloat(watch('itemTax') || 0);
    const itemDiscount = parseFloat(watch('itemDiscount') || 0);
    const taxId = watch('tax_id');
    console.log("🚀 ~ InvoiceForms ~ taxId:", taxId)
    const [subTotal, setSubTotal] = useState(0);
    console.log("🚀 ~ InvoiceForms ~ subTotal:", subTotal)

    const onError = (error) => {
        console.log("Form Errors", error)
    }

    const [invoiceIDs, setInvoiceIds] = useState(null)
    console.log("🚀 ~ InvoiceForms ~ invoiceIDs:", invoiceIDs)

    const resetForm = () => {
        form.reset();
        form.reset({
            items: [
                {
                    description: "",
                    qty: 0,
                    price: 0,
                    total: 0,
                    itemID: "",
                }
            ],
            subtotal: 0,
            itemTax: 0,
            tax_id: "",
            itemTotal: 0,
            itemDiscount: 0,
            action: "add",
            'BilledToAddress': "",
            'BilledToZip': "",
            'BilledToCountry': "",
            'ShippedToName': "",
            'ShippedToAddress': "",
            'ShippedToZip': "",
            'ShippedToCountry': "",
            'note': "",
            'userName': "",
            'userID': "",
            'userCode': "",
            'userPhone': "",
            total: 0,
            'userEmails': "",
            subtotal: 0,
        })
    }
    const handleSave = async (formData) => {
        console.log("Saved Data : ", formData)
        const isValid = await form.trigger(); // Trigger validation

        const formatDate = format(form.watch('InvoiceDate'), 'yyyy-MM-dd')
        form.setValue('InvoiceDate', formatDate)

        if (!isValid) {
            toast({
                title: "Validation Error",
                description: "Please fill in all required fields correctly.",
                type: "error",
            });
            return; // Hentikan eksekusi selanjutnya jika validasi gagal
        }
        setLoading(true);
        try {
            const response = await axios.post(
                `/api/admin/invoice/setData`,
                formData
            );
            console.log("response from invoice manager : ", response.data)
            if (response.data.status === true) {
                setLoading(false);
                setInvoiceIds(response.data.invoice_id)
                toast({
                    title: "Invoice Created",
                    description: "Invoice has been created successfully",
                    type: "success",
                });
                resetForm();
            } else {
                setLoading(false);
                toast({
                    title: "Failed to create invoice",
                    description: `${response.data.message}`,
                    type: "error",
                });
            }
        } catch (error) {
            setLoading(false);
            console.log('Error:', error);
        }
    }

    const handleRegisterWithEmail = async (formData) => {
        console.log("Saved Data handleRegisterWithEmail : ", formData)
        const isValid = await form.trigger(); // Trigger validation

        const formatDate = format(form.watch('InvoiceDate'), 'yyyy-MM-dd')
        form.setValue('InvoiceDate', formatDate)

        if (!isValid) {
            toast({
                title: "Validation Error",
                description: "Please fill in all required fields correctly.",
                type: "error",
            });
            return; // Hentikan eksekusi selanjutnya jika validasi gagal
        }
        setLoading(true);
        try {
            const response = await axios.post(
                `/api/admin/invoice/setData`,
                formData
            );
            console.log("response from invoice manager handleRegisterWithEmail : ", response.data)
            if (response.data.status === true) {
                setLoading(false);
                setInvoiceIds(response.data.invoice_id)
                let invoiceId = response.data.invoice_id;
                console.log("🚀 ~ handleRegisterWithEmail ~ invoiceId:", invoiceId)
                toast({
                    title: "Invoice Created",
                    description: "Invoice has been created successfully",
                });
                try {
                    const responseEmail = await axios.post(
                        `/api/admin/invoice/sentTo`,
                        { data: invoiceId }
                    );
                    if (responseEmail.data.status === true) {
                        toast({
                            title: "Invoice Sent",
                            description: "Invoice has been sent to email",
                        });
                    } else {
                        toast({
                            title: "Failed to send invoice",
                            description: `${responseEmail.data.message}`,
                        });
                    }
                } catch (e) {
                    console.log(e)
                }
                resetForm();
            } else {
                setLoading(false);
                toast({
                    title: "Failed to create invoice",
                    description: `${response.data.message}`,
                });
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
            const itemAmount = form.watch(`items[${index}].total`)
            total += parseFloat(itemAmount)
        })
        setSubTotal(total)
        form.setValue('subtotal', total)
    }
    // Totals
    const calculateTotal = () => {
        // Apply discount first
        const discountAmount = (form.getValues('subtotal') * form.getValues('itemDiscount')) / 100;
        const subtotalAfterDiscount = form.getValues('subtotal') - discountAmount;

        // Apply tax to subtotal after discount
        const taxAmount = (subtotalAfterDiscount * form.getValues('itemTax')) / 100;

        // Calculate total
        const total = subtotalAfterDiscount + taxAmount;
        setValue("itemTotal", total);
        return total;
    };

    useEffect(() => {
        calculateTotal();
    }, [form.watch('subtotal'), form.watch('itemTax'), form.watch('itemDiscount'), form.watch('tax_id')]);


    const handleShippedCustomer = (item) => {

        form.setValue("userName", item.customer_name)
        form.setValue("userID", item.customer_id)
        form.setValue("userEmails", item.email)
        form.setValue("ShippedToName", item.customer_name)
        form.setValue("ShippedToAddress", item?.address || "")
        form.setValue("ShippedToCountry", item.country_name || "-")
        form.setValue("ShippedToZip", item?.postal_code || "")
    }

    // const handleSentToEmail = async () => {
    //     try {
    //         await handleSave(form.getValues());
    //         console.log("Retturn To Handle")
    //         await new Promise((resolve) => {
    //             if (invoiceIDs) {
    //                 console.log("🚀 ~ awaitnewPromise ~ invoiceIDs:", invoiceIDs)
    //                 resolve(); // Langsung resolve jika invoiceIDs sudah tersedia
    //             } else {
    //                 // Jika invoiceIDs belum tersedia, cek setiap 100ms
    //                 const interval = setInterval(() => {
    //                     if (invoiceIDs) {
    //                         clearInterval(interval); // Hentikan interval jika invoiceIDs tersedia
    //                         console.log("🚀 ~ interval ~ invoiceIDs:", invoiceIDs)
    //                         resolve(); // Resolve promise
    //                     }
    //                 }, 100);
    //             }
    //         }).then(async () => {
    //             console.log("Retturn To Handle 2")
    //             const response = await axios.post(
    //                 `/api/admin/invoice/sentTo`,
    //                 { data: invoiceIDs }
    //             );
    //             console.log("Retturn To Handle 3")
    //             if (response.data.status === true) {
    //                 toast({
    //                     title: "Invoice Sent",
    //                     description: "Invoice has been sent to email",
    //                     type: "success",
    //                 });
    //             } else {
    //                 toast({
    //                     title: "Failed to send invoice",
    //                     description: `${response.data.message}`,
    //                     type: "error",
    //                 });
    //             }
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const hanldeTaxId = (e) => {
        console.log("🚀 ~ hanldeTaxId ~ e:", e)
        form.setValue('tax_id', e)
        handleSubTotal()
    }


    useEffect(() => {
        const formatDate = format(form.watch('InvoiceDate'), "yyyy-MM-dd")
        form.setValue('InvoiceDate', formatDate)
    }, [form.watch('InvoiceDate')])


    const [openCustomer, setOpenCustomer] = useState(false);
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
                        <div className={`${styles.rightForms} w-[30%] flex flex-col px-2 py-2 justify-between`}>
                            <div className="px-3 py-2">
                                <p className='text-base font-bold '>Send Invoice To</p>
                            </div>

                            <div className="flex flex-col w-full gap-2 px-3">
                                <FormField
                                    control={form.control}
                                    name="userName"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col space-y-1">
                                            <FormLabel className="font-bold">Customer</FormLabel>
                                            <Popover
                                                modal={true}
                                                open={openCustomer}
                                                onOpenChange={setOpenCustomer}
                                            >
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            onClick={() => setOpenCustomer(true)}
                                                            variant="outline"
                                                            role="combobox"
                                                            size="new"
                                                            className={`w-[full] text-xs h-[30px] rounded-sm px-2 py-0 text-left justify-start shadow-none ${!field.value && "text-muted-foreground"}`}
                                                        >
                                                            {field.value ? field.value : "Customer"}
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[300px] p-0"  >
                                                    <Command>
                                                        <CommandInput
                                                            placeholder="Search Customer..."
                                                            className="h-9 text-xs w-full"
                                                            onValueChange={(e) => handleSearchCustomer(e)}
                                                        />
                                                        <CommandEmpty className="text-xs text-center">No Customer found.</CommandEmpty>
                                                        <CommandGroup className="">
                                                            <ScrollArea className="h-[200px] ">
                                                                {customerData.map((item) => (
                                                                    <CommandItem
                                                                        value={item.customer_name}
                                                                        key={item.customer_id}
                                                                        onSelect={() => {
                                                                            handleShippedCustomer(item)
                                                                            setQuery({
                                                                                ...query,
                                                                                keyword: ""
                                                                            })
                                                                            setCustomerBilled_id(item.customer_id)
                                                                            setOpenCustomer(false)
                                                                        }}
                                                                    >
                                                                        <div className='text-xs w-full justify-between flex flex-row px-2'>
                                                                            <p>{item.customer_id} | </p>
                                                                            <p>{item.customer_name}</p>
                                                                        </div>
                                                                    </CommandItem>
                                                                ))}
                                                            </ScrollArea>
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
                                                <FormLabel className="text-xs font-bold text-zinc-600">Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        size="new"
                                                        id="userEmails"
                                                        type="emails"
                                                        className="text-xs"
                                                        placeholder="Email"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-xs" />
                                            </FormItem>
                                        </>
                                    )}
                                />

                            </div>
                            <div className="button-group flex flex-row gap-2 py-2 w-full mx-auto px-3">
                                {/* <div className="flex flex-row justify-between gap-3">
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
                                    </div> */}
                                <Button
                                    variant="redOutline"
                                    type="submit"
                                    className=" h-[30px] rounded-sm px-4 py-0 w-full"
                                    size="sm"
                                >
                                    <p className='text-xs'>Register Invoice</p>
                                </Button>
                                <Button
                                    variant="destructive"
                                    type="button"
                                    onClick={form.handleSubmit(handleRegisterWithEmail, onError)}
                                    className=" h-[30px] rounded-sm px-4 py-0 w-full"
                                    size="sm"
                                >
                                    <p className='text-xs'>Send to email</p>
                                </Button>
                            </div>

                        </div>

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
                                                    <FormMessage className="text-xs" />
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
                                                        defaultValue={"Upon Receipt"}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger className="text-xs h-[30px] rounded-sm">
                                                                <SelectValue
                                                                    className="w-full text-xs h-[30px]"
                                                                    placeholder="Select terms"
                                                                    defaultValue={"Upon Receipt"}
                                                                />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem className="text-xs" value="Upon Receipt">Upon Receipt</SelectItem>
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
                                                                className={`w-[100%] pl-3 text-left text-xs shadow-none h-[30px] font-normal 
                                                                ${!field.value && "text-muted-foreground"}`}
                                                            >
                                                                {field.value ? (
                                                                    format(field.value, "yyyy-MM-dd")
                                                                ) : (
                                                                    <span>Pick a date</span>
                                                                )}
                                                                <CalendarIcon
                                                                    format={field.value ? "yyyy-MM-dd" : ""}
                                                                    className="ml-auto h-4 w-4 opacity-50"
                                                                />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <PopoverClose>
                                                            <Calendar
                                                                mode="single"
                                                                format="yyyy-MM-dd"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                initialFocus
                                                            />
                                                        </PopoverClose>
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
                                                                id="ShippedToZip" className="text-xs" placeholder="A1B 2C3" {...field} />
                                                        </FormControl>
                                                        <FormMessage className="text-xs" />
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
                                                                id="ShippedToAddress"
                                                                className="text-xs"
                                                                placeholder="Address"
                                                                {...field} />
                                                        </FormControl>
                                                        <FormMessage className="text-xs" />
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
                                                        <FormMessage className="text-xs" />
                                                    </FormItem>
                                                </>
                                            )}
                                        />
                                    </div>
                                </div>

                                {/* billedTo */}
                                <div className="flex flex-col gap-1  w-full">
                                    <h2 className='text-sm font-bold'>Billed To</h2>
                                    <div className="flex flex-row justify-between gap-2">
                                        <FormField
                                            className="w-full"
                                            name="BilledToName"
                                            control={form.control}
                                            disabled={disbaleBilled}
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
                                                        <FormMessage className="text-xs" />
                                                    </FormItem>
                                                </>
                                            )}
                                        />
                                        <FormField
                                            className="w-full"
                                            name="BilledToZip"
                                            control={form.control}
                                            disabled={disbaleBilled}
                                            render={({ field }) => (
                                                <>
                                                    <FormItem className="text-xs space-y-1 w-full">
                                                        <FormLabel className="text-xs font-bold text-zinc-600">Zip/Postal Code *</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                size="new"
                                                                id="BilledToZip" className="text-xs" placeholder="A1B 2C3" {...field} />
                                                        </FormControl>
                                                        <FormMessage className="text-xs" />
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
                                            disabled={disbaleBilled}
                                            render={({ field }) => (
                                                <>
                                                    <FormItem className="text-xs space-y-1 w-full">
                                                        <FormLabel className="text-xs font-bold text-zinc-600">Address</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                size="new"
                                                                id="BilledToAddress" className="text-xs" placeholder="Address" {...field} />
                                                        </FormControl>
                                                        <FormMessage className="text-xs" />
                                                    </FormItem>
                                                </>
                                            )}
                                        />
                                        <FormField
                                            className="w-full"
                                            name="BilledToCountry"
                                            control={form.control}
                                            disabled={disbaleBilled}
                                            render={({ field }) => (
                                                <>
                                                    <FormItem className="text-xs space-y-1 w-full">
                                                        <FormLabel className="text-xs font-bold text-zinc-600">Country</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                size="new"
                                                                id="BilledToCountry"
                                                                className="text-xs"
                                                                placeholder="Country" {...field} />
                                                        </FormControl>
                                                        <FormMessage className="text-xs" />
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
                                                <FormMessage className="text-xs" />
                                            </FormItem>
                                        </>
                                    )}
                                />
                            </div>

                        </div>

                        {/* Right Form */}

                    </div>

                    {/* Table */}
                    <div className="w-full">
                        <Table>
                            <TableHeader>
                                <TableHead className="text-xs w-[100px]">#</TableHead>
                                <TableHead className="text-xs">Item Name</TableHead>
                                <TableHead className="text-xs w-[100px]">Qty</TableHead>
                                <TableHead className="text-xs text-center w-[10%]">Price</TableHead>
                                <TableHead className="text-xs text-center w-[10%]">Total</TableHead>
                                <TableHead className="text-xs text-center"></TableHead>
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
                                                    qty: 0,
                                                    price: 0,
                                                    total: 0,
                                                    description: "",
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
                                    <p className='font-bold text-myBlue text-sm'>Subtotal</p>
                                    <p className='font-bold text-myBlue text-sm'>$ {form.watch('subtotal')}</p>
                                </div>
                                <Separator className="w-full" />
                                <div className="flex flex-row justify-between items-center ">
                                    <p className='font-bold w-full text-myBlue text-sm'>Discount</p>
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
                                    <p className='font-bold w-full text-myBlue text-sm'>Tax</p>
                                    <div className="w-[50%]">
                                        <FormField
                                            className="w-full text-xs"
                                            name="itemTax"
                                            control={form.control}
                                            render={({ field }) => (
                                                <>
                                                    <FormItem className=" text-sm  space-y-1 flex flex-row items-center">
                                                        <p className='font-bold text-myBlue text-sm px-2'>%</p>
                                                        <DropdownMenu
                                                            className="w-full text-xs h-[30px]"
                                                            open={openSelect}
                                                            onOpenChange={setOpenSelect}
                                                        // onValueChange={field.onChange}
                                                        >
                                                            <FormControl>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button
                                                                        className="w-full text-xs h-[30px] text-left shadow-none  justify-start"
                                                                        onClick={() => setOpenSelect(true)}
                                                                        variant="outline"
                                                                        size="xs"
                                                                        type="button"
                                                                    >
                                                                        <p className='text-left'>{field.value ? field.value : "Select Tax"}</p>
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                            </FormControl>
                                                            <DropdownMenuContent>
                                                                {
                                                                    taxList
                                                                        ?.filter((item, index, self) => self.findIndex(t => t.tax_rate === item.tax_rate) === index)
                                                                        .map((item, index) => (
                                                                            <>
                                                                                <DropdownMenuItem className="cursor-pointer text-xs w-full px-2 py-1 hover:bg-gray-100">
                                                                                    <div
                                                                                        className='px-2'
                                                                                        onClick={() => {
                                                                                            form.setValue('itemTax', item?.tax_rate)
                                                                                            form.setValue('tax_id', item?.tax_assignment_id)
                                                                                            setOpenSelect(false)
                                                                                            calculateTotal();
                                                                                        }}
                                                                                        value={item?.tax_rate}
                                                                                    >
                                                                                        {item?.tax_rate} - {item?.abbreviation}
                                                                                    </div>
                                                                                </DropdownMenuItem>
                                                                            </>
                                                                        ))
                                                                }
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </FormItem>
                                                    {/* <FormItem className="space-y-1 w-[100%]">
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
                                                    </FormItem> */}
                                                </>
                                            )}
                                        />
                                    </div>
                                </div>
                                <Separator className="w-full" />
                                <div className="flex flex-row justify-between items-center ">
                                    <p className='font-bold w-full text-myBlue text-sm'>Total Due</p>
                                    <p className='font-bold text-myBlue text-sm px-2 w-[50%] text-right '>$ {form.getValues('itemTotal')}</p>
                                </div>
                            </div>

                        </div>
                    </div>

                </form>
            </Form >
        </>
    )
}
