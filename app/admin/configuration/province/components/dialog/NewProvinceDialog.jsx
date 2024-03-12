'use client'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogClose,
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
} from "@/components/ui/form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import InputMask from 'react-input-mask';
import axios from "axios";
import { Loaders } from '@/components/ui/loaders'

const formSchema = yup.object().shape({
    country_code: yup.string().required(),
    province_name: yup.string().required(),
    province_code: yup.string().required(),
})


export const NewProvinceDialog = ({ open, setOpen, reloadData }) => {
    const { toast } = useToast()
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            country_code: "",
            province_name: "",
            province_code: "",
        },
        mode: "onChange",
    })
    const [loading, setLoading] = useState(false)
    const [openCommand, setOpenCommand] = useState(false)
    const [query, setQuery] = useState({
        keyword: "",
        page: 1,
        limit: 0,
        index: 0
    });
    const [selectedCountry, setSelectedCountry] = useState({
        country_code: "",
        country_name: "",
    });
    const [country, setCountry] = useState([]);

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

    const handleSelectCountry = (code, name) => {
        setSelectedCountry({
            country_code: code,
            country_name: name,
        });
        form.setValue('country_code', code);
        form.setValue('country_name', name);
        setOpenCommand(false)
    }

    const onClose = () => {
        setOpen(false)
    }

    const handleSave = async (formData) => {
        setLoading(true)
        try {
            formData.action = 'add';
            const response = await axios.post(
                `/api/admin/config/province/setData`,
                formData
            );
            setLoading(false)
            toast({
                title: `Province ${formData.province_name} created!`,
                description: response.data.message,
                status: 'success',
            });
            reloadData();
            onClose();
        } catch (error) {
            console.log('Error', error);
            setLoading(false)
            toast({
                title: 'Error creating country',
                description: 'An error occurred while creating the country.',
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
            if (data === null) {
                setCountry([]);
                fetchData();
            } else {
                setCountry(data);
            }
            setCountry(data.country);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        fetchData();

    }, [query]);


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
                                    <p>Create New Province</p>
                                </DialogTitle>
                            </DialogHeader>
                            <DialogDescription className=" flex justify-center items-center mx-auto">
                                <div className="flex justify-center items-center mx-auto">
                                    <Form {...form}>
                                        <form
                                            onSubmit={form.handleSubmit(handleSave)}
                                            className=''
                                            action="">
                                            <div className="flex flex-col gap-3">
                                                <div className="flex flex-row w-full gap-4 text-xs">
                                                    <div className="relative w-[100%]">
                                                        <div className="flex flex-col gap-1 w-full">
                                                            <p className="text-sm text-neutral-900 space-y-1">Country</p>
                                                            <Input
                                                                className="text-xs p-0 py-1 px-2 focus:ring-offset-0 tracking-widest"
                                                                id="country_code"
                                                                type="text"
                                                                placeholder="Search Country"
                                                                onChange={handleOpenCommand}

                                                            />
                                                        </div>
                                                        {openCommand && (
                                                            <div className="absolute bottom-100 w-full p-2 shadow bg-white">
                                                                <Command>
                                                                    <CommandEmpty>No Country Found.</CommandEmpty>
                                                                    <CommandGroup>
                                                                        {country.map((item) => (
                                                                            <CommandItem
                                                                                value={item.country_id}
                                                                                key={item.country_numeric}
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
                                                        name="country_code"
                                                        className="w-full text-neutral-900"
                                                        control={form.control}
                                                        render={({ field }) => (
                                                            <>
                                                                <FormItem className="w-[40%] text-neutral-900 space-y-1">
                                                                    <FormLabel className="text-sm"  >Country Code</FormLabel>
                                                                    <FormControl >
                                                                        <Input
                                                                            className="text-xs p-0 py-1 px-2 focus:ring-offset-0 tracking-widest"
                                                                            id="country_code"
                                                                            type="text"
                                                                            placeholder="_ _ _"
                                                                            disabled
                                                                            {...field}
                                                                        />
                                                                    </FormControl>
                                                                </FormItem>
                                                            </>
                                                        )}
                                                    />

                                                </div>
                                                <div className="flex flex-row gap-4 text-xs">
                                                    <FormField
                                                        className="w-full"
                                                        name="province_name"
                                                        control={form.control}
                                                        render={({ field }) => (
                                                            <>
                                                                <FormItem className="w-[100%] text-neutral-900 space-y-1  ">
                                                                    <FormLabel className="text-sm">State / Province Name</FormLabel>
                                                                    <FormControl>
                                                                        <Input type="text" id="province_name" placeholder="" className="text-xs p-0 px-2 capitalize" {...field} />
                                                                    </FormControl>
                                                                </FormItem>
                                                            </>
                                                        )}
                                                    />
                                                    <FormField
                                                        name="province_code"
                                                        className="w-full text-neutral-900"
                                                        control={form.control}
                                                        render={({ field }) => (
                                                            <>
                                                                <FormItem className="w-[40%] text-neutral-900 space-y-1">
                                                                    <FormLabel className="text-sm">State Code</FormLabel>
                                                                    <FormControl >
                                                                        <InputMask
                                                                            mask="999"
                                                                            maskPlaceholder="000"
                                                                            {...field}
                                                                            className='tracking-widest'
                                                                        >
                                                                            {(inputProps) => (
                                                                                <Input
                                                                                    className="text-xs p-0 py-1 px-2 focus:ring-offset-0 tracking-widest bg-zinc-500 uppercase"
                                                                                    id="province_code"
                                                                                    type="text" // Ubah tipe input menjadi teks
                                                                                    placeholder="_ _ _" // Placeholder yang sesuai dengan format
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
                                                <div className=" flex flex-row justify-between gap-2 ">
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