'use client'
import React, { useState } from 'react'
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
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'
import { Checkbox } from '@/components/ui/checkbox'
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
import InputMask from 'react-input-mask';
import axios from "axios";
import { CheckIcon } from 'lucide-react'

const formSchema = yup.object().shape({
    province_id: yup.string().required(),
    country_code: yup.string().required(),
    province_name: yup.string().required(),
    province_code: yup.string().required(),
})


export const NewProvinceDialog = ({ open, setOpen, reloadData }) => {
    const onClose = () => {
        setOpen(false)
    }
    const { toast } = useToast()
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            province_id: "",
            country_code: "",
            province_name: "",
            province_code: "",
        },
        mode: "onChange",
    })


    const languages = [
        { label: "English", value: "en" },
        { label: "French", value: "fr" },
        { label: "German", value: "de" },
        { label: "Spanish", value: "es" },
        { label: "Portuguese", value: "pt" },
        { label: "Russian", value: "ru" },
        { label: "Japanese", value: "ja" },
        { label: "Korean", value: "ko" },
        { label: "Chinese", value: "zh" },
    ]


    const handleSave = async (formData) => {
        try {
            formData.action = 'add';
            const response = await axios.post(
                `/api/admin/config/countries/setData`,
                formData
            );
            toast({
                title: 'Country created successfully!',
                description: response.data.message,
                status: 'success',
            });
            onClose();
            reloadData();
        } catch (error) {
            console.log('Error', error);
            toast({
                title: 'Error creating country',
                description: 'An error occurred while creating the country.',
                status: 'error',
            });
        }
    };



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
                <DialogDescription className=" flex justify-center items-center mx-auto">
                    <div className="flex justify-center items-center mx-auto">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(handleSave)}
                                className=''
                                action="">
                                <div className="flex flex-col gap-3">
                                    <div className="flex flex-row w-full gap-4 text-xs">
                                        <FormField
                                            className="w-full"
                                            name="country_name"
                                            control={form.control}
                                            render={({ field }) => (
                                                <>
                                                    <FormItem className="w-[100%] text-neutral-900 space-y-1">
                                                        <FormLabel className="text-sm"  >Country Code</FormLabel>
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <FormControl>
                                                                    <Button
                                                                        variant="outline"
                                                                        role="combobox"
                                                                        className="shadow-none text-xs "
                                                                    >
                                                                        {field.value
                                                                            ? languages.find(
                                                                                (language) => language.value === field.value
                                                                            )?.label
                                                                            : "Select language"}
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-[200px] p-0">
                                                                <Command>
                                                                    <CommandInput
                                                                        placeholder="Search framework..."
                                                                        className="h-9"
                                                                    />
                                                                    <CommandEmpty>No framework found.</CommandEmpty>
                                                                    <CommandGroup>
                                                                        {languages.map((language) => (
                                                                            <CommandItem
                                                                                value={language.label}
                                                                                key={language.value}
                                                                                onSelect={() => {
                                                                                    form.setValue("language", language.value)
                                                                                }}
                                                                            >
                                                                                {language.label}

                                                                            </CommandItem>
                                                                        ))}
                                                                    </CommandGroup>
                                                                </Command>
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormMessage />
                                                    </FormItem>
                                                </>
                                            )}
                                        />

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
                                                    <FormItem className="w-[100%] text-neutral-900 space-y-1">
                                                        <FormLabel className="text-sm">State / Province Name</FormLabel>
                                                        <FormControl>
                                                            <Input type="text" id="province_name" placeholder="" className="text-xs p-0 px-2" {...field} />
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
                                                        <FormLabel className="text-sm"  >State Code</FormLabel>
                                                        <FormControl >
                                                            <InputMask
                                                                mask="aaa"
                                                                maskPlaceholder="000"
                                                                {...field}
                                                                className='tracking-widest'
                                                            >
                                                                {(inputProps) => (
                                                                    <Input
                                                                        className="text-xs p-0 py-1 px-2 focus:ring-offset-0 tracking-widest bg-zinc-500"
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