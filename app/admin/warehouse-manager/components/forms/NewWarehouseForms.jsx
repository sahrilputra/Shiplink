import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from "@/lib/utils"

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

const formSchema = yup.object().shape({
    WarehouseName: yup.string().required(),
    Country_Code: yup.string().required(),
    Address: yup.string().required(),
    Warehouse_catalog: yup.string().required(),
    Warehouse_manager: yup.string().required(),
    Warehouse_bullet_setting: yup.string().required(),
    email: yup.string().required(),
    PhoneNumber: yup.string().required(),
})

export const NewWarehouseForms = ({ close, data = null }) => {
    const { toast } = useToast()
    const [openCommand, setOpenCommand] = useState(false)
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

    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            Warehouse_name: "",
            Country_Code: "",
            Address: "",
            Warehouse_catalog: "",
            Warehouse_manager: "",
            Warehouse_bullet_setting: "",
            email: "",
            PhoneNumber: "",
        },
        mode: "onChange",
    })

    const handleOpenCommand = (event) => {
        if (!event.target.value.trim() || event.target.value.length < 2) {
            setOpenCommand(false);
        } else {
            setOpenCommand(true);
        }
        setQuery({
            ...query,
            keyword: event.target.value
        });
    }
    const handleSave = async (formData) => {
        try {
            formData.action = 'add';
            const response = await axios.post(
                `/api/admin/wareheouse/setData`,
                formData
            );
            toast({
                title: `Province ${formData.Warehouse_name} created!`,
                description: response.data.message,
                status: 'success',
            });
            reloadData();
            onClose();
        } catch (error) {
            console.log('Error', error);
            toast({
                title: 'Error creating Warehouse',
                description: 'An error occurred while creating the Warehouse.',
                status: 'error',
            });
        }
    };

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
        setOpenCommand(false)
    }


    const onClose = () => {
        setOpen(false)
    }

    return (
        <>
            <Form {...form}>
                <form
                    className=''
                    onSubmit={form.handleSubmit(handleSave)}
                    action="">
                    <div className="flex flex-col gap-3 text-xs py-4 px-2">
                        <FormField
                            className="w-full"
                            name="Warehouse_name"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-neutral-900 space-y-1">
                                        <FormLabel className="text-sm">Warehouse Name</FormLabel>
                                        <FormControl>
                                            <Input id="Warehouse_name" type="text" placeholder="Warehouse Name" className="text-sm bg-slate-100" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                </>
                            )}
                        />
                        <div className="relative w-[100%]">
                            <div className="flex flex-col gap-1 w-full">
                                <p className="text-sm text-neutral-900 space-y-1">Warehouse Based Country</p>
                                <div className="flex gap-1 flex-row items-center justify-start border bg-slate-100 border-zinc-300 rounded focus-visible:ring-1 focus-visible:ring-black" tabIndex={0}>
                                    <div className='px-3 '>
                                        {
                                            selectedCountry.country_code === "" ? (
                                                "USA"
                                            ) : (
                                                selectedCountry.country_code
                                            )
                                        }
                                    </div>
                                    <div className="w-[3px] h-[20px]">
                                        <Separator orientation="vertical" className="w-[2px] bg-slate-400 text-black h-full" />
                                    </div>
                                    <Input
                                        className="text-sm p-0 py-1 px-2 focus:ring-offset-0 bg-slate-100 border-none text-neutral-900 outline-none focus:ring-0  focus-visible:ring-0 "
                                        id="country_code"
                                        type="text"
                                        placeholder="Select Country"
                                        onChange={handleOpenCommand}
                                    />
                                </div>
                            </div>
                            {openCommand && (
                                <div className="absolute bottom-100 w-full p-2 shadow bg-white">
                                    <Command>
                                        <CommandEmpty>No Country Found.</CommandEmpty>
                                        <CommandGroup>
                                            {country.map((item) => (
                                                <CommandItem
                                                    value={item.country_name}
                                                    key={item.country_id}
                                                    onSelect={() => {
                                                        handleSelectCountry(item.country_code, item.country_name)
                                                    }}
                                                >
                                                    {item.country_name}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </div>
                            )}
                        </div>

                        <FormField
                            name="Address"
                            className="w-full text-neutral-900"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-neutral-900 space-y-1">
                                        <FormLabel className="text-sm">Warehouse Address</FormLabel>
                                        <FormControl >
                                            <Input id="Address" className="text-sm bg-slate-100" placeholder="Warehouse Address" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                </>
                            )}
                        />


                        <FormField
                            name="Warehouse_catalog"
                            className="w-full text-neutral-900"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-neutral-900 space-y-1">
                                        <FormLabel className="text-sm">Warehouse Catalog</FormLabel>
                                        <FormControl >
                                            <Input id="Warehouse_catalog" className="text-sm bg-slate-100" placeholder="Warehouse only" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                </>
                            )}
                        />

                        <FormField
                            name="Warehouse_manager"
                            className="w-full text-neutral-900"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-neutral-900 space-y-1">
                                        <FormLabel className="text-sm"  >Warehouse Managers</FormLabel>
                                        <FormControl >
                                            <Input id="Warehouse_manager" className="text-sm bg-slate-100" placeholder="Manager Names" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                </>
                            )}
                        />

                        <FormField
                            className="w-full"
                            name="email"
                            control={form.control}
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
                            name="PhoneNumber"
                            className="w-full text-neutral-900"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-neutral-900 space-y-1">
                                        <FormLabel className="text-sm" >Managers Phone Number</FormLabel>
                                        <FormControl >
                                            <Input id="PhoneNumber" type="phone" className="text-sm bg-slate-100" placeholder="081239"  {...field} />
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
                            <p className=' font-normal text-xs'>Create</p>
                        </Button>
                    </div>
                </form>
            </Form >
        </>
    )
}
