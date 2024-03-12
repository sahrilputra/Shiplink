'use client'
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useForm, FieldError } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
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
import NextLink from 'next/link'
import axios from "axios";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckIcon, EyeIcon, EyeOffIcon } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area';
import { PopoverClose } from '@radix-ui/react-popover';
import { Loaders } from '@/components/ui/loaders';
import { useRouter } from 'next/navigation';
const formSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required(),
    country_code: yup.string().required(),
    password: yup.string().required(),
    user_plan: yup.string().required(),
    terms: yup.boolean().required(),
})
export default function Home() {

    const router = useRouter()
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            country_code: "",
            password: "",
            user_plan: "",
            terms: false,
        },
        mode: "onChange",
    })

    const [loading, setLoading] = useState(false)
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
    const { toast } = useToast();
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
            axios.post(
                `/api/customerAPI/register`,
                formData
            ).then((response) => {
                console.log(response.data.status)
                setLoading(false)
                if (response.status === 200 && response.data.status === "true") {
                    toast({
                        title: 'Sucess!',
                        description: `Please Verified Your Email`,
                        status: 'success',
                    });
                    router.push('/auth/verification')
                } else {
                    toast({
                        title: 'Error while sing up!',
                        description: `Error : ${response.data.message
                            }`,
                        status: 'error',
                    });
                }
            })
        } catch (error) {
            setLoading(false)
            console.log('Error', error);
        }
    }

    console.log('Error:', form.formState.errors)
    return (
        <>
            {
                loading && <Loaders />
            }
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSave)}
                    className=''
                    action="">


                    <div className="flex flex-col text-center pt-[90px] items-center w-full h-max min-h-[100vh] gap-[15px] bg-[#E3E7EE]">
                        <div className="flex flex-col gap-4 py-8">
                            <div className="text-myBlue text-lg font-bold">Save money, save time, take control of your deliveries.</div>
                            <div className="text-zinc-600 text-3xl font-bold">Sign up to send and save instantly.</div>
                        </div>
                        <div className="p-10 mb-10 bg-white rounded-md w-[90%] border shadow-md gap-8  flex flex-col md:w-[640px]">
                            <FormField
                                className="w-full"
                                name="name"
                                control={form.control}
                                render={({ field }) => (
                                    <div className="flex flex-col text-left gap-1">
                                        <p className="text-base text-left px-1">Your Name</p>
                                        <Input
                                            className="text-base h-15 px-2 border border-zinc-200 bg-zinc-200/50 rounded-md w-full"
                                            type='text'
                                            placeholder="Full Name"
                                            {...field}
                                        />
                                    </div>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="user_plan"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col text-left gap-1">
                                        <FormLabel className="text-base text-left px-1">I plan to use Shiplink for</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex w-full flex-row gap-2 justify-around space-y-1 items-end"
                                            >
                                                <FormItem className="text-base h-15 px-2 border border-zinc-200 bg-zinc-200/50 rounded-md w-full py-3 flex flex-row gap-2 items-center space-x-3 space-y-0 ">
                                                    <FormControl>
                                                        <RadioGroupItem value="Free" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Free
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="text-base h-15 px-2 border border-zinc-200 bg-zinc-200/50 rounded-md w-full py-3 flex flex-row gap-2 items-center space-x-3 space-y-0  ">
                                                    <FormControl>
                                                        <RadioGroupItem value="Business" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Business
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="text-base h-15 px-2 border border-zinc-200 bg-zinc-200/50 rounded-md w-full py-3 flex flex-row gap-2 items-center space-x-3 space-y-0 ">
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
                                        <FormLabel className="text-base text-left px-1">Select Country</FormLabel>
                                        <Popover className="w-full" open={popOverOpen} onOpenChange={setPopOverOpen}>
                                            <PopoverTrigger asChild>
                                                <FormControl className="w-full">
                                                    <Button
                                                        onClick={() => setPopOverOpen(true)}
                                                        variant="outline"
                                                        role="combobox"
                                                        type="button"
                                                        className={`text-xs flex flex-row shadow-none justify-start border-zinc-200 bg-zinc-200/50 w-full px-2 gap-2 ${!field.value && "text-muted-foreground"}`}
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
                                                                                className={`ml - auto h - 4 w - 4 ${item.country_name === field.value ? "opacity-100" : "opacity-0"} `}
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
                                        <FormItem className="w-full text-neutral-900 space-y-1 text-left">
                                            <FormLabel className="text-base text-left px-1">Email</FormLabel>
                                            <FormControl >
                                                <Input
                                                    id="email"
                                                    type='email'
                                                    placeholder="Email"
                                                    className="text-base h-15 px-2 border border-zinc-200 bg-zinc-200/50 rounded-md w-full"
                                                    {...field} />
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
                                        <FormItem className="w-full text-neutral-900 space-y-1 text-left">
                                            <FormLabel className="text-base text-left px-1">Password</FormLabel>
                                            <FormControl >
                                                <Input
                                                    id="password"
                                                    type='password'
                                                    placeholder="Enter Your Password"
                                                    className="text-base h-15 px-2 border border-zinc-200 bg-zinc-200/50 rounded-md w-full"
                                                    {...field} />
                                            </FormControl>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    </>
                                )}
                            />
                            <FormField
                                name="terms"
                                className="w-full text-neutral-900"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full text-neutral-900 space-y-1 text-left">
                                            <div className="flex flex-row justify-between items-center py-2 px-1">
                                                <div className="flex flex-row gap-2 items-center">
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                        className="w-[20px] h-[20px]"
                                                    />
                                                    <label
                                                        htmlFor="terms"
                                                        className="text-base font-medium  peer-disabled:cursor-not-allowed peer-disabled:opacity-70 space-y-1 leading-tight"
                                                    >
                                                        By signing up you agree to our <span className="text-red-700">terms and conditions.</span>
                                                    </label>
                                                </div>

                                            </div>
                                        </FormItem>
                                    </>
                                )}
                            />
                            <div className="w-full py-3">
                                <Button
                                    variant="destructive"
                                    className="w-full"
                                    type="submit"
                                >
                                    <p className="text-base">Get My Free Accout</p>
                                </Button>
                            </div>
                            <div className="flex flex-row gap-2 items-center">
                                <p className="text-base">Already have an account?
                                    <span className="text-red-700 px-2">
                                        <NextLink href={'/auth/login'}>
                                            Log in now
                                        </NextLink>
                                    </span>
                                </p>
                            </div>

                        </div>
                    </div>
                </form>
            </Form>
        </>
    )
}