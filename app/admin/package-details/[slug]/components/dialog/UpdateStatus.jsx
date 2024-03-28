import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import * as yup from 'yup'
import { ScrollArea } from '@/components/ui/scroll-area';
import { yupResolver } from '@hookform/resolvers/yup'
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
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast';
const formSchema = yup.object().shape({
    status_id: yup.string(),
    packageID: yup.string(),
})

export const UpdateStatus = ({ open, setOpen, dataID = null, reload }) => {
    console.log("🚀 ~ UpdateStatus ~ dataID:", dataID)
    const { toast } = useToast();
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            status_id: "",
            packageID: dataID || '',
        },
        mode: "onChange",
    })
    
    console.log("🚀 ~ UpdateStatus ~ status_id:", form.watch('status_id'))
    const [statusList, setStatusList] = useState([]);
    console.log("🚀 ~ UpdateStatus ~ statusList:", statusList)

    const handleSave = async (data) => {
        console.log("🚀 ~ handleSave ~ data:", data)
        try {
            const response = await axios.post(`/api/admin/packages/setStatus`,
                {
                    tracking_id: dataID,
                    status: data.status_id
                });
            console.log("🚀 ~ handleSave ~ response:", response)
            if (response.status === 200) {
                setOpen(false);
                toast({
                    title: 'Success',
                    desription: 'Status updated successfully',
                })
            }
        } catch (error) {
            console.log('Error:', error);
            toast({
                title: 'Error',
                desription: 'An error occurred while updating status',
            })
        }

    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `/api/admin/packages/status`
                );
                console.log("🚀 ~ fetchData ~ response:", response)
                const data = await response.data;
                console.log("🚀 ~ Status ~ data:", data.data)
                setStatusList(data.data);
            } catch (error) {
                console.log('Error:', error);
            }
        };
        fetchData();
    }, [])

    const close = () => {
        setOpen(false)
    }
    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            <div className="flex flex-col gap-2 font-bold">
                                <p>Update Status</p>
                                <p>For Package #{dataID}</p>
                            </div>

                        </DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-2">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(handleSave)}
                                className='flex gap-4 flex-col'
                                action="">
                                <div className="w-[50px] text-myBlue border-b border-myBlue text-sm text-center">
                                    <p>Status</p>
                                </div>
                                <div className="w-full">
                                    <Separator className="w-full h-[1px]" />
                                </div>
                                <div className="flex flex-col gap-2 pt-2 pb-4">
                                    <div className="w-[100%]">
                                        <FormField
                                            control={form.control}
                                            name="status_id"
                                            render={({ field }) => (
                                                <FormItem className="w-full flex flex-row gap-3 items-center justify-between">
                                                    <FormLabel className="w-[40%]">Select Status</FormLabel>
                                                    <Select
                                                        onValueChange={(value) => {
                                                            const selectedStatus = statusList.find(item => item.status === value);
                                                            field.onChange(selectedStatus ? selectedStatus.status : ''); // Set id_status as value if found, otherwise empty string
                                                        }}
                                                        defaultValue={field.value}
                                                    >
                                                        <FormControl className='text-xs'>
                                                            <SelectTrigger>
                                                                <SelectValue className='text-xs' placeholder="Status" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <ScrollArea className="h-[200px]">
                                                                {
                                                                    statusList?.map((item, index) => (
                                                                        <SelectItem className='text-xs' key={index} value={item.status}>
                                                                            {item.status}
                                                                        </SelectItem>
                                                                    ))
                                                                }
                                                            </ScrollArea>
                                                        </SelectContent>
                                                    </Select>
                                                </FormItem>
                                            )}
                                        />

                                    </div>
                                </div>
                                <div className="flex flex-row justify-between w-full gap-5">
                                    <Button
                                        type="button"
                                        variant="redOutline"
                                        className="w-full"
                                        onClick={close}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        className="w-full"
                                        type="submit"
                                        variant="destructive"
                                    >Save changes
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
