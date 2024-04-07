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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
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
import { useEffect, useState } from "react"
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Loaders } from "@/components/ui/loaders"
import axios from 'axios'
import { useToast } from "@/components/ui/use-toast"

const formSchema = yup.object().shape({
    status_name: yup.string(),
    status_id: yup.number(),
    lots_id: yup.string(),
})

export function UpdateDialog({ open, setOpen, dataID = null, reload, data = null }) {
    console.log("🚀 ~ UpdateDialog ~ data:", data)

    const { toast } = useToast()
    const [loading, setLoading] = useState(false)
    const [isselectedStatus, setSelectedStatus] = useState(null)
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            status_id: data?.status_id || 0,
            status_name: data?.status || '',
            lots_id: dataID || '',
        },
        mode: "onChange",
    })
    const [statusList, setStatusList] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `/api/admin/transport/lots/status/list`,
            );
            const data = await response.data.data;
            setStatusList(data);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        form.setValue('status_name', data?.status || '');
        form.setValue('status_id', data?.status_id || 0);
    }, [data])


    const handleSave = async (formData) => {
        console.log("dikirim", formData)
        setLoading(true)
        formData.lots_id = dataID;
        try {
            const response = await axios.post(
                `/api/admin/custom_clearance/setLotsStatus`,
                {
                    lots_id: dataID,
                    status_id: formData.status_id,
                }
            );
            toast({
                title: `Success New Status For ${dataID} !`,
                description: response.data.message,
                status: 'success',
            });
            setLoading(false)
            close();
            reload();
        } catch (error) {
            console.log('Error', error);
            setLoading(false)
            toast({
                title: 'Error While Assign Status!',
                description: `Error : ${error.message}`,
                status: 'error',
            });
        }
    };
    const close = () => {
        setOpen(false)
    }

    const handleSelectedStatus = (e) => {
        setSelectedStatus(e)
        const statusID = statusList.find(item => item.status === e)?.id_status;
    }

    console.log("STATUS ID", form.watch('status_id'))

    return (
        <>
            {loading && <Loaders />}
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent className="w-[450px] gap-0 p-0 px-8 py-5">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            <div className="flex flex-col gap-1 font-bold text-center">
                                <p>Update Status</p>
                                <p>For Lots #{dataID}</p>
                            </div>

                        </AlertDialogTitle>
                    </AlertDialogHeader>
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
                                            name="status_name"
                                            render={({ field }) => (
                                                <FormItem className="w-full flex flex-row gap-3 items-center justify-between">
                                                    <FormLabel className="w-[40%]">Select Status</FormLabel>
                                                    <Select
                                                        defaultValue={field.value}
                                                        onValueChange={(value) => {
                                                            const selectedStatus = statusList.find(
                                                                (item) => item.status === value
                                                            );
                                                            field.onChange(
                                                                selectedStatus ? selectedStatus.id_status : ""
                                                            ); // Set id_status as value if found, otherwise empty string
                                                            form.setValue('status_id', selectedStatus.id_status);
                                                        }}
                                                    >
                                                        <FormControl className='text-xs'>
                                                            <SelectTrigger>
                                                                <SelectValue className='text-xs' placeholder={field.value} />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {
                                                                statusList?.map((item, index) => (
                                                                    <SelectItem
                                                                        className={`text-xs ${item.status === data?.status ? 'bg-zinc-100 text-zinc-500' : ''}`}
                                                                        key={index}
                                                                        value={item.status}
                                                                        disabled={item.status === data?.status}
                                                                        onSelect={() => {
                                                                            form.setValue('status_id', item.id_status)
                                                                        }}
                                                                        onClick={() => {
                                                                            form.setValue('status_id', item.id_status)
                                                                        }}
                                                                    >
                                                                        {item.status}
                                                                    </SelectItem>
                                                                ))
                                                            }
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
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
