'use client'
import React, { useEffect, useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Loaders } from '@/components/ui/loaders'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils"
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
import axios from "axios"
import { ScrollArea } from '@/components/ui/scroll-area'
import { PopoverClose } from '@radix-ui/react-popover'
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { CheckIcon } from 'lucide-react'
import { yupResolver } from "@hookform/resolvers/yup";
import { useToast } from '@/components/ui/use-toast'
const formSchema = yup.object().shape({
    id: yup.string(),
    idconf: yup.string(),
    price: yup.number(),
    service_id: yup.string(),
    status: yup.string(),
    action: yup.string(),
});

export const AddService = ({ open, setOpen, id, reload }) => {
    console.log("🚀 ~ AddService ~ id:", id)
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            id: "",
            idconf: id || "",
            price: 0,
            service_id: "",
            status: "Disabled",
            action: "add",
        },
        mode: "onChange",
    });
    const onClose = () => {
        setOpen(false)
        setService(null)
    }
    const { toast } = useToast();
    const [loading, setLoading] = useState(false)
    const [openCommand, setOpenCommand] = React.useState(false)
    const [serviceList, setServiceList] = useState([]);
    const [selectedServices, setSelectedServices] = useState("")
    const [service, setService] = useState(null)
    console.log("🚀 ~ AddService ~ service:", service)
    const [query, setQuery] = useState({
        keyword: "",
        category_id: "",
        page: 0,
        limit: 0,
        index: 0,
    });

    const [value, setValue] = React.useState("")

    useEffect(() => {
        const fetchDataListTable = async () => {
            try {
                const response = await axios.post(
                    `/api/admin/service/list`,
                    query
                )
                console.log("🚀 ~ fetchDataListTable ~ response:", response)
                const responseData = await response.data.services;
                setServiceList(responseData);
            } catch (error) {
                console.log(error)
            }
        }

        fetchDataListTable();
    }, [query, open]);

    const handleServiceChange = (e) => {
        setQuery({
            keyword: e,
        })
    }

    const handleSave = async (formData) => {
        console.log("🚀 ~ handleSave ~ Dikirim:", formData)
        setLoading(true)
        try {
            const response = await axios.post(
                `/api/admin/config/services/set_data`,
                formData
            )
            console.log("🚀 ~ handleSave ~ response", response)
            if (response.data.status === true) {
                toast({
                    title: `Sucess adding new service!`,
                    description: response.data.message,
                    status: 'success',
                });
                onClose();
            } else {
                toast({
                    title: `Error!`,
                    description: response.data.message,
                });
            }
            setLoading(false)
            reload();
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast({
                title: `Something Went Wrong!`,
                description: error,
            });
        }
    }

    console.log("Watch form")
    useEffect(() => {
        form.setValue('service_id', service?.service_id)
        form.setValue('price', service?.price)
        form.setValue('idconf', id)
    }, [service])
    return (
        <>
            {
                loading ? (
                    <Loaders />
                ) : (
                    <AlertDialog open={open} onOpenChange={setOpen} modal={true}
                        className="w-max"
                    >
                        <AlertDialogContent className="sm:max-w-md">
                            <AlertDialogHeader>
                                <AlertDialogTitle className="font-bold text-center">
                                    <p>Adding New Service</p>
                                    <p className='text-[14px]'>#{id}</p>
                                </AlertDialogTitle>
                            </AlertDialogHeader>
                            <div className="flex mx-auto w-full items-center justify-center">
                                <Form {...form}>
                                    <form
                                        className="flex gap-4 flex-col"
                                        action=""
                                        onSubmit={form.handleSubmit(handleSave)}
                                    >

                                        <FormField
                                            name="service_id"
                                            className="w-full"
                                            control={form.control}
                                            render={({ field, formState }) => (
                                                <>
                                                    <FormItem className="w-full flex flex-col gap-1">
                                                        <FormLabel className="text-xs">Service</FormLabel>
                                                        <Popover
                                                            className="w-full"
                                                            open={openCommand}
                                                            onOpenChange={setOpenCommand}
                                                            modal={true}
                                                        >
                                                            <PopoverTrigger asChild>
                                                                <FormControl className="w-full">
                                                                    <Button
                                                                        onClick={() => setOpenCommand(true)}
                                                                        variant="outline"
                                                                        role="combobox"
                                                                        type="button"
                                                                        className={`text-xs flex flex-row shadow-none justify-start bg-slate-100 w-[350px] px-2 gap-2 ${field.value && "text-muted-foreground"}`}
                                                                    >
                                                                        <span className="text-xs px-2">
                                                                            {selectedServices
                                                                                ? selectedServices
                                                                                : "Select Service"}
                                                                        </span>
                                                                    </Button>
                                                                </FormControl>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-[350px] p-0">
                                                                <Command className="w-full">
                                                                    <CommandInput
                                                                        placeholder="Search Service..."
                                                                        className="h-9 w-full text-xs"
                                                                        onValueChange={(e) => handleServiceChange(e)}
                                                                    />
                                                                    <CommandEmpty className="w-full text-xs text-center py-2">
                                                                        No Service found.
                                                                    </CommandEmpty>
                                                                    <CommandGroup className="h-[200]">
                                                                        <ScrollArea className="h-[150px]">
                                                                            {console.log(field.value)}
                                                                            {serviceList.map((item) => (
                                                                                <>
                                                                                    <PopoverClose asChild>
                                                                                        <CommandItem
                                                                                            value={item.item}
                                                                                            key={item.service_id}
                                                                                            className={`text-xs 
                                                                                            ${form.watch("service_id") === item.service_id
                                                                                                    ? "bg-slate-50 text-slate-500"
                                                                                                    : "text-xs"
                                                                                                }`}
                                                                                            onSelect={() => {
                                                                                                setSelectedServices(item.item);
                                                                                                field.onChange(item.service_id); // Perbarui nilai field.value
                                                                                                setOpenCommand(false);
                                                                                                setQuery({
                                                                                                    keyword: "",
                                                                                                })
                                                                                                setService(item);
                                                                                            }}
                                                                                        >
                                                                                            {item.service_id} | {item.item}
                                                                                            <CheckIcon
                                                                                                className={`ml-auto h-4 w-4 ${item.service_id === field.value
                                                                                                    ? "opacity-100"
                                                                                                    : "opacity-0"
                                                                                                    }`}
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
                                                    </FormItem>
                                                </>
                                            )}
                                        />
                                    </form>
                                </Form>
                            </div>

                            <div className={`bg-slate-100 rounded border border-slate-300 w-[350px] py-1 px-2 mx-auto text-xs ${!service ? "hidden" : "block"}`}>
                                <p>Service : {service?.item}</p>
                                <p>ID : {service?.service_id}</p>
                                <p>Price : $ {service?.price}</p>
                                <p>Description : {service?.description}</p>
                                <p>Category : {service?.categories}</p>
                            </div>
                            <AlertDialogFooter>
                                <Button
                                    onClick={onClose}
                                    className={"w-full mt-2 text-xs"}
                                    variant="redOutline"
                                    type="button"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={form.handleSubmit(handleSave)}
                                    variant="destructive"
                                    className={"w-full mt-2 text-xs"}
                                >
                                    Add Service
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )
            }

        </>
    )
}