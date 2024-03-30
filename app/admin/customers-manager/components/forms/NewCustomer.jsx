import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'
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
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckIcon, EyeIcon, EyeOffIcon } from 'lucide-react'
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
import { PopoverClose } from '@radix-ui/react-popover'
import axios from "axios";
import { ScrollArea } from '@/components/ui/scroll-area'
import { Loaders } from '@/components/ui/loaders'

const formSchema = yup.object().shape({
    customer_name: yup.string().required(),
    customer_plans: yup.string().required(),
    country_code: yup.string().required(),
    country_name: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
})


export const NewCustomerForms = ({ close, data = null, reload, setLoading }) => {

    const [country, setCountry] = useState([]);
    const [popOverOpen, setPopOverOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState({
        country_code: "",
        country_name: "",
    });
    const [query, setQuery] = useState({
        keyword: "",
        page: 1,
        limit: 0,
        index: 0
    });
    const { toast } = useToast()
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            customer_name: "",
            customer_plans: "",
            Country: "",
            email: "",
            password: "",
        },
        mode: "onChange",
    })

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

    useEffect(() => {
        fetchData();
    }, [query]);

    const handleCommandChange = (e) => {
        console.log("🚀 ~ handleCommandChange ~ e:", e)
        setQuery({ ...query, keyword: e });
    }
    const handleSelectCountry = (code, name) => {
        setSelectedCountry({
            country_code: code,
            country_name: name,
        });
        form.setValue('country_code', code);
        form.setValue('country_name', name);
    }

    const handleSave = async (formData) => {
        setLoading(true)
        console.log("dikirim", formData)
        try {
            const response = await axios.post(
                `/api/admin/customer_manager/setData`,
                formData
            );

            if (response.data.message !== true) {
                toast({
                    title: `Error ${response.data.message}!`,
                    status: 'success',
                });
            } else {
                toast({
                    title: `Sucess Customer ${formData.customer_name} is created!`,
                    description: response.data.message,
                    status: 'success',
                });
            }

            setLoading(false)
            close();
            reload();
        } catch (error) {
            console.log('Error', error);
            setLoading(false)
            toast({
                title: 'Error creating New Customer!',
                description: `Error : ${error.message}`,
                status: 'error',
            });
        }
    };
    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSave)}
                    className=''
                    action="">
                    <div className="flex flex-col gap-2 text-xs">
                        <FormField
                            className="w-full"
                            name="customer_name"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-neutral-900 space-y-1">
                                        <FormLabel className="text-sm">Customer Full Name</FormLabel>
                                        <FormControl>
                                            <Input id="customer_name" placeholder="Full Name" className="text-sm bg-slate-100" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                </>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="customer_plans"
                            render={({ field }) => (
                                <FormItem className="w-full text-neutral-900 space-y-1">
                                    <FormLabel className="text-sm">Customer Plans</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex w-full flex-row gap-2 justify-around space-y-1 items-end"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0  bg-slate-100 rounded border  border-slate-300 w-[150px] py-3 px-4 ">
                                                <FormControl>
                                                    <RadioGroupItem value="Free" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Free
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0  bg-slate-100 rounded border  border-slate-300 w-[150px] py-3 px-4 ">
                                                <FormControl>
                                                    <RadioGroupItem value="Business" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Business
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0  bg-slate-100 rounded border  border-slate-300 w-[150px] py-3 px-4 ">
                                                <FormControl>
                                                    <RadioGroupItem value="Personal" />
                                                </FormControl>
                                                <FormLabel className="font-normal">Personal</FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="country_name"
                            className="w-full"
                            render={({ field }) => (
                                <FormItem className="flex flex-col w-full">
                                    <FormLabel className="text-sm">Select Country</FormLabel>
                                    <Popover className="w-full" open={popOverOpen} onOpenChange={setPopOverOpen} modal={true}>
                                        <PopoverTrigger asChild>
                                            <FormControl className="w-full">
                                                <Button
                                                    onClick={() => setPopOverOpen(true)}
                                                    variant="outline"
                                                    role="combobox"
                                                    type="button"
                                                    className={`text-xs flex flex-row shadow-none justify-start bg-slate-100 w-full px-2 gap-2 ${!field.value && "text-muted-foreground"}`}
                                                >
                                                    <span className='text-black font-bold w-[50px]'>{form.getValues('country_code') ? form.getValues('country_code') : "..."}</span>
                                                    <span className='text-sm'>
                                                        {field.value ? field.value : "Select Country"}
                                                    </span>
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[400px] p-0">
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

                                                <CommandGroup className="">
                                                    <ScrollArea className="h-[150px] w-full ">
                                                        {console.log(field.value)}
                                                        {country.map((item) => (
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
                                                                            form.setValue('country_code', item.country_code);
                                                                            form.setValue('country_name', item.country_name);
                                                                            field.onChange(item.country_name); // Perbarui nilai field.value
                                                                            setPopOverOpen(false)
                                                                        }}
                                                                    >

                                                                        {item.country_name}
                                                                        <CheckIcon
                                                                            className={`ml-auto h-4 w-4 ${item.country_name === field.value ? "opacity-100" : "opacity-0"}`}
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
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="email"
                            className="w-full text-neutral-900"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-neutral-900 space-y-1">
                                        <FormLabel className="text-sm"  >Email</FormLabel>
                                        <FormControl >
                                            <Input id="email" type='email' className="text-sm bg-slate-100"  {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                </>
                            )}
                        />

                        <FormField
                            name="password"
                            className="w-full text-neutral-900"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-neutral-900 space-y-1">
                                        <FormLabel className="text-sm"  >Password</FormLabel>
                                        <FormControl >
                                            <>
                                                <div className="relative">
                                                    <Input type="password" id="password" className="text-sm bg-slate-100"  {...field} />

                                                </div>
                                            </>

                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                </>
                            )}
                        />
                    </div>
                    <div className=" flex flex-row justify-between gap-2 py-5 ">
                        <Button
                            variant="redOutline"
                            size="sm"
                            className="w-full"
                            onClick={(e) => {
                                e.preventDefault()
                                close()
                            }}
                        >
                            <p className=' font-normal text-xs'>Cancel</p>
                        </Button>
                        <Button
                            variant="destructive"

                            size="sm"
                            className="w-full"
                            type="submit"
                        >
                            <p className=' font-normal text-xs'>Save</p>
                        </Button>
                    </div>


                </form>
            </Form >
        </>
    )
}
