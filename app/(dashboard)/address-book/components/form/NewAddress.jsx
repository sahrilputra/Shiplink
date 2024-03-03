import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import axios from 'axios'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Loaders } from '@/components/ui/loaders'
import { useToast } from '@/components/ui/use-toast'
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
import { CheckIcon } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

const formSchema = yup.object().shape({
    fullName: yup.string().required().max(50, "character is too long"),
    address: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    province_code: yup.string().required(),
    country: yup.string().required(),
    contry_code: yup.string().required(),
    zipCode: yup.string().required(),
    email: yup.string().email().required(),
    phoneNumber: yup.string().required(),
    isPrimary: yup.boolean(),
})



export const NewAddress = ({ close, data = null }) => {
    const [loading, setLoading] = useState(false);
    const [country, setCountry] = useState([]);
    const [province, setProvince] = useState([]);

    const { toast } = useToast();
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            fullName: data?.fullName || "",
            address: data?.address || "",
            city: data?.city || "",
            state: data?.state || "",
            province_code: data?.province_code || "",
            country: data?.country || "",
            contry_code: "",
            zipCode: data?.postalCode || "",
            email: data?.email || "",
            phoneNumber: data?.phone || "",
            isPrimary: data?.isPrimary || "",
        },
        mode: "onChange",
    })

    const [query, setQuery] = useState({
        keyword: "",
        page: 0,
        limit: 0,
        index: 0,
    })
    const [queryProvince, setQueryProvince] = useState({
        keyword: "",
        page: 0,
        limit: 0,
        index: 0,
    })
    // const fetchDataCountry = async () => {
    //     const response = axios.post(
    //         `api/admin/config/countries/list`,
    //         query
    //     )
    //     const reponseProvince = axios.post(
    //         `api/admin/config/province`,
    //         query
    //     )
    //     const countryData = await response.data
    //     const provinceData = await reponseProvince.data
    //     console.log("🚀 ~ fetchData ~ countryData:", countryData)
    //     console.log("🚀 ~ fetchData ~ provinceData:", provinceData)
    //     setCountry(countryData)
    //     setProvince(provinceData)
    // }


    const [popCountry, setPopCountry] = useState(false)
    const [popProvince, setPopProvince] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    `/api/admin/config/countries/list`,
                    query
                );
                const data = await response.data;
                console.log("🚀 ~ fetchData ~ data:", data)
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
                console.log("🚀 ~ fetchData ~ data:", data)
                setProvince(data.province);
            } catch (error) {
                console.log('Error:', error);
            }
        };
        fetchData();
        fetchDataProvince();
    }, [query, queryProvince]);

    const handleSave = (formData) => {
        setLoading(true)
        try {
            const response = axios.post(
                `api/customerAPI/adress/setData`,
                formData,
            )
            setLoading(false);
            toast({
                title: "Success",
                message: "Address has been saved",
                type: "success",
            })
            console.log(response)
        } catch (error) {
            toast({
                title: "Error",
                message: "Address failed to save",
                type: "error",
            })
            setLoading(false);
            console.log(error)
        }
    }


    return (
        <>
            <Form {...form}>
                <form
                    className='flex gap-4 flex-col'
                    action="">

                    <div className="profile flex flex-col gap-4 w-full">
                        <FormField
                            className="w-full"
                            name="fullName"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full">
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input id="fullName" placeholder="John Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            name="address"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full">
                                        <FormLabel>Street Address</FormLabel>
                                        <FormControl >
                                            <Input type="text" id="address" placeholder="Street Address"  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />

                    </div>
                    <div className="address flex flex-col w-full gap-4">
                        <div className="wrap flex flex-row items-center gap-4">
                            <FormField
                                name="city"
                                className="w-full"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full">
                                            <FormLabel>City</FormLabel>
                                            <FormControl >
                                                <Input type="text" id="city" placeholder="City" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                            <FormField
                                name="state"
                                className="w-full"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full">
                                            <FormLabel>State / Province</FormLabel>
                                            <Popover oppen={popProvince} onOpenChange={setPopProvince}>
                                                <PopoverTrigger asChild>
                                                    <FormControl >
                                                        <Button
                                                            onClick={() => setPopProvince(!popProvince)}
                                                            type="button"
                                                            className="shadow-none w-full text-xs h-9 text-left justify-start"
                                                            variant="outline"
                                                            id="state"
                                                        >
                                                            {field.value ? field.value : "State / Province"}
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[200px] p-0">
                                                    <Command>
                                                        <CommandInput
                                                            placeholder="Search Province..."
                                                            className="h-9 text-xs"
                                                        />
                                                        <CommandEmpty className="text-xs text-center">The Province Unavailable</CommandEmpty>
                                                        <ScrollArea className="h-[150px]" >
                                                            <CommandGroup>
                                                                {province?.map((item) => (
                                                                    <CommandItem
                                                                        value={item.province_name}
                                                                        key={item.province_id}
                                                                        className="text-xs "
                                                                        onSelect={() => {
                                                                            form.setValue("state", item.province_name)
                                                                            form.setValue("province_code", item.province_code)
                                                                            setPopProvince(false)
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
                                            <FormMessage />
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
                                        <FormItem className="w-full">
                                            <FormLabel>Country</FormLabel>
                                            <Popover open={popCountry} onOpenChange={setPopCountry}>
                                                <PopoverTrigger asChild>
                                                    <FormControl >
                                                        <Button
                                                            type="button"
                                                            className="shadow-none w-full text-xs h-9 text-left justify-start"
                                                            variant="outline"
                                                            id="state"
                                                            onClick={() => setPopCountry(!popCountry)}
                                                        >
                                                            {field.value ? field.value : "Country"}
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[200px] p-0">
                                                    <Command>
                                                        <CommandInput
                                                            placeholder="Search Country..."
                                                            className="h-9 text-xs"
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
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                            <FormField
                                name="zipCode"
                                className="w-full"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full">
                                            <FormLabel>Zip / Postal Code</FormLabel>
                                            <FormControl >
                                                <Input type="text" id="state" placeholder="Zip"  {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                        </div>
                        <div className="wrap flex flex-col items-center gap-4">
                            <FormField
                                name="phone"
                                className="w-full"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full">
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input type="number" id="phone" placeholder="Phone Number" {...field} />
                                            </FormControl>
                                            <FormMessage />
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
                                        <FormItem className="w-full">
                                            <FormLabel>Email</FormLabel>
                                            <FormControl >
                                                <Input type="email" id="email" placeholder="Emails" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                        </div>

                        <div className="checkbox flex">
                            <FormField
                                name="isPrimary"
                                className="w-full"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full flex flex-row gap-3 items-center">
                                            <FormControl >
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormLabel>Make this as primary address</FormLabel>
                                        </FormItem>
                                    </>
                                )}
                            />
                        </div>

                        <div className=" flex justify-between items-end mt-[20px] gap-4">
                            <Button
                                variant="redOutline"
                                type="submit"
                                onClick={close}
                                className='w-full '
                            >
                                <p className=' font-normal '>Cancel</p>
                            </Button>
                            <Button

                                variant="destructive"
                                type="submit"
                                className='w-full '
                            >
                                <p className=' font-normal '>Save</p>
                            </Button>
                        </div>
                    </div>

                </form>
            </Form >
        </>
    )
}
