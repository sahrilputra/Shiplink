import React, { useEffect, useState } from 'react'
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectGroup,
    SelectTrigger,
    SelectValue,
    SelectLabel,
    SelectItemWihtoutIndicator,
} from "@/components/ui/select";
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
export const PARSForms = ({ close, data = null, setIsReload }) => {
    const { toast } = useToast()
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false)
    const [clicked, isClicked] = useState(false);
    const [scac_code, setScacCode] = useState("");

    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            id: 0,
            type: "PARS",
            carrier_code: "",
            code_end: "",
            code_start: "0001",
            action: "add",
        },
        mode: "onChange",
    })

    const toggleClicked = (clickedButtons) => {
        isClicked(clickedButtons);
        if (clickedButtons) {
            form.setValue('type', 'PAPS')
        } else {
            form.setValue('type', 'PARS')
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
                title: `Number has been created`,
                description: response.data.message,
                status: 'success',
            });
            setIsReload(true)
            setLoading(false)
        } catch (error) {
            console.log('Error', error);
            setLoading(false)
            toast({
                title: 'Error!',
                description: `An error occurred while Created the Number.`,
                status: 'error',
            });
        }
    };

    const [courrierList, setCourrierList] = useState([])
    const [queryCurrier, setQueryCurrier] = useState({
        keyword: "",
        page: 0,
        limit: 10,
        index: 0,
    })

    useEffect(() => {
        const fetchCourrier = async () => {
            try {
                const response = await axios.post(
                    `/api/admin/config/courrier/list`,
                    queryCurrier
                )
                const resposneData = response.data
                setCourrierList(resposneData.carrier)
            } catch (error) {
                console.log('Error', error);
                fetchCourrier();
            }
        }
        fetchCourrier();
    }, [queryCurrier]);

    const getCode = async () => {
        try {
            const response = await axios.get(
                `/api/admin/config/SCAC/getData`
            )
            console.log("🚀 ~ fetchData ~ SCAC response:", response)
            const responseData = response.data
            setScacCode(responseData.data.scac_code)
            if (form.watch('type') === "PARS") {
                form.setValue('carrier_code', responseData.data.hcc_code)
            } else {
                form.setValue('carrier_code', responseData.data.scac_code)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getCode();
    }, [form.watch('type')]);


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
                            name="carrier_code"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full">
                                        <FormLabel className="font-bold">{`${form.watch('type') === "PARS" ? "HCC" : "SCAC"}`} Carrier Code</FormLabel>
                                        <FormControl>
                                            <Input
                                                size="new"
                                                disabled={true}
                                                id="carrier_code"
                                                placeholder="AC 12312"
                                                className="px-2"
                                                {...field} />
                                        </FormControl>

                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            name="code_start"
                            className="w-[40%]"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-[40%]">
                                        <FormLabel className="font-bold "  >Code Start #</FormLabel>
                                        <FormControl >
                                            <Input
                                                size="new"
                                                type="Number" id="Codecode_startStart" placeholder="0001" className="px-2"  {...field} />
                                        </FormControl>

                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            name="code_end"
                            className="w-[30%]"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-[30%]">
                                        <FormLabel className="font-bold" >Code End</FormLabel>
                                        <FormControl >
                                            <Input size="new"
                                                type="number" id="codeEnd" placeholder="1000" className="px-2"   {...field} />
                                        </FormControl>
                                        <FormMessage name="code_end" className="text-xs" />
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
