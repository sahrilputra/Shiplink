'use client'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { TrashIcon } from 'lucide-react'
import { XIcon } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import InputMask from 'react-input-mask';
import { useForm, useFieldArray } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/tableDashboard"
import { useToast } from '@/components/ui/use-toast'
import {
    Form,
} from "@/components/ui/form"
import { Loaders } from '@/components/ui/loaders'
import axios from 'axios'
const formSchema = yup.object().shape({
    tracking_id: yup.string(),
    qty: yup.number(),
    value: yup.number(),
    description: yup.string(),
    hsDescription: yup.string(),
    hsCode: yup.string(),
    madeIn: yup.string(),
    subtotal: yup.number(),
})
export const EditForms = ({ counter, data, edit, cancel, trackingID, reloadData }) => {
    const { toast } = useToast()
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            package_content: [
                {
                    tracking_id: trackingID,
                    qty: 0,
                    value: 0,
                    desc: "",
                    hs_desc: "",
                    hs_code: "",
                    made_in: "",
                    subtotal: 0,
                }
            ]
        },
        mode: "onChange",
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "package_content",
    });
    console.log("Data Length : ", data.length)

    const handlingDataValue = () => {
        data.map((item, index) => {
            console.log("Looping Items ", item)
            form.setValue(`package_content[${index}].tracking_id`, trackingID)
            form.setValue(`package_content[${index}].qty`, parseInt(item.qty))
            form.setValue(`package_content[${index}].value`, parseInt(item.value))
            form.setValue(`package_content[${index}].desc`, item.desc)
            form.setValue(`package_content[${index}].hs_desc`, item.hs_desc)
            form.setValue(`package_content[${index}].hs_code`, item.hs_code)
            form.setValue(`package_content[${index}].made_in`, item.made_in)
            const subtotal = parseInt(item.qty) * parseInt(item.value);
            form.setValue(`package_content[${index}].subtotal`, subtotal);
        })
    }

    const [subtotal, setSubTotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    // Fungsi untuk menghitung subtotal
    const calculateSubTotal = () => {
        let subtotalValue = 0;
        form.getValues().package_content.forEach((item, index) => {
            const itemSubTotal = Number(item.qty) * Number(item.value);
            subtotalValue += Number(itemSubTotal);
            form.setValue(`package_content[${index}].subtotal`, Number(subtotalValue));
        });
    };
    // Fungsi untuk menghitung total
    const calculateTotal = () => {
        setTotal(subtotal);
    };

    useEffect(() => {
        calculateSubTotal();
    }, [form.getValues().package_content]);

    useEffect(() => {
        calculateTotal();
    }, [subtotal]);

    useEffect(() => {
        handlingDataValue()
        if (fields.length !== data.length) {
            // Hapus semua entri data yang ada dalam formulir
            while (fields.length > 0) {
                remove(0);
            }
            // Tambahkan entri data baru berdasarkan panjang parameter data
            data.forEach((item) => {
                append({
                    tracking_id: trackingID,
                    qty: parseInt(item.qty),
                    value: parseInt(item.value),
                    desc: item.desc,
                    hs_desc: item.hs_desc,
                    hs_code: item.hs_code,
                    made_in: item.made_in,
                    subtotal: parseInt(item.qty) * parseInt(item.value)
                });
            });
        }
    }, [data])

    const handleSave = async (formData) => {
        setLoading(true);
        console.log("DATA SENT : ", formData);

        try {
            const dataToSend = formData.package_content.map((item) => {
                // Konversi qty dan value menjadi number
                const qty = parseInt(item.qty);
                const value = parseInt(item.value);

                // Validasi nilai yang diperlukan
                if (!item.tracking_id || !qty || !value) {
                    throw new Error("Tracking ID, qty, and value are required fields.");
                }
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

            console.log('Response:', response);
            setLoading(false);
            cancel();
            toast({
                title: `All Declare Contents Registered successfully!`,
                status: 'success',
            });
            reloadData();
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

    const handleAddItem = () => {
        // Menambahkan item baru dengan nilai awal qty, value, dan subtotal yang merupakan angka
        append({
            tracking_id: trackingID,
            qty: 0,
            value: 0,
            desc: "",
            hs_desc: "",
            hs_code: "",
            made_in: "",
            subtotal: 0,
        });
    };

    console.log("SUBTOTALL : ", subtotal)

    return (
        <>
            {loading && <Loaders />}
            <Form {...form}>
                <form
                    className='flex flex-col text-zinc-600'
                    action=""
                    onSubmit={form.handleSubmit(handleSave)}
                >
                    {
                        fields.map((item, index) => (
                            <>
                                <div
                                    className=" flex flex-row gap-1 justify-start border-y-2 border-zinc-600/20 p-2">
                                    <div className="flex flex-col relative w-[80px] h-10 justify-center items-center">
                                        <p className=' absolute top-0 left-1 text-myBlue text-[11px] h-[20px] p-0.5'>Qty</p>
                                        <div className="h-10 w-full flex justify-start items-end">
                                            <>
                                                <FormField
                                                    className="w-full flex flex-row justify-center items-end"
                                                    name={`package_content[${index}].qty`}
                                                    control={form.control}
                                                    render={({ field }) => (
                                                        <>
                                                            <FormItem className="w-full text-sm">
                                                                <FormControl>
                                                                    <Input id="width"
                                                                        className="pt-5 font-light pl-2 h-10 outline-none focus-visible:ring-0  text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                                        type="number"
                                                                        placeholder="0" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        </>
                                                    )}
                                                />
                                            </>
                                        </div>
                                    </div>
                                    <div className="flex flex-col relative w-[150px] h-10 justify-center items-center">
                                        <p className=' absolute top-0 left-1 text-myBlue text-[11px] h-[20px] p-0.5'>Value</p>
                                        <div className="h-10 w-full flex justify-start items-end">
                                            <>
                                                <FormField
                                                    className="w-full flex flex-row justify-center items-end"
                                                    name={`package_content[${index}].value`}
                                                    control={form.control}
                                                    render={({ field }) => (
                                                        <>
                                                            <FormItem className="w-full text-sm">
                                                                <FormControl>
                                                                    <Input id="width"
                                                                        className="pt-5 font-light pl-2 h-10 outline-none focus-visible:ring-0  text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                                        type="number"
                                                                        placeholder="0" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        </>
                                                    )}
                                                />
                                            </>

                                        </div>
                                    </div>
                                    <div className="flex flex-col relative w-[50%] h-10 justify-center items-center">
                                        <p className=' absolute top-0 left-1 text-myBlue text-[11px] h-[20px] p-0.5'>User Description</p>
                                        <div className="h-10 w-full flex justify-start items-end">
                                            <>
                                                <FormField
                                                    className="w-full flex flex-row justify-center items-end"
                                                    name={`package_content[${index}].desc`}
                                                    control={form.control}
                                                    render={({ field }) => (
                                                        <>
                                                            <FormItem className="w-full text-sm">
                                                                <FormControl>
                                                                    <Input id="width"
                                                                        className="pt-5 font-light pl-2 h-10 outline-none focus-visible:ring-0  text-xs"
                                                                        type="text"
                                                                        placeholder="HS Description" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        </>
                                                    )}
                                                />
                                            </>
                                        </div>
                                    </div>

                                    <div className="flex flex-col relative  w-[50%] h-10 justify-center items-center">
                                        <p className=' absolute top-0 left-1 text-myBlue text-[11px] h-[20px] p-0.5'>HS Description</p>
                                        <div className="h-10 w-full flex justify-start items-end">
                                            <>
                                                <FormField
                                                    className="w-full flex flex-row justify-center items-end"
                                                    name={`package_content[${index}].hs_desc`}
                                                    control={form.control}
                                                    render={({ field }) => (
                                                        <>
                                                            <FormItem className="w-full text-sm">
                                                                <FormControl>
                                                                    <Input id="width"
                                                                        className="pt-5 font-light pl-2 h-10 outline-none focus-visible:ring-0  text-xs"
                                                                        type="text"
                                                                        placeholder="Description" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        </>
                                                    )}
                                                />
                                            </>
                                        </div>
                                    </div>
                                    <div className="flex flex-col relative w-[200px] h-10 justify-center items-center">
                                        <p className=' absolute top-0 left-1 text-myBlue text-[11px] h-[20px] p-0.5'>HS Code</p>
                                        <div className="h-10 w-full flex justify-start items-end">
                                            <FormField
                                                className="w-full flex flex-row justify-center items-end"
                                                name={`package_content[${index}].hs_code`}
                                                control={form.control}
                                                render={({ field }) => (
                                                    <>
                                                        <FormItem className="w-full text-xs">
                                                            <FormControl>
                                                                <InputMask
                                                                    mask="9999.99.9999" // Format yang diinginkan
                                                                    maskPlaceholder="0000.00.0000"
                                                                    className="pt-5 font-light pl-2 h-10 outline-none focus-visible:ring-0  text-xs"
                                                                    {...field}
                                                                >
                                                                    {(inputProps) => (
                                                                        <Input
                                                                            className="pt-5 font-light pl-2 h-10 outline-none focus-visible:ring-0  text-xs"
                                                                            id="hs_code"
                                                                            type="text"
                                                                            placeholder="0000.00.0000"
                                                                            {...inputProps}
                                                                        />
                                                                    )}
                                                                </InputMask>

                                                            </FormControl>
                                                        </FormItem>
                                                    </>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col relative w-[100px] h-10 justify-center items-center">
                                        <p className=' absolute top-0 left-1 text-myBlue text-[11px] h-[20px] p-0.5'>Made In</p>
                                        <div className="h-10 w-full flex justify-start items-end">
                                            <>
                                                <FormField
                                                    className="w-full flex flex-row justify-center items-end"
                                                    name={`package_content[${index}].made_in`}
                                                    control={form.control}
                                                    render={({ field }) => (
                                                        <>
                                                            <FormItem className="w-full text-sm pt-3">
                                                                <FormControl>
                                                                    <Input
                                                                        max="3"
                                                                        className="pt-5 font-light pl-2 h-10 outline-none focus-visible:ring-0 uppercase text-xs"
                                                                        id="made_in" placeholder="CAN" {...field} />
                                                                </FormControl>
                                                            </FormItem>
                                                        </>
                                                    )}
                                                />
                                            </>
                                        </div>
                                    </div>
                                    <div className="flex flex-col relative h-10 justify-end items-end">
                                        {
                                            index > 0 ? (
                                                <div className="flex flex-row justify-between gap-2 w-full">
                                                    <Button
                                                        variant="softBlue"
                                                        size="icon"
                                                        type="button"
                                                        className='w-[30px] h-[30px] rounded '
                                                        onClick={() => remove(index)}
                                                    >
                                                        <XIcon width={20} height={20} />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <></>
                                            )
                                        }
                                    </div>
                                </div>
                            </>
                        ))
                    }
                    <div className="bg-blue-100 hover:bg-blue-100 w-full">
                        <div className="font-medium p-0 px-5 py-2 w-full" >
                            <div className="w-[100%] flex flex-row justify-between gap-2 items-center">
                                <div className="flex flex-col justify-center items-start">
                                    <Button
                                        variant="softBlue"
                                        size="sm"
                                        type="button"
                                        className=" h-[30px] rounded-sm px-4 py-0"
                                        onClick={handleAddItem}
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
                </form>
            </Form>
        </>
    )
}
