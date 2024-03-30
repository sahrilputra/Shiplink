import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import axios from 'axios'
import { ArrowDownIcon } from '@/components/icons/iconCollection'


export const SelectBroker = ({ onSelect }) => {

    const handleChange = (value) => {
        onSelect(value);
    }
    return (
        <>
            <div className=" h-9 rounded-lg justify-start items-start inline-flex">
                <Select
                    className="flex flex-row gap-0 items-center"
                    onValueChange={(value) => handleChange(value)}
                    defaultValue='Use Shiplink Broker'
                >
                    <div className="w-[100px] h-9 px-1 py-2 bg-green-500 rounded-tl rounded-bl justify-center gap-1.5 flex items-center">
                        <div className="text-white text-xs leading-tight">Select Broker</div>
                    </div>
                    <SelectTrigger
                        className="w-[150px] h-9 rounded-tl-none rounded-bl-none rounded-tr rounded-br text-xs bg-stone-50 text-zinc-400"
                    >
                        <SelectValue placeholder="Choose Broker" />
                    </SelectTrigger>
                    <SelectContent className="text-xs">
                        <SelectItem
                            className="text-xs"
                            value="Use Shiplink Broker"
                            onSelect={() => handleChange("Use Shiplink Broker")}
                        >
                            Use Shiplink Broker
                        </SelectItem>
                        <SelectItem
                            value="Use Own Broker"
                            className="text-xs"
                            onSelect={() => handleChange("Use Own Broker")}
                        >
                            Use Own Broker
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div >

        </>
    )
}

export const UploadInvoice = ({ forms }) => {
    console.log("🚀 ~ UploadInvoice ~ forms:", forms.watch('invoice'))
    return (
        <>
            <div className=" h-9 rounded-lg justify-start items-start inline-flex">
                <FormField
                    className="w-full flex flex-row justify-center items-end"
                    name={'invoice'}
                    required="Invoice is required"
                    control={forms.control}
                    render={({ field, formState }) => (
                        <>
                            <FormItem className="w-full flex flex-row items-center text-sm">
                                <FormControl>
                                    <>
                                        <div className=" h-9 rounded-lg justify-start items-start inline-flex">
                                            <div className="w-[100px] h-9 px-1 py-2 bg-zinc-400 rounded-tl rounded-bl justify-center gap-1.5 flex items-center">
                                                <div className="text-white text-xs leading-tight">Invoice</div>
                                            </div>
                                            <Input
                                                className="w-[150px] file:hidden  h-9 rounded-tl-none rounded-bl-none rounded-tr rounded-br text-xs bg-stone-50 text-zinc-400 cursor-pointer hover:bg-stone-50/20"
                                                type="file"
                                                id="myFile"
                                                required
                                                multiple
                                                accept=".pdf, .doc, .docx"
                                                placeholder="My File"
                                                onChange={(event) => {
                                                    const files = event.target.files;
                                                    if (files) {
                                                        const invoice = [];
                                                        let processedFiles = 0;
                                                        const readAndProcessFile = (file) => {
                                                            const reader = new FileReader();
                                                            reader.onload = (e) => {
                                                                // Mengambil string base64 dari data yang diberikan
                                                                const base64String = e.target.result;
                                                                const base64WithoutHeader = base64String.replace(/^data:application\/pdf;base64,/, '');
                                                                invoice.push(base64WithoutHeader);
                                                                processedFiles++;
                                                                if (processedFiles === files.length) {
                                                                    forms.setValue("invoice", invoice);
                                                                } else {
                                                                    readAndProcessFile(files[processedFiles]);
                                                                }
                                                            };
                                                            reader.readAsDataURL(file);
                                                        };
                                                        readAndProcessFile(files[processedFiles]);
                                                    }
                                                }}
                                            />
                                        </div>
                                    </>
                                </FormControl>
                            </FormItem>
                        </>
                    )}
                />

            </div >
        </>
    )
}

export const SelectWarehouse = ({ forms, arrivalCode }) => {

    const [warehouse, setWarehouse] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    `/api/admin/warehouse/list`,
                    {
                        keyword: '',
                        page: 0,
                        limit: 0,
                        index: 0,
                    }
                );
                console.log("Warehouse :", response.data);
                const filteredWarehouse = response.data.warehouse.filter(item => item.country_code !== arrivalCode);
                setWarehouse(filteredWarehouse);
            } catch (error) {
                console.log(error);
                fetchData();
            }
        };
        fetchData();
    }, [arrivalCode]);
    return (
        <>
            <div className=" h-9 rounded-lg justify-start items-start inline-flex">
                <FormField
                    className="w-full flex flex-row justify-center items-end"
                    name={'warehouse'}
                    control={forms.control}
                    render={({ field }) => (
                        <>
                            <FormItem className="w-full text-sm">
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl >
                                        <>
                                            <div className="flex flex-row gap-0 items-center">
                                                <div className="w-[100px] h-9 px-1 py-2 bg-blue-900 rounded-tl rounded-bl justify-center gap-1.5 flex items-center">
                                                    <div className="text-white text-xs leading-tight">Warehouse</div>
                                                </div>
                                                <SelectTrigger className="w-[150px] h-9 rounded-tl-none rounded-bl-none rounded-tr rounded-br text-xs bg-stone-50 text-zinc-400">
                                                    <SelectValue
                                                        placeholder="Warehouse..."
                                                    />
                                                </SelectTrigger>
                                            </div>
                                        </>
                                    </FormControl>
                                    <SelectContent>
                                        {
                                            warehouse?.map((item, index) => (
                                                <SelectItem
                                                    className='text-xs'
                                                    key={index}
                                                    value={`${item.warehouse_id}`}
                                                    onSelect={() =>
                                                        forms.setValue("warehouse", item.warehouse_id)
                                                    }
                                                >
                                                    WR {item.warehouse_name}, {item.country_code}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                            </FormItem>

                        </>
                    )}
                />


            </div >

        </>
    )
}

export const PARSInput = ({ forms }) => {
    return (
        <>
            <div className=" h-9 rounded-lg justify-start items-start inline-flex">
                <FormField
                    className="w-full flex flex-row justify-center items-end"
                    name={'pars'}
                    control={forms.control}
                    render={({ field }) => (
                        <>
                            <FormItem className="w-full flex flex-row items-center text-sm">
                                <FormControl>
                                    <>
                                        <div className=" h-9 rounded-lg justify-start items-start inline-flex">
                                            <div className="w-[100px] h-9 px-1 py-2 bg-neutral-900 rounded-tl rounded-bl justify-center gap-1.5 flex items-center">
                                                <div className="text-white text-xs leading-tight">PARS/PAPS</div>
                                            </div>
                                            <Input
                                                className="w-[100px] h-9 rounded-tl-none rounded-bl-none rounded-tr rounded-br text-xs bg-stone-50 text-zinc-400"
                                                type="number"
                                                placeholder="12313131231"
                                                {...field}
                                            />
                                        </div >
                                    </>
                                </FormControl>
                            </FormItem>
                        </>
                    )}
                />
            </div>

        </>
    )
}

export const EntryNumber = ({ forms }) => {
    return (
        <>
            <div className=" h-9 rounded-lg justify-start items-start inline-flex">
                <FormField
                    className="w-full flex flex-row justify-center items-end"
                    name={'entry_number'}
                    control={forms.control}
                    render={({ field }) => (
                        <>
                            <FormItem className="w-full flex flex-row items-center text-sm">
                                <FormControl>
                                    <>
                                        <div className=" h-9 rounded-lg justify-start items-start inline-flex">
                                            <div className="w-[100px] h-9 px-1 py-2 bg-blue-900 rounded-tl rounded-bl justify-center gap-1.5 flex items-center">
                                                <div className="text-white text-xs leading-tight">Entry Number</div>
                                            </div>
                                            <Input
                                                className="w-[150px] h-9 rounded-tl-none rounded-bl-none rounded-tr rounded-br text-xs bg-stone-50 text-zinc-400"
                                                type="number"
                                                placeholder="12313131231"
                                                {...field}
                                            />
                                        </div >
                                    </>
                                </FormControl>
                            </FormItem>
                        </>
                    )}
                />
            </div>
        </>
    )
}