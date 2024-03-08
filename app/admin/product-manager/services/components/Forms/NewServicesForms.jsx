/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
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
import { PopoverClose } from '@radix-ui/react-popover'
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
import { CheckIcon } from 'lucide-react'
import axios from 'axios'
import { useToast } from '@/components/ui/use-toast'
import { Loaders } from '@/components/ui/loaders'

const formSchema = yup.object().shape({
    service_id: yup.string(),
    item: yup.string().required(),
    price: yup.number().required(),
    category: yup.string().required(),
    category_id: yup.string(),
    description: yup.string().required(),
})



export const NewServicesForms = ({ close, setFormsData, data = null, reload }) => {
    const { toast } = useToast()
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            service_id: data?.service_id || "",
            item: data?.item || "",
            price: data?.price || 0,
            category: data?.category || "",
            category_id: data?.category_id || "",
            description: data?.description || "",
        },
        mode: "onChange",
    })

    const [category, setCategory] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`/api/admin/category/list`, {
                    "keyword": "",
                    "page": 0,
                    "limit": 0,
                    "index": 0,
                    "category_type": "Services"
                });
                setCategory(response.data.product_categories);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();

    })
    useEffect(() => {
        form.setValue("service_id", data?.service_id || "")
        form.setValue("item", data?.item || "")
        form.setValue("price", data?.price || "")
        form.setValue("category", data?.categories || "")
        form.setValue("category_id", data?.category_id || "")
        form.setValue("description", data?.description || "")
    }, [data])

    useEffect(() => {
        // Simpan nilai awal formulir ke state induk
        setFormsData(form.getValues());
    }, []);


    const [loading, setLoading] = useState(false)
    const handleSave = async (formData) => {
        console.log("🚀 ~ handleSave ~ SENT:", formData)
        setLoading(true)
        try {
            axios.post(
                `/api/admin/service/setData`,
                {
                    service_id: formData.service_id,
                    item: formData.item,
                    category_id: formData.category_id,
                    description: formData.description,
                    price: formData.price,
                    action: `${data ? "edit" : "add"}`
                }
            ).then((response) => {
                console.log("🚀 ~ ).then ~ response:", response)
                setLoading(false)
                form.reset()
                reload()
                toast({
                    title: "New Services Added",
                    desription: "Services has been added successfully",
                    type: "success",
                })
            }).catch((error) => {
                setLoading(false)
                console.log("Error", error)
                toast({
                    title: "Error",
                    desription: `${error.message}`,
                    type: "error",
                })
            })

        } catch (error) {
            console.log("error", error)
        }
    }
    return (
        <>
            {loading && <Loaders />}
            <Form {...form}>
                <form
                    className='flex gap-2 flex-col'
                    action=""
                    onSubmit={form.handleSubmit(handleSave)}
                >

                    <div className="profile flex flex-row gap-4 w-full">
                        <FormField
                            className="w-full text-xs"
                            name="service_id"
                            control={form.control}
                            disabled={true}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-xs">
                                        <FormLabel className="font-bold">Product ID</FormLabel>
                                        <FormControl>
                                            <Input
                                                size="new"
                                                className="text-xs" id="service_id" placeholder="#1231"
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e.target.value);
                                                    setFormsData({ ...form.getValues(), service_id: e.target.value });
                                                }}
                                            />
                                        </FormControl>
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            name="item"
                            className="w-full text-xs"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-xs">
                                        <FormLabel className="font-bold">Item #</FormLabel>
                                        <FormControl >
                                            <Input
                                                size="new"
                                                className="text-xs" type="text"
                                                id="item"
                                                placeholder="#2321"  {...field}
                                                onChange={(e) => {
                                                    field.onChange(e.target.value);
                                                    setFormsData({ ...form.getValues(), item: e.target.value });
                                                }}
                                            />
                                        </FormControl>
                                    </FormItem>
                                </>
                            )}
                        />
                    </div>
                    <div className="wrap flex flex-row items-center gap-4">
                        <FormField
                            name="price"
                            className="w-full text-xs"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="text-xs w-full">
                                        <FormLabel className="font-bold">Price *</FormLabel>
                                        <FormControl>
                                            <div className="flex flex-row">
                                                <div className="py-2 px-3 h-[30px] bg-zinc-300 items-center rounded-tl-sm rounded-bl-sm">
                                                    $
                                                </div>
                                                <Input
                                                    className="text-xs h-[30px] rounded-tl-none rounded-bl-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-slate-950"
                                                    id="price"
                                                    type="number"
                                                    min="0"
                                                    placeholder="$ 12.00"
                                                    onChange={(e) => {
                                                        field.onChange(e.target.value);
                                                        setFormsData({ ...form.getValues(), price: e.target.value });
                                                    }}
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            name="category"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="font-bold">Category *</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={`w-[200px] justify-between text-xs h-[30px] shadow-none border-slate-300 px-1.5
                                                        ${!field.value && "text-muted-foreground"}`
                                                        }
                                                    >
                                                        {field.value || "Select Category"}
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[200px] p-0">
                                                <Command>
                                                    <CommandInput
                                                        placeholder="Search Category..."
                                                        className="h-9 text-xs"
                                                    />
                                                    <CommandEmpty className="text-xs text-center py-1">No Category Found</CommandEmpty>
                                                    <PopoverClose >
                                                        <CommandGroup>
                                                            {category?.map((item) => (
                                                                <>
                                                                    <CommandItem
                                                                        value={item.categories}
                                                                        key={item.category_code}
                                                                        className="text-xs w-full"
                                                                        onSelect={() => {
                                                                            form.setValue("category", item.categories)
                                                                            form.setValue("category_id", item.category_code)
                                                                        }}
                                                                    >

                                                                        {item.categories}
                                                                        <CheckIcon
                                                                            className={`ml-auto h-4 w-4 text-xs
                                                                    ${category.categories === field.value
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0"
                                                                                }
                                                                `}
                                                                        />
                                                                    </CommandItem>
                                                                </>
                                                            ))}
                                                        </CommandGroup>
                                                    </PopoverClose>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                    </FormItem>
                                </>
                            )}
                        />

                    </div>
                    <FormField
                        name="description"
                        className="w-full text-xs"
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full text-xs">
                                    <FormLabel className="font-bold">Description</FormLabel>
                                    <FormControl >
                                        <Input
                                            size="new"
                                            className="text-xs"
                                            type="text"
                                            id="description"
                                            placeholder="Model"
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e.target.value);
                                                setFormsData({ ...form.getValues(), description: e.target.value });
                                            }}
                                        />
                                    </FormControl>
                                </FormItem>
                            </>
                        )}
                    />
                    <div className=" flex justify-end items-end  w-full gap-4">
                        <Button
                            variant="redOutline"
                            type="button"
                            className={` px-10 `}
                            onClick={() => {
                                form.reset()
                            }}
                            size="xs"
                        >
                            <p className=' font-normal text-xs'>Cancel</p>
                        </Button>
                        <Button
                            variant="destructive"
                            type="submit"
                            className="px-10"
                            size="xs"
                        >
                            <p className=' font-normal text-xs'>Save</p>
                        </Button>
                    </div>
                </form>
            </Form >
        </>
    )
}
