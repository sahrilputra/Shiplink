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
import { yupResolver } from '@hookform/resolvers/yup'
import axios from "axios";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
} from "@/components/ui/command"
import { Separator } from '@/components/ui/separator'

const formSchema = yup.object().shape({
    warehouse_name: yup.string().required(),
    country_code: yup.string().required(),
    address: yup.string().required(),
    warehouse_catalog: yup.string().required(),
    warehouse_manager: yup.string().required(),
    warehouse_bullet_setting: yup.string().required(),
    email: yup.string().required(),
    phone_number: yup.string().required(),
})

export const NewWarehouseDialog = ({ open, setOpen, reload }) => {
    const { toast } = useToast()
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            warehouse_name: "",
            country_code: "",
            address: "",
            warehouse_catalog: "",
            warehouse_manager: "",
            warehouse_bullet_setting: "none",
            email: "",
            phone_number: "",
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
    const [openCommand, setOpenCommand] = useState(false)


    const onClose = () => {
        setOpen(false)
    }

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
        console.log("dikirim", formData)
        try {
            formData.action = 'add';
            const response = await axios.post(
                `/api/admin/warehouse/setData`,
                formData
            );
            toast({
                title: `New Warehouse ${formData.warehouse_name} created!`,
                description: response.data.message,
                status: 'success',
            });
            onClose();
            reload();
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
    return (
        <Dialog open={open} onOpenChange={setOpen}
            className="w-max"
        >
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="font-bold">
                        <p>Create New Province</p>
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
                                                        <Input id="warehouse_name" type="text" placeholder="Warehouse Name" className="text-sm bg-slate-100" {...field} />
                                                    </FormControl>
                                                    <FormMessage className="text-xs" />
                                                </FormItem>
                                            </>
                                        )}
                                    />
                                    <div className="relative w-[100%]">
                                        <div className="flex flex-col gap-1 w-full">
                                            <div className="text-sm text-neutral-900 space-y-1">Warehouse Based Country</div>
                                            <div
                                                className="flex gap-1 flex-row items-center justify-start border bg-slate-100 border-zinc-300 rounded focus-visible:ring-1 focus-visible:ring-black" tabIndex={0}>
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
                                        name="warehouse_catalog"
                                        className="w-full text-neutral-900"
                                        control={form.control}
                                        render={({ field }) => (
                                            <>
                                                <FormItem className="w-full text-neutral-900 space-y-1">
                                                    <FormLabel className="text-sm">Warehouse Catalog</FormLabel>
                                                    <FormControl >
                                                        <Input id="warehouse_catalog" className="text-sm bg-slate-100" placeholder="Warehouse only" {...field} />
                                                    </FormControl>
                                                    <FormMessage className="text-xs" />
                                                </FormItem>
                                            </>
                                        )}
                                    />

                                    <FormField
                                        name="warehouse_manager"
                                        className="w-full text-neutral-900"
                                        control={form.control}
                                        render={({ field }) => (
                                            <>
                                                <FormItem className="w-full text-neutral-900 space-y-1">
                                                    <FormLabel className="text-sm">Warehouse Managers</FormLabel>
                                                    <FormControl >
                                                        <Input id="warehouse_manager" className="text-sm bg-slate-100" placeholder="Manager Names" {...field} />
                                                    </FormControl>
                                                    <FormMessage className="text-xs" />
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
                                        render={({ field }) => (
                                            <>
                                                <FormItem className="w-full text-neutral-900 space-y-1">
                                                    <FormLabel className="text-sm">Managers Phone Number</FormLabel>
                                                    <FormControl >
                                                        <Input id="phone_number" type="number" className="text-sm bg-slate-100" placeholder="081239"  {...field} />
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
