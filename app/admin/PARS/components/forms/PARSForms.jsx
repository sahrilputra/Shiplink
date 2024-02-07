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

const formSchema = yup.object().shape({
    Type: yup.string(),
    SCAC: yup.string().required(),
    CodeStart: yup.string().required(),
    CodeRange: yup.number(),
})



export const PARSForms = ({ close, data = null }) => {

    const [openDialog, setOpenDialog] = useState(false)
    const [clicked, isClicked] = useState(false);
    const toggleClicked = (clickedButtons) => {
        isClicked(clickedButtons);
    }
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            Type: "",
            SCAC: "",
            CodeStart: "",
            CodeRange: "",

        },
        mode: "onChange",
    })
    return (
        <>
            <Form {...form}>
                <form
                    className='flex gap-4 flex-col'
                    action="">
                    <div className="">
                        <div className="p-1 rounded-md border w-max border-neutral-200 justify-start items-start gap-2.5 inline-flex ">
                            <button
                                id='savedAddress'
                                className={`font-normal px-2.5 py-[8px]   w-[100px]  justify-center items-center gap-2.5 flex rounded hover:bg-red-100
                            ${clicked ? 'bg-none' : 'bg-red-700 text-white font-semiBold hover:bg-red-800'}`}
                                onClick={() => toggleClicked(false)}
                            >
                                <p className=" text-xs font-['Poppins'] leading-tight">PARS</p>
                            </button>
                            <button
                                id='newAddress'
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
                                            <Input size="sm"
                                             id="SCAC" placeholder="AC 12312" className="px-2" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
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
                                            <Input size="sm"
                                             type="text" id="CodeStart" placeholder="0000001" className="px-2"  {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
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
                                            <Input size="sm"
                                             type="number" id="CodeStart" placeholder="100" className="px-2"   {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                </>
                            )}
                        />

                        <Button
                            variant="destructive"
                            type="button"
                            size="sm"
                            
                            onClick={() => setOpenDialog(true)}
                            className="w-[200px]"
                        >
                            <p className=' font-normal text-xs'>Register</p>
                        </Button>
                    </div>
                </form>
            </Form >
            <NewNumberDialog open={openDialog} setOpen={setOpenDialog} />
        </>
    )
}
