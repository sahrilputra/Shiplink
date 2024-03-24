import React, { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from "@/components/ui/button"
import {
    Form,
} from "@/components/ui/form"
import { EditForms } from './EditForms'
import { useToast } from '@/components/ui/use-toast'
import axios from 'axios'
const formSchema = yup.object().shape({
    package_content: yup.array().of(
        yup.object().shape({
            tracking_id: yup.string(),
            qty: yup.number().typeError('Error'),
            value: yup.number().typeError('Error'),
            desc: yup.string(),
            hs_desc: yup.string(),
            hs_code: yup.string(),
            made_in: yup.string(),
            subtotal: yup.number()
        })
    ),
})
import { Loaders } from '@/components/ui/loaders'

export const Edit = ({ data, cancel, trackingID, reload }) => {
    const { toast } = useToast()
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            package_content: Array.from({ length: data.length }, (_, index) => ({
                tracking_id: trackingID,
                qty: 0,
                value: 0,
                desc: "",
                hs_desc: "",
                hs_code: "",
                made_in: "",
                subtotal: 0,
            }))
        },
        mode: "onChange",
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "package_content",
    });

    console.log("watch", form.watch("package_content"));

    const [loading, setLoading] = useState(false);
    console.log("ERROR", form.formState.errors)
    const handleSave = async (formData) => {
        setLoading(true);
        console.log("DATA SENT : ", formData);

        try {
            const dataToSend = formData.package_content.map((item) => {
                // Konversi qty dan value menjadi number
                const qty = parseInt(item.qty);
                const value = parseInt(item.value);

                // Validasi nilai yang diperlukan
                // if (!item.tracking_id || !qty || !value) {
                //     throw new Error(" qty, and value are required fields.");
                // }
                return {
                    id: "",
                    tracking_id: trackingID,
                    qty: qty,
                    value: value,
                    desc: item.desc,
                    hs_desc: item.hs_desc,
                    hs_code: item.hs_code,
                    made_in: item.made_in,
                    subtotal: item.subtotal
                };
            });

            const response = await axios.post(
                `/api/admin/verification/register_package_content`,
                dataToSend
            );

            console.log('Response Data:', response);
            setLoading(false);
            cancel();
            toast({
                title: `Success Edited Declare Content!`,
                status: 'success',
            });
            reload();
        } catch (error) {
            console.log('Error', error);
            setLoading(false);
            toast({
                title: 'Error Registering New Declare Contents',
                description: error.message || 'An error occurred while Registering Declare Contents.',
                status: 'error',
            });
        }
    };
    return (
        <>
            {loading && <Loaders />}
            <Form {...form}>
                <form
                    className='flex flex-col text-zinc-600'
                    action=""
                    onSubmit={form.handleSubmit(handleSave)}
                >
                    {fields.map((field, index) => (
                        <>
                            <EditForms
                                key={field.id}
                                data={data}
                                form={form}
                                trackingID={data.trackingID}
                                fields={fields}
                                remove={() => remove(index)}
                                index={index}
                            />
                        </>
                    ))}

                    <div className="bg-blue-100 hover:bg-blue-100 w-full">
                        <div className="font-medium p-0 px-5 py-2 w-full" >
                            <div className="w-[100%] flex flex-row justify-between gap-2 items-center">
                                <div className="flex flex-col justify-center items-start">
                                    <Button
                                        variant="softBlue"
                                        size="sm"
                                        type="button"
                                        className=" h-[30px] rounded-sm px-4 py-0"
                                        onClick={() => {
                                            append({
                                                itemID: "",
                                                qty: 1,
                                                value: 0,
                                                desc: "",
                                                hs_desc: "",
                                                hs_code: "",
                                                made_in: "",
                                                subtotal: 0,
                                            })
                                        }}
                                    >
                                        <p className='text-xs'>Add Other Content</p>
                                    </Button>
                                </div>
                                <div className=" flex flex-row justify-center gap-2 items-center">
                                    <Button
                                        variant="softBlue"
                                        type="button"
                                        className=" h-[30px] rounded-sm px-4 py-0"
                                        size="sm"
                                        onClick={cancel}
                                    >
                                        <p className='text-xs font-light'>Cancel</p>
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        type="submit"
                                        className=" h-[30px] rounded-sm px-4 py-0"
                                        size="sm"
                                    >
                                        <p className='text-xs font-light'>Save</p>
                                    </Button>

                                </div>
                            </div>
                        </div>
                    </div>
                </form >
            </Form >
        </>
    )
}
