'use client'
import React, { useState, useCallback, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { CheckIcon } from 'lucide-react'
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
        "carrierName": "FeedEx",
        "value": "FeedEx"
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
        });
        // Clear any additional state variables
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

    // const handleSelectOption = useCallback(
    //     selectedOption => {
    //         setInputValue(selectedOption.id)

    //         setSelected(selectedOption)
    //         onValueChange?.(selectedOption)

    //         // This is a hack to prevent the input from being focused after the user selects an option
    //         // We can call this hack: "The next tick"
    //         setTimeout(() => {
    //             inputRef?.current?.blur()
    //         }, 0)
    //     },
    //     [onValueChange]
    // )

    return (
        <>
            <div className="flex gap-2 flex-col text-zinc-600">
                <div className="flex flex-row gap-3">
                    <div className="flex flex-col justify-start gap-2 w-full">
                        <div className="nameWrapper flex flex-row gap-3 w-full text-sm">
                            {/* <FormField
                                className="w-full text-sm"
                                name="customerID"
                                control={forms.control}
                                render={({ field }) => (
                                    <>
                                        {console.log(field)}
                                        <FormItem className="w-[50%] text-xs ">
                                            <FormLabel className="font-bold">Customer Unit ID</FormLabel>
                                            <FormControl className="w-full">
                                                <Popover className="w-full">
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
                                                                role="combobox"
                                                                className={cn(
                                                                    "w-full justify-between shadow-none text-xs h-[30px] rounded-sm px-2 py-0",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value ? data.find((item) => item.id === field.value)?.id : "Select User"}
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className=" p-0 h-[200px] w-[100%]">
                                                        <ScrollArea className="h-[200px] w-[100%]">
                                                            <Command className="w-full">
                                                                <CommandInput
                                                                    placeholder="Find User..."
                                                                    className="h-9 shadow-none text-xs"
                                                                />
                                                                <CommandEmpty className="text-xs text-center py-2">No Customer Found.</CommandEmpty>
                                                                <PopoverClose>
                                                                    <CommandGroup className="w-full">
                                                                        {data.map((item) => (
                                                                            <CommandItem
                                                                                value={item.id}
                                                                                key={item.id}
                                                                                className="w-full"
                                                                                onSelect={() => {
                                                                                    forms.setValue("customerID", item.id)
                                                                                    handleDataChange({ target: { value: item.id } })
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
                                                                            </CommandItem>
                                                                        ))}
                                                                    </CommandGroup>
                                                                </PopoverClose>
                                                            </Command>
                                                        </ScrollArea>
                                                    </PopoverContent>
                                                </Popover>
                                            </FormControl>
                                            <FormMessage ClassName="text-xs" />
                                        </FormItem>
                                    </>
                                )}
                            /> */}

                            <FormField
                                className="w-full text-sm"
                                name="customerID"
                                control={forms.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-[50%] text-xs ">
                                            <FormLabel className="font-bold">Customer Unit ID</FormLabel>
                                            <FormControl className="w-full relative">
                                                <CommandPrimitive className='border-b-0' onKeyDown={handleKeyDown}>
                                                    <div>
                                                        <CommandArrival
                                                            ref={inputRef}
                                                            value={inputValue}
                                                            setValue={isLoading ? undefined : setInputValue}
                                                            onBlur={handleBlur}
                                                            onFocus={() => setOpen(true)}
                                                            placeholder={`${field.value ? data.find((item) => item.id === field.value)?.id : "Select User"}`}
                                                            className="text-xs border border-neutral-300 px-2"
                                                            disableSearchIcon={true}
                                                        />
                                                    </div>
                                                    <div className="mt-1 relative">
                                                        {isOpen ? (
                                                            <div className="absolute top-0 z-10 w-full rounded-xl bg-stone-50 outline-none animate-in fade-in-0 zoom-in-95">
                                                                <CommandList className="ring-1 ring-slate-200 rounded-lg">
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


                            <FormField
                                name="fullName"
                                className="w-[60%] text-xs"
                                control={forms.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full text-xs">
                                            <FormLabel className=" font-bold">Customer Full Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="fullName"
                                                    className={`text-xs h-[30px] rounded-sm px-2 py-0 ${disabled && "bg-zinc-400/50 cursor-not-allowed"}`}
                                                    placeholder="John Doe"
                                                    {...field}
                                                    disabled={disabled}
                                                />
                                            </FormControl>
                                            <FormMessage ClassName="text-xs" />
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
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-[50%] text-xs">
                                            <FormLabel className=" font-bold">Phone Number</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="phoneNumber"
                                                    className={`text-xs h-[30px] rounded-sm px-2 py-0 ${disabled && "bg-zinc-400/50 cursor-not-allowed"}`}
                                                    placeholder="+1 21xxxx"
                                                    {...field}
                                                    disabled={disabled}
                                                />
                                            </FormControl>
                                            <FormMessage ClassName="text-xs" />
                                        </FormItem>
                                    </>
                                )}
                            />
                            <FormField
                                name="email"
                                className="w-full "
                                control={forms.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full text-xs">
                                            <FormLabel className="font-bold">Email</FormLabel>
                                            <FormControl>
                                                <Input

                                                    id="email"
                                                    type="email"
                                                    className={`text-xs h-[30px] rounded-sm px-2 py-0 ${disabled && "bg-zinc-400/50 cursor-not-allowed"}`}
                                                    placeholder="customer@shiplink.ca"
                                                    {...field}
                                                    disabled={disabled}
                                                />
                                            </FormControl>
                                            <FormMessage ClassName="text-xs" />
                                        </FormItem>
                                    </>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col justify-start gap-2 w-full">
                        <div className="nameWrapper flex flex-row gap-2 w-[100%]  text-zinc-600">
                            <FormField
                                className="w-full"
                                name="trackingBarcode"
                                control={forms.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-[60%] text-xs">
                                            <FormLabel className=" font-bold text-zinc-600">Barcode / Tracking</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="trackingBarcode"
                                                    className="text-xs h-[30px] rounded-sm px-2 py-0"
                                                    placeholder={`${field.value}`}
                                                    {...field}
                                                    disabled />
                                            </FormControl>
                                            <FormMessage ClassName="text-xs" />
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
                                        <FormItem className="w-[50%] text-xs ">
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
                                                                    {/* <CommandEmpty className="text-xs text-center py-2">
                                                                        {valueCarrier}
                                                                    </CommandEmpty> */}
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
                            {/* <FormField
                                name="carrier"
                                className="w-full "
                                control={forms.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-[40%] text-xs" >
                                            <FormLabel className=" font-bold text-zinc-600">Select Carrier</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                control={forms.control}
                                                className="text-xs h-[30px] rounded-sm px-2 py-0"
                                                defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className='text-xs h-[30px] rounded-sm px-2 py-0'>
                                                        <SelectValue className='text-xs h-[30px] rounded-sm px-2 py-0' placeholder="Purolator" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="text-xs">
                                                    <SelectItem className="text-xs" value="UPS">UPS</SelectItem>
                                                    <SelectItem className="text-xs" value="DHL">DHL</SelectItem>
                                                    <SelectItem className="text-xs" value="FedEx">FedEx</SelectItem>
                                                    <SelectItem className="text-xs" value="USPS">USPS</SelectItem>
                                                    <SelectItem className="text-xs" value="Purolator">Purolator</SelectItem>
                                                    <SelectItem className="text-xs" value="Canada Post">Canada Post</SelectItem>
                                                    <div className="flex items-center flex-row gap-2">
                                                        <p className='text-xs'>Other</p>
                                                        <Input
                                                            size="new"
                                                            type="text"
                                                            className="text-xs h-[30px] rounded-sm px-2 py-0"
                                                            placeholder="Other"
                                                            {...field}
                                                        />
                                                    </div>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage ClassName="text-xs" />
                                        </FormItem>
                                    </>
                                )}
                            /> */}
                        </div>
                        <div className="nameWrapper flex flex-row gap-3 w-[100%]  text-zinc-600">
                            <div className="flex flex-col gap-2">
                                <FormLabel className=" font-bold text-zinc-600">Package Dimension</FormLabel>
                                <div className="flex flex-row gap-2 w-full">
                                    <FormField
                                        className="w-full flex flex-row justify-center items-end"
                                        name="length"
                                        control={forms.control}
                                        render={({ field }) => (
                                            <>
                                                <FormItem className="w-full text-xs">
                                                    <FormControl>
                                                        <Input id="length" className="text-xs h-[30px] rounded-sm px-2 py-0" type="number" placeholder="length" {...field} />
                                                    </FormControl>
                                                    <FormMessage ClassName="text-xs" />
                                                </FormItem>
                                            </>
                                        )}
                                    />
                                    <FormField
                                        className="w-full flex flex-row justify-center items-end"
                                        name="width"
                                        control={forms.control}
                                        render={({ field }) => (
                                            <>
                                                <FormItem className="w-full text-xs">
                                                    <FormControl>
                                                        <Input id="width" className="text-xs h-[30px] rounded-sm px-2 py-0" type="number" placeholder="width" {...field} />
                                                    </FormControl>
                                                    <FormMessage ClassName="text-xs" />
                                                </FormItem>
                                            </>
                                        )}
                                    />
                                    <FormField
                                        className="w-full flex flex-row justify-center items-end"
                                        name="height"
                                        control={forms.control}
                                        render={({ field }) => (
                                            <>
                                                <FormItem className="w-full text-xs">
                                                    <FormControl>
                                                        <Input id="height" type="number" className="text-xs h-[30px] rounded-sm px-2 py-0" placeholder="height" {...field} />
                                                    </FormControl>
                                                    <FormMessage ClassName="text-xs" />
                                                </FormItem>
                                            </>
                                        )}
                                    />

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
                                                            <SelectItem className="text-xs" value="mm">mm</SelectItem>
                                                            <SelectItem className="text-xs" value="cm">cm</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage ClassName="text-xs" />
                                                </FormItem>
                                            </>
                                        )}
                                    />
                                    <FormField
                                        className="w-full flex flex-row justify-center items-end"
                                        name="weight"
                                        control={forms.control}
                                        render={({ field }) => (
                                            <>
                                                <FormItem className="w-full text-xs">
                                                    <FormControl>
                                                        <Input id="weight" className="text-xs h-[30px] rounded-sm px-2 py-0 " placeholder="weight" type="number" {...field} />
                                                    </FormControl>
                                                    <FormMessage ClassName="text-xs" />
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
                                                                <SelectValue placeholder="ibs" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem className="text-xs" value="Ibs">Ibs</SelectItem>
                                                            <SelectItem className="text-xs" value="Kg">Kg</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage ClassName="text-xs" />
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
                    </div>


                </div>


                <div className="flex flex-row justify-center items-center gap-3">
                    <FormField
                        className="w-full flex flex-row justify-center items-end"
                        name="firstName"
                        control={forms.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full ">
                                    <FormLabel className=" font-bold">Whole Box Image</FormLabel>
                                    <FormControl>
                                        <div className='rounded-md border border-slate-300 p-0 cursor-pointer'>
                                            <Input
                                                id="wholeBox"
                                                type="file"
                                                className="p-0 border-none text-xs h-[30px] rounded-sm px-0 py-0 file:mr-3 file:bg-myBlue file:text-white  file:h-full file:px-3 file:text-xs cursor-pointer file:cursor-pointer hover:bg-slate-100 hover:file:bg-blue-900"
                                                placeholder="Upload Image"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage ClassName="text-xs" />
                                </FormItem>
                            </>
                        )}
                    />
                    <FormField
                        className="w-full flex flex-row justify-center items-end"
                        name="firstName"
                        control={forms.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full ">
                                    <FormLabel className=" font-bold">Label Close Up</FormLabel>
                                    <FormControl>
                                        <div className='rounded-md border border-slate-300 p-0'>
                                            <Input
                                                id="wholeBox"
                                                type="file"
                                                className="p-0 border-none text-xs h-[30px] rounded-sm px-0 py-0 file:mr-3 file:bg-myBlue file:text-white  file:h-full file:px-3 file:text-xs cursor-pointer file:cursor-pointer hover:bg-slate-100 hover:file:bg-blue-900"
                                                placeholder="Upload Image"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage ClassName="text-xs" />
                                </FormItem>
                            </>
                        )}
                    />
                    <FormField
                        className="w-full flex flex-row justify-center items-end"
                        name="firstName"
                        control={forms.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full ">
                                    <FormLabel className=" font-bold">Content Images</FormLabel>
                                    <FormControl>
                                        <div className='rounded-md border border-slate-300 p-0'>
                                            <Input
                                                id="wholeBox"
                                                type="file"
                                                className="p-0 border-none text-xs h-[30px] rounded-sm px-0 py-0 file:mr-3 file:bg-myBlue file:text-white file:h-full file:px-3 file:text-xs cursor-pointer file:cursor-pointer hover:bg-slate-100 hover:file:bg-blue-900"
                                                placeholder="Upload Image"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage ClassName="text-xs" />
                                </FormItem>
                            </>
                        )}
                    />


                </div>
            </div>
        </>
    )
}

// const formData = {};

// // Assign forms field values to the corresponding properties of the formData object
// formData.firstName = forms.getValues("firstName");
// formData.wholeBoxImage = forms.getValues("wholeBox");
// formData.labelCloseUp = forms.getValues("labelCloseUp");
// formData.contentImages = forms.getValues("contentImages");
// formData.length = forms.getValues("length");
// formData.lengthType = forms.getValues("lengthType");
// formData.weight = forms.getValues("weight");
// formData.weightType = forms.getValues("weightType");

// // Use the formData object as your parameter
// yourFunction(formData);
