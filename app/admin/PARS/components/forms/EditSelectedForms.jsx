import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'
import { Checkbox } from '@/components/ui/checkbox'
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
import { Loaders } from '@/components/ui/loaders'
import axios from 'axios'


const formSchema = yup.object().shape({
    id: yup.number(),
    type: yup.string(),
    carrier_code: yup.string(),
    code_end: yup.string().when('code_start', (code_start, schema) =>
        schema.test({
            test: function (code_end) {
                if (code_start && code_end && code_end <= code_start) {
                    return this.createError({
                        message: 'Code end must be greater than code start',
                        path: 'code_end',
                    });
                }
                return true;
            }
        })
    ).required(),
    code_start: yup.string(),
    action: yup.string(),
});


export const EditSelectedNumberForms = ({ close, data = null, reload }) => {
    console.log("Data, ", data)
    const { toast } = useToast()
    const [loading, setLoading] = useState(false)
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            id: 0,
            type: data?.type || "PARS",
            carrier_code: data?.carrier_code || "",
            code_end: data?.code_end || "",
            code_start: data?.code_start || "",
            action: "edit",
        },
        mode: "onChange",
    })


    const handleSave = async (formData) => {
        setLoading(true)
        formData.dataId = data?.id || 0
        console.log("dikirim", formData)
        try {
            formData.action = `${data === null ? "add" : "edit"}`;
            const response = await axios.post(
                `/api/admin/Pars/setData`,
                formData
            );
            toast({
                title: `${formData.Type} Number has been ${data ? "Edited!" : "created!"}`,
                description: response.data.message,
                status: 'success',
            });
            reload()
            setLoading(false)
        } catch (error) {
            console.log('Error', error);
            setLoading(false)
            toast({
                title: 'Error!',
                description: `An error occurred while ${data ? "Edited" : "Created"} the Number.`,
                status: 'error',
            });
        }
    };
    return (
        <>
            {
                loading && <Loaders />
            }
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSave)}
                    className='flex gap-4 flex-col'
                    action="">

                    <div className="profile flex flex-col gap-2 w-full text-xs">
                        <FormField
                            className="w-full"
                            name="code_start"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-neutral-900">
                                        <FormLabel className="text-sm">Code Start</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="CodeStart"
                                                placeholder="12312332"
                                                className="text-sm"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            className="w-full"
                            name="code_end"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-neutral-900">
                                        <FormLabel className="text-sm">Code End</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="CodeRange"
                                                placeholder="12312332"
                                                className="text-sm"
                                                {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                </>
                            )}
                        />

                        <div className=" flex flex-row justify-between gap-5 ">
                            <Button
                                variant="redOutline"
                                size="sm"
                                className="w-full"
                                type="button"
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
                            >
                                <p className=' font-normal text-xs'>Save</p>
                            </Button>
                        </div>

                    </div>

                </form>
            </Form >
        </>
    )
}
