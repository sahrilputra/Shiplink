'use client'
import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import InputMask from 'react-input-mask';
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
    province_code: yup.string(),
    zipCode: yup.string(),
    country: yup.string(),
    country_code: yup.string(),
})


export const UserProfileForms = ({ data = null, isDisable, handleDisable, customerID, reloadData }) => {
    console.log("🚀 ~ UserProfileForms ~ data:", data)

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
            province_code: "",
            zipCode: "",
            country: "",
            country_code: "",
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
        form.setValue('country_code', data?.country_code)
        form.setValue('province_code', data?.province_code)
        setSelectedCountry(data?.country_name)
        setSelectedProvince(data?.province_name)
        findCountryByCode(data?.country_name)
        findProvinceCode(data?.province_name)

    }, [data, form])

    console.log("🚀 ~ UserProfileForms ~ data:", data)

    const findProvinceCode = async (province) => {
        try {
            const responseProvince = await axios.post(
                `/api/admin/config/province`,
                {
                    keyword: province,
                    page: 0,
                    limit: 0,
                    index: 0,
                }
            );
            setProvinceList(responseProvince.data.province);
            const setDataProvince = responseProvince.data.province.find((item) => item.province_name === province);
            console.log("🚀 ~ findProvinceCode ~ setDataProvince:", setDataProvince.province_code)
            form.setValue('province_code', setDataProvince.province_code)
        } catch (error) {
            console.log('Error:', error);
        }
    }
    const findCountryByCode = async (country) => {
        try {
            const response = await axios.post(
                `/api/admin/config/countries/list`,
                {
                    keyword: country,
                    page: 0,
                    limit: 0,
                    index: 0,
                }
            );
            console.log(" findCountryByCode - repsonse", response.data)
            const responseData = response.data.country;
            const setDataCountry = responseData.find((item) => item.country_name === country);
            console.log("🚀 ~ findCountryByCode ~ setDataCountry:", setDataCountry)
            form.setValue('country_code', setDataCountry.country_code)
        } catch (error) {
            console.log('Error:', error);
        }
    }

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


    // Country

    const [countryQuery, setCountryQuery] = useState({
        keyword: "",
        page: 0,
        limit: 0,
        index: 0,
    });
    const [commandQuery, setCommandQuery] = useState("");
    const handleCommandChange = (e) => {
        console.log("🚀 ~ handleCommandChange ~ e:", e)
        setCommandQuery(e);
        setCountryQuery({ ...countryQuery, keyword: e });
    }

    useEffect(() => {
        const fetchCountryList = async () => {
            try {
                const response = await axios.post(
                    `/api/admin/config/countries/list`,
                    countryQuery
                );
                console.log("repsonse", response.data)
                setCountryList(response.data.country);
            } catch (error) {
                console.log('Error:', error);
                fetchCountryList();
            }
        }
        fetchCountryList();
    }, [countryQuery]);

    // Province

    const [provinceQuery, setProvinceQuery] = useState({
        keyword: "",
        page: 0,
        limit: 0,
        index: 0,
    });

    const handleProvinceChange = (e) => {
        console.log("🚀 ~ handleCommandChange ~ e:", e)
        setProvinceQuery({ ...provinceQuery, keyword: e });
    }

    useEffect(() => {
        const fetchProvinceList = async () => {
            try {
                const responseProvince = await axios.post(
                    `/api/admin/config/province`, provinceQuery
                );
                console.log("Response Province : ", responseProvince)
                setProvinceList(responseProvince.data.province);
            } catch (error) {
                console.log('Error:', error);
                fetchProvinceList();
            }
        }
        fetchProvinceList();
    }, [provinceQuery]);

    // Save
    const handleSave = async (formData) => {
        setLoading(true)
        // const setDataCountry = countryList.find((item) => item.country_name === formData.country || item.country_code === formData.country);
        // // formData.country = setDataCountry.country_code;
        // // console.log("🚀 ~ handleSave ~ setDataCountry:", setDataCountry)
        console.log("dikirim", formData)
        formData.customer_id = customerID;
        try {
            const response = await axios.post(
                `/api/admin/customer_manager/updateData`,
                {
                    customer_id: customerID,
                    name: formData.name,
                    address: formData.address,
                    phoneNumber: formData.phoneNumber,
                    email: formData.email,
                    country_code: formData.country_code,
                    province_code: formData.province_code,
                    city: formData.city,
                    zipCode: formData.zipCode,
                }
            );

            handleCancel();
            setLoading(false)

            if (response.data.status === "true" || response.data.status === true) {
                toast({
                    title: `Success Edit Customer ${formData.name}!`,
                    description: response.data.message,
                });
            } else {
                toast({
                    title: `Error!`,
                    description: response.data.message,
                });
            }
        } catch (error) {
            console.log('Error', error);
            setLoading(false)
            handleCancel();
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
        console.log("🚀 ~ handleSelectCountry ~ countryCode:", countryCode)
        console.log("🚀 ~ handleSelectCountry ~ countryCode:", countryName)
        setSelectedCountry(countryName);
        form.setValue('country_code', countryCode);
        form.setValue('country', countryName);
        setOpenCountry(false);
    }

    console.log(form.formState.errors);
    return (
        <>
            {loading && <Loaders />}
            <Form {...form}>
                <form
                    className={`flex gap-2 flex-col  ${isDisable ? "opacity-85" : " "}`}
                    action=""
                    onSubmit={form.handleSubmit(handleSave)}
                >
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
                                                className="px-1.5" id="name"
                                                placeholder="john"
                                                {...field}
                                            />
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
                                disabled={isDisable}
                                render={({ field }) => (
                                    <>
                                        {/* <FormItem className="w-full space-y-1">
                                            <FormLabel className=" text-xs font-bold">Phone Number</FormLabel>
                                            <FormControl>
                                                <Input
                                                    size="new"
                                                    className="px-1.5" type="number" id="phone" placeholder="Phone Number" {...field} />
                                            </FormControl>
                                        </FormItem> */}

                                        <FormItem className="w-full space-y-1">
                                            <FormLabel className=" text-xs font-bold">Phone Number</FormLabel>
                                            <FormControl>
                                                <InputMask
                                                    mask="+9.999.999.9999"
                                                    maskChar={null}
                                                    maskPlaceholder="0000.00.0000"
                                                    {...field}
                                                    disabled={isDisable}
                                                >
                                                    {(inputProps) => (
                                                        <Input
                                                            className="px-1.5"
                                                            id="phoneNumber"
                                                            size="new"
                                                            type="text"
                                                            placeholder="+1.000.000.0000"
                                                            disabled={isDisable}
                                                            {...inputProps}
                                                        />
                                                    )}
                                                </InputMask>
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
                                                <FormLabel className=" text-xs font-bold">State/Province</FormLabel>
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
                                                                onValueChange={(e) => handleProvinceChange(e)}
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
                                                                                    value={item.province_name}
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
                                                                onValueChange={(e) => handleCommandChange(e)}
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
                                                                                    value={item.country_name}
                                                                                    key={item.country_id}
                                                                                    className="text-xs"
                                                                                    onSelect={() => {
                                                                                        handleSelectCountry(
                                                                                            item.country_code,
                                                                                            item.country_name
                                                                                        );
                                                                                        form.setData('country_code', item.country_code)
                                                                                        field.onChange(item.country_code,);
                                                                                    }}
                                                                                >
                                                                                    {`${item.country_name}- ${item.country_code}`}
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
