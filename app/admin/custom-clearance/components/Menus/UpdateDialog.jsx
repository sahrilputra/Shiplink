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

export function UpdateDialog({ open, setOpen, dataID = null, reload, data }) {

    const { toast } = useToast()
    const [loading, setLoading] = useState(false)
    const [isselectedStatus, setSelectedStatus] = useState(null)
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            status_id: 0,
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
            console.log(response)
            const data = await response.data.data;
            setStatusList(data);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSave = async (formData) => {
        console.log("dikirim", formData)
        setLoading(true)
        formData.lots_id = dataID;
        try {
            const response = await axios.post(
                `/api/admin/custom_clearance/setLotsStatus`,
                formData
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

    return (
        <>
            {loading && <Loaders />}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            <div className="flex flex-col gap-2 font-bold">
                                <p>Update Status</p>
                                <p>For Lots #{dataID}</p>
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
                                                            field.onChange(selectedStatus ? selectedStatus.id_status : ''); // Set id_status as value if found, otherwise empty string
                                                        }}
                                                        defaultValue={`${field.value ? field.value : "Select Status"}`}

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
                                                                        className='text-xs'
                                                                        key={index}
                                                                        value={item.status}
                                                                        onClick={() => form.setValue('status_id', item.id_status)}
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
                </DialogContent>
            </Dialog>
        </>
    )
}
