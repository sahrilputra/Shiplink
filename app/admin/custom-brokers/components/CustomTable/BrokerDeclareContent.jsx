'use client'
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/tableDashboard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CheckIcon, ChevronDown, XIcon } from 'lucide-react'
import { PackageDialogDetails } from '../dialog/PackageDialogDetails'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useToast } from '@/components/ui/use-toast'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import NextLink from 'next/link'
import { Loaders } from '@/components/ui/loaders'
import axios from 'axios'
import { useForm } from 'react-hook-form'
const formSchema = yup.object().shape({
    entry_number: yup.string(),
    tracking_id: yup.string(),
})


export const BrokerDeclareContent = ({ data, details, TrackingID, reload, status, image }) => {
    console.log("🚀 ~ BrokerDeclareContent ~ image:", image)
    const { toast } = useToast()
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = React.useState(false);
    console.log("data :", data)
    console.log("Looping data : ", data.map((item) => item.id))
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            entry_number: "",
            tracking_id: TrackingID
        },
        mode: "onChange",
    })

    const [filterInvoice, setVilterInvoice] = useState([]);
    console.log("🚀 ~ ExpandedTable ~ filterInvoice:", filterInvoice)
    useEffect(() => {
        const removeInvImage = () => {
            if (image) {
                const filtered = image.filter(image => isInvoiceImage(image.type));
                setVilterInvoice(filtered);
            }
        };

        removeInvImage();
    }, [image]);

    const isInvoiceImage = (type) => {
        return type.toLowerCase() === "invoices";
    };

    const handleSave = async (formData) => {
        setLoading(true)
        console.log("dikirim", formData)
        try {
            const response = await axios.post(
                `/api/admin/customs_broker/setData`,
                formData
            );
            console.log("🚀 ~ handleSave ~ response:", response)

            if (response.data.status === false) {
                toast({
                    title: `Error ${TrackingID}!`,
                    description: response.data.message,
                    status: 'success',
                });
            } else {
                toast({
                    title: `Succes Added Entry Number For ${TrackingID}!`,
                    description: response.data.message,
                    status: 'success',
                });
            }
            setLoading(false)
            reload();
        } catch (error) {
            console.log('Error', error);
            setLoading(false)
            toast({
                title: 'Error Cannot Change Status!',
                description: 'An error occurred while Assign the Entry Number.',
                status: 'error',
            });
        }
    };
    const [openInv, setOpenInv] = useState(false)



    return (
        <>
            {loading && <Loaders />}
            <PackageDialogDetails open={open} setOpen={setOpen} details={details} />
            <Table >
                <TableHeader className="bg-blue-100 ">
                    <TableHead className="w-[100px] text-myBlue font-bold text-xs p-0 h-8 px-5 py-2 ">Qty</TableHead>
                    <TableHead className="w-[100px] text-myBlue font-bold text-xs p-0 h-8 px-5 py-2 ">Value</TableHead>
                    <TableHead className="text-myBlue font-bold text-xs p-0 h-8 px-5 py-2 ">Description</TableHead>
                    <TableHead className="text-myBlue font-bold text-xs p-0 h-8 px-5 py-2  ">HS Description</TableHead>
                    <TableHead className="w-[200px] text-myBlue font-bold text-xs p-0 h-8 px-5 py-2  ">HS Code</TableHead>
                    <TableHead className="w-[100px] text-myBlue font-bold text-xs p-0 h-8 px-5 py-2  ">Made in</TableHead>
                </TableHeader>

                <TableBody>
                    {
                        data.map((item, index) => (
                            <TableRow className="text-xs bg-white" key={index}>
                                <TableCell className="font-medium text-xs p-0 h-7 px-5 py-2">
                                    <p>{item.qty ? item.qty : "-"}</p>
                                </TableCell>
                                <TableCell className="font-medium text-xs p-0 h-7 px-5 py-2">
                                    <p>${item.value ? item.value : "-"}</p>
                                </TableCell>
                                <TableCell className="font-medium text-xs p-0 h-7 px-5 py-2">
                                    <p>{item.desc ? item.desc : "-"}</p>
                                </TableCell>
                                <TableCell className="font-medium text-xs p-0 h-7 px-5 py-2">
                                    <p>{item.hs_desc ? item.hs_desc : "-"}</p>
                                </TableCell>
                                <TableCell className="font-medium text-xs p-0 h-7 px-5 py-2">
                                    <p>{item.hs_code ? item.hs_code : "-"}</p>
                                </TableCell>
                                <TableCell className="font-medium text-xs p-0 h-7 px-5 py-2">
                                    <p>{item.made_in ? item.made_in : "-"}</p>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <Table>
                <TableBody>
                    <TableRow className="text-xs h-4 w-full bg-white">
                        <TableCell className="font-medium h-8 p-0 py-2 px-5 ">
                            <div className="flex justify-between w-full">
                                <div className="flex flex-row gap-4">
                                    <p className=' text-sm font-bold text-myBlue'>Totals : </p>
                                    <p className=' text-sm font-semibold'>${details?.total_price || "-"} </p>

                                </div>
                                <div className="flex flex-row gap-4 justify-between">
                                    <div className="flex flex-row gap-2">
                                        <p className=' text-sm font-bold text-myBlue'>PARS : </p>
                                        <p className=' text-sm font-semibold'>{details?.parspaps_number || "-"}</p>
                                    </div>
                                    <div className="flex flex-row gap-2">
                                        <p className=' text-sm font-bold text-myBlue'>Entry Number : </p>
                                        <p className=' text-sm font-semibold'>{details?.entry_number || "-"}</p>
                                    </div>
                                </div>
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow className="text-xs">
                        <TableCell className="font-medium flex flex-row justify-between w-full items-center bg-sky-50 p-0 py-2 px-5 gap-5">
                            <div className="w-[50%] flex flex-row gap-2 justify-start">
                                <Button
                                    variant="secondary"
                                    size="xs"
                                    onClick={() => setOpen(true)}
                                >
                                    <p className='text-xs'>Package Details</p>
                                </Button>
                                <div className="">
                                    <DropdownMenu open={openInv} onOpenChange={setOpenInv}>
                                        <DropdownMenuTrigger className="p-0 px-0 h-8 text-xs focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 border-zinc-300 w-[250px] pr-2 flex flex-row">
                                            <p className='bg-blue-900 rounded-tl-sm rounded-bl-sm text-xs text-white my-auto h-full flex items-center px-3'>Invoice</p>
                                            <div className='text-xs flex h-full border pl-3 w-[250px] bg-white  rounded-tr rounded-br focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 items-center justify-between px-2  border-slate-300 ring-offset-white text-slate-500" ' >
                                                {filterInvoice.length <= 0 ? "No Invoice" : "View Invoice"}
                                                <ChevronDown width={15} height={15} className={`${openInv ? "transition-transform rotate-180" : ""} transition-transform`} />
                                            </div>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-[250px]">
                                            {
                                                filterInvoice.length > 0 ? (
                                                    filterInvoice.map((item, index) => (
                                                        <NextLink key={index} href={`https://sla.webelectron.com/api/Package/getimages?fullName=${item.images}`} passHref target='_blank' rel='noopener noreferrer'>
                                                            <DropdownMenuItem className="text-xs text-myBlue" value="light">View invoice {index + 1}</DropdownMenuItem>
                                                        </NextLink>
                                                    ))
                                                ) : (
                                                    <DropdownMenuItem
                                                        disabled={true}
                                                        className="text-xs text-myBlue text-center">
                                                        No Invoice
                                                    </DropdownMenuItem>
                                                )
                                            }
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                            <div className={`${status === "Cleared Custom" ? "hidden" : "flex"} w-[50%] flex flex-row gap-2 justify-end`}>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(handleSave)} className="w-[50%] flex flex-row gap-2 justify-end">
                                        <FormField
                                            control={form.control}
                                            name="entry_number"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <div className="flex flex-row gap-[-3px] w-max border border-zinc-300 rounded-md h-8 items-center ">
                                                            <p className='bg-blue-900 rounded-tl-sm rounded-bl-sm text-xs text-white my-auto h-full flex items-center px-3'>Entry Number</p>
                                                            <Input
                                                                type="text"
                                                                className="h-full border-none pl-3 w-[150px] rounded-tl-none rounded-bl-none rounded-tr-md rounded-br-md focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                                                                {...field}
                                                            />
                                                        </div>
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <div className="flex flex-row justify-end items-ends gap-4  ">
                                            <Button
                                                variant="secondary"
                                                className="px-3"
                                                size="xs"
                                                disabled={form.watch('entry_number') === ""}
                                            >
                                                <p className='text-xs'>Save</p>
                                            </Button>

                                        </div>
                                    </form>
                                </Form>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
    )
}
