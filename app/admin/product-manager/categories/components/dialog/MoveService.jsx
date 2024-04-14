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
import { useToast } from '@/components/ui/use-toast'
import { Button } from "@/components/ui/button"
import axios from "axios";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Loaders } from '@/components/ui/loaders';
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
import { useForm } from 'react-hook-form'

const formSchema = yup.object().shape({
    service_id: yup.array(),
    category_id: yup.string().required(),
})

export const MoveService = ({ open, setOpen, serviceID, reloadData, category_id }) => {
    console.log("🚀 ~ MoveService ~ serviceID:", serviceID)
    const { toast } = useToast()
    const [servicesList, setServicesList] = useState([]);
    console.log("🚀 ~ MoveService ~ servicesList:", servicesList)
    const [query, setQuery] = useState({
        keyword: "",
        page: 0,
        limit: 0,
        index: 0,
        category_type: "Services",
    })
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            service_id: serviceID || [],
            category_id: "",
        },
        mode: "onChange",
    })
    const onClose = () => {
        setOpen(false)
    }
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        form.setValue('service_id', serviceID)
    }, [serviceID])

    const handleSubmit = async (formData) => {
        console.log("🚀 ~ handleSubmit ~ formData:", formData)
        try {
            setLoading(true)
            const response = await axios.post(
                `/api/admin/category/move`,
                formData
            )
            console.log("🚀 ~ handleSubmit ~ response:", response)
            if (response.data.status !== true) {
                toast({
                    title: 'Error',
                    description: response.data.message,
                    status: 'error',
                });
            } else {
                toast({
                    title: 'Success',
                    description: response.data.message,
                    status: 'success',
                });
            }
            setOpen(false)
            setLoading(false)
            reloadData()
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    };

    const serviceList = async () => {
        try {
            const response = await axios.post(
                `/api/admin/category/list`,
                {
                    keyword: query.keyword,
                    page: query.page,
                    limit: query.limit,
                    index: query.index,
                    category_type: query.category_type,
                }
            )
            console.log("🚀 ~ serviceList ~ response:", response)
            setServicesList(response.data.product_categories)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        serviceList();
    }, [query, open])


    console.log("WATCH FORM", form.watch('category_id'), form.watch('service_id'))
    return (
        <>
            {loading ? (
                <Loaders />
            ) : (
                <AlertDialog open={open} setOpen={setOpen}>
                    <AlertDialogContent className="w-[350px]">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="font-bold text-center">
                                Move Selected Service To <br /> Other Category
                            </AlertDialogTitle>
                        </AlertDialogHeader>
                        <div className="">
                            <Form {...form}>
                                <form className="" action="">
                                    <FormField
                                        name="category_id"
                                        className="w-full text-neutral-900"
                                        control={form.control}
                                        render={({ field }) => (
                                            <>
                                                <FormItem>
                                                    <FormLabel className="w-full text-neutral-900 text-sm">
                                                        Select Category
                                                    </FormLabel>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger className="px-3 h-[42px] rounded text-[13px]">
                                                                <SelectValue
                                                                    defaultValue={"Product"}
                                                                    placeholder="Select Category"
                                                                />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {servicesList.map((service) => (
                                                                <SelectItem
                                                                    className="text-[13px]"
                                                                    key={service.category_code}
                                                                    value={service.category_code}
                                                                    disabled={service.category_code === category_id}
                                                                >
                                                                    {service.categories}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            </>
                                        )}
                                    />
                                </form>
                            </Form>
                        </div>
                        <AlertDialogFooter className={"mt-2"}>
                            <Button
                                variant="redOutline"
                                size="sm"
                                className="w-full"
                                type="button"
                                onClick={onClose}
                            >
                                <p className=" font-normal text-xs">Cancel</p>
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                className="w-full"
                                type="button"
                                onClick={form.handleSubmit(handleSubmit)}
                            >
                                <p className=" font-normal text-xs">Move</p>
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </>
    );
}

