import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Loaders } from '@/components/ui/loaders'
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckIcon, EyeIcon, EyeOffIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import axios from 'axios'


const formSchema = yup.object().shape({
    customer_name: yup.string().required(),
    customer_plans: yup.string().required(),
    country_code: yup.string().required(),
    country_name: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
})

export const ChangeMembership = ({ open, setOpen, data = null, reloadData }) => {
    console.log("🚀 ~ ChangeMembership ~ data:", data)
    const { toast } = useToast();
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            customer_name: "",
            customer_plans: data?.customer_plans || "",
            Country: "",
            email: "",
            password: "",
        },
        mode: "onChange",
    })

    const [loading, setLoading] = useState(false);
    console.log("🚀 ~ ChangeMembership ~ form", form.watch('customer_plans'))

    useEffect(() => {
        form.setValue('customer_plans', data?.customer_plans)
    }, [data, form])

    const close = () => {
        setOpen(false)
    }

    const handleSave = () => {
        setLoading(true);
        const { customer_plans } = form.getValues()
        axios.post('/api/admin/customer_manager/change_membership', {
            customer_id: data.customer_id,
            membership: customer_plans
        }).then((response) => {
            setLoading(false);
            toast({
                title: `Success! Membership Has been change`,
                description: "Success",
                status: 'success',
            })
            close()
            reloadData();
            console.log("🚀 ~ handleSave ~ response", response)
        }).catch((error) => {
            setLoading(false);
            toast({
                title: `Erorr`,
                description: "Error While Change Membership",
            })
            console.log("🚀 ~ handleSave ~ error", error)
            close()
        })
    }
    return (
        <>
            {loading && <Loaders />}
            <Dialog open={open} onOpenChange={setOpen}>
                {/* <DialogTrigger>Open</DialogTrigger> */}
                <DialogContent >
                    <DialogHeader>
                        <DialogTitle className="font-bold">Change Membership</DialogTitle>
                    </DialogHeader>
                    <div className="w-[400px]">
                        <Form {...form}>
                            <form
                                className={`flex gap-2 flex-col `}
                                action=""
                                onSubmit={form.handleSubmit(handleSave)}
                            >
                                <FormField
                                    control={form.control}
                                    name="customer_plans"
                                    render={({ field }) => (
                                        <FormItem className="w-full text-neutral-900 space-y-1">
                                            <FormLabel className="text-sm">Customer Plans</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="flex w-full flex-row gap-2 justify-around space-y-1 items-end"
                                                >
                                                    <FormItem className="flex items-center space-x-3 space-y-0  bg-slate-100 rounded border  border-slate-300 w-[150px] py-3 px-4 ">
                                                        <FormControl>
                                                            <RadioGroupItem value="Free" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            Free
                                                        </FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0  bg-slate-100 rounded border  border-slate-300 w-[150px] py-3 px-4 ">
                                                        <FormControl>
                                                            <RadioGroupItem value="Business" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            Business
                                                        </FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0  bg-slate-100 rounded border  border-slate-300 w-[150px] py-3 px-4 ">
                                                        <FormControl>
                                                            <RadioGroupItem value="Personal" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">Personal</FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage className="text-xs" />
                                        </FormItem>
                                    )}
                                />

                                <div className=" flex flex-row justify-between gap-2 py-5 ">
                                    <Button
                                        variant="redOutline"
                                        size="sm"
                                        className="w-full"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            close()
                                        }}
                                    >
                                        <p className=' font-normal text-xs'>Cancel</p>
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="w-full"
                                        type="submit"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            handleSave()
                                        }}
                                    >
                                        <p className=' font-normal text-xs'>Save</p>
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