/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { CheckIcon } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import axios from 'axios'
import { useToast } from '@/components/ui/use-toast'
import { Loaders } from '@/components/ui/loaders'
import InputMask from 'react-input-mask';

const formSchema = yup.object().shape({
    fullName: yup.string().required("Full Name Is Required").max(50, "character is too long"),
    email: yup.string().email().required("Email Is Required"),
    phone_number: yup.string().required(),
    street_address: yup.string().required(),
    city: yup.string().required(),
    province_code: yup.string().required(),
    province: yup.string().required(),
    postal_code: yup.string().required(),
    country_code: yup.string().required(),
    country: yup.string().required(),
})

export const AddressForms = ({ userCode }) => {
    const { toast } = useToast()
    const [disable, setDisable] = useState(false);

    const [defaultData, setDefaultData] = useState(null);
    console.log("🚀 ~ AddressForms ~ defaultData:", defaultData?.city)

    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            fullName: defaultData?.name || "",
            email: defaultData?.email || "",
            phone_number: defaultData?.phone_number || "",
            street_address: defaultData?.street_address || "",
            city: defaultData?.city || "",
            postal_code: defaultData?.postal_code || "",
            country: defaultData?.country_name || "",
            province: defaultData?.province_name || "",
            province_code: "",
            country_code: "",
        },
        mode: "onChange",
        disabled: disable,
    })

    const fetchUserData = async () => {
        try {
            const response = await axios.post(
                `/api/customerAPI/payments/getBilling`,
                {
                    user_code: userCode,
                    limit: 1,
                }
            )
            const data = await response.data;
            const firstBilling = data.billing.length > 0 ? data.billing[0] : null;
            console.log("🚀 ~ fetchUserData ~ data:", firstBilling)
            setDefaultData(firstBilling);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchUserData();
    }, [userCode])

    useEffect(() => {
        if (defaultData) {
            form.setValue("fullName", defaultData?.name || "")
            form.setValue("email", defaultData?.email || "")
            form.setValue("phone_number", defaultData?.phone_number || "")
            form.setValue("street_address", defaultData?.street_address || "")
            form.setValue("city", defaultData?.city || "")
            form.setValue("postal_code", defaultData?.postal_code || "")
            form.setValue("country", defaultData?.country_name || "")
            form.setValue("province", defaultData?.province_name || "")
        }
    }, [defaultData])


    const [query, setQuery] = useState({
        keyword: "",
        page: 0,
        limit: 0,
        index: 0,
    })
    const [queryProvince, setQueryProvince] = useState({
        keyword: "",
        country_code: "",
        page: 0,
        limit: 0,
        index: 0,
    })
    const [popCountry, setPopCountry] = useState(false)
    const [popProvince, setPopProvince] = useState(false)
    const [country, setCountry] = useState([]);
    const [province, setProvince] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    `/api/admin/config/countries/list`,
                    query
                );
                const data = await response.data;
                setCountry(data.country);
            } catch (error) {
                console.log('Error:', error);
            }
        };

        const fetchDataProvince = async () => {
            try {
                const response = await axios.post(
                    `/api/admin/config/province`,
                    queryProvince
                );
                const data = await response.data;
                setProvince(data.province);
            } catch (error) {
                console.log('Error:', error);
            }
        };
        fetchData();
        fetchDataProvince();
    }, [query, queryProvince]);


    const handleSave = (formData) => {
        console.log("🚀 ~ handleSave ~ formData:", formData)
        setLoading(true)
        formData.action = "add"
        try {
            axios.post(
                `/api/customerAPI/payments/addBilling`,
                formData
            ).then((response) => {
                console.log("🚀 ~ handleSave ~ response:", response)
                setLoading(false)
                toast({
                    title: "Success",
                    description: `${response.data.message}`,
                    type: "success",
                })
                setDisable(true)
            }).catch((error) => {
                console.log("🚀 ~ handleSave ~ error:", error)
                setLoading(false)
                toast({
                    title: "Failed",
                    description: `${error}`,
                    type: "error",
                })
            })
        } catch (error) {
            console.log("error", error)
        }
    }

    const onError = (error) => {
        console.log("error", error)
    }

    const handleProvinceChange = (e) => {
        setQueryProvince({
            ...queryProvince,
            keyword: e,
        })
    }

    const handleCountryChange = (e) => {
        setQuery({
            ...query,
            keyword: e,
        })
    }
    return (
        <>
            {loading && <Loaders />}
            <Form {...form}>
                <form
                    className='flex gap-4 flex-row'
                    action=""
                    onSubmit={form.handleSubmit(handleSave, onError)}
                >
                    <div className="profile flex flex-col gap-1 w-full">
                        <FormField
                            className="w-full"
                            name="fullName"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full space-y-1">
                                        <FormLabel>Full Name </FormLabel>
                                        <FormControl>
                                            <Input variant="new" id="name" placeholder="john" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            name="phone_number"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full">
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl >
                                            <InputMask
                                                mask="+9.999.999.9999"
                                                maskChar={null}
                                                maskPlaceholder="0000.00.0000"
                                                {...field}
                                                disabled={disable}
                                            >
                                                {(inputProps) => (
                                                    <Input
                                                        className="text-xs"
                                                        id="phoneNumber"
                                                        type="text"
                                                        placeholder="+1.000.000.0000"
                                                        {...inputProps}
                                                        disabled={disable}
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
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full space-y-1">
                                        <FormLabel>Email</FormLabel>
                                        <FormControl >
                                            <Input variant="new" type="email" id="email" placeholder="Email" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                </>
                            )}
                        />
                    </div>
                    <div className="address flex flex-col w-full gap-1">
                        <FormField
                            name="street_address"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full space-y-1">
                                        <FormLabel>Street Address</FormLabel>
                                        <FormControl >
                                            <Input variant="new" type="text" id="address" placeholder="Street Address"  {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                </>
                            )}
                        />
                        <div className="wrap flex flex-row items-center gap-4">
                            <FormField
                                name="city"
                                className="w-full"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full space-y-1">
                                            <FormLabel>City</FormLabel>
                                            <FormControl >
                                                <Input variant="new" type="text" id="city" placeholder="City" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    </>
                                )}
                            />
                            <FormField
                                name="province"
                                className="w-full"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full space-y-1">
                                            <FormLabel>State / Province</FormLabel>
                                            <Popover oppen={popProvince} onOpenChange={setPopProvince} modal={true}>
                                                <PopoverTrigger asChild>
                                                    <FormControl >
                                                        <Button
                                                            onClick={() => setPopProvince(true)}
                                                            type="button"
                                                            className="shadow-none w-full text-xs h-9 text-left justify-start"
                                                            variant="outline"
                                                            id="state"
                                                            disabled={disable}
                                                        >
                                                            {field.value ? field.value : "State / Province"}
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[300px] p-0">
                                                    <Command>
                                                        {/* <CommandInput
                                                            placeholder="Search Province..."
                                                            className="h-9 text-xs"
                                                            onValueChange={(e) => handleProvinceChange(e)}
                                                        /> */}
                                                        <CommandEmpty className="text-xs text-center">The Province Unavailable</CommandEmpty>
                                                        <ScrollArea className="h-[150px]" >
                                                            <CommandGroup>
                                                                {province?.map((item) => (
                                                                    <CommandItem
                                                                        value={item.province_name}
                                                                        key={item.province_id}
                                                                        className="text-xs "
                                                                        onSelect={() => {
                                                                            form.setValue("province", item.province_name)
                                                                            form.setValue("province_code", item.province_code)
                                                                            setPopProvince(false);
                                                                        }}
                                                                    >
                                                                        {item.province_name}
                                                                        <CheckIcon
                                                                            className={`ml-auto h-4 w-4 text-xs ${item.province_name === field.value ? "opacity-100" : "opacity-0"}`}
                                                                        />
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </ScrollArea>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    </>
                                )}
                            />
                        </div>
                        <div className="wrap flex flex-row items-center gap-4">
                            <FormField
                                name="country"
                                className="w-full"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full space-y-1">
                                            <FormLabel>Country</FormLabel>
                                            <Popover open={popCountry} onOpenChange={setPopCountry} className="w-[100%]">
                                                <PopoverTrigger asChild>
                                                    <FormControl >
                                                        <Button
                                                            type="button"
                                                            className="shadow-none w-full text-xs h-9 text-left justify-start"
                                                            variant="outline"
                                                            id="state"
                                                            disabled={disable}
                                                            onClick={() => setPopCountry(!popCountry)}
                                                        >
                                                            {field.value ? field.value : "Country"}
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[300px] p-0">
                                                    <Command>
                                                        <CommandInput
                                                            placeholder="Search Country..."
                                                            className="h-9 text-xs"
                                                            onValueChange={(e) => handleCountryChange(e)}
                                                        />
                                                        <CommandEmpty className="text-xs text-center">The Country Unavailable.</CommandEmpty>
                                                        <ScrollArea className="h-[150px]" >
                                                            <CommandGroup>
                                                                {country?.map((item) => (
                                                                    <CommandItem
                                                                        value={item.country_name}
                                                                        key={item.country_id}
                                                                        className="text-xs "
                                                                        onSelect={() => {
                                                                            setPopCountry(false)
                                                                            form.setValue("country", item.country_name)
                                                                            form.setValue("country_code", item.country_code)
                                                                            form.setValue("province", "")
                                                                            setQuery({
                                                                                keyword: "",
                                                                            })
                                                                            setQueryProvince({
                                                                                keyword: "",
                                                                                country_code: item.country_code,
                                                                            })
                                                                        }}
                                                                    >
                                                                        {item.country_name}
                                                                        <CheckIcon
                                                                            className={`ml-auto h-4 w-4 text-xs ${item.country_name === field.value ? "opacity-100" : "opacity-0"}`}
                                                                        />
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </ScrollArea>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    </>
                                )}
                            />
                            <FormField
                                name="postal_code"
                                className="w-full"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full space-y-1">
                                            <FormLabel>Zip / Postal Code</FormLabel>
                                            <FormControl >
                                                <Input variant="new" type="text" id="state" placeholder="Zip"  {...field} />
                                            </FormControl>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    </>
                                )}
                            />
                        </div>
                        <div className="w-full flex justify-end gap-5 mt-[20px]">
                            {
                                disable ?
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="xs"
                                        onClick={() => setDisable(false)}
                                    >
                                        Edit
                                    </Button>
                                    : (
                                        <>
                                            <Button
                                                variant="redOutline"
                                                type="button"
                                                className="w-[100px]"
                                                size="xs"
                                                onClick={() => setDisable(true)}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                type="submit"
                                                className="w-[100px]"
                                                size="xs"
                                            >
                                                Update
                                            </Button>
                                        </>
                                    )
                            }
                        </div>
                    </div>
                </form>
            </Form >
        </>
    )
}
