'use client'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loaders } from '@/components/ui/loaders'
import { useForm } from 'react-hook-form'
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
import * as yup from 'yup'
import { ScrollArea } from '@/components/ui/scroll-area'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import axios from "axios";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import { Separator } from '@/components/ui/separator'
import { CheckIcon } from 'lucide-react'
import { PopoverClose } from '@radix-ui/react-popover'

const formSchema = yup.object().shape({
    warehouse_name: yup.string().required('Warehouse Name is required'),
    country_code: yup.string(),
    country_name: yup.string(),
    address: yup.string().required(),
    warehouse_catalog: yup.string(),
    warehouse_manager: yup.string().required(),
    warehouse_bullet_setting: yup.string(),
    email: yup.string(),
    phone_number: yup.string(),
})

export const NewWarehouseDialog = ({ open, setOpen, reload, data = null, warehouse_id = null }) => {
    console.log("🚀 ~ NewWarehouseDialog ~ warehouse_id:", warehouse_id)
    console.log("🚀 ~ NewWarehouseDialog ~ data:", data)
    const { toast } = useToast()
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            warehouse_name: data?.warehouse_name || "",
            country_code: data?.country_code || "",
            country_name: data?.country_name || "",
            address: data?.address || "",
            warehouse_catalog: "",
            warehouse_manager: data?.warehouse_manager || "",
            warehouse_bullet_setting: "none",
            email: data?.email || "",
            phone_number: data?.phone_number || "",
        },
        mode: "onChange",
    })

    const [query, setQuery] = useState({
        keyword: "",
        page: 1,
        limit: 0,
        index: 0
    });
    const [country, setCountry] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState({
        country_code: "",
        country_name: "",
    });

    const [loading, setLoading] = useState(false)
    const [popOverOpen, setPopOverOpen] = useState(false);
    const [openCommand, setOpenCommand] = useState(true)
    const [userList, setUserList] = useState([]);
    const [openUser, setOpenUser] = useState(false);
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        form.setValue('warehouse_name', data?.warehouse_name || "")
        form.setValue('country_code', data?.country_code || "")
        form.setValue('country_name', data?.country_name || "")
        form.setValue('address', data?.address || "")
        form.setValue('warehouse_manager', data?.warehouse_manager || "")
        form.setValue('email', data?.email || "")
        form.setValue('phone_number', data?.phone_number || "")
        setPhone(data?.phone_number || "")
        setEmail(data?.email || "")
    }, [data, form])

    useEffect(() => {
        const fetchUserList = async () => {
            try {
                axios.post('/api/admin/user/list',
                    {
                        keyword: "", page: 0, limit: 0, index: 0
                    }
                ).then((response) => {
                    setUserList(response.data.users)
                })
            } catch (error) {
                console.log(error)
                fetchUserList();
            }
        }

        fetchUserList();
    }, [])


    const onClose = () => {
        setOpen(false)
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
            formData.action = warehouse_id === null ? "add" : "edit";
            const response = await axios.post(
                `/api/admin/warehouse/setData`,
                {
                    warehouse_id: warehouse_id,
                    warehouse_name: formData.warehouse_name,
                    phone_number: phone,
                    country_code: formData.country_code,
                    address: formData.address,
                    warehouse_manager: formData.warehouse_manager,
                    email: email,
                    action: formData.action,
                }
            );
            setLoading(false)
            console.log(response)
            if (response.status === 200 || response.status === "true") {
                toast({
                    title: `Success Warehouse ${formData.warehouse_name} ${warehouse_id ? "Edited" : "Created"} !`,
                    description: response.data.message,
                    status: 'success',
                });
                onClose();
                reload();
                form.reset();
            } else {
                toast({
                    title: 'Error creating Warehouse',
                    description: response.data.message,
                    status: 'error',
                });
            }
        } catch (error) {
            console.log('Error', error);
            setLoading(false)
            toast({
                title: 'Error creating Warehouse',
                description: 'An error occurred while creating the Warehouse.',
                status: 'error',
            });
        }
    };


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
                fetchData();
                console.log('Error:', error);
            }
        };

        fetchData();
    }, [query]);

    const handleSelectUser = (email, phone) => {
        setPhone(phone);
        setEmail(email);
        form.setValue('email', email);
        form.setValue('phone_number', phone);

    }

    useEffect(() => {
        const countryLenght = form.watch('country_name').length;
        if (countryLenght > 2) {
            setOpenCommand(true)
        } else {
            setOpenCommand(false)
        }
    }, [form])

    return (
        <>
            {
                loading ? (
                    <Loaders />
                ) : (
                    <Dialog open={open} onOpenChange={setOpen}
                        className="w-max"
                    >
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle className="font-bold">
                                    <p>Create New Warehouse</p>
                                </DialogTitle>
                            </DialogHeader>
                            <DialogDescription className=" flex justify-center items-center w-full">
                                <div className="flex flex-col justify-center items-center w-full">
                                    <Form {...form}>
                                        <form
                                            onSubmit={form.handleSubmit(handleSave)}
                                            className='w-full'
                                            action=""
                                        >
                                            <div className="flex w-full flex-col gap-2 text-xs py-3 px-2 ">
                                                <FormField
                                                    className="w-full"
                                                    name="warehouse_name"
                                                    control={form.control}
                                                    render={({ field }) => (
                                                        <>
                                                            <FormItem className="w-full text-neutral-900 space-y-1">
                                                                <FormLabel className="text-sm">Warehouse Name</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        id="warehouse_name"
                                                                        type="text"
                                                                        placeholder="Warehouse Name"
                                                                        className="text-sm bg-slate-100"
                                                                        autoComplete="off"
                                                                        {...field} />
                                                                </FormControl>
                                                                <FormMessage className="text-xs" />
                                                            </FormItem>
                                                        </>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="country_name"
                                                    className="w-full"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-col w-full text-neutral-900 space-y-1">
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
                                                    name="address"
                                                    className="w-full text-neutral-900"
                                                    control={form.control}
                                                    render={({ field }) => (
                                                        <>
                                                            <FormItem className="w-full text-neutral-900 space-y-1">
                                                                <FormLabel className="text-sm">Warehouse Address</FormLabel>
                                                                <FormControl >
                                                                    <Input id="address" className="text-sm bg-slate-100" placeholder="Warehouse Address" {...field} />
                                                                </FormControl>
                                                                <FormMessage className="text-xs" />
                                                            </FormItem>
                                                        </>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="warehouse_manager"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-col text-neutral-900 space-y-1">
                                                            <FormLabel className="text-sm">Warehouse Managers</FormLabel>
                                                            <Popover modal={true} open={openUser} onOpenChange={setOpenUser}>
                                                                <PopoverTrigger asChild>
                                                                    <FormControl>
                                                                        <Button
                                                                            variant="outline"
                                                                            role="combobox"
                                                                            type="button"
                                                                            className={cn(
                                                                                " w-[100%] justify-between text-sm bg-slate-100 shadow-none h-9 px-4 py-2 rounded",
                                                                                !field.value && "text-muted-foreground"
                                                                            )}
                                                                            onClick={() => setOpenUser(true)}
                                                                        >
                                                                            {field.value}
                                                                        </Button>
                                                                    </FormControl>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-[300px] p-0">
                                                                    <Command>
                                                                        <CommandInput
                                                                            placeholder="User Name"
                                                                            className="h-9 "
                                                                        />
                                                                        <CommandEmpty>No User Found.</CommandEmpty>
                                                                        <ScrollArea className="h-[120px]">
                                                                            <CommandGroup>
                                                                                {userList.map((language) => (
                                                                                    <CommandItem
                                                                                        value={language.name}
                                                                                        key={language.name}
                                                                                        onSelect={() => {
                                                                                            form.setValue("warehouse_manager", language.name)
                                                                                            form.setValue("email", language.email)
                                                                                            form.setValue("phone_number", language.phone_number)
                                                                                            handleSelectUser(
                                                                                                language.email,
                                                                                                language.phone_number
                                                                                            )
                                                                                            setOpenUser(false)
                                                                                        }}
                                                                                    >
                                                                                        {language.name}
                                                                                        <CheckIcon
                                                                                            className={cn(
                                                                                                "ml-auto h-4 w-4",
                                                                                                language.name === field.value
                                                                                                    ? "opacity-100"
                                                                                                    : "opacity-0"
                                                                                            )}
                                                                                        />
                                                                                    </CommandItem>
                                                                                ))}
                                                                            </CommandGroup>
                                                                        </ScrollArea>
                                                                    </Command>
                                                                </PopoverContent>
                                                            </Popover>
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    name="email"
                                                    className="w-full"
                                                    control={form.control}
                                                    disabled={true}
                                                    render={({ field }) => (
                                                        <>
                                                            <FormItem className="w-full text-neutral-900 space-y-1">
                                                                <FormLabel className="text-sm">Managers Emails</FormLabel>
                                                                <FormControl>
                                                                    <Input id="email" type="email" placeholder="Warehouse Emails" className="text-sm bg-slate-100" {...field} />
                                                                </FormControl>
                                                                <FormMessage className="text-xs" />
                                                            </FormItem>
                                                        </>
                                                    )}
                                                />

                                                <FormField
                                                    name="phone_number"
                                                    className="w-full text-neutral-900"
                                                    control={form.control}
                                                    disabled={true}
                                                    render={({ field }) => (
                                                        <>
                                                            <FormItem className="w-full text-neutral-900 space-y-1">
                                                                <FormLabel className="text-sm">Managers Phone Number</FormLabel>
                                                                <FormControl >
                                                                    <Input
                                                                        id="phone_number"
                                                                        type="number"
                                                                        className="text-sm
                                                                         bg-slate-100"
                                                                        placeholder="Phone Number"
                                                                        {...field}
                                                                    />
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
                                                        onClose()
                                                        form.reset();
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
                                </div>
                            </DialogDescription>
                        </DialogContent>
                    </Dialog>
                )
            }

        </>
    )
}
