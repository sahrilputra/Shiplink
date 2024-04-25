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


export const DeclareForms = ({ index, forms, handleRemoveContent, itemID, data, disabled }) => {
    console.log("🚀 ~ DeclareForms ~ data:", data)

    const [countryList, setCountryList] = useState([]);
    const [openCountry, setOpenCountry] = useState(false)
    const [hsDesc, setHSDesc] = useState("");
    const [commandQuery, setCommandQuery] = useState("");

    console.log("🚀 ~ watchForms ~ data:", forms.watch());

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
        if (data.length > 0 && data[0].desc === "" || data[0].hs_desc === "" || data[0].hs_code === "") {
            calculateSubtotal();
            calculateTotals();
        }

    }, [forms.getValues(`package_content[${index}].qty`), forms.getValues(`package_content[${index}].value`)]);

    const [filteredHSCodes, setFilteredHSCodes] = useState([]);
    const hsCode = forms.watch(`package_content[${index}].hs_code`)
    const [isHsOpen, setIsHsOpen] = useState(false)
    const [myQuery, setQuery] = useState("");
    const [rootCategory, setRootCategory] = useState("");
    console.log("🚀 ~ myQuery:", myQuery)

    useEffect(() => {
        setQuery(hsCode);
        const findRootCategory = (code) => {
            return hsCodeList.find(item => code.startsWith(item.htsno) && item.htsno.length === 4);
        };

        const filterHS = () => {
            const rootCategory = findRootCategory(myQuery);
            if (rootCategory) {
                setRootCategory(rootCategory.description);
                const filteredSubCategories = hsCodeList.filter(item => item.htsno.startsWith(rootCategory.htsno) && item.htsno.length > rootCategory.htsno.length);
                return filteredSubCategories.filter(item => item.htsno.startsWith(myQuery));
            }
            return [];
        };

        setFilteredHSCodes(filterHS());

    }, [myQuery, hsCodeList, hsCode]);

    const handleValueChange = (e) => {
        console.log("🚀 ~ handleValueChange ~ e:", e.target.value)
        if (e.target.value.length >= 4 && e.target.value.length < 13) {
            setIsHsOpen(true)
        } else if (e.target.value.length === 13) {
            setQuery(e.target.value);
            handle13DigitHST(e.target.value)
        } else {
            setIsHsOpen(false)
            setHSDesc("")
            forms.setValue(`package_content[${index}].hs_desc`, "");
        }
    }


    const handle13DigitHST = async (hsCode) => {

        const findRootCategory = (code) => {
            return hsCodeList.find(item => code.startsWith(item.htsno) && item.htsno.length === 4);
        };

        try {
            const hsItem = hsCodeList.find(item => item.htsno === hsCode);
            if (hsItem) {
                const rootCategory = await findRootCategory(hsCode);
                if (rootCategory) {
                    setIsHsOpen(false);
                    setHSDesc(`${rootCategory.description} ${hsItem.description}`);
                    forms.setValue(`package_content[${index}].hs_desc`, `${rootCategory.description} ${hsItem.description}`);
                }
            } else {
                setHSDesc("");
                forms.setValue(`package_content[${index}].hs_desc`, "");
                setIsHsOpen(true);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }



    const handleDescChange = (desc) => {
        setHSDesc(desc);
    }

    useEffect(() => {
        forms.setValue(`package_content[${index}].hs_desc`, hsDesc);
    }, [hsDesc, forms])

    console.log('HS DESC ', (`package_content[${index}].hs_desc`, hsDesc))
    return (
        <>
            <TableRow className="text-xs px-2">
                <TableCell className="p-0 h-8 px-2 py-2 font-medium">
                    <FormField
                        className="w-full flex flex-row justify-center items-end"
                        name={`package_content[${index}].qty`}
                        control={forms.control}
                        disabled={disabled}
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
                        disabled={disabled}
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
                        disabled={disabled}
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
                    <FormField
                        className="w-full flex flex-row justify-center items-end bg-slate-800"
                        name={`package_content[${index}].hs_desc`}
                        control={forms.control}
                        disabled={disabled}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full text-sm">
                                    <FormControl>
                                        <Input
                                            disabled={true}
                                            name={`package_content[${index}].hs_desc`}
                                            className="text-xs h-[30px] py-1 px-2 focus:ring-offset-0"
                                            placeholder="HS Description"
                                            value={field.value}
                                        />
                                    </FormControl>
                                </FormItem>
                            </>
                        )}
                    />

                </TableCell >
                <TableCell className="p-0 h-8 px-2 py-2  w-max overflow-visible ">
                    <FormField
                        className="w-[105px] block items-end"
                        name={`package_content[${index}].hs_code`}
                        control={forms.control}
                        render={({ field }) => (
                            <>
                                <div className="relative">
                                    <FormItem className=" text-xs relative">
                                        <div className="relative">
                                            <FormControl className="w-[105px]">
                                                <InputMask
                                                    mask="9999.99.99.99" // Format yang diinginkan
                                                    maskPlaceholder="0000.00.00.00"
                                                    className='text-xs h-[30px] px-2 w-[105px] '
                                                    maskChar={null}
                                                    {...field}
                                                    disabled={disabled}
                                                    onInput={(e) => handleValueChange(e)}
                                                >
                                                    {(inputProps) => (
                                                        <Input
                                                            autoComplete="off"
                                                            className="text-xs h-[30px] py-1 w-[105px] px-2 focus:ring-offset-0"
                                                            id="hs_code"
                                                            type="text"
                                                            disabled={disabled}
                                                            placeholder="0000.00.00.00"
                                                            {...inputProps}
                                                        />
                                                    )}
                                                </InputMask>
                                            </FormControl>
                                        </div>
                                        {isHsOpen && (
                                            <div
                                                className={`hs absolute  w-[300px] flex flex-col gap-1 bg-white rounded-md px-2 py-2 shadow border z-[1000] overflow-visible`}>
                                                <ScrollArea className={`min-h-min h-[200px] ${filteredHSCodes.length > 5 ? "h-[170px]" : "h-max"}`}>
                                                    {filteredHSCodes.length > 0 ? (
                                                        <>
                                                            <div className="items-center rounded-sm">
                                                                <p className='text-xs font-bold p-1'>{rootCategory || ""}</p>
                                                                {filteredHSCodes.map((item) => (
                                                                    <div
                                                                        key={item.id}
                                                                        className="text-xs items-center rounded-sm px-2 py-1.5 hover:bg-accent cursor-pointer"
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
                                                                ))}
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="text-xs px-2 py-2">Code Not Valid, enter valid code or leave empty</div>
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

                <TableCell className="p-0 h-8 px-2 py-2 w-[50px] ">
                    <FormField
                        className="w-full flex flex-row justify-center items-end"
                        name={`package_content[${index}].made_in`}
                        control={forms.control}
                        disabled={disabled}
                        render={({ field }) => {
                            const defaultValue = countryList.length > 0 ? countryList[0].country_code : "CAN"; // Nilai default dari country list

                            if (!field.value) {
                                defaultValue
                            }
                            return (
                                <>
                                    <FormItem className="flex flex-col">
                                        <Popover open={openCountry} onOpenChange={setOpenCountry} >
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        disabled={disabled}
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn(
                                                            "text-xs h-[30px] py-1 px-2 focus:ring-offset-0 text-left uppercase shadow-none",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? field.value : "CAN"}
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[150px] p-0">
                                                <Command>
                                                    <CommandInput
                                                        placeholder="Search..."
                                                        className="h-[30px] text-xs"
                                                        onValueChange={(e) => handleCommandChange(e)}
                                                    />
                                                    <CommandEmpty className="text-xs px-1 text-center">No Country Found.</CommandEmpty>
                                                    <CommandGroup className="w-[150px]">
                                                        <ScrollArea className="h-[100px]">
                                                            {countryList.map((language) => (
                                                                <CommandItem
                                                                    className="text-xs items-center"
                                                                    value={language.country_name}
                                                                    key={language.country_id}
                                                                    onSelect={() => {
                                                                        forms.setValue(`${`package_content[${index}].made_in`}`, language.country_code)
                                                                        setOpenCountry(false)
                                                                    }}
                                                                >
                                                                    {`${language.country_code} - ${language.country_name}`}
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
                                    disabled={disabled}
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
