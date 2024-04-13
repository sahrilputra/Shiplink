'use client'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
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
const formSchema = yup.object().shape({
    id: yup.string(),
    idconf: yup.string(),
    price: yup.string(),
    service_id: yup.string(),
    status: yup.string(),
    action: yup.string(),
});

export const AddService = ({ open, setOpen }) => {
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            id: "",
            idconf: "",
            price: "",
            service_id: "",
            status: "",
            action: "",
        },
        mode: "onChange",
    });
    const onClose = () => {
        setOpen(false)
        setService(null)
    }
    const [loading, setLoading] = useState(false)
    const [openCommand, setOpenCommand] = React.useState(false)
    const [serviceList, setServiceList] = useState([]);
    const [selectedServices, setSelectedServices] = useState("")
    const [service, setService] = useState(null)
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
    return (
        <>
            {
                loading ? (
                    <Loaders />
                ) : (
                    <Dialog open={open} onOpenChange={setOpen} modal={true}
                        className="w-max"
                    >
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle className="font-bold">
                                    <p>Adding New Service</p>
                                </DialogTitle>
                            </DialogHeader>
                            <div className="flex mx-auto w-full items-center justify-center">
                                <Form {...form}>
                                    <form
                                        className="flex gap-4 flex-col"
                                        action=""
                                    >

                                        <FormField
                                            name="idconf"
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
                                                                                            ${form.watch("idconf") === item.service_id
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
                                <p>Category : {service?.categories}</p>
                                <p>ID : {service?.service_id}</p>
                                <p>Service : {service?.item}</p>
                                <p>Price : $ {service?.price}</p>
                                <p>Description : {service?.description}</p>
                            </div>
                            <DialogFooter>
                                <Button
                                    onClick={onClose}
                                    className={"w-full mt-2 text-xs"}
                                    variant="redOutline"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={onClose}
                                    variant="destructive"
                                    className={"w-full mt-2 text-xs"}
                                >
                                    Add Service
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                )
            }

        </>
    )
}