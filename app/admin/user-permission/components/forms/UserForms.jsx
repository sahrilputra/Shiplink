/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
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
import axios from 'axios'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CheckIcon } from 'lucide-react'
import { PopoverClose } from '@radix-ui/react-popover'
import { Loaders } from '@/components/ui/loaders'
const formSchema = yup.object().shape({
    name: yup.string().required().max(50, "character is too long"),
    email: yup.string().email().required(),
    password: yup.string().required().min(8, "min 8 character"),
    phone_number: yup.string(),
    role: yup.string().required(),
    role_id: yup.number(),
    warehouse: yup.string().required(),
    warehouse_id: yup.string().required(),

})
import { useToast } from '@/components/ui/use-toast'

export const UserPermissionForms = ({ isDisable, data = null, handleDisable, isSkleton }) => {
    const { toast } = useToast()
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            phone_number: "",
            role: data?.role || "",
            role_id: data?.role_id || 0,
            warehouse: data?.warehouse_name || "",
            warehouse_id: data?.warehouse_id || "",
        },
        disabled: isDisable,
        mode: "onChange",
    })

    useEffect(() => {
        form.setValue("name", data?.name || "")
        form.setValue("email", data?.email || "")
        form.setValue("password", data?.password || "")
        form.setValue("phone_number", data?.phone_number || "")
        form.setValue("role", data?.role || "")
        form.setValue("warehouse", data?.warehouse_name || "")
        form.setValue("warehouse_id", data?.warehouse_id || "")
    }, [data])


    console.log("then result", data)
    const handleCancel = () => {
        handleDisable()
    }


    const [loading, setLoading] = useState(false);
    const [warehouse, setWarehouse] = useState([]);
    const [popOverOpen, setPopOverOpen] = useState(false);
    const [roleOpen, setRoleOpen] = useState(false);
    const [roleList, setRoleList] = useState([]);
    const [query, setQuery] = useState({
        keyword: "",
        page: 1,
        limit: 0,
        index: 0
    });

    const [resQuery, setResQuery] = useState({
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
            const responseRole = await axios.post(
                `/api/admin/user/role/list`,
                resQuery
            );

            console.log("Warehouse Data", response.data)
            console.log("Role Data", responseRole.data)
            const data = await response.data;
            setWarehouse(data.warehouse);

            const roleData = await responseRole.data;
            setRoleList(roleData.roles);

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

    const handleSelectRoles = (code, name) => {
        form.setValue('role_id', code);
        form.setValue('role', name);
    }

    const handleSave = async (formData) => {
        setLoading(true)
        console.log("dikirim", formData)
        formData.action = "edit";
        formData.user_code = data?.user_code;
        formData.profile_picture = "";
        try {
            const response = await axios.post(
                `/api/admin/user/setData`,
                formData
            );
            toast({
                title: `Success Edit User ${formData.name}!`,
                description: response.data.message,
                status: `Status : ${response.data.status}`,
            });
            setLoading(false)
        } catch (error) {
            console.log('Error', error);
            setLoading(false)
            toast({
                title: 'Error Edit User Data!',
                description: `Error : ${error.message}`,
                status: `Status : ${error.status}`,
            });
        }
    };

    return (
        <>
            {
                loading && <Loaders />
            }
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSave)}
                    className='flex gap-2 flex-col'
                    action="">
                    <div className="bg-white rounded-lg border border-neutral-200 border-opacity-90 w-full px-4 py-3">
                        <FormField
                            className="w-full"
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    {
                                        isSkleton ? (
                                            <Skeleton className="w-full h-8 mt-2" />
                                        ) : (
                                            <FormItem className="w-full text-xs">
                                                <FormLabel className=" text-xs font-bold">Full Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        size="xs"
                                                        className="px-1.5"
                                                        id="name"
                                                        placeholder="john"
                                                        {...field} />
                                                </FormControl>
                                                <FormMessage className="text-xs" />
                                            </FormItem>
                                        )
                                    }
                                </>
                            )}
                        />

                        <FormField
                            name="email"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    {
                                        isSkleton ? (
                                            <Skeleton className="w-full h-8 mt-2" />
                                        ) : (
                                            <FormItem className="w-full">
                                                <FormLabel className=" text-xs font-bold">Email</FormLabel>
                                                <FormControl >
                                                    <Input

                                                        size="xs"
                                                        className="px-1.5"
                                                        type="email"
                                                        id="address"
                                                        placeholder="Email"
                                                        {...field} />
                                                </FormControl>
                                                <FormMessage className="text-xs" />
                                            </FormItem>
                                        )
                                    }
                                </>
                            )}
                        />
                        <FormField
                            className="w-full"
                            name="phone_number"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    {
                                        isSkleton ? (
                                            <Skeleton className="w-full h-8 mt-2" />
                                        ) : (
                                            <FormItem className="w-full text-xs">
                                                <FormLabel className=" text-xs font-bold">Phone Number</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        size="xs"
                                                        className="px-1.5"
                                                        id="name"
                                                        placeholder="+1223"
                                                        {...field} />
                                                </FormControl>
                                                <FormMessage className="text-xs" />
                                            </FormItem>
                                        )
                                    }
                                </>
                            )}
                        />
                        <FormField
                            name="password"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    {
                                        isSkleton ? (
                                            <Skeleton className="w-full h-8 mt-2" />
                                        ) : (
                                            <FormItem className="w-full">
                                                <FormLabel className=" text-xs font-bold">Password</FormLabel>
                                                <FormControl >
                                                    <Input
                                                        size="xs"
                                                        className="px-1.5"
                                                        type="password"
                                                        id="address"
                                                        placeholder="password"  {...field} />
                                                </FormControl>
                                                <FormMessage className="text-xs" />
                                            </FormItem>
                                        )
                                    }
                                </>
                            )}
                        />
                        <div className="profile flex flex-row gap-2 w-full items-end">
                            <FormField
                                name="phone_number"
                                className="w-full"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        {
                                            isSkleton ? (
                                                <Skeleton className="w-full h-8 mt-2" />
                                            ) : (
                                                <FormItem className="w-full">
                                                    <FormLabel className=" text-xs font-bold">Phone Number</FormLabel>
                                                    <FormControl >
                                                        <Input
                                                            size="xs"
                                                            className="px-1.5"
                                                            type="number"
                                                            id="phone_number"
                                                            placeholder="Phone Number"
                                                            {...field} />
                                                    </FormControl>
                                                    <FormMessage className="text-xs" />
                                                </FormItem>
                                            )
                                        }

                                    </>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="role"
                                className="w-full"
                                render={({ field }) => (
                                    <>
                                        {
                                            isSkleton ? (
                                                <Skeleton className="w-full h-8 mt-2" />
                                            ) : (
                                                <FormItem className="flex flex-col w-full">
                                                    <FormLabel className=" text-xs font-bold">Select Role</FormLabel>
                                                    <Popover className="w-full" open={roleOpen} onOpenChange={setRoleOpen}>
                                                        <PopoverTrigger asChild>
                                                            <FormControl className="w-full">
                                                                <Button
                                                                    onClick={() => setRoleOpen(true)}
                                                                    variant="outline"
                                                                    role="combobox"
                                                                    type="button"
                                                                    size="xs"
                                                                    className={`text-xs px-1.5 h-[30px] shadow-none justify-start w-full gap-2 ${!field.value && "text-muted-foreground"}`}
                                                                    disabled={isDisable}
                                                                >
                                                                    <span className='text-xs px-2'>
                                                                        {field.value ? field.value : "Select Role"}
                                                                    </span>
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-[300px] p-0">
                                                            <Command className="w-full">
                                                                <CommandInput
                                                                    placeholder="Search Role..."
                                                                    className="h-9 w-full text-xs"
                                                                />
                                                                <CommandEmpty
                                                                    className="w-full text-xs text-center py-2"
                                                                >
                                                                    No List found.
                                                                </CommandEmpty>

                                                                <CommandGroup className="h-[150px]">
                                                                    <ScrollArea className="h-[150px]">
                                                                        {console.log(field.value)}
                                                                        {roleList.map((item) => (
                                                                            <>
                                                                                <PopoverClose asChild>
                                                                                    <CommandItem
                                                                                        value={item.role_name}
                                                                                        key={item.id}
                                                                                        className="text-xs"
                                                                                        onSelect={() => {
                                                                                            handleSelectRoles(
                                                                                                item.id,
                                                                                                item.role_name
                                                                                            );
                                                                                            form.setValue('role_id', item.id);
                                                                                            form.setValue('role', item.role_name);
                                                                                            field.onChange(item.role_name);
                                                                                            setRoleOpen(false)
                                                                                        }}
                                                                                    >
                                                                                        {item.role_name}
                                                                                        <CheckIcon
                                                                                            className={`ml-auto h-4 w-4 ${item.role_name === field.value ? "opacity-100" : "opacity-0"}`}
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
                                            )
                                        }

                                    </>
                                )}
                            />
                            {/* <FormField
                                name="role"
                                className="w-full"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        {isSkleton ? (
                                            <Skeleton className="w-full h-8 mt-2" />
                                        ) : (
                                            <FormItem className="w-full">
                                                <FormLabel className=" text-xs font-bold">Role</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        size="xs"
                                                        className="px-1.5"
                                                        type="text"
                                                        id="role"
                                                        placeholder="Role" {...field} />
                                                </FormControl>
                                                <FormMessage className="text-xs" />
                                            </FormItem>
                                        )}

                                    </>
                                )}
                            /> */}
                        </div>
                        <FormField
                            control={form.control}
                            name="warehouse"
                            className="w-full mt-2"
                            disabled={isDisable}
                            render={({ field }) => (
                                <>
                                    {isSkleton ? (
                                        <Skeleton className="w-full h-8 mt-2" />
                                    ) : (
                                        <FormItem className="flex flex-col w-full mt-2">
                                            <FormLabel className=" text-xs font-bold">Select Warehouse</FormLabel>
                                            <Popover className="w-full" open={popOverOpen} onOpenChange={setPopOverOpen}>
                                                <PopoverTrigger asChild>
                                                    <FormControl className="w-full">
                                                        <Button
                                                            onClick={() => setPopOverOpen(true)}
                                                            variant="outline"
                                                            role="combobox"
                                                            type="button"
                                                            className={`text-xs h-[30px] shadow-none justify-start w-full gap-2 ${!field.value && "text-muted-foreground"}`}
                                                            disabled={isDisable}
                                                        >
                                                            <span className='text-xs px-2'>
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
                                </>
                            )}
                        />



                        <div className="w-full flex flex-row items-end gap-3 justify-end py-3">
                            {
                                isDisable ? (
                                    <></>
                                ) : (
                                    <>
                                        <Button
                                            variant="redOutline"
                                            type="button"
                                            className=" w-24 h-8 text-xs"
                                            onClick={handleCancel}
                                        >
                                            Cancel
                                        </Button>

                                        <Button
                                            variant="destructive"
                                            type="submit"
                                            className=" w-24 h-8 text-xs"
                                        >
                                            Save
                                        </Button>
                                    </>

                                )
                            }
                        </div>
                    </div>

                </form>
            </Form >
        </>
    )
}
