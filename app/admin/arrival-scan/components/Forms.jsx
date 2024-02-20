'use client'
import React, { useState, useCallback, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { CheckIcon } from 'lucide-react'
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
import { Select, SelectContent, SelectItem, SelectGroup, SelectTrigger, SelectValue } from '@/components/ui/select'
import data from '../../../../data/admin/UserData.json'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PopoverClose } from '@radix-ui/react-popover'



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

    const handleDataChange = (e) => {
        setCustomerID(e.target.value)
        const selectedData = data.find((item) => item.id === e.target.value)
        setNewData(data.find((item) => item.id === e.target.value))
        forms.setValue("fullName", selectedData?.full_name || "");
        forms.setValue("phoneNumber", selectedData?.phone || "");
        forms.setValue("email", selectedData?.email || "");
        setDisabled(true)
    }

    const handleResetCustomerData = () => {
        forms.reset({
            customerID: "",
            fullName: "",
            phoneNumber: "",
            email: "",
            trackingBarcode: "",
            carrier: "",
            length: "",
            width: "",
            height: "",
            heightType: "",
            weight: "",
            weightType: "",
            wholeBoxImg: "",
            labelImg: "",
            contentImg: "",
        });
        setCustomerID("");
        setNewData(null);
        setDisabled(false);
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
    const [isCarrierOpen, setCarrierOpen] = useState(false)
    const [carrierSelected, setCarrierSelected] = useState(valueCarrier)
    const [inputCarrierValue, setInputCarrierValue] = useState(null)


    const handleKeyDown = useCallback(
        event => {
            const input = inputRef.current
            if (!input) {
                return
            }

            // Keep the options displayed when the user is typing
            if (!isOpen) {
                setOpen(true)
            }

            // This is not a default behaviour of the <input /> field
            if (event.key === "Enter" && input.value !== "") {
                const optionToSelect = options.find(
                    option => option.label === input.value
                )
                if (optionToSelect) {
                    setSelected(optionToSelect)
                    setValue?.(optionToSelect)
                }
            }

            if (event.key === "Escape") {
                input.blur()
            }
        },
        [isOpen, options, setValue]
    )

    const handleCarrierKeyDown = useCallback(
        event => {
            const input = inputCarrierRef.current
            if (!input) {
                return
            }

            // Keep the options displayed when the user is typing
            if (!isOpen) {
                setCarrierOpen(true)
            }

            // This is not a default behaviour of the <input /> field
            if (event.key === "Enter" && input.value !== "") {
                const optionToSelect = options.find(
                    option => option.label === input.value
                )
                if (optionToSelect) {
                    setCarrierSelected(optionToSelect)
                    setValueCarrier?.(optionToSelect)
                }
            }

            if (event.key === "Escape") {
                input.blur()
            }
        },
        [isOpen, options, setValueCarrier]
    )

    const handleBlur = useCallback(() => {
        setOpen(false)
        setInputValue(selected?.label)
    }, [selected])

    const handlerCarrier = useCallback(() => {
        setCarrierOpen(false)
        setInputCarrierValue(carrierSelected?.label)
    }, [carrierSelected])




    return (
        <>
            <div className="flex gap-2 flex-col text-zinc-600">
                <div className="flex flex-row gap-3">
                    <div className="flex flex-col justify-start gap-2 w-[40%]">
                        <FormField
                            className="w-full text-sm"
                            name="customerID"
                            control={forms.control}
                            render={({ field, formState }) => (
                                <>
                                    <FormItem className="w-full text-xs ">
                                        <FormLabel className="font-bold">Search Customer</FormLabel>
                                        <FormControl className="w-full relative">
                                            <CommandPrimitive className='border-b-0' onKeyDown={handleKeyDown}>
                                                <div>
                                                    <CommandArrival
                                                        ref={inputRef}
                                                        value={inputValue}
                                                        setValue={isLoading ? undefined : setInputValue}
                                                        onBlur={handleBlur}
                                                        onFocus={() => setOpen(true)}
                                                        placeholder={`${field.value ? data.find((item) => item.id === field.value)?.id : "Customer"}`}
                                                        className="text-xs border border-neutral-300 px-2"
                                                        disableSearchIcon={true}
                                                    />
                                                </div>
                                                <div className="mt-1 relative">
                                                    {isOpen ? (
                                                        <div className="absolute top-0 z-10 w-full rounded-xl bg-blue-100 shadow-md outline-none animate-in fade-in-0 zoom-in-95">
                                                            <CommandList className="ring-1 ring-slate-200  bg-blue-100 rounded-lg">
                                                                <ScrollArea>
                                                                    <CommandGroup>
                                                                        {data.map((item) => {
                                                                            const isSelected = selected?.value === item.id
                                                                            return (
                                                                                <CommandItem
                                                                                    value={item.id}
                                                                                    setValue={field.onChange}
                                                                                    key={item.id}
                                                                                    className={cn(
                                                                                        "flex items-center gap-2 w-full",
                                                                                        !isSelected ? "pl-8" : null
                                                                                    )}
                                                                                    onMouseDown={event => {
                                                                                        event.preventDefault()
                                                                                        event.stopPropagation()
                                                                                    }}
                                                                                    onSelect={() => {
                                                                                        forms.setValue("customerID", item.id)
                                                                                        handleDataChange({ target: { value: item.id } })
                                                                                        setOpen(false)
                                                                                    }}
                                                                                >
                                                                                    <div className='text-xs w-full justify-between flex flex-row'>
                                                                                        <p>{item.id} | </p>
                                                                                        <p>{item.full_name}</p>
                                                                                    </div>
                                                                                    <CheckIcon
                                                                                        className={cn(
                                                                                            "ml-auto h-4 w-4",
                                                                                            item.id === field.value
                                                                                                ? "opacity-100"
                                                                                                : "opacity-0"
                                                                                        )}
                                                                                    />
                                                                                </CommandItem>)
                                                                        })}
                                                                    </CommandGroup>
                                                                </ScrollArea>
                                                                {!isLoading ? (
                                                                    <CommandEmpty className="text-xs text-center py-2">No Customer Found.</CommandEmpty>
                                                                ) : null}
                                                            </CommandList>

                                                        </div>
                                                    ) : null}
                                                </div>
                                            </CommandPrimitive>
                                        </FormControl>
                                    </FormItem>
                                </>
                            )}
                        />

                        <div className="nameWrapper flex flex-row gap-3 w-full text-sm">
                            <FormField
                                className="w-full text-sm"
                                name="customerID"
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
                                name="fullName"
                                className="w-[60%] text-xs"
                                control={forms.control}
                                render={({ field, formState }) => (
                                    <>
                                        <FormItem className="w-full text-xs">
                                            <FormLabel className=" font-bold">Customer Full Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="fullName"
                                                    className={`text-xs h-[30px] rounded-sm px-2 py-0 ${disabled && "bg-zinc-400/50 cursor-not-allowed"} ${formState.errors.fullName && "border-red-500 focus:ring-red-700"}`}
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
                                name="phoneNumber"
                                control={forms.control}
                                render={({ field, formState }) => (
                                    <>
                                        <FormItem className="w-[40%] text-xs">
                                            <FormLabel className=" font-bold">Phone Number</FormLabel>
                                            <FormControl>
                                                <InputMask
                                                    mask="+999 999 999 9999"
                                                    maskChar={null}
                                                    maskPlaceholder="0000.00.0000"
                                                    className={` ${disabled && "bg-zinc-400/50 cursor-not-allowed"} text-xs h-[30px] pl-2`}
                                                    disabled={disabled}
                                                    {...field}
                                                >
                                                    {(inputProps) => (
                                                        <Input
                                                            className="text-xs h-[30px] py-1 px-2 focus:ring-offset-0"
                                                            id="phoneNumber"
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
                                name="email"
                                className="w-full "
                                control={forms.control}
                                render={({ field, formState }) => (
                                    <>
                                        <FormItem className="w-full text-xs">
                                            <FormLabel className="font-bold">Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    className={`text-xs h-[30px] rounded-sm px-2 py-0 ${disabled && "bg-zinc-400/50 cursor-not-allowed"} ${formState.errors.email && "border-red-500 focus:ring-red-700"}`}
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
                        <div className="flex flex-row gap-2">
                            <FormField
                                className="w-full"
                                name="trackingBarcode"
                                control={forms.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-[70%] text-xs">
                                            <FormLabel className=" font-bold text-zinc-600">Tracking / Barcode</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="trackingBarcode"
                                                    className="text-xs h-[30px] rounded-sm px-2 py-0"
                                                    placeholder={`Tracking / Barcode Number`}
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    </>
                                )}
                            />
                            <FormField
                                className="w-full text-sm"
                                name="carrier"
                                control={forms.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="text-xs w-[30%] ">
                                            <FormLabel className="font-bold">Select Carrier</FormLabel>
                                            <FormControl className="w-full relative">
                                                <CommandPrimitive className='border-b-0' onKeyDown={handleCarrierKeyDown}>
                                                    <div>
                                                        <CommandArrival
                                                            ref={inputCarrierRef}
                                                            value={inputCarrierValue}
                                                            setValue={setValueCarrier}
                                                            onBlur={handlerCarrier}

                                                            onFocus={() => setCarrierOpen(true)}
                                                            placeholder={`${field.value || "Carrier"}`}
                                                            className="text-xs border border-neutral-300 px-2"
                                                            disableSearchIcon={true}
                                                            onChange={field.onChange}
                                                        />
                                                    </div>
                                                    <div className="mt-1 relative">
                                                        {isCarrierOpen ? (
                                                            <div className="absolute top-0 z-10 w-full rounded-xl bg-stone-50 outline-none animate-in fade-in-0 zoom-in-95">
                                                                <CommandList className="ring-1 ring-slate-200 rounded-lg">
                                                                    <CommandGroup>
                                                                        {carrierList.map((item, index) => {
                                                                            const isSelected = selected?.value === item.value
                                                                            return (
                                                                                <CommandItem
                                                                                    value={item.value}
                                                                                    setValue={field.onChange}
                                                                                    key={item.index}
                                                                                    className={cn(
                                                                                        "flex items-center gap-2 w-full",
                                                                                        !isSelected ? "pl-8" : null
                                                                                    )}
                                                                                    onMouseDown={event => {
                                                                                        event.preventDefault()
                                                                                        event.stopPropagation()
                                                                                    }}
                                                                                    onSelect={() => {
                                                                                        forms.setValue("carrier", item.value)
                                                                                        setCarrierOpen(false)
                                                                                    }}
                                                                                >
                                                                                    <div className='text-xs w-full justify-between flex flex-row'>
                                                                                        <p>{item.carrierName} </p>
                                                                                    </div>
                                                                                    <CheckIcon
                                                                                        className={cn(
                                                                                            "ml-auto h-4 w-4",
                                                                                            item.value === field.value
                                                                                                ? "opacity-100"
                                                                                                : "opacity-0"
                                                                                        )}
                                                                                    />
                                                                                </CommandItem>
                                                                            )
                                                                        })}
                                                                    </CommandGroup>
                                                                </CommandList>
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </CommandPrimitive>
                                            </FormControl>
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
                                            name="length"
                                            control={forms.control}
                                            render={({ field, formState }) => (
                                                <>
                                                    <FormItem className="w-full text-xs">
                                                        <FormControl>
                                                            <Input
                                                                id="length"
                                                                className={`text-xs h-[30px] rounded-sm px-2 py-0 ${formState.errors.length && "border-red-500 focus:ring-red-700 text-red-800"}`}
                                                                type="number"
                                                                placeholder="length" {...field} />
                                                        </FormControl>
                                                    </FormItem>
                                                </>
                                            )}
                                        />
                                        <FormField
                                            className="w-full flex flex-row justify-center items-end"
                                            name="width"
                                            control={forms.control}
                                            render={({ field, formState }) => (
                                                <>
                                                    <FormItem className="w-full text-xs">
                                                        <FormControl>
                                                            <Input
                                                                id="width"
                                                                className={`${formState.errors.width && "border-red-500 focus:ring-red-700 text-red-800"} text-xs h-[30px] rounded-sm px-2 py-0`}
                                                                type="number"
                                                                placeholder="width" {...field} />
                                                        </FormControl>
                                                    </FormItem>
                                                </>
                                            )}
                                        />
                                        <FormField
                                            className="w-full flex flex-row justify-center items-end"
                                            name="height"
                                            control={forms.control}
                                            render={({ field, formState }) => (
                                                <>
                                                    <FormItem className="w-full text-xs">
                                                        <FormControl>
                                                            <Input
                                                                id="height"
                                                                type="number"
                                                                className={`${formState.errors.height && "border-red-500 focus:ring-red-700 text-red-800"} text-xs h-[30px] rounded-sm px-2 py-0`}
                                                                placeholder="height" {...field} />
                                                        </FormControl>
                                                    </FormItem>
                                                </>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        name="heightType"
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
                                                                <SelectValue placeholder="in" />
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
                                            name="weight"
                                            control={forms.control}
                                            render={({ field, formState }) => (
                                                <>
                                                    <FormItem className="w-full text-xs">
                                                        <FormControl>
                                                            <Input
                                                                id="weight"
                                                                className={`${formState.errors.weight && "border-red-500 focus:ring-red-700 text-red-800"} text-xs h-[30px] rounded-sm px-2 py-0`}
                                                                placeholder="weight"
                                                                type="number"
                                                                {...field} />
                                                        </FormControl>
                                                    </FormItem>
                                                </>
                                            )}
                                        />
                                        <FormField
                                            name="weightType"
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
                                                                    <SelectValue placeholder="Ibs" />
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
                                                        id="labelImg"
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
                                                                            forms.setValue("box_images", images); // Atur nilai field label_images menggunakan setValue dari useForm
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
                                                        id="labelImg"
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
