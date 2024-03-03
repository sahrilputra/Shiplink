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
const formSchema = yup.object().shape({
    fullName: yup.string().required().max(50, "character is too long"),
    email: yup.string().email().required(),
    phone_number: yup.string().required(),
    street_address: yup.string().required(),
    city: yup.string().required(),
    province_code: yup.string().required(),
    province: yup.string().required(),
    postal_code: yup.string().required(),
    country_code: yup.string().required(),
    country: yup.string().required(),
})

export const AddressForms = () => {
    const { toast } = useToast()
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            fullName: "",
            lastName: "",
            email: "",
            phone_number: "",
            street_address: "",
            city: "",
            province_code: "",
            postal_code: "",
            country_code: "",
            country: "",
            province: "",
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
            formData.action = 'add';
            const response = axios.post(
                `/api/customerAPI/payments/addBilling`,
                formData
            )
            console.log("🚀 ~ handleSave ~ response:", response)
            setLoading(false)
            toast({
                title: "Success",
                message: `${response.data.message}`,
                type: "success",
            })
        } catch (error) {
            toast({
                title: "Failed",
                message: "Failed to Saved new Billing Address",
                type: "error",
            })
        }
    }

    const onError = (error) => {
        console.log("error", error)
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
                                        <FormMessage />
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
                                    <FormItem className="w-full space-y-1">
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input variant="new" type="number" id="phone" placeholder="Phone Number" {...field} />
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
                                    <FormItem className="w-full space-y-1">
                                        <FormLabel>Email</FormLabel>
                                        <FormControl >
                                            <Input variant="new" type="email" id="email" placeholder="Emails" {...field} />
                                        </FormControl>
                                        <FormMessage />
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
                                        <FormMessage />
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
                                            <FormMessage />
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
                                                <PopoverContent className="w-[300px] p-0">
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
                                                                            form.setValue("province", item.province_name)
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
                                            <Popover open={popCountry} onOpenChange={setPopCountry} className="w-[100%]">
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
                                                <PopoverContent className="w-[300px] p-0">
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
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                        </div>
                        <div className="w-full flex justify-end">
                            <Button
                                variant="destructive"
                                type="submit"
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </form>
            </Form >
        </>
    )
}
