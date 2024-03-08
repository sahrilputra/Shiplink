/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { Checkbox } from '@/components/ui/checkbox'
import InputMask from 'react-input-mask';
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
import { useToast } from '@/components/ui/use-toast'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Loaders } from '@/components/ui/loaders'
import axios from 'axios'
import { CheckIcon } from 'lucide-react'
const formSchema = yup.object().shape({
    productID: yup.string(),
    item: yup.string().required(),
    brand: yup.string().required(),
    model: yup.string().required(),
    category: yup.string().required(),
    category_id: yup.string(),
    description: yup.string().required(),
    price: yup.number().required(),
    image: yup.string().required(),
})

export const NewProductForms = ({ close, data = null, setFormsData, reload }) => {

    const { toast } = useToast()
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            product_id: data?.fullName || "",
            item: data?.item || "",
            brand: data?.brand || "",
            model: data?.model || "",
            category: data?.categories || "",
            category_id: data?.category_id || "",
            description: data?.description || "",
            price: data?.price || "",
            image: "",
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
                    "category_type": ""
                });
                setCategory(response.data.product_categories);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
        const intervalId = setInterval(fetchData, 5000);

        // Membersihkan interval saat komponen unmount
        return () => clearInterval(intervalId);
    })

    useEffect(() => {
        form.setValue("productID", data?.product_id || "")
        form.setValue("item", data?.item || "")
        form.setValue("brand", data?.brand || "")
        form.setValue("model", data?.model || "")
        form.setValue("category", data?.categories || "")
        form.setValue("category_id", data?.category_id || "")
        form.setValue("description", data?.description || "")
        form.setValue("price", data?.price || "")
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
                `/api/admin/product/setProduct`,
                {
                    product_id: formData.productID,
                    item: formData.item,
                    brand: formData.brand,
                    model: formData.model,
                    category_id: formData.category_id,
                    description: formData.description,
                    price: formData.price,
                    image: formData.image,
                    action: `${data ? "edit" : "add"}`
                }
            ).then((response) => {
                console.log("🚀 ~ ).then ~ response:", response)
                setLoading(false)
                reload()
                form.reset()
                toast({
                    title: "Product Added",
                    desription: "Product has been added successfully",
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
                    onSubmit={form.handleSubmit(handleSave)}
                    className='flex gap-2 flex-col'
                    action="">
                    <div className="profile flex flex-row gap-2 w-full">
                        <FormField
                            className="w-full text-xs"
                            name="productID"
                            control={form.control}
                            disabled={true}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-xs">
                                        <FormLabel className="font-bold">Product ID</FormLabel>
                                        <FormControl>
                                            <Input
                                                size="new"
                                                id="productID" className="text-xs" placeholder="#1231" {...field}
                                                onChange={(e) => {
                                                    field.onChange(e.target.value);
                                                    setFormsData({ ...form.getValues(), productID: e.target.value });
                                                }}
                                            />
                                        </FormControl>
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            name="item"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="text-xs w-full">
                                        <FormLabel className="font-bold">Item #</FormLabel>
                                        <FormControl >
                                            <Input
                                                size="new"
                                                type="number" id="item" className="text-xs" placeholder="#2321"  {...field}
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
                    <div className="wrap flex flex-row items-center gap-2">
                        <FormField
                            name="brand"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="text-xs w-full">
                                        <FormLabel className="font-bold">Brand *</FormLabel>
                                        <FormControl >
                                            <Input
                                                size="new"
                                                type="text" id="brand" className="text-xs" placeholder="Select Brand" {...field}
                                                onChange={(e) => {
                                                    field.onChange(e.target.value);
                                                    setFormsData({ ...form.getValues(), brand: e.target.value });
                                                }}
                                            />
                                        </FormControl>
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            name="model"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="text-xs w-full">
                                        <FormLabel className="font-bold">Model *</FormLabel>
                                        <FormControl >
                                            <Input
                                                size="new"
                                                type="text" id="brand" className="text-xs" placeholder="Model"
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e.target.value);
                                                    setFormsData({ ...form.getValues(), model: e.target.value });
                                                }}
                                            />
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
                                                        className={`w-[200px] justify-between text-xs h-[30px] shadow-none border-slate-300 px-1
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
                    <div className="wrap flex flex-col items-center gap-2">
                        <FormField
                            name="description"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="text-xs w-full">
                                        <FormLabel className="font-bold">Description *</FormLabel>
                                        <FormControl >
                                            <Input
                                                size="new"
                                                type="text" id="country" className="text-xs" placeholder="Set a description for better visibility."
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
                        <div className="flex flex-row gap-2 w-full">
                            <FormField
                                name="price"
                                className="w-full"
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
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    </>
                                )}
                            />
                            <FormField
                                name="image"
                                className="w-full text-neutral-900"
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full text-neutral-900 text-xs">
                                            <FormLabel className="font-bold">Image *</FormLabel>
                                            <FormControl>
                                                <div className='rounded-md border border-slate-200 p-0'>
                                                    <Input
                                                        id="image"
                                                        type="file"
                                                        className="p-0 border-none text-xs h-[30px] rounded-sm px-0 py-0  file:bg-myBlue file:text-white  file:h-full file:px-3 file:text-xs "
                                                        placeholder="Upload Image"
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            const file = e.target.files[0];
                                                            const reader = new FileReader();
                                                            reader.onload = (event) => {
                                                                const base64String = event.target.result;
                                                                field.onChange(base64String);
                                                                setFormsData({ ...form.getValues(), image: base64String });
                                                            };
                                                            reader.readAsDataURL(file);
                                                        }}
                                                    />
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    </>
                                )}
                            />
                        </div>
                    </div>

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
