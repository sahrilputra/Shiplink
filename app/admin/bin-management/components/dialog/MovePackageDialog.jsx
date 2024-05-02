/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import axios from 'axios'
import { useToast } from "@/components/ui/use-toast"
import { Loaders } from "@/components/ui/loaders"

const formSchema = yup.object().shape({
    bins_id: yup.string(),
    tracking_id: yup.array().of(yup.string()),
    confirm_overide: yup.boolean()
})

export function MovePackageDialog({ open, setOpen, data, setRowSelection, reload }) {
    console.log("🚀 ~ MovePackageDialog ~ data:", data)

    const { toast } = useToast()
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            bins_id: "",
            tracking_id: data || [],
            confirm_overide: true
        },
        mode: "onChange",
    })

    useEffect(() => {
        for (let i = 0; i < data.length; i++) {
            form.setValue(`tracking_id[${i}]`, data[i])
        }
    }, [data])

    console.log("Form trackingID", form.watch('tracking_id'))
    // var
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState({
        keyword: "",
        page: 1,
        limit: 0,
        index: 0
    });
    const [bins, setBins] = useState([]);


    // Fetch Data
    const fetchData = async () => {
        try {
            const response = await axios.post(
                `/api/admin/bin_manager/list`,
                query
            );
            const data = await response.data;
            setBins(data.bins);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        fetchData();
        const timeoutId = setTimeout(() => {
            fetchData();
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [query]);

    const handleSave = async (formData) => {
        console.log("dikirim", formData)
        setLoading(true)
        try {
            const response = await axios.post(
                `/api/admin/bin_manager/assign_package`,
                {
                    bins_id: formData.bins_id,
                    tracking_id: formData.tracking_id,
                }
            );
            toast({
                title: `Success Assign Package To Bin ${formData.bins_id} !`,
                description: response.data.message,
                status: 'success',
            });
            reload();
            setLoading(false)
            setRowSelection({});
            close();
        } catch (error) {
            console.log('Error', error);
            setLoading(false)
            toast({
                title: 'Error While Assign Package To Bins!',
                description: `Error : ${error.message}`,
                status: 'error',
            });
        }
    };
    const close = () => {
        setOpen(false)
    }
    return (
        <>
            {loading && <Loaders />}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {/* <Button variant="outline">Edit Profile</Button> */}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            <div className="flex flex-col gap-2 font-bold">
                                <p>Move Package</p>
                            </div>
                        </DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleSave)}
                            className='flex gap-4 flex-col'
                            action="">

                            <div className="flex flex-col gap-2">
                                <div className="w-[50px] text-myBlue border-b border-myBlue text-sm text-center">
                                    <p>Bin</p>
                                </div>
                                <div className="w-full">
                                    <Separator className="w-full h-[1px]" />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="bins_id"
                                    render={({ field }) => (
                                        <FormItem className="w-full flex flex-col justify-start">
                                            <FormLabel className=" text-sm">Select Bins</FormLabel>
                                            <Select
                                                onValueChange={(value) => {
                                                    const selectedStatus = bins.find(item => item.bins_id === value);
                                                    field.onChange(selectedStatus ? selectedStatus.bins_id : ''); // Set id_status as value if found, otherwise empty string
                                                }}
                                                defaultValue={field.value}
                                            >
                                                <FormControl className='text-xs'>
                                                    <SelectTrigger>
                                                        <SelectValue className='text-xs' placeholder="Select Bin" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {
                                                        bins?.map((item, index) => (
                                                            <SelectItem className='text-xs' key={index} value={item.bins_id}>
                                                                {`Row ${item.row} - Section ${item.section} - Level ${item.level} `}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="w-full flex flex-row pt-4 pb-2 gap-5 justify-between">
                                <Button
                                    type="button"
                                    className="w-full"
                                    variant="redOutline"
                                    onClick={close}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    variant="destructive"
                                >
                                    Save changes
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    )
}
