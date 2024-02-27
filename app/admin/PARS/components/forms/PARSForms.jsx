import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
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
import { NewNumberDialog } from '../dialog/NewNumberDialog'
import axios from 'axios'
import { useToast } from '@/components/ui/use-toast'
import { Loaders } from '@/components/ui/loaders'
const formSchema = yup.object().shape({
    Type: yup.string(),
    SCAC: yup.string().required(),
    CodeStart: yup.string().required(),
    CodeRange: yup.string(),
})



export const PARSForms = ({ close, data = null }) => {
    const { toast } = useToast()
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false)
    const [clicked, isClicked] = useState(false);

    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            Type: "PARS",
            SCAC: "",
            CodeStart: "",
            CodeRange: "",

        },
        mode: "onChange",
    })

    const toggleClicked = (clickedButtons) => {
        isClicked(clickedButtons);
        if (clickedButtons) {
            form.setValue('Type', 'PAPS')
        } else {
            form.setValue('Type', 'PARS')
        }
    }

    const handleSave = async (formData) => {
        setLoading(true)
        formData.dataId = 0
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
                    className='flex gap-4 flex-col'
                    onSubmit={form.handleSubmit(handleSave)}
                    action="">
                    <div className="">
                        <div className="p-1 rounded-md border w-max border-neutral-200 justify-start items-start gap-2.5 inline-flex ">
                            <button
                                id='savedAddress'
                                type='button'
                                className={`font-normal px-2.5 py-[8px]   w-[100px]  justify-center items-center gap-2.5 flex rounded hover:bg-red-100
                            ${clicked ? 'bg-none' : 'bg-red-700 text-white font-semiBold hover:bg-red-800'}`}
                                onClick={() => toggleClicked(false)}
                            >
                                <p className=" text-xs font-['Poppins'] leading-tight">PARS</p>
                            </button>
                            <button
                                id='newAddress'
                                type='button'
                                className={`font-normal px-2.5 py-[8px]  w-[100px]  justify-center items-center gap-2.5 flex rounded hover:bg-red-100
                            ${clicked ? 'bg-red-700 text-white font-semiBold hover:bg-red-800' : 'bg-none'}`}
                                onClick={() => toggleClicked(true)}
                            >
                                <p className=" text-xs font-['Poppins'] leading-tight">PAPS</p>
                            </button>
                        </div>
                    </div>

                    <div className="profile flex flex-row gap-4 w-full items-end text-xs justify-end">
                        <FormField
                            className="w-full"
                            name="SCAC"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full">
                                        <FormLabel className="font-bold">SCAC Carrier Code</FormLabel>
                                        <FormControl>
                                            <Input size="new"
                                                id="SCAC" placeholder="AC 12312" className="px-2" {...field} />
                                        </FormControl>

                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            name="CodeStart"
                            className="w-[40%]"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-[40%]">
                                        <FormLabel className="font-bold "  >Code Start #</FormLabel>
                                        <FormControl >
                                            <Input size="new"
                                                type="text" id="CodeStart" placeholder="0000001" className="px-2"  {...field} />
                                        </FormControl>

                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            name="CodeRange"
                            className="w-[30%]"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-[30%]">
                                        <FormLabel className="font-bold" >Code Range</FormLabel>
                                        <FormControl >
                                            <Input size="new"
                                                type="number" id="CodeStart" placeholder="100" className="px-2"   {...field} />
                                        </FormControl>

                                    </FormItem>
                                </>
                            )}
                        />


                        <Button
                            variant="destructive"
                            type="submit"
                            className=" h-[30px] rounded-sm px-6 py-0"
                            size="sm"
                        >
                            <p className='text-xs'>Register</p>
                        </Button>
                    </div>
                </form>
            </Form >
            {/* <NewNumberDialog open={openDialog} setOpen={setOpenDialog} /> */}
        </>
    )
}
