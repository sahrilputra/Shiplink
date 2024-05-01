/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/tableDashboard'
import { data } from 'autoprefixer'
import { Button } from '@/components/ui/button'
// import { PlusIcons } from '@/components/icons/iconCollection'
import { ExternalLink, Plus } from 'lucide-react'
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
import { CrossBorderPayments } from '../../dashboardMenus/PaymentsV2/type/CrossBorderPayments'
import { useToast } from '@/components/ui/use-toast'
import NextLink from 'next/link'
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
    invoice: yup.array().
        when('broker', {
            is: "Use Shiplink Broker",
            then: (schema) => schema.min(1, "Please upload at least one invoice").required("Please upload an invoice"),
            otherwise: (schema) => schema.notRequired(),
        }),
    pars: yup.string(),
    entry_number: yup.string().
        when('broker', {
            is: "Use Own Broker",
            then: (schema) => schema.required("Please enter an entry number"),
            otherwise: (schema) => schema.notRequired(),
        }),
    warehouse: yup.string().required("Please select a warehouse"),
})

export const TableDashboard =
    ({
        toggleExpanded,
        tracking_id,
        reload,
        arrivalCode,
        content,
        total_price,
    }) => {

        console.log("🚀 ~ TableDashboard ~ total_price:", total_price, tracking_id)
        const { toast } = useToast()
        const form = useForm({
            resolver: yupResolver(formSchema),
            defaultValues: {
                total: total_price || 0,
                broker: "Use Shiplink Broker",
                invoice: [],
                pars: "",
                warehouse: "",
                entry_number: "",
                package_content: Array.from({ length: content.length }, (_, index) => ({
                    tracking_id: "",
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
        })

        console.log("Wathcing all package content values", form.watch('package_content'.valueOf({
            tracking_id: "",
            qty: 0,
            value: 0,
            desc: "",
            hs_desc: "",
            hs_code: "",
            made_in: "",
            subtotal: 0,

        })))

        useEffect(() => {
            content.forEach((item, index) => {
                form.setValue(`package_content[${index}].tracking_id`, item.tracking_id || '');
                form.setValue(`package_content[${index}].qty`, item.qty || 0);
                form.setValue(`package_content[${index}].value`, item.value || 0);
                form.setValue(`package_content[${index}].desc`, item.desc || '');
                form.setValue(`package_content[${index}].hs_desc`, item.hs_desc || '');
                form.setValue(`package_content[${index}].hs_code`, item.hs_code || '');
                form.setValue(`package_content[${index}].made_in`, item.made_in || '');
                form.setValue(`package_content[${index}].subtotal`, item.subtotal || 0);
            });
        }, [content])
        const [isContentEdit, setIsContentEdit] = useState(false)

        console.log("🚀 ~ TableDashboard ~ isContentEdit:", isContentEdit)


        useEffect(() => {
            if (content.length > 0 && content[0].desc !== "" || content[0].hs_desc !== "" || content[0].hs_code !== "") {
                setIsContentEdit(true)
            }
        }, [content])

        useEffect(() => {
            if (content.length > 0 && content[0].desc !== "" || content[0].hs_desc !== "" || content[0].hs_code !== "") {
                null
            } else {
                calculateSubtotal()
            }
        }, [
            form.watch('package_content'.valueOf({
                qty: 0,
                value: 0,
            }))
        ])


        const calculateSubtotal = () => {
            const values = form.getValues('package_content');
            values.forEach((item, index) => {
                const subtotal = item.qty * item.value;
                form.setValue(`package_content[${index}].subtotal`, subtotal);
            });
            calculateTotals();
        };

        console.log("WATHCING TOTAL ", form.watch('total'))

        const calculateTotals = () => {
            const values = form.getValues('package_content');
            let total = 0;
            values.forEach((item) => {
                total += item.subtotal;
            });
            console.log("🚀 ~ calculateTotals ~ total:", total)
            if (total === NaN || total === undefined || total === null || total === 0) {
                form.setValue('total', 0)
            } else {
                form.setValue('total', total);
            }
        };

        useEffect(() => {
            // const watchedTotal = form.watch('total');
            if (isNaN(total_price) || total_price === undefined || total_price === null || total_price === 0) {
                form.setValue('total', 0);
            } else {
                form.setValue('total', total_price);
            }

            console.log("🚀 ~ useEffect ~ watchedTotal", form.watch('total'))
        }, [total_price]);

        const { fields, append, remove } = useFieldArray({
            control: form.control,
            name: "package_content",
        });

        const [selectedBroker, setSelectedBroker] = useState("Use Shiplink Broker");
        const handleSelectBroker = (value) => {
            form.setValue('broker', value)
            setSelectedBroker(value);
        };



        const [openPayments, setOpenPayments] = useState(false);

        const validateForm = () => {
            form.trigger().then((isValid) => {
                if (isValid) {
                    setOpenPayments(true);
                    console.log("Form is valid");
                } else {
                    console.log("Form has errors", form.formState.errors);
                    const errors = form.formState.errors;
                    let errorString = "";
                    Object.keys(errors).forEach((key, index) => {
                        errorString += `${errors[key].message}`;
                        if (index !== Object.keys(errors).length - 1) {
                            errorString += ' And ';
                        }
                    });
                    toast({
                        title: `Errors!`,
                        description: errorString,
                    });

                    console.log("Form String Errors", errorString);
                }
            });
        }


        return (
            <>
                <CrossBorderPayments
                    key={tracking_id}
                    open={openPayments}
                    setOpen={setOpenPayments}
                    trackingId={tracking_id}
                    forms={form}
                    selectedBroker={selectedBroker}
                    reload={reload}
                    toggleExpanded={toggleExpanded}
                />
                <div className="">
                    <Form {...form}>
                        <form>
                            <div className="">
                                <Table className="overflow-visible">
                                    <TableHeader className="bg-sky-50 border ">
                                        <TableHead className="p-0 h-[30px] px-2 py-3 w-[100px] text-myBlue font-bold text-xs">Qty</TableHead>
                                        <TableHead className="p-0 h-[30px] px-2 py-3 w-[100px] text-myBlue font-bold text-xs">Value</TableHead>
                                        <TableHead className="p-0 h-[30px] px-2 py-3 text-myBlue font-bold text-xs">Description</TableHead>
                                        <TableHead className="p-0 h-[30px] px-2 py-3 text-myBlue font-bold text-xs ">HS Description</TableHead>
                                        <TableHead className="p-0 h-[30px] px-2 py-3 text-myBlue font-bold text-xs w-[90px]">
                                            <div className="text-xs flex flex-row items-center gap-2">
                                                HS Code
                                                <NextLink passHref href={'https://uscensus.prod.3ceonline.com/#!%23current-question-pos'}>
                                                    <ExternalLink className='text-[11px] text-myBlue' width={12} height={12} />
                                                </NextLink>
                                            </div>
                                        </TableHead>
                                        <TableHead className="p-0 h-[30px] px-2 py-3 text-myBlue font-bold text-xs w-max text-nowrap text-center">Made in</TableHead>
                                        <TableHead className="p-0 h-[30px] px-2 py-3 text-myBlue font-bold text-xs text-right w-[40px]"></TableHead>
                                    </TableHeader>
                                    <TableBody className="">
                                        {fields.map((field, index) => (
                                            <DeclareForms
                                                disabled={isContentEdit}
                                                data={content}
                                                key={field.id}
                                                index={index}
                                                forms={form}
                                                handleRemoveContent={() => remove(index)}
                                                itemID={field.itemID}
                                            />
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            <div className='body w-full px-[5px] py-1.5 bg-white border border-neutral-200 gap-2.5 flex flex-row justify-between items-center'>
                                <div className="px-[10px] py-1.5 text-blue-900 font-poppins font-semi-bold">
                                    Totals : ${form.watch('total')}
                                </div>
                                <Button
                                    variant="tableBlue"
                                    size="xs"
                                    type="button"
                                    className={`${isContentEdit ? "hidden" : "flex"} border-none flex-row gap-[10px] px-[15px] items-center`}
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
                                selectedBroker === "Use Shiplink Broker" ? (
                                    <>
                                        <div className="use-shiplink-broker">
                                            <div className='body w-full px-[5px] py-2.5 bg-white border border-neutral-200 gap-2.5 flex flex-row justify-between items-center flex-wrap'>
                                                <SelectBroker onSelect={handleSelectBroker} />
                                                <UploadInvoice forms={form} />
                                                <SelectWarehouse forms={form} arrivalCode={arrivalCode} />
                                            </div>
                                            <div className='body w-full px-[5px] py-2.5 bg-white border border-neutral-200 gap-2.5 flex flex-row justify-end items-center'>
                                                <div className="flex flex-row gap-3">
                                                    <Button
                                                        variant="redOutline"
                                                        className="h-[30px] w-[100px] px-4 shadow"
                                                        size="xs"
                                                        onClick={() => {
                                                            toggleExpanded();
                                                            form.reset();
                                                        }}
                                                    >
                                                        <div className="text-red-700 text-xs  font-normal ">Cancel</div>
                                                    </Button>

                                                    <Button
                                                        variant="destructive"
                                                        type="button"
                                                        className="h-[30px] w-[100px] px-4 bg-red-700 shadow "
                                                        size="xs"
                                                        onClick={() => {
                                                            validateForm();
                                                        }}
                                                    >
                                                        <div className="text-white text-xs font-normal">Save</div>
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
                                                <SelectWarehouse forms={form} arrivalCode={arrivalCode} />
                                                <div className="flex flex-row gap-3">
                                                    <Button
                                                        variant="redOutline"
                                                        className="h-[35px] w-[100px] px-4 shadow"
                                                        type="button"
                                                        onClick={() => {
                                                            toggleExpanded();
                                                            form.reset();
                                                        }}
                                                    >
                                                        <div className="text-red-700 text-sm  font-normal ">Cancel</div>
                                                    </Button>

                                                    <Button
                                                        variant="destructive"
                                                        className="h-[35px] w-[100px] px-4 bg-red-700 shadow"
                                                        type="button"
                                                        onClick={() => {
                                                            validateForm();
                                                        }}
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

