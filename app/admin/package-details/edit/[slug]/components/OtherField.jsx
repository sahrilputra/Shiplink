import React, { useEffect, useState } from 'react'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from '@/components/ui/scroll-area'
import axios from 'axios'

export const OtherField = ({
    forms,
    binData,
}) => {



    return (
        <>
            <div className="flex flex-row gap-3 w-[100%]">
                <div className="flex flex-col gap-3 w-full">
                    <FormField
                        className="w-full text-sm"
                        name="manifest"
                        control={forms.control}
                        render={({ field, formState }) => (
                            <>
                                <FormItem className=" text-xs ">
                                    <FormLabel className="font-bold">Manifest Number</FormLabel>
                                    <FormControl className="w-full relative">
                                        <Input
                                            placeholder={`${field.value || "Manifest Number"}`}
                                            className={`text-xs h-[30px] rounded-sm px-2 py-0 `}
                                        />
                                    </FormControl>
                                </FormItem>
                            </>
                        )}
                    />
                    <FormField
                        control={forms.control}
                        name="bin_location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold">Select Bins</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="text-xs  h-[30px] rounded-sm px-2 py-0'">
                                            <SelectValue placeholder="Select Bin Location" className='text-xs' defaultValue={"Unregister"} />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <ScrollArea className="h-[150px]">
                                            {
                                                binData.map((bin, index) => (
                                                    <SelectItem className="text-xs" value={bin.bins_id} key={index}>{bin.bins_id}</SelectItem>
                                                ))
                                            }
                                        </ScrollArea>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-col gap-3 w-full">
                    <FormField
                        className="w-full text-sm"
                        name="entry_number"
                        control={forms.control}
                        render={({ field, formState }) => (
                            <>
                                <FormItem className=" text-xs ">
                                    <FormLabel className="font-bold">Entry Number</FormLabel>
                                    <FormControl className="w-full relative">
                                        <Input
                                            placeholder={`${field.value || "Entry Number"}`}
                                            className={`text-xs h-[30px] rounded-sm px-2 py-0 `}
                                        />
                                    </FormControl>
                                </FormItem>
                            </>
                        )}
                    />
                    <FormField
                        control={forms.control}
                        name="lots_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold">Select Lots</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="text-xs  h-[30px] rounded-sm px-2 py-0'">
                                            <SelectValue placeholder="Select Lots" className='text-xs' defaultValue={"Unregister"} />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <ScrollArea className="h-[150px]">
                                            <SelectItem className="text-xs" value={"Lots A"} >{"Lots A"}</SelectItem>

                                        </ScrollArea>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>
                <div className="flex flex-col gap-3 w-full ">
                    <FormField
                        className="w-full text-sm"
                        name="status"
                        control={forms.control}
                        render={({ field, formState }) => (
                            <>
                                <FormItem className=" text-xs ">
                                    <FormLabel className="font-bold">Set Status</FormLabel>
                                    <FormControl className="w-full relative">
                                        <Input
                                            placeholder={`${field.value || "Status"}`}
                                            className={`text-xs h-[30px] rounded-sm px-2 py-0 `}
                                        />
                                    </FormControl>
                                </FormItem>
                            </>
                        )}
                    />
                    <FormField
                        className="w-full flex flex-row justify-center items-end space-y-2 pt-2"
                        name="documents"
                        control={forms.control}
                        defaultValue=""
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full pt-2 ">
                                    <div className="flex flex-col gap-2 ">
                                        <FormLabel className=" font-bold">Documents</FormLabel>
                                        <FormControl>
                                            <div className='rounded-md border border-slate-300 p-0'>
                                                <Input
                                                    id="documents"
                                                    type="file"
                                                    className="p-0 border-none text-xs h-[30px] rounded-sm px-0 py-0 file:mr-3 file:bg-myBlue file:text-white file:h-full file:px-3 file:text-xs cursor-pointer file:cursor-pointer hover:bg-slate-100 hover:file:bg-blue-900"
                                                    placeholder="Upload Docs"
                                                    accept="application/pdf"
                                                    onChange={(event) => {
                                                        const file = event.target.files[0]; // Hanya ambil file pertama
                                                        if (file) {
                                                            const reader = new FileReader();
                                                            reader.onload = (e) => {
                                                                const base64String = e.target.result.split(',')[1]; // Mengambil bagian setelah koma
                                                                if (typeof base64String === 'string') { // Memastikan bahwa base64String adalah string
                                                                    forms.setValue("documents", base64String);
                                                                } else {
                                                                    console.error("base64String is not a string");
                                                                }
                                                            };
                                                            reader.readAsDataURL(file); // Membaca file sebagai Data URL
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </FormControl>
                                    </div>
                                </FormItem>
                            </>
                        )}
                    />

                </div>
            </div>
        </>
    )
}
