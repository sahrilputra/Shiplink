import { React, useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/tableDashboard'
import { data } from 'autoprefixer'
import { Button } from '@/components/ui/button'
// import { PlusIcons } from '@/components/icons/iconCollection'
import { Plus } from 'lucide-react'
import { SelectBroker, SelectWarehouse, PARSInput, UploadInvoice, EntryNumber } from '../../ActionGroup/Action'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm, useFieldArray } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { DeclareForms } from '../DeclareForms'
const formSchema = yup.object().shape({
    package_content: yup.array().of(
        yup.object().shape({
            id: yup.string(),
            qty: yup.number().typeError('Error'),
            value: yup.number().typeError('Error'),
            desc: yup.string(),
            hs_desc: yup.string(),
            hs_code: yup.string(),
            made_in: yup.string(),
            subtotal: yup.number()
        })
    ),
    total: yup.number(),
    broker: yup.string(),
    invoice: yup.string(),
    pars: yup.string(),
    entry_number: yup.string(),
    warehouse: yup.string(),
})

export const TableDashboard = ({ header, body, columns }) => {
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            total: 0,
            broker: "",
            invoice: "",
            pars: "",
            warehouse: "",
            entry_number: "",
            package_content: [
                {
                    itemID: "",
                    qty: 1,
                    value: 0,
                    desc: "",
                    hs_desc: "",
                    hs_code: "",
                    made_in: "",
                    subtotal: 0,
                }
            ],
        },
        mode: "onChange",
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "package_content",
    });

    const [selectedBroker, setSelectedBroker] = useState(null);
    const handleSelectBroker = (value) => {
        console.log("Selected Broker: ", value);
        setSelectedBroker(value);
    };
    const [tableBody, setTableBody] = useState([{ id: 1 }])
    const addTableBody = () => {
        const newId = tableBody.length + 1;
        setTableBody([...tableBody, { id: newId }])
    }
    const deleteTableBody = (id) => {
        // Filter out the TableBody with the given id
        const updatedBodies = tableBody.filter((body) => body.id !== id);
        setTableBody(updatedBodies);
    };

    // useEffect(() => {
    //     const totalsItem = () => {
    //         let total = 0;
    //         fields.map((field) =>
    //             total += field.subtotal
    //         )
    //         form.setValue('total', total)
    //     }
    //     totalsItem();
    // }, [fields])


    return (
        <>
            <div className="">
                <Form {...form}>
                    <form
                    >
                        <Table>
                            <TableHeader className="bg-sky-50 border ">
                                <TableHead className="p-0 h-8 px-5 py-3 w-[100px] text-myBlue font-bold text-xs">Qty</TableHead>
                                <TableHead className="p-0 h-8 px-5 py-3 w-[100px] text-myBlue font-bold text-xs">Value</TableHead>
                                <TableHead className="p-0 h-8 px-5 py-3 text-myBlue font-bold text-xs">Description</TableHead>
                                <TableHead className="p-0 h-8 px-5 py-3 text-myBlue font-bold text-xs ">HS Description</TableHead>
                                <TableHead className="p-0 h-8 px-5 py-3 text-myBlue font-bold text-xs w-[140px]">HS Code</TableHead>
                                <TableHead className="p-0 h-8 px-5 py-3 text-myBlue font-bold text-xs w-[100px] ">Made in</TableHead>
                                <TableHead className="p-0 h-8 px-5 py-3 text-myBlue font-bold text-xs text-right w-[40px]"></TableHead>
                            </TableHeader>
                            <TableBody>
                                {fields.map((field, index) => (
                                    <DeclareForms
                                        key={field.id}
                                        index={index}
                                        forms={form}
                                        handleRemoveContent={() => remove(index)}
                                        itemID={field.itemID}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                        <div className='body w-full px-[5px] py-1.5 bg-white border border-neutral-200 gap-2.5 flex flex-row justify-between items-center'>
                            <div className="px-[10px] py-1.5 text-blue-900 font-poppins font-semi-bold">
                                Totals : ${form.watch('total')}
                            </div>
                            <Button
                                variant="tableBlue"
                                size="xs"
                                type="button"
                                className="border-none flex flex-row gap-[10px] px-[15px] items-center"
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
                                <Plus width={13} height={13} className='text-myBlue font-bold' />
                                <div
                                    className="text-blue-800 text-xs font-normal"
                                >
                                    Add Other Content
                                </div>
                            </Button>
                        </div>


                        {
                            selectedBroker === "Shiplink Broker" ? (
                                <>
                                    <div className="use-shiplink-broker">
                                        <div className='body w-full px-[5px] py-2.5 bg-white border border-neutral-200 gap-2.5 flex flex-row justify-between items-center flex-wrap'>
                                            <SelectBroker onSelect={handleSelectBroker} />
                                            <UploadInvoice forms={form} />
                                            <SelectWarehouse forms={form} />
                                        </div>
                                        <div className='body w-full px-[5px] py-2.5 bg-white border border-neutral-200 gap-2.5 flex flex-row justify-end items-center'>
                                            <div className="flex flex-row gap-3">
                                                <Button
                                                    variant="redOutline"
                                                    className="h-[35px] w-[100px] px-4 shadow"
                                                >
                                                    <div className="text-red-700 text-sm  font-normal ">Cancel</div>
                                                </Button>

                                                <Button
                                                    variant="destructive"
                                                    className="h-[35px] w-[100px] px-4 bg-red-700 shadow "
                                                >
                                                    <div className="text-white text-sm font-normal">Save</div>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="use-own-broker">
                                        <div className='body w-full px-[5px] py-2.5 bg-white border border-neutral-200 gap-2.5 flex flex-row justify-between items-center flex-wrap'>
                                            <SelectBroker onSelect={handleSelectBroker} />
                                            <UploadInvoice forms={form} />
                                            <PARSInput forms={form} />
                                            <EntryNumber forms={form} />
                                        </div>
                                        <div className='body w-full px-[5px] py-2.5 bg-white border border-neutral-200 gap-2.5 flex flex-row justify-between items-center'>
                                            <SelectWarehouse forms={form} />
                                            <div className="flex flex-row gap-3">
                                                <Button
                                                    variant="redOutline"
                                                    className="h-[35px] w-[100px] px-4 shadow"
                                                >
                                                    <div className="text-red-700 text-sm  font-normal ">Cancel</div>
                                                </Button>

                                                <Button
                                                    variant="destructive"
                                                    className="h-[35px] w-[100px] px-4 bg-red-700 shadow "
                                                >
                                                    <div className="text-white text-sm font-normal">Save</div>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        <div className='body w-full px-[5px] py-2.5 bg-whit gap-2.5 flex flex-row justify-between items-center'>
                            <div className="text-zinc-500 text-xs font-normal font-['Poppins']">Select your Broker option. If using ShipLinks Brokerage, please upload the purchase invoice. If using your own Broker, a PARS/PAPS number will be generated when you Save this form. Then register the Entry Number provided by your broker to clear this package for Transport.</div>
                        </div>
                    </ form>
                </Form >
            </div >


        </>
    )

}

