import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'
import { Checkbox } from '@/components/ui/checkbox'
import axios from "axios";
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
import { ScrollArea } from '@/components/ui/scroll-area'
import { CheckIcon } from 'lucide-react'
import { PopoverClose } from '@radix-ui/react-popover'

const formSchema = yup.object().shape({
    name: yup.string(),
    warehouse_id: yup.string().required(),
    warehouse_name: yup.string(),
    role: yup.string(),
    email: yup.string().required(),
    password: yup.string().required(),
})

export const CreateNewUserForms = ({ close, setLoading, reload }) => {
    const { toast } = useToast()
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            name: "",
            warehouse_id: "",
            warehouse_name: "",
            role: "",
            email: "",
            password: "",
        },
        mode: "onChange",
    })

    const [warehouse, setWarehouse] = useState([]);
    const [popOverOpen, setPopOverOpen] = useState(false);
    const [query, setQuery] = useState({
        keyword: "",
        page: 1,
        limit: 0,
        index: 0
    });

    const fetchData = async () => {
        try {
            const response = await axios.post(
                `/api/admin/warehouse/list`,
                query
            );
            const data = await response.data;
            setWarehouse(data.warehouse);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [query]);

    const handleSelectCountry = (code, name) => {
        form.setValue('warehouse_id', code);
        form.setValue('warehouse_name', name);
    }

    const handleSave = async (formData) => {
        setLoading(true)
        console.log("dikirim", formData)
        formData.action = "add";
        try {
            const response = await axios.post(
                `/api/admin/user/setData`,
                formData
            );
            toast({
                title: `New Customer ${formData.name} is created!`,
                description: response.data.message,
                status: `Status : ${response.data.status}`,
            });
            setLoading(false)
            close();
            reload();
        } catch (error) {
            console.log('Error', error);
            setLoading(false)
            toast({
                title: 'Error creating New Customer!',
                description: `Error : ${error.message}`,
                status: `Status : ${error.status}`,
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
                    <div className="profile flex flex-col gap-2 w-full text-xs">
                        <FormField
                            className="w-full"
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-neutral-900">
                                        <FormLabel className="text-sm">Full Name</FormLabel>
                                        <FormControl>
                                            <Input id="name" placeholder="Full Name" className="text-sm" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="country_name"
                            className="w-full"
                            render={({ field }) => (
                                <FormItem className="flex flex-col w-full">
                                    <FormLabel className="text-sm text-neutral-900">Select Warehouse</FormLabel>
                                    <Popover className="w-full" open={popOverOpen} onOpenChange={setPopOverOpen}>
                                        <PopoverTrigger asChild>
                                            <FormControl className="w-full">
                                                <Button
                                                    onClick={() => setPopOverOpen(true)}
                                                    variant="outline"
                                                    role="combobox"
                                                    type="button"
                                                    className={`text-xs h-9 shadow-none justify-start w-full gap-2 ${!field.value && "text-muted-foreground"}`}
                                                >
                                                    <span className='text-sm'>
                                                        {field.value ? field.value : "Choose Warehouse"}
                                                    </span>
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[300px] p-0">
                                            <Command className="w-full">
                                                <CommandInput
                                                    placeholder="Search Warehouses..."
                                                    className="h-9 w-full text-xs"
                                                />
                                                <CommandEmpty
                                                    className="w-full text-xs text-center py-2"
                                                >
                                                    No Warehouses found.
                                                </CommandEmpty>

                                                <CommandGroup className="h-[150px]">
                                                    <ScrollArea className="h-[150px]">
                                                        {console.log(field.value)}
                                                        {warehouse.map((item) => (
                                                            <>
                                                                <PopoverClose asChild>
                                                                    <CommandItem
                                                                        value={item.warehouse_name}
                                                                        key={item.warehouse_id}
                                                                        className="text-xs"
                                                                        onSelect={() => {
                                                                            handleSelectCountry(
                                                                                item.warehouse_id,
                                                                                item.warehouse_name
                                                                            );
                                                                            form.setValue('warehouse_id', item.warehouse_id);
                                                                            form.setValue('warehouse_name', item.warehouse_name);
                                                                            field.onChange(item.warehouse_name);
                                                                            setPopOverOpen(false)
                                                                        }}
                                                                    >
                                                                        {item.warehouse_name}
                                                                        <CheckIcon
                                                                            className={`ml-auto h-4 w-4 ${item.warehouse_name === field.value ? "opacity-100" : "opacity-0"}`}
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
                            className="w-full"
                            name="role"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-neutral-900">
                                        <FormLabel className="text-sm">Select User Role</FormLabel>
                                        <FormControl>
                                            <Input id="role" placeholder="Select Role" className="text-sm" {...field} />
                                        </FormControl>
                                        <FormMessage />
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
                                    <FormItem className="w-full text-neutral-900">
                                        <FormLabel className="text-sm">Email</FormLabel>
                                        <FormControl>
                                            <Input id="email" placeholder="Email@shiplink.com" className="text-sm" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            className="w-full"
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-neutral-900">
                                        <FormLabel className="text-sm">Password</FormLabel>
                                        <FormControl>
                                            <Input id="password" type="password" placeholder="" className="text-sm" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />

                        <div className=" flex flex-row justify-between py-3 gap-2">
                            <Button
                                variant="redOutline"
                                size="sm"
                                className="text-xs w-full"
                                onClick={close}
                            >
                                <p className='text-xs'>Cancel</p>
                            </Button>

                            <Button
                                variant="destructive"
                                size="sm"
                                className="text-xs w-full"
                            >
                                <p className='text-xs'>Create New User</p>
                            </Button>
                        </div>
                    </div>

                </form>
            </Form >
        </>
    )
}
