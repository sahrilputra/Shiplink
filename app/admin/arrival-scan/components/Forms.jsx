'use client'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { CheckIcon } from 'lucide-react'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import data from '../../../../data/admin/UserData.json'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from "@/lib/utils"


export const ArrivalForms = ({ forms }) => {

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
    return (
        <>
            <div className="flex gap-2 flex-col text-zinc-600">
                <div className="flex flex-row gap-3">
                    <div className="flex flex-col justify-start gap-2 w-full">
                        <div className="nameWrapper flex flex-row gap-3 w-full text-sm">
                            <FormField
                                className="w-full text-sm"
                                name="customerID"
                                control={forms.control}
                                render={({ field }) => (
                                    <>
                                        {console.log(field)}
                                        <FormItem className="w-[50%] text-xs ">
                                            <FormLabel className="font-bold">Customer Unit ID</FormLabel>
                                            <FormControl>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
                                                                role="combobox"
                                                                className={cn(
                                                                    "w-full justify-between shadow-none text-xs h-9 py-0",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value ? data.find((item) => item.id === field.value)?.id : "Select User"}
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className=" p-0">
                                                        <Command>
                                                            <CommandInput
                                                                placeholder="Find User..."
                                                                className="h-9 shadow-none"
                                                            />
                                                            <CommandEmpty>No Customer Found.</CommandEmpty>
                                                            <CommandGroup>
                                                                {data.map((item) => (
                                                                    <CommandItem
                                                                        value={item.id}
                                                                        key={item.id}
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
                                                        </Command>
                                                    </PopoverContent>
                                                </Popover>
                                            </FormControl>
                                            <FormMessage />
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
                                                    className={`text-xs h-9 py-0 ${disabled && "bg-zinc-400/50 cursor-not-allowed"}`}
                                                    placeholder="John Doe"
                                                    {...field}
                                                    disabled={disabled}
                                                />
                                            </FormControl>
                                            <FormMessage />
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
                                                    className={`text-xs h-9 py-0 ${disabled && "bg-zinc-400/50 cursor-not-allowed"}`}
                                                    placeholder="+1 21xxxx"
                                                    {...field}
                                                    disabled={disabled}
                                                />
                                            </FormControl>
                                            <FormMessage />
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
                                                    className={`text-xs h-9 py-0 ${disabled && "bg-zinc-400/50 cursor-not-allowed"}`}
                                                    placeholder="customer@shiplink.ca"
                                                    {...field}
                                                    disabled={disabled}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                        </div>

                        <div className={`flex w-full justify-end ${newData !== null ? 'block' : 'hidden'}`}>
                            <Button
                                onClick={handleResetCustomerData}
                                variant="ghost"
                                type="button"
                                className='text-xs text-red-700 h-5'>
                                Reset Forms
                            </Button>
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
                                                    className="text-xs h-9 py-0"
                                                    placeholder={`${field.value}`}
                                                    {...field}
                                                    disabled />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                            <FormField
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
                                                className="text-xs h-9 py-0"
                                                defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className='text-xs h-9 py-0'>
                                                        <SelectValue className='text-xs h-9 py-0' placeholder="Purolator" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="text-xs">
                                                    <SelectItem className="text-xs" value="Purolator">Purolator</SelectItem>
                                                    <SelectItem className="text-xs" value="Feedex">Feedex</SelectItem>
                                                    <SelectItem className="text-xs" value="Amazon">Amazon</SelectItem>
                                                    <SelectItem className="text-xs" value="DHL">DHL</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
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
                                                        <Input id="length" className="text-xs h-9 py-0" type="number" placeholder="length" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
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
                                                        <Input id="width" className="text-xs h-9 py-0" type="number" placeholder="width" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
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
                                                        <Input id="height" type="number" className="text-xs h-9 py-0" placeholder="height" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
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
                                                            <SelectTrigger className="text-xs h-9 py-0">
                                                                <SelectValue placeholder="in" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem className="text-xs" value="mm">mm</SelectItem>
                                                            <SelectItem className="text-xs" value="cm">cm</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
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
                                                        <Input id="weight" className="text-xs h-9 py-0 " placeholder="weight" type="number" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
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
                                                            <SelectTrigger className="text-xs h-9 py-0">
                                                                <SelectValue placeholder="ibs" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem className="text-xs" value="ibs">ibs</SelectItem>
                                                            <SelectItem className="text-xs" value="kg">kg</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            </>
                                        )}
                                    />
                                </div>
                            </div>
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
                                        <div className='rounded-md border border-slate-200 p-0'>
                                            <Input
                                                id="wholeBox"
                                                type="file"
                                                className="p-0 border-none h-9 py-0  file:bg-myBlue file:text-white  file:h-full file:px-3 file:text-xs "
                                                placeholder="Upload Image"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
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
                                        <div className='rounded-md border border-slate-200 p-0'>
                                            <Input
                                                id="wholeBox"
                                                type="file"
                                                className="p-0 border-none h-9 py-0  file:bg-myBlue file:text-white  file:h-full file:px-3 file:text-xs "
                                                placeholder="Upload Image"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
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
                                        <div className='rounded-md border border-slate-200 p-0'>
                                            <Input
                                                id="wholeBox"
                                                type="file"
                                                className="p-0 border-none h-9 py-0 file:bg-myBlue file:text-white  file:h-full file:px-3 file:text-xs "
                                                placeholder="Upload Image"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
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
