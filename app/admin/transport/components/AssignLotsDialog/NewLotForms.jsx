import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
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
import { useToast } from '@/components/ui/use-toast'
import { Loaders } from '@/components/ui/loaders'
import Image from 'next/image'
import axios from 'axios'

const formSchema = yup.object().shape({
    LotsId: yup.string().required().max(50, "character is too long"),
    LotsLabel: yup.string().required(),
    Origin: yup.string().required(),
    Destination: yup.string().required(),
    TripNumber: yup.string().required(),
    Documents: yup.array().of(yup.string())
})

export const NewLotsFrom = ({ close, data = null }) => {
    const { toast } = useToast()
    const [loading, setLoading] = useState(false);
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            LotsId: data?.lots_id || "",
            LotsLabel: data?.label || "",
            Origin: data?.country_name || "",
            Destination: data?.destination_name || "",
            TripNumber: data?.trip_number || "",
            Status: data?.status || "",
            Documents: data?.documents || [],
        },
        mode: "onChange",
    })
    const handleFileChange = (event) => {
        const files = event.target.files;
        const uploadedFiles = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onloadend = () => {
                uploadedFiles.push(reader.result);

                if (uploadedFiles.length === files.length) {
                    form.setValue('Documents', uploadedFiles);
                }
            };

            reader.readAsDataURL(file);
        }
    };
    const handleSave = async (formData) => {
        setLoading(true)
        console.log("dikirim", formData)
        try {
            formData.action = `${data === null ? "add" : "edit"}`;
            const response = await axios.post(
                `/api/admin/transport/lots/setData`,
                formData
            );
            toast({
                title: `New Lots ${formData.LotsLabel} created!`,
                description: response.data.message,
                status: 'success',
            });
            setLoading(false)
            reload();
            close();
        } catch (error) {
            console.log('Error', error);
            setLoading(false)
            toast({
                title: 'Error creating new Lots',
                description: 'An error occurred while creating the Lots.',
                status: 'error',
            });
        }
    };

    return (
        <>
            {loading && <Loaders />}

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSave)}
                    className='flex gap-4 flex-col'
                    action="">

                    <div className="profile flex flex-col gap-4 w-full">
                        <FormField
                            className="w-full"
                            name="LotsId"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full flex flex-row gap-3 items-center justify-between">
                                        <FormLabel className="w-[40%]">Lots ID</FormLabel>
                                        <FormControl>
                                            <Input id="LotsId" placeholder="1231" {...field} />
                                        </FormControl>

                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            name="LotsLabel"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full flex flex-row gap-3 items-center justify-between">
                                        <FormLabel className="w-[40%]">Lots Labels</FormLabel>
                                        <FormControl >
                                            <Input type="text" id="LotsLabel" placeholder="Regular Daily Move"  {...field} />
                                        </FormControl>

                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            name="Origin"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full flex flex-row gap-3 items-center justify-between">
                                        <FormLabel className="w-[40%]">Origin</FormLabel>
                                        <FormControl >
                                            <Input type="text" id="Origin" placeholder="Select Origin" {...field} />
                                        </FormControl>

                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            name="Destination"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full flex flex-row gap-3 items-center justify-between">
                                        <FormLabel className="w-[40%]">Destination</FormLabel>
                                        <FormControl >
                                            <Input type="text" id="Destination" placeholder="Input Destination" {...field} />
                                        </FormControl>

                                    </FormItem>
                                </>
                            )}
                        />

                    </div>
                    <FormField
                        name="TripNumber"
                        className="w-full"
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full flex flex-row gap-3 items-center justify-between">
                                    <FormLabel className="w-[40%]">Trip Number</FormLabel>
                                    <FormControl >
                                        <Input type="text" id="TripNumber" placeholder="ABC12345678" {...field} />
                                    </FormControl>
                                </FormItem>
                            </>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="Status"
                        render={({ field }) => (
                            <FormItem className="w-full flex flex-row gap-3 items-center justify-between">
                                <FormLabel className="w-[40%]">Select Status</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl className='text-xs'>
                                        <SelectTrigger>
                                            <SelectValue className='text-xs' placeholder="Status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem className='text-xs' value="Cleared Custom">Cleared Custom</SelectItem>
                                        <SelectItem className='text-xs' value="Ready To Pickup">Ready To Pickup</SelectItem>
                                        <SelectItem className='text-xs' value="Pending">Pending</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />

                    <div className="w-full">
                        <Separator className="h-[2px]" />
                    </div>
                    <FormField
                        name="Documents"
                        className="w-full"
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full flex flex-col gap-1">
                                    <FormLabel className="text-xs">Upload Documents</FormLabel>
                                    <FormControl >
                                        <Input
                                            multiple
                                            className=" file:w-[100px] file:text-xs  file:h-full file:p-0 text-center last:text-center last:w-full file:bg-myBlue  bg-zinc-400/50 px-0 pl-2 py-2 p-0 file:text-white"
                                            type="file" id="" placeholder="" accept="application/pdf" onChange={handleFileChange}
                                            capture="environment"
                                        />
                                    </FormControl>
                                </FormItem>
                            </>
                        )}
                    />

                    <div className="flex flex-row justify-between w-full gap-3 py-2">
                        <Button
                            type="button"
                            variant="redOutline"
                            className="w-full"
                            onClick={close}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="w-full"
                            variant="destructive"
                        >
                            <p>Save changes</p>
                        </Button>
                    </div>
                </form>
            </Form >
        </>
    )
}
