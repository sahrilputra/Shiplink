'use client'
import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
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
import axios from 'axios'
import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CheckIcon } from 'lucide-react'
import { PopoverClose } from '@radix-ui/react-popover'
import { useToast } from '@/components/ui/use-toast'
import { Loaders } from '@/components/ui/loaders'

const formSchema = yup.object().shape({
    name: yup.string().required().max(50, "character is too long"),
    email: yup.string().email().required(),
    phoneNumber: yup.string().required(),
    address: yup.string().required(),
    city: yup.string(),
    state: yup.string(),
    zipCode: yup.string(),
    country: yup.string(),
})


export const UserProfileForms = ({ data = null, isDisable, handleDisable, customerID }) => {

    const { toast } = useToast()
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phoneNumber: "",
            address: "",
            city: "",
            state: "",
            zipCode: "",
            country: "",
        },
        mode: "onChange",
        disabled: isDisable,
    })

    useEffect(() => {
        form.setValue('name', data?.customer_name)
        form.setValue('email', data?.email)
        form.setValue('phoneNumber', data?.phone_number)
        form.setValue('address', data?.address)
        form.setValue('city', data?.city)
        form.setValue('state', data?.province_name)
        form.setValue('zipCode', data?.postal_code)
        form.setValue('country', data?.country_name)

    }, [data])

    const handleCancel = () => {
        handleDisable()
    }

    const [countryList, setCountryList] = useState([]);
    const [provinceList, setProvinceList] = useState([]);
    const [openProvince, setOpenProvince] = useState(false)
    const [openCountry, setOpenCountry] = useState(false)
    const [selectedProvince, setSelectedProvince] = useState("")
    const [selectedCountry, setSelectedCountry] = useState("")
    const [loading, setLoading] = useState(false)
    const fetchData = async () => {
        try {
            const response = await axios.post(
                `/api/admin/config/countries/list`,
                {
                    keyword: "",
                    page: 1,
                    limit: 0,
                    index: 0
                },
            );
            console.log("repsonse", response.data)
            setCountryList(response.data.country);

            const responseProvince = await axios.post(
                `/api/admin/config/province`,
                {
                    keyword: "",
                    page: 1,
                    limit: 0,
                    index: 0
                },
            );
            console.log("Response Province : ", responseProvince)
            setProvinceList(responseProvince.data.province);
        } catch (error) {
            console.log('Error:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleSave = async (formData) => {
        setLoading(true)
        console.log("dikirim", formData)
        formData.customer_id = customerID;
        try {
            const response = await axios.post(
                `/api/admin/customer_manager/updateData`,
                formData
            );
            toast({
                title: `Success Edit Customer ${formData.name}!`,
                description: response.data.message,
                status: `Status : ${response.data.status}`,
            });
            setLoading(false)
            window.location.reload();
        } catch (error) {
            console.log('Error', error);
            setLoading(false)
            toast({
                title: 'Error While Edit Customer Data!',
                description: `Error : ${error.message}`,
                status: `Status : ${error.status}`,
            });
        }
    };
    // const handleSave = async (formData) => {
    //     console.log("dikirim", formData)
    // };

    const handleSelectProvince = (provinceCode, provinceName) => {
        setSelectedProvince(provinceName);
        form.setValue('state', provinceCode);
        setOpenProvince(false);
    }

    const handleSelectCountry = (countryCode, countryName) => {
        setSelectedCountry(countryName);
        form.setValue('country', countryCode);
        setOpenCountry(false);
    }

    console.log(form.formState.errors);
    return (
        <>
            {
                loading && <Loaders />
            }
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSave)}
                    className={`flex gap-2 flex-col  ${isDisable ? "opacity-85" : " "}`}
                    action="">
                    <div className="bg-white rounded-lg border border-neutral-200 border-opacity-90 w-full px-4 py-3 gap-1 flex flex-col">
                        <FormField
                            className="w-full"
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-xs space-y-1 ">
                                        <FormLabel className=" text-xs font-bold">Full Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                size="new"
                                                className="px-1.5" id="name" placeholder="john" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                </>
                            )}
                        />

                        <FormField
                            name="address"
                            className="w-full space-y-1"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full space-y-1 ">
                                        <FormLabel className=" text-xs font-bold ">Street Address</FormLabel>
                                        <FormControl >
                                            <Input
                                                size="new"
                                                className="px-1.5" type="text" id="address" placeholder="Street Address"  {...field} />
                                        </FormControl>
                                    </FormItem>
                                </>
                            )}
                        />
                        <div className="profile flex flex-row gap-2 w-full">
                            <FormField
                                name="email"
                                className="w-full space-y-1 "
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full space-y-1">
                                            <FormLabel className=" text-xs font-bold">Email</FormLabel>
                                            <FormControl >
                                                <Input
                                                    size="new"
                                                    className="px-1.5" type="email" id="email" placeholder="Emails" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    </>
                                )}
                            />
                            <FormField
                                name="phoneNumber"
                                className="w-full space-y-1 "
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full space-y-1">
                                            <FormLabel className=" text-xs font-bold">Phone Number</FormLabel>
                                            <FormControl>
                                                <Input
                                                    size="new"
                                                    className="px-1.5" type="number" id="phone" placeholder="Phone Number" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    </>
                                )}
                            />
                        </div>
                        <div className="address flex flex-col w-full gap-2">
                            <div className="wrap flex flex-row items-center gap-2">
                                <FormField
                                    name="city"
                                    className="w-full space-y-1 "
                                    control={form.control}
                                    render={({ field }) => (
                                        <>
                                            <FormItem className="w-full space-y-1">
                                                <FormLabel className=" text-xs font-bold">City</FormLabel>
                                                <FormControl >
                                                    <Input
                                                        size="new"
                                                        className="px-1.5" type="text" id="city" placeholder="City" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        </>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="state"
                                    className="w-full mt-2"
                                    disabled={isDisable}
                                    render={({ field }) => (
                                        <>
                                            <FormItem className="flex flex-col w-full mt-2">
                                                <FormLabel className=" text-xs font-bold">Select Province</FormLabel>
                                                <Popover className="w-full" open={openProvince} onOpenChange={setOpenProvince}>
                                                    <PopoverTrigger asChild>
                                                        <FormControl className="w-full">
                                                            <Button
                                                                onClick={() => setOpenProvince(true)}
                                                                variant="outline"
                                                                role="combobox"
                                                                type="button"
                                                                className={`text-xs px-1 h-[30px] shadow-none justify-start w-full gap-2 ${!field.value && "text-muted-foreground"}`}
                                                                disabled={isDisable}
                                                            >
                                                                <span className='text-xs px-2'>
                                                                    {selectedProvince ? selectedProvince : "Select Province"}
                                                                </span>
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-[300px] p-0">
                                                        <Command className="w-full">
                                                            <CommandInput
                                                                placeholder="Search Province..."
                                                                className="h-9 w-full text-xs"
                                                            />
                                                            <CommandEmpty
                                                                className="w-full text-xs text-center py-2"
                                                            >
                                                                No Province found.
                                                            </CommandEmpty>

                                                            <CommandGroup className="h-[150px]">
                                                                <ScrollArea className="h-[150px]">

                                                                    {provinceList.map((item) => (
                                                                        <>
                                                                            <PopoverClose asChild>
                                                                                <CommandItem
                                                                                    value={item.province_code}
                                                                                    key={item.province_id}
                                                                                    className="text-xs"
                                                                                    onSelect={() => {
                                                                                        handleSelectProvince(
                                                                                            item.province_code,
                                                                                            item.province_name
                                                                                        );
                                                                                        field.onChange(item.province_code);
                                                                                    }}
                                                                                >
                                                                                    {item.province_name}
                                                                                    <CheckIcon
                                                                                        className={`ml-auto h-4 w-4 ${item.province_code === field.value ? "opacity-100" : "opacity-0"}`}
                                                                                    />

                                                                                </CommandItem>
                                                                            </PopoverClose>
                                                                        </>

                                                                    ))}
                                                                </ScrollArea>
                                                            </CommandGroup>
                                                        </Command>
                                                    </PopoverContent>
                                                </Popover>
                                            </FormItem>
                                        </>
                                    )}
                                />
                            </div>
                            <div className="wrap flex flex-row items-center gap-2">
                                <FormField
                                    name="zipCode"
                                    className="w-full"
                                    control={form.control}
                                    render={({ field }) => (
                                        <>
                                            <FormItem className="w-full space-y-1">
                                                <FormLabel className=" text-xs font-bold">Zip / Postal Code</FormLabel>
                                                <FormControl >
                                                    <Input
                                                        size="new"
                                                        className="px-1.5" type="text" id="state" placeholder="Zip"  {...field} />
                                                </FormControl>
                                            </FormItem>
                                        </>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="country"
                                    className="w-full mt-2"
                                    disabled={isDisable}
                                    render={({ field }) => (
                                        <>

                                            <FormItem className="flex flex-col w-full mt-2">
                                                <FormLabel className=" text-xs font-bold">Select Country</FormLabel>
                                                <Popover className="w-full" open={openCountry} onOpenChange={setOpenCountry}>
                                                    <PopoverTrigger asChild>
                                                        <FormControl className="w-full">
                                                            <Button
                                                                onClick={() => setOpenCountry(true)}
                                                                variant="outline"
                                                                role="combobox"
                                                                type="button"
                                                                className={`text-xs px-1 h-[30px] shadow-none justify-start w-full gap-2 ${!field.value && "text-muted-foreground"}`}
                                                                disabled={isDisable}
                                                            >
                                                                <span className='text-xs px-2'>
                                                                    {selectedCountry ? selectedCountry : "Select Country"}
                                                                </span>
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-[300px] p-0">
                                                        <Command className="w-full">
                                                            <CommandInput
                                                                placeholder="Search Country..."
                                                                className="h-9 w-full text-xs"
                                                            />
                                                            <CommandEmpty
                                                                className="w-full text-xs text-center py-2"
                                                            >
                                                                No Country found.
                                                            </CommandEmpty>

                                                            <CommandGroup className="h-[150px]">
                                                                <ScrollArea className="h-[150px]">

                                                                    {countryList.map((item) => (
                                                                        <>
                                                                            <PopoverClose asChild>
                                                                                <CommandItem
                                                                                    value={item.country_code}
                                                                                    key={item.country_id}
                                                                                    className="text-xs"
                                                                                    onSelect={() => {
                                                                                        handleSelectCountry(
                                                                                            item.country_code,
                                                                                            item.country_name
                                                                                        );
                                                                                        field.onChange(item.country_code,);
                                                                                    }}
                                                                                >
                                                                                    {item.country_name}
                                                                                    <CheckIcon
                                                                                        className={`ml-auto h-4 w-4 ${item.country_code === field.value ? "opacity-100" : "opacity-0"}`}
                                                                                    />

                                                                                </CommandItem>
                                                                            </PopoverClose>
                                                                        </>

                                                                    ))}
                                                                </ScrollArea>
                                                            </CommandGroup>
                                                        </Command>
                                                    </PopoverContent>
                                                </Popover>
                                            </FormItem>
                                        </>
                                    )}
                                />

                            </div>
                        </div>

                        <div className={`flex flex-row w-full items-end justify-end gap-5 pt-3 ${isDisable ? "hidden" : ""}`}>
                            <Button
                                variant="redOutline"
                                size="xs"
                                type="button"
                                onClick={handleCancel}
                            >
                                <p className='text-xs'>Cancel</p>
                            </Button>
                            <Button
                                variant="destructive"
                                size="xs"
                                type="submit"
                            >
                                <p className='text-xs'>Save</p>
                            </Button>
                        </div>
                    </div>
                </form>
            </Form >
        </>
    )
}
