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
                            value="Shiplink Broker"
                            onSelect={() => handleChange("Shiplink Broker")}
                        >
                            Use Shiplink Broker
                        </SelectItem>
                        <SelectItem
                            value="Own Broker"
                            className="text-xs"
                            onSelect={() => handleChange("Own Broker")}
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
    return (
        <>
            <div className=" h-9 rounded-lg justify-start items-start inline-flex">
                <FormField
                    className="w-full flex flex-row justify-center items-end"
                    name={'invoice'}
                    control={forms.control}
                    render={({ field }) => (
                        <>
                            <FormItem className="w-full flex flex-row items-center text-sm">
                                <FormControl>
                                    <>
                                        <div className=" h-9 rounded-lg justify-start items-start inline-flex">
                                            <div className="w-[100px] h-9 px-1 py-2 bg-zinc-400 rounded-tl rounded-bl justify-center gap-1.5 flex items-center">
                                                <div className="text-white text-xs leading-tight">Invoice</div>
                                            </div>
                                            <Input
                                                className="w-[150px] file:hidden  h-9 rounded-tl-none rounded-bl-none rounded-tr rounded-br text-xs bg-stone-50 text-zinc-400"
                                                type="file"
                                                id="myFile"
                                                accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
                                                placeholder="My File"
                                                {...field}
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

export const SelectWarehouse = ({ forms }) => {

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
                setWarehouse(response.data.warehouse);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
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
                                    onValueChange={(value) => {
                                        const selectedWarehouse = warehouse.find(item => item.warehouse_name === value);
                                        field.onChange(selectedWarehouse ? selectedWarehouse.id_status : ''); // Set id_status as value if found, otherwise empty string
                                    }}
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
                                                <SelectItem className='text-xs' key={index} value={item.warehouse_name}>
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
                    name={'pars'}
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