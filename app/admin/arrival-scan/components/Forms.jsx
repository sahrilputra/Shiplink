/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { CheckIcon, Plus } from 'lucide-react'
import InputMask from 'react-input-mask';
import { Command as CommandPrimitive } from "cmdk"
import {
    Command,
    CommandArrival,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Select, SelectContent, SelectItem, SelectGroup, SelectTrigger, SelectValue, SelectLabel, SelectItemWihtoutIndicator } from '@/components/ui/select'
import data from '../../../../data/admin/UserData.json'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PopoverClose } from '@radix-ui/react-popover'

import axios from 'axios'

const carrierList = [
    {
        "id": 1,
        "carrierName": "UPS",
        "value": "UPS",
    },
    {
        "id": 2,
        "carrierName": "DHL",
        "value": "DHL"
    },
    {
        "id": 3,
        "carrierName": "FedEx",
        "value": "FedEx"
    },
    {
        "id": 4,
        "carrierName": "USPS",
        "value": "USPS"
    },
    {
        "id": 5,
        "carrierName": "Canada Post",
        "value": "Canada Post"
    },
]
export const ArrivalForms = ({
    options,
    forms,
    isLoading = false,
}) => {

    const [customerID, setCustomerID] = useState('')
    const [newData, setNewData] = useState(null)
    const [disabled, setDisabled] = useState(false);
    const [openCustomer, setOpenCustomer] = useState(false)
    const handleDataChange = (e) => {

        setCustomerID(e.target.value)
        const selectedData = customerData.find((item) => item.customer_id === e.target.value)
        setNewData(customerData.find((item) => item.customer_id === e.target.value))
        forms.setValue("customer_name", selectedData?.customer_name || "");
        forms.setValue("customer_phone", selectedData?.phone_number || "");
        forms.setValue("customer_email", selectedData?.email || "");
        setDisabled(true)
        console.log("Selected Data : ", selectedData)
    }

    const handleResetCustomerData = () => {
        forms.reset();
        setCustomerID("");
        setNewData(null);
        setDisabled(false);
        forms.reset({
            box_images: [],
            label_images: [],
            content_images: [],
            package_content: [
                {
                    itemID: "",
                    qty: 1,
                    value: 0,
                    desc: "",
                    hs_desc: "",
                    hs_code: "",
                    made_in: "",
                    subtotal: 0,
                }
            ],
        })
        const inputFile = document.getElementById('content_images');
        if (inputFile) {
            inputFile.value = '';
        }
        const labelImg = document.getElementById('label_images');
        if (labelImg) {
            labelImg.value = '';
        }
        const boxImg = document.getElementById('box_images');
        if (boxImg) {
            boxImg.value = '';
        }
    }

    const [showOtherInput, setShowOtherInput] = useState(false);
    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        if (selectedValue === "Other") {
            setShowOtherInput(true);
        } else {
            setShowOtherInput(false);
        }
    };

    // NEW

    const [value, setValue] = useState(null)
    const inputRef = useRef(null)
    const [isOpen, setOpen] = useState(false)
    const [selected, setSelected] = useState(value)
    const [inputValue, setInputValue] = useState(value?.label || "")

    const [valueCarrier, setValueCarrier] = useState(null)
    const inputCarrierRef = useRef(null)

    const [carrierSelected, setCarrierSelected] = useState(valueCarrier)
    const [inputCarrierValue, setInputCarrierValue] = useState(null)


    const handleKeyDown = useCallback(
        event => {
            const input = inputRef.current
            if (!input) {
                return
            }

            if (!isOpen) {
                setOpen(true)
            }

            if (event.key === "Escape") {
                input.blur()
            }
        },
        [isOpen, options, setValue]
    )


    const handleBlur = useCallback(() => {
        setOpen(false)
        setInputValue(selected?.label)
    }, [selected])

    const handlerCarrier = useCallback(() => {
        setCarrierOpen(false)
        setInputCarrierValue(carrierSelected?.label)
    }, [carrierSelected])

    const [selectedCarrier, setSelectedCarrier] = useState('');
    const [isCarrierOpen, setCarrierOpen] = useState(false)
    const handleSelectedCarrier = (e) => {
        setSelectedCarrier(e.target.value)
        forms.setValue("carrier_code", e.target.value)
    }

    // Fetch Customer Data
    const [customerData, setCustomerData] = useState([])

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


    console.log("Watch Carrier : ", forms.watch('carrier_code'))
    return (
        <>
            <div className="flex gap-2 flex-col text-zinc-600">
                <div className="flex flex-row gap-3">
                    <div className="flex flex-col justify-start gap-2 w-[40%]">
                        <FormField
                            className="w-full text-sm"
                            name="test"
                            control={forms.control}
                            render={({ field, formState }) => (
                                <>
                                    <FormLabel className="font-bold">Search Customer</FormLabel>
                                    <FormItem className="flex flex-col">
                                        <Popover open={openCustomer} onOpenChange={setOpenCustomer} >
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn(
                                                            "text-xs h-[30px] py-1 px-2 focus:ring-offset-0 shadow-none text-left normal-case justify-start",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value
                                                            ? customerData.find(
                                                                (language) => language.customer_name === field.value
                                                            )?.customer_id
                                                            : "Search Customer"}
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[500px] p-0">
                                                <Command className=" bg-blue-100">
                                                    <CommandInput
                                                        placeholder="Search..."
                                                        className="h-[30px] text-xs"
                                                    />
                                                    <CommandEmpty className="text-xs px-1 py-2 text-center">No Customer Found.</CommandEmpty>
                                                    <CommandGroup >
                                                        <ScrollArea className="min-h-max h-[200px]" >
                                                            {customerData.map((language) => (
                                                                <CommandItem
                                                                    className="text-xs items-center"
                                                                    value={language.customer_name}
                                                                    key={language.customer_id}
                                                                    autoFocus={false}
                                                                    onSelect={() => {
                                                                        forms.setValue("test", language.customer_name)
                                                                        forms.setValue("customer_id", language.customer_id)
                                                                        setInputValue(language.customer_name)
                                                                        handleDataChange({ target: { value: language.customer_id } })
                                                                        setOpenCustomer(false)
                                                                        const inputElement = inputRef.current;
                                                                        if (inputElement) {
                                                                            inputElement.blur(); // Menonaktifkan fokus dari elemen input
                                                                        }
                                                                    }}
                                                                >
                                                                    <div className='text-xs w-full justify-between flex flex-row items-center'>
                                                                        <div className="w-[90%] flex flex-row justify-between">
                                                                            <p className='w-[150px] text-nowrap'>{language.customer_name}</p>
                                                                            <p className='w-[5px]'>|</p>
                                                                            <p className='w-[100px]'>{language.customer_id}</p>
                                                                        </div>
                                                                        <div className="w-[10%]">
                                                                            <CheckIcon
                                                                                className={cn(
                                                                                    "ml-auto h-4 w-4",
                                                                                    language.customer_name === field.value
                                                                                        ? "opacity-100"
                                                                                        : "opacity-0"
                                                                                )}
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                </CommandItem>
                                                            ))}
                                                        </ScrollArea>
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />

                        <div className="nameWrapper flex flex-row gap-3 w-full text-sm">
                            <FormField
                                className="w-full text-sm"
                                name="customer_id"
                                control={forms.control}
                                render={({ field, formState }) => (
                                    <>
                                        <FormItem className="w-[40%] text-xs ">
                                            <FormLabel className="font-bold">Customer Unit ID</FormLabel>
                                            <FormControl className="w-full relative">
                                                <Input
                                                    placeholder={`${field.value || "Customer ID"}`}
                                                    className={`text-xs h-[30px] rounded-sm px-2 py-0 ${disabled && "bg-zinc-400/50 cursor-not-allowed"}`}
                                                    disabled
                                                />
                                            </FormControl>
                                        </FormItem>
                                    </>
                                )}
                            />
                            <FormField
                                name="customer_name"
                                className="w-[60%] text-xs"
                                control={forms.control}
                                render={({ field, formState }) => (
                                    <>
                                        <FormItem className="w-full text-xs">
                                            <FormLabel className=" font-bold">Customer Full Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    autoComplete="off"
                                                    id="customer_name"
                                                    className={`text-xs h-[30px] rounded-sm px-2 py-0 ${disabled && "bg-zinc-400/50 cursor-not-allowed"} ${formState.errors.customer_name && "border-red-500 focus:ring-red-700"}`}
                                                    placeholder="John Doe"
                                                    {...field}
                                                    disabled={disabled}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    </>
                                )}
                            />

                        </div>

                        <div className="nameWrapper flex flex-row gap-3 w-[100%]  ">
                            <FormField
                                className="w-[40%] "
                                name="customer_phone"
                                control={forms.control}
                                render={({ field, formState }) => (
                                    <>
                                        <FormItem className="w-[40%] text-xs">
                                            <FormLabel className=" font-bold">Phone Number</FormLabel>
                                            <FormControl>
                                                <InputMask
                                                    mask="+9.999.999.9999"
                                                    maskChar={null}
                                                    maskPlaceholder="0000.00.0000"
                                                    className={` ${disabled && "bg-zinc-400/50 cursor-not-allowed"} text-xs h-[30px] pl-2`}
                                                    disabled={disabled}
                                                    {...field}
                                                >
                                                    {(inputProps) => (
                                                        <Input
                                                            autoComplete="off"
                                                            className="text-xs h-[30px] py-1 px-2 focus:ring-offset-0"
                                                            id="customer_phone"
                                                            type="text"
                                                            placeholder="+1.000.000.0000"
                                                            {...inputProps}
                                                            disabled={disabled}
                                                        />
                                                    )}
                                                </InputMask>
                                            </FormControl>
                                        </FormItem>
                                    </>
                                )}
                            />
                            <FormField
                                name="customer_email"
                                className="w-full "
                                control={forms.control}
                                render={({ field, formState }) => (
                                    <>
                                        <FormItem className="w-full text-xs">
                                            <FormLabel className="font-bold">Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    autoComplete="off"
                                                    id="customer_email"
                                                    type="email"
                                                    className={`text-xs h-[30px] rounded-sm px-2 py-0 ${disabled && "bg-zinc-400/50 cursor-not-allowed"} ${formState.errors.customer_email && "border-red-500 focus:ring-red-700"}`}
                                                    placeholder="customer@shiplink.ca"
                                                    {...field}
                                                    disabled={disabled}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    </>
                                )}
                            />

                        </div>

                    </div>

                    <div className="flex flex-col gap-2 w-[30%]">
                        <div className="flex flex-row gap-2 items-end">
                            <FormField
                                className="w-full"
                                name="barcode_tracking"
                                control={forms.control}
                                render={({ field, formState }) => (
                                    <>
                                        <FormItem className="w-[70%] text-xs">
                                            <FormLabel className=" font-bold text-zinc-600">Tracking / Barcode</FormLabel>
                                            <FormControl>
                                                <Input
                                                    autoComplete="off"
                                                    id="barcode_tracking"
                                                    className={`${formState.errors.barcode_tracking && "border-red-500 focus:ring-red-700 text-red-800"} text-xs h-[30px] rounded-sm px-2 py-0`}
                                                    placeholder={`Tracking / Barcode Number`}
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    </>
                                )}
                            />
                            <FormField
                                className=" text-sm space-y-0 w-[100%]"
                                name="carrier_code"
                                control={forms.control}
                                render={({ field, formState }) => (
                                    <>
                                        {console.log("field.value : ", field)}
                                        <FormItem className="space-y-1.5  w-[30%]">
                                            <FormLabel className="font-bold">Select Carrier</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                open={isCarrierOpen}
                                                onOpenChange={setCarrierOpen}
                                            >
                                                <FormControl className="space-y-0">
                                                    <SelectTrigger
                                                        className="w-[100%] text-xs h-[30px] rounded-sm px-2 py-0">
                                                        <p>{field.value}</p>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectGroup className='text-xs '>
                                                        {carrierList.map((item, index) => (
                                                            <SelectItemWihtoutIndicator
                                                                className='text-xs'
                                                                key={index}
                                                                value={item.carrierName}
                                                                onValueChange={() => {
                                                                    forms.setValue = ("carrier_code", item.carrierName)
                                                                    setSelectedCarrier(item.carrierName)
                                                                }}
                                                                onSelect={() => {
                                                                    setCarrierOpen(false);
                                                                    forms.setValue = ("carrier_code", item.carrierName)
                                                                    setSelectedCarrier(item.carrierName)
                                                                }}
                                                            >
                                                                {item.carrierName}
                                                            </SelectItemWihtoutIndicator>
                                                        ))
                                                        }
                                                    </SelectGroup>
                                                    <SelectGroup>
                                                        <SelectLabel className="px-0.5 border-b text-xs space-y-1 font-bolds ">Other</SelectLabel>
                                                        <div className=" pt-1 flex flex-row gap-1">
                                                            <Input
                                                                autoComplete="off"
                                                                id="carrier_code"
                                                                className="text-xs h-[30px] w-[120px] rounded-sm px-2 py-0 "
                                                                placeholder="Input Carrier"
                                                                value={selectedCarrier || ""}
                                                                onValueChange={(e) => {
                                                                    setSelectedCarrier(e.target.value);
                                                                    setCarrierOpen(true);
                                                                    forms.setValue = ("carrier_code", e.target.value)
                                                                }}
                                                                onKeyPress={(e) => {
                                                                    if (e.key === "Enter") {
                                                                        setCarrierOpen(false)
                                                                        handleSelectedCarrier({ target: { value: e.target.value } });
                                                                        e.preventDefault(); // Prevent form submission
                                                                    }
                                                                }}
                                                                {...field}
                                                            />

                                                            <Button
                                                                variant="outline"
                                                                size="xs"
                                                                type="button"
                                                                className="text-xs h-[30px] px-2 shadow-none"
                                                                onClick={() => {

                                                                    setCarrierOpen(false)
                                                                }}
                                                            >
                                                                <Plus width={10} height={10} />
                                                            </Button>

                                                        </div>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                        </div>


                        <div className="nameWrapper flex flex-col gap-2 w-[100%]  text-zinc-600">
                            <FormLabel className=" font-bold text-zinc-600">Package Dimension</FormLabel>
                            <div className="flex flex-row gap-2">
                                <div className="flex flex-row gap-2 w-[50%]">
                                    <div className="flex flex-col gap-2">
                                        <FormField
                                            className="w-full flex flex-row justify-center items-end"
                                            name="package_length"
                                            control={forms.control}
                                            render={({ field, formState }) => (
                                                <>
                                                    <FormItem className="w-full text-xs">
                                                        <FormControl>
                                                            <Input
                                                                min="0"
                                                                id="package_length"
                                                                className={`text-xs h-[30px] rounded-sm px-2 py-0 ${formState.errors.package_length && "border-red-500 focus:ring-red-700 text-red-800"}`}
                                                                type="number"
                                                                placeholder="length" {...field} />
                                                        </FormControl>
                                                    </FormItem>
                                                </>
                                            )}
                                        />
                                        <FormField
                                            className="w-full flex flex-row justify-center items-end"
                                            name="package_witdth"
                                            control={forms.control}
                                            render={({ field, formState }) => (
                                                <>
                                                    <FormItem className="w-full text-xs">
                                                        <FormControl>
                                                            <Input
                                                                min="0"
                                                                id="package_witdth"
                                                                className={`${formState.errors.package_witdth && "border-red-500 focus:ring-red-700 text-red-800"} text-xs h-[30px] rounded-sm px-2 py-0`}
                                                                type="number"
                                                                placeholder="width" {...field} />
                                                        </FormControl>
                                                    </FormItem>
                                                </>
                                            )}
                                        />
                                        <FormField
                                            className="w-full flex flex-row justify-center items-end"
                                            name="package_height"
                                            control={forms.control}
                                            render={({ field, formState }) => (
                                                <>
                                                    <FormItem className="w-full text-xs">
                                                        <FormControl>
                                                            <Input
                                                                id="package_height"
                                                                min="0"
                                                                type="number"
                                                                className={`${formState.errors.package_height && "border-red-500 focus:ring-red-700 text-red-800"} text-xs h-[30px] rounded-sm px-2 py-0`}
                                                                placeholder="height" {...field} />
                                                        </FormControl>
                                                    </FormItem>
                                                </>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        name="package_height_unit"
                                        className="w-full "
                                        control={forms.control}
                                        render={({ field }) => (
                                            <>
                                                <FormItem className="w-[40%] text-xs" >
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        control={forms.control}
                                                        defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="text-xs h-[30px] rounded-sm px-2 py-0">
                                                                <SelectValue placeholder="in" defaultValue={"in"} />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem className="text-xs" value="in">in</SelectItem>
                                                            <SelectItem className="text-xs" value="mm">mm</SelectItem>
                                                            <SelectItem className="text-xs" value="cm">cm</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            </>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-col gap-2 w-[50%]">
                                    <div className="flex flex-row gap-2">
                                        <FormField
                                            className="w-full flex flex-row justify-center items-end"
                                            name="package_weight"
                                            control={forms.control}
                                            render={({ field, formState }) => (
                                                <>
                                                    <FormItem className="w-full text-xs">
                                                        <FormControl>
                                                            <Input
                                                                id="package_weight"
                                                                min="0"
                                                                className={`${formState.errors.package_weight && "border-red-500 focus:ring-red-700 text-red-800"} text-xs h-[30px] rounded-sm px-2 py-0`}
                                                                placeholder="weight"
                                                                type="number"
                                                                {...field} />
                                                        </FormControl>
                                                    </FormItem>
                                                </>
                                            )}
                                        />
                                        <FormField
                                            name="package_weight_unit"
                                            className="w-full "
                                            control={forms.control}
                                            render={({ field }) => (
                                                <>
                                                    <FormItem className="w-[40%] text-xs" >
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            control={forms.control}
                                                            defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger className="text-xs h-[30px] rounded-sm px-2 py-0">
                                                                    <SelectValue placeholder="Ibs" defaultValue={"Ibs"} />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem className="text-xs" value="Ibs">Ibs</SelectItem>
                                                                <SelectItem className="text-xs" value="Kg">Kg</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormItem>
                                                </>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 w-[30%]">
                        <FormField
                            className="w-full flex flex-row "
                            name="box_images"
                            control={forms.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full ">
                                        <div className="flex flex-col gap-2">
                                            <FormLabel className="font-bold">Whole Box Image</FormLabel>
                                            <FormControl>
                                                <div className='rounded-md border border-slate-300 p-0 cursor-pointer'>
                                                    <Input
                                                        id="box_images"
                                                        type="file"
                                                        className="p-0 border-none text-xs h-[30px] rounded-sm px-0 py-0 file:mr-3 file:bg-myBlue file:text-white file:h-full file:px-3 file:text-xs cursor-pointer file:cursor-pointer hover:bg-slate-100 hover:file:bg-blue-900"
                                                        placeholder="Upload Image"
                                                        multiple
                                                        onChange={(event) => {
                                                            const files = event.target.files;
                                                            if (files) {
                                                                const images = [];
                                                                let processedFiles = 0;
                                                                const readAndProcessFile = (file) => {
                                                                    const reader = new FileReader();
                                                                    reader.onload = (e) => {
                                                                        images.push(e.target.result);
                                                                        processedFiles++;
                                                                        if (processedFiles === files.length) {
                                                                            forms.setValue("box_images", images);
                                                                        } else {
                                                                            readAndProcessFile(files[processedFiles]);
                                                                        }
                                                                    };
                                                                    reader.readAsDataURL(file);
                                                                };
                                                                readAndProcessFile(files[processedFiles]);
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </FormControl>
                                        </div>
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            className="w-full flex flex-row justify-center items-end"
                            name="label_images"
                            control={forms.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full ">
                                        <div className="flex flex-col gap-2">
                                            <FormLabel className=" font-bold">Label Close Up</FormLabel>
                                            <FormControl>
                                                <div className='rounded-md border border-slate-300 p-0'>
                                                    <Input
                                                        id="label_images"
                                                        type="file"
                                                        className="p-0 border-none text-xs h-[30px] rounded-sm px-0 py-0 file:mr-3 file:bg-myBlue file:text-white file:h-full file:px-3 file:text-xs cursor-pointer file:cursor-pointer hover:bg-slate-100 hover:file:bg-blue-900"
                                                        placeholder="Upload Image"
                                                        multiple
                                                        onChange={(event) => {
                                                            const files = event.target.files;
                                                            if (files) {
                                                                const images = [];
                                                                let processedFiles = 0;
                                                                const readAndProcessFile = (file) => {
                                                                    const reader = new FileReader();
                                                                    reader.onload = (e) => {
                                                                        images.push(e.target.result);
                                                                        processedFiles++;
                                                                        if (processedFiles === files.length) {
                                                                            forms.setValue("label_images", images); // Atur nilai field label_images menggunakan setValue dari useForm
                                                                        } else {
                                                                            readAndProcessFile(files[processedFiles]);
                                                                        }
                                                                    };
                                                                    reader.readAsDataURL(file);
                                                                };
                                                                readAndProcessFile(files[processedFiles]);
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </FormControl>
                                        </div>
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            className="w-full flex flex-row justify-center items-end"
                            name="content_images"
                            control={forms.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full ">
                                        <div className="flex flex-col gap-2">
                                            <FormLabel className=" font-bold">Content Images</FormLabel>
                                            <FormControl>
                                                <div className='rounded-md border border-slate-300 p-0'>
                                                    <Input
                                                        id="content_images"
                                                        type="file"
                                                        className="p-0 border-none text-xs h-[30px] rounded-sm px-0 py-0 file:mr-3 file:bg-myBlue file:text-white file:h-full file:px-3 file:text-xs cursor-pointer file:cursor-pointer hover:bg-slate-100 hover:file:bg-blue-900"
                                                        placeholder="Upload Image"
                                                        multiple
                                                        onChange={(event) => {
                                                            const files = event.target.files;
                                                            if (files) {
                                                                const images = [];
                                                                let processedFiles = 0;
                                                                const readAndProcessFile = (file) => {
                                                                    const reader = new FileReader();
                                                                    reader.onload = (e) => {
                                                                        images.push(e.target.result);
                                                                        processedFiles++;
                                                                        if (processedFiles === files.length) {
                                                                            forms.setValue("content_images", images); // Atur nilai field label_images menggunakan setValue dari useForm
                                                                        } else {
                                                                            readAndProcessFile(files[processedFiles]);
                                                                        }
                                                                    };
                                                                    reader.readAsDataURL(file);
                                                                };
                                                                readAndProcessFile(files[processedFiles]);
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </FormControl>
                                        </div>
                                    </FormItem>
                                </>
                            )}
                        />
                    </div>
                </div>
            </div>
            <div className={`flex w-full justify-end ${newData !== null ? 'block' : 'hidden'}`}>
                <Button
                    onClick={handleResetCustomerData}
                    variant="destructive"
                    type="button"
                    className='text-xs text-white h-7'>
                    Reset Forms
                </Button>
            </div>



        </>
    )
}
