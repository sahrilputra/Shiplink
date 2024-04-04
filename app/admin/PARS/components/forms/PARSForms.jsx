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
                        {/* <div className="">
                        <FormField
                                className=" text-sm space-y-0 w-[100%]"
                                name="carrier_code"
                                control={form.control}
                                render={({ field, formState }) => (
                                    <>
                                        {console.log("field.value : ", field)}
                                        <FormItem className="space-y-1.5  w-[30%]">
                                            <FormLabel className="font-bold">Select Carrier</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                open={isCarrierOpen}
                                                onOpenChange={setCarrierOpen}
                                                required
                                            >
                                                <FormControl className="space-y-0">
                                                    <SelectTrigger
                                                        className={`w-[100%] text-xs h-[30px] rounded-sm px-2 py-0 ${formState.errors.carrier_code && "border-red-500 focus:ring-red-700 text-red-800"}`}>
                                                        <p>{field.value}</p>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectGroup className='text-xs '>
                                                        {carrierList.map((item, index) => (
                                                            <SelectItemWihtoutIndicator
                                                                className='text-xs'
                                                                key={index}
                                                                value={item.carrier_name}
                                                                onValueChange={() => {
                                                                    forms.setValue = ("carrier_code", item.carrier_name)
                                                                    setSelectedCarrier(item.carrier_name)
                                                                }}
                                                                onSelect={() => {
                                                                    setCarrierOpen(false);
                                                                    forms.setValue = ("carrier_code", item.carrier_name)
                                                                    setSelectedCarrier(item.carrier_name)
                                                                }}
                                                            >
                                                                {item.carrier_name}
                                                            </SelectItemWihtoutIndicator>
                                                        ))
                                                        }
                                                    </SelectGroup>
                                                    <SelectGroup>
                                                        <SelectLabel className="px-0.5 border-b text-xs space-y-1 font-bolds ">Other</SelectLabel>
                                                        <div className=" pt-1 flex flex-row gap-1">
                                                            <Input
                                                                autoComplete="off"
                                                                id="carrier_code"
                                                                className="text-xs h-[30px] w-[120px] rounded-sm px-2 py-0 "
                                                                placeholder="Input Carrier"
                                                                value={selectedCarrier || ""}
                                                                onValueChange={(e) => {
                                                                    setSelectedCarrier(e.target.value);
                                                                    setCarrierOpen(true);
                                                                    forms.setValue = ("carrier_code", e.target.value)
                                                                }}
                                                                onKeyPress={(e) => {
                                                                    if (e.key === "Enter") {
                                                                        setCarrierOpen(false)
                                                                        handleSelectedCarrier({ target: { value: e.target.value } });
                                                                        e.preventDefault(); // Prevent form submission
                                                                    }
                                                                }}
                                                                {...field}
                                                            />
                                                        </div>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    </>
                                )}
                            />
                        </div> */}
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
