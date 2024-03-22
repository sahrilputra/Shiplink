import React, { useEffect, useState, Fragment } from "react";
import { Combobox, Transition } from '@headlessui/react'
import { Button } from "@/components/ui/button";
import { DeleteIcons } from "@/components/icons/iconCollection";
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import InputMask from 'react-input-mask';
/* eslint-disable react-hooks/exhaustive-deps */
import { TableCell, TableRow } from '@/components/ui/tableDashboard'
import { CheckIcon, XIcon } from 'lucide-react'
import { cn } from "@/lib/utils"
import axios from 'axios'
import hsCodeList from '@/data/hsCode/hsCode.json'
import * as Popovers from '@radix-ui/react-popover';
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
import { ScrollArea } from "@/components/ui/scroll-area";

const people = [
    { id: 1, name: 'Wade Cooper' },
    { id: 2, name: 'Arlene Mccoy' },
    { id: 3, name: 'Devon Webb' },
    { id: 4, name: 'Tom Cook' },
    { id: 5, name: 'Tanya Fox' },
    { id: 6, name: 'Hellen Schmidt' },
]

export const DeclareForms = ({ index, forms, handleRemoveContent, itemID }) => {
    const [countryList, setCountryList] = useState([]);
    const [openCountry, setOpenCountry] = useState(false)
    const [hsDesc, setHSDesc] = useState("");
    const [commandQuery, setCommandQuery] = useState("");
    const handleCommandChange = (e) => {
        console.log("🚀 ~ handleCommandChange ~ e:", e)
        setCommandQuery(e);
    }
    console.log("🚀 ~ DeclareForms ~ commandQuery:", commandQuery)

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.post(
                    `/api/admin/config/countries/list`,
                    {
                        "keyword": commandQuery === "" ? "" : commandQuery,
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
    }, [commandQuery])

    useEffect(() => {
        const calculateSubtotal = () => {
            const qty = forms.getValues(`package_content[${index}].qty`);
            const value = forms.getValues(`package_content[${index}].value`);
            const subtotal = qty * value;
            console.log("🚀 ~ calculateSubtotal ~ subtotal:", subtotal)
            forms.setValue(`package_content[${index}].subtotal`, subtotal);
        };

        const calculateTotals = () => {
            const subtotals = forms.getValues('package_content').map((item) => item.subtotal);
            const total = subtotals.reduce((acc, curr) => acc + curr, 0);
            forms.setValue('total', total);
        };

        calculateSubtotal();
        calculateTotals();
    }, [forms.getValues(`package_content[${index}].qty`), forms.getValues(`package_content[${index}].value`)]);

    const [filteredHSCodes, setFilteredHSCodes] = useState([]);
    const hsCode = forms.watch(`package_content[${index}].hs_code`)
    const [isHsOpen, setIsHsOpen] = useState(false)
    const [myQuery, setQuery] = useState("");
    const [rootCategory, setRootCategory] = useState("");
    console.log("🚀 ~ myQuery:", myQuery)

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
            const rootCategory = findRootCategory(myQuery);
            if (rootCategory) {
                setRootCategory(rootCategory.description);
                return hsCodeList.filter(item => item.htsno.startsWith(rootCategory.htsno) && item.htsno.length > rootCategory.htsno.length);
            }
            return [];
        };

        setFilteredHSCodes(filterHS());

    }, [myQuery, hsCodeList, hsCode]);
    // useEffect(() => {
    //     setQuery(hsCode);
    //     if (hsCode.length >= 5) {
    //         console.log('open')
    //         setIsHsOpen(true);
    //     } else {
    //         setIsHsOpen(false);
    //     }
    //     const findRootCategory = (code) => {
    //         return hsCodeList.find(item => code.startsWith(item.htsno) && item.htsno.length === 4);
    //     };

    //     const filterHS = () => {
    //         // Temukan root category yang sesuai dengan kode yang diinput
    //         const rootCategory = findRootCategory(myQuery);
    //         if (rootCategory) {
    //             // Simpan deskripsi root category ke dalam state
    //             setRootCategory(rootCategory.description);
    //             // Filter sub-kategori yang berasal dari root category yang ditemukan
    //             return hsCodeList.filter(item => item.htsno.startsWith(rootCategory.htsno) && item.htsno.length > rootCategory.htsno.length);
    //         }
    //         return [];
    //     };

    //     setFilteredHSCodes(filterHS());

    // }, [myQuery, hsCodeList, hsCode]);

    const handleDescChange = (desc) => {
        setHSDesc(desc);
    }

    useEffect(() => {
        forms.setValue(`package_content[${index}].hs_desc`, hsDesc);
    }, [hsDesc, forms])

    console.log('HS DESC ', hsDesc)
    return (
        <>
            <TableRow className="text-xs px-2">
                <TableCell className="p-0 h-8 px-2 py-2 font-medium">
                    <FormField
                        className="w-full flex flex-row justify-center items-end"
                        name={`package_content[${index}].qty`}
                        control={forms.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full text-sm">
                                    <FormControl>
                                        <Input
                                            min="0"
                                            className="text-xs h-[30px] py-1 px-2 focus:ring-offset-0"
                                            id="width"
                                            type="number"
                                            placeholder="1"
                                            onChange={() =>
                                                countingSubtotal({ qty: field })
                                            }
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            </>
                        )}
                    />
                </TableCell>
                <TableCell className="p-0 h-8 px-2 py-2 ">
                    <FormField
                        className="w-full flex flex-row justify-center items-end"
                        name={`package_content[${index}].value`}
                        control={forms.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full text-sm">
                                    <FormControl>
                                        <Input
                                            min="0"
                                            className="text-xs h-[30px] py-1 px-2 focus:ring-offset-0"
                                            id="value"
                                            type="number"
                                            onChange={() =>
                                                countingSubtotal({ value: field })
                                            }
                                            placeholder="0" {...field} />
                                    </FormControl>
                                </FormItem>
                            </>
                        )}
                    />
                </TableCell>
                <TableCell className="p-0 h-8 px-2 py-2 ">
                    <FormField
                        className="w-full flex flex-row justify-center items-end"
                        name={`package_content[${index}].desc`}
                        control={forms.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full text-sm">
                                    <FormControl>
                                        <Input
                                            className="text-xs h-[30px] py-1 px-2 focus:ring-offset-0"
                                            id="desc"
                                            placeholder="Description" {...field} />
                                    </FormControl>
                                </FormItem>
                            </>
                        )}
                    />
                </TableCell >
                <TableCell className="p-0 h-8 px-2 py-2 ">
                    <Input
                        disabled={true}
                        className="text-xs h-[30px] py-1 px-2 focus:ring-offset-0"
                        placeholder="HS Description"
                        value={(hsDesc ? hsDesc : "")}
                    />
                </TableCell >
                <TableCell className="p-0 h-8 px-2 py-2  w-[140px] overflow-visible ">
                    <FormField
                        className="w-full block items-end"
                        name={`package_content[${index}].hs_code`}
                        control={forms.control}
                        render={({ field }) => (
                            <>
                                <div className="relative">
                                    <FormItem className="w-full text-xs relative">
                                        <div className="relative">
                                            <FormControl>
                                                <InputMask
                                                    mask="9999.99.99.99" // Format yang diinginkan
                                                    maskPlaceholder="0000.00.00.00"
                                                    className='text-xs h-[30px] pl-2'
                                                    maskChar={null}
                                                    {...field}
                                                >
                                                    {(inputProps) => (
                                                        <Input
                                                            autoComplete="off"
                                                            className="text-xs h-[30px] py-1 px-2 focus:ring-offset-0"
                                                            id="hs_code"
                                                            type="text"
                                                            placeholder="0000.00.0000"
                                                            {...inputProps}
                                                        />
                                                    )}
                                                </InputMask>
                                            </FormControl>
                                        </div>
                                        {isHsOpen && (
                                            <div
                                                className={`hs absolute  w-[300px] flex flex-col gap-1 bg-white rounded-sm px-2 py-2 shadow border z-[1000] overflow-visible`}>
                                                <ScrollArea className={`min-h-min h-[200px] ${filteredHSCodes.length > 5 ? "h-[170px]" : "h-max"}`}>
                                                    <p className='text-xs font-bold p-1'>{rootCategory || ""}</p>
                                                    {filteredHSCodes.length > 0 ? (
                                                        filteredHSCodes.map((item) => (
                                                            <div
                                                                key={item.id}
                                                                className="text-xs hover:bg-slate-100 cursor-pointer px-2 py-2"
                                                                onClick={() => {
                                                                    handleDescChange(item.description);
                                                                    forms.setValue(`package_content[${index}].hs_code`, item.htsno);
                                                                    forms.setValue(`package_content[${index}].hs_desc`, `${rootCategory} ${item.description}`);
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
                                    </FormItem>
                                </div>
                            </>
                        )}
                    />
                </TableCell>

                <TableCell className="p-0 h-8 px-2 py-2 w-[100px] ">
                    <FormField
                        className="w-full flex flex-row justify-center items-end"
                        name={`package_content[${index}].made_in`}
                        control={forms.control}
                        render={({ field }) => {
                            const defaultValue = countryList.length > 0 ? countryList[0].country_code : "CAN"; // Nilai default dari country list

                            if (!field.value) {
                                forms.setValue(`${`package_content[${index}].made_in`}`, defaultValue);
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
                                                            "text-xs h-[30px] py-1 px-2 focus:ring-offset-0 text-left uppercase shadow-none",
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
                                                        onValueChange={(e) => handleCommandChange(e)}
                                                    />
                                                    <CommandEmpty className="text-xs px-1 py-1 text-center">No Country Found.</CommandEmpty>
                                                    <CommandGroup>
                                                        <ScrollArea className="h-[100px]">
                                                            {countryList.map((language) => (
                                                                <CommandItem
                                                                    className="text-xs items-center"
                                                                    value={language.country_name}
                                                                    key={language.country_code}
                                                                    onSelect={() => {
                                                                        forms.setValue(`${`package_content[${index}].made_in`}`, language.country_code)
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
                        }
                        }
                    />
                </TableCell>
                <TableCell className="text-center  p-0 h-8 px-2 py-2 w-[40px] ">
                    {
                        index > 0 ? (
                            <div className="flex flex-row justify-between gap-2 w-full">
                                <Button
                                    variant="softBlue"
                                    type="button"
                                    size="tableIcon"
                                    className="px-1 py-1 w-6 h-6"
                                    onClick={handleRemoveContent}
                                >
                                    <XIcon className="w-4 h-4" />
                                </Button>
                            </div>
                        ) : (
                            <></>
                        )
                    }
                </TableCell>
            </TableRow>
        </>
    );
};
