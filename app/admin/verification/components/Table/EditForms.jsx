/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CheckIcon, TrashIcon } from 'lucide-react'
import { XIcon } from 'lucide-react'
import InputMask from 'react-input-mask';
import { cn } from "@/lib/utils"
import axios from 'axios'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import hsCodeList from '@/data/hsCode/hsCode.json'

export const EditForms = ({ data, form, trackingID, index, remove }) => {
    console.log("🚀 ~ EditForms ~ data:", data)
    useEffect(() => {
        data.map((item, i) => {
            form.setValue(`package_content[${i}].qty`, item.qty)
            form.setValue(`package_content[${i}].value`, item.value)
            form.setValue(`package_content[${i}].made_in`, item.made_in)
            form.setValue(`package_content[${i}].desc`, item.desc)
            form.setValue(`package_content[${i}].hs_desc`, item.hs_desc)
            form.setValue(`package_content[${i}].hs_code`, item.hs_code)
        })
    }, [data])

    const [filteredHSCodes, setFilteredHSCodes] = useState([]);
    console.log("🚀 ~ EditForms ~ filteredHSCodes:", filteredHSCodes)
    const hsCode = form.watch(`package_content[${index}].hs_code`)
    const [isHsOpen, setIsHsOpen] = useState(false)
    const [myQuery, setQuery] = useState("");
    const [hsDesc, setHSDesc] = useState("");
    const [rootCategory, setRootCategory] = useState("");

    useEffect(() => {
        setQuery(hsCode);
        if (hsCode.length >= 5 && hsCode.length < 10) {
            console.log('open')
            setIsHsOpen(true);
        } else if (hsCode.length > 12) {
            setIsHsOpen(false);
        } else {
            setIsHsOpen(false);
        }

        const findRootCategory = (code) => {
            return hsCodeList.find(item => code.startsWith(item.htsno) && item.htsno.length === 4);
        };

        const filterHS = () => {
            // Temukan root category yang sesuai dengan kode yang diinput
            const rootCategory = findRootCategory(myQuery);
            if (rootCategory) {
                // Simpan deskripsi root category ke dalam state
                setRootCategory(rootCategory.description);
                // Filter sub-kategori yang berasal dari root category yang ditemukan
                return hsCodeList.filter(item => item.htsno.startsWith(rootCategory.htsno) && item.htsno.length > rootCategory.htsno.length);
            }
            return [];
        };

        setFilteredHSCodes(filterHS());
        setFilteredHSCodes(filterHS());

    }, [myQuery, hsCodeList, hsCode]);

    const handleDescChange = (desc) => {
        setHSDesc(desc);
    }

    // useEffect(() => {
    //     form.setValue(`package_content[${index}].hs_desc`, hsDesc);
    // }, [hsDesc, form])


    const [countryList, setCountryList] = useState([]);
    const [openCountry, setOpenCountry] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    `/api/admin/config/countries/list`,
                    {
                        "keyword": "",
                        "page": 0,
                        "limit": 0,
                        "index": 0,
                    }
                );
                console.log("🚀 ~ response:", response);
                setCountryList(response.data.country);
            } catch (error) {
                console.log("🚀 ~ error:", error);
                fetchData();
            }
        };
        fetchData();
    }, [])


    return (
        <>
            <div
                className=" flex flex-row gap-1 justify-start border-y-2 border-zinc-600/20 p-2"
            >
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
                                className="w-full flex flex-row justify-center items-end bg-slate-800"
                                name={`package_content[${index}].hs_desc`}
                                control={form.control}
                                render={({ field }) => (
                                    <>
                                        <FormItem className="w-full text-sm">
                                            <FormControl>
                                                <Input id="width"
                                                    className="pt-5 font-light pl-2 h-10 outline-none focus-visible:ring-0  text-xs "
                                                    type="text"
                                                    placeholder="HS Description"
                                                    disabled={true}
                                                    value={field.value}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    </>
                                )}
                            />
                        </>
                    </div>
                </div>
                <div className="flex flex-col relative w-[200px] h-10 justify-center items-center bg-white">
                    <p className='absolute top-0 left-1 text-myBlue text-[11px] h-[20px] p-0.5'>HS Code</p>
                    <div className="h-10 w-full flex justify-start items-end">
                        <FormField
                            className="w-full flex flex-row justify-center items-end bg-white"
                            name={`package_content[${index}].hs_code`}
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <div className="relative">
                                        <FormItem className="w-full text-xs">
                                            <FormControl>
                                                <InputMask
                                                    mask="9999.99.99.99"
                                                    maskPlaceholder="0000.00.00.00"
                                                    maskChar={null}
                                                    className="pt-5 font-light pl-2 h-10 bg-transparent outline-none focus-visible:ring-0  text-xs"
                                                    {...field}
                                                >
                                                    {(inputProps) => (
                                                        <Input
                                                            autoComplete="off"
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
                                        {isHsOpen && (
                                            <div
                                                className={`hs absolute right-0 w-[300px] flex flex-col gap-1 bg-white rounded-sm px-2 py-2 shadow border z-[1000] overflow-visible`}>
                                                <ScrollArea className={`min-h-min h-[200px] ${filteredHSCodes.length > 5 ? "h-[170px]" : "h-max"}`}>
                                                    <p className='text-xs font-bold p-1'>{rootCategory || ""}</p>
                                                    {filteredHSCodes.length > 0 ? (
                                                        filteredHSCodes.map((item) => (
                                                            <div
                                                                key={item.id}
                                                                className="text-xs hover:bg-slate-100 cursor-pointer px-2 py-2"
                                                                onClick={() => {
                                                                    handleDescChange(item.description);
                                                                    form.setValue(`package_content[${index}].hs_code`, item.htsno);
                                                                    form.setValue(`package_content[${index}].hs_desc`, `${rootCategory} ${item.description}`);
                                                                    setIsHsOpen(false);
                                                                    setHSDesc(`${rootCategory} ${item.description}`);
                                                                }}
                                                            >

                                                                {item.description}
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="text-xs px-2 py-2">No result found</div>
                                                    )}
                                                </ScrollArea>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        />
                    </div>
                </div>
                {/* <div className="flex flex-col relative w-[100px] h-10 justify-center items-center">
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
                    </div> */}
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
                                        <FormField
                                            className="w-full flex flex-row justify-center items-end"
                                            name={`package_content[${index}].made_in`}
                                            control={form.control}
                                            render={({ field }) => {
                                                const defaultValue = countryList.length > 0 ? countryList[0].country_code : "CAN"; // Nilai default dari country list

                                                if (!field.value) {
                                                    form.setValue(`${`package_content[${index}].made_in`}`, defaultValue);
                                                }
                                                return (
                                                    <>
                                                        <FormItem className="flex flex-col">
                                                            <Popover open={openCountry} onOpenChange={setOpenCountry} >
                                                                <PopoverTrigger asChild>
                                                                    <FormControl>
                                                                        <Button
                                                                            variant="outline"
                                                                            role="combobox"
                                                                            className={cn(
                                                                                "py-1 px-2 focus:ring-offset-0 text-left shadow-none pt-5 font-light pl-2 h-10 w-[80px] outline-none focus-visible:ring-0 uppercase text-xs",
                                                                                !field.value && "text-muted-foreground"
                                                                            )}
                                                                        >
                                                                            {field.value
                                                                                ? countryList.find(
                                                                                    (language) => language.country_code === field.value
                                                                                )?.country_code
                                                                                : "CAN"}
                                                                        </Button>
                                                                    </FormControl>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-[120px] p-0">
                                                                    <Command>
                                                                        <CommandInput
                                                                            placeholder="Search..."
                                                                            className="h-[30px] text-xs"
                                                                        />
                                                                        <CommandEmpty className="text-xs px-1 text-center">No Country Found.</CommandEmpty>
                                                                        <CommandGroup>
                                                                            <ScrollArea className="h-[100px]">
                                                                                {countryList.map((language) => (
                                                                                    <CommandItem
                                                                                        className="text-xs items-center"
                                                                                        value={language.country_code}
                                                                                        key={language.country_id}
                                                                                        onSelect={() => {
                                                                                            form.setValue(`${`package_content[${index}].made_in`}`, language.country_code)
                                                                                            setOpenCountry(false)
                                                                                        }}
                                                                                    >
                                                                                        {language.country_name}
                                                                                        <CheckIcon
                                                                                            className={cn(
                                                                                                "ml-auto h-4 w-4",
                                                                                                language.country_code === field.value
                                                                                                    ? "opacity-100"
                                                                                                    : "opacity-0"
                                                                                            )}
                                                                                        />
                                                                                    </CommandItem>
                                                                                ))}
                                                                            </ScrollArea>
                                                                        </CommandGroup>
                                                                    </Command>
                                                                </PopoverContent>
                                                            </Popover>
                                                            <FormMessage />
                                                        </FormItem>
                                                    </>
                                                )
                                            }}
                                        />
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
                                    onClick={remove}
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
    )
}
