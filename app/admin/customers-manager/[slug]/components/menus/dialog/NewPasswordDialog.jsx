import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Loaders } from "@/components/ui/loaders"
import axios from 'axios'
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"

const formSchema = yup.object().shape({
    password: yup.string().required('Password is required'),
})
export function NewPasswordDialog({ open, setOpen, data = null, reload }) {
    console.log("🚀 ~ NewPasswordDialog ~ data:", data)

    const { toast } = useToast()
    const [loading, setLoading] = useState(false)
    const [isselectedStatus, setSelectedStatus] = useState(null)
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            password: "",
        },
        mode: "onChange",
    })
    const handleSave = async (formData) => {
        console.log("dikirim", formData)
        setLoading(true)
        try {
            const response = await axios.post(
                `/api/admin/customer_manager/change_password`,
                {
                    customer_id: data?.customer_id,
                    password: formData.password,
                }
            );
            console.log("🚀 ~ handleSave ~ response:", response)
            if (response.data.status === true) {
                toast({
                    title: `Success! Password Has been change`,
                    description: "Success",
                    status: 'success',
                });
                setLoading(false)
                close();
                reload();
            } else {
                setLoading(false)
                toast({
                    title: 'Something Error While Change The Password!',
                    description: `${response.data.message}`,
                    status: 'error',
                });
            }

        } catch (error) {
            console.log('Error', error);
            setLoading(false)
            toast({
                title: 'Something Error While Change The Password!',
                description: `Error : Please Complete The Account Details First`,
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
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            <div className="flex flex-col gap-2 font-bold">
                                <p>Change User Password</p>
                                {/* <p>For Invoice #{dataID}</p> */}
                            </div>

                        </DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-2">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(handleSave)}
                                className='flex gap-4 flex-col'
                                action="">
                                <div className="flex flex-col gap-2 pt-2 pb-4">
                                    <div className="w-[100%]">
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>New Password</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="password"
                                                            {...field}
                                                            placeholder="Enter New Password"
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-row justify-between w-full gap-5">
                                    <Button
                                        type="button"
                                        variant="redOutline"
                                        size="xs"
                                        className="w-full"
                                        onClick={close}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        className="w-full"
                                        type="submit"
                                        size="xs"
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
