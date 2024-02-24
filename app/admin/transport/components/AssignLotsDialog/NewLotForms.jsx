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
const formSchema = yup.object().shape({
    LotsId: yup.string().required().max(50, "character is too long"),
    LotsLabel: yup.string().required(),
    Origin: yup.string().required(),
    Destination: yup.string().required(),
    TripNumber: yup.date().required(),
    Documents: yup.string()
})



export const NewLotsFrom = ({ close, data = null }) => {
    const { toast } = useToast()
    const [loading, setLoading] = useState(false);
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            LotsId: data?.LotsId || "",
            LotsLabel: data?.LotsLabel || "",
            Origin: data?.Origin || "",
            Destination: data?.Destination || "",
            TripNumber: data?.TripNumber || "",
            Status: data?.Status || "",
            Documents: data?.documents || "",
        },
        mode: "onChange",
    })


    const handleSave = async (formData) => {
        setLoading(true)
        console.log("dikirim", formData)
        try {
            formData.action = 'add';
            const response = await axios.post(
                `/api/admin/transport/lots/setDatta`,
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
                                        <FormMessage />
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
                                        <FormMessage />
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
                                        <FormMessage />
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
                                        <FormMessage />
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
                                    <FormMessage />
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
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Cleared Custom">Cleared Custom</SelectItem>
                                        <SelectItem value="Ready To Pickup">Ready To Pickup</SelectItem>
                                        <SelectItem value="Pending">Pending</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="w-full">
                        <Separator className="h-[2px]" />
                    </div>

                    <FormField
                        name="TripNumber"
                        className="w-full"
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full flex flex-col gap-1">
                                    <FormLabel className="">Upload Documents</FormLabel>
                                    <FormControl >
                                        <Input
                                            className=" file:w-[100px] file:h-full file:p-0 text-center last:text-center last:w-full file:bg-myBlue  bg-zinc-400/50 px-0 py-2 p-0 file:text-white"
                                            type="file" id="" placeholder="" accept="application/pdf" {...field}
                                            capture="environment"
                                        />
                                    </FormControl>
                                    <FormMessage />
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
                        >Save changes
                        </Button>
                    </div>
                </form>
            </Form >
        </>
    )
}
