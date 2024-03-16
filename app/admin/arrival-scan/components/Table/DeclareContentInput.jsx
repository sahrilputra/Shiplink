'use client'
/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { TableCell, TableRow } from '@/components/ui/tableDashboard'
import { CheckIcon, XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import InputMask from 'react-input-mask';
import { ScrollArea } from '@/components/ui/scroll-area'
import { Combobox } from '@headlessui/react'
import { v4 as uuidv4 } from 'uuid'
import { cn } from "@/lib/utils"
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

export const DeclareContentInput = ({
    forms,
    index,
    handleRemoveContent,
    itemID,
    countryList,
    setCodeNumber,
    hsCodeList,

}) => {

    const countingSubtotal = ({ qty = 0, value = 0 }) => {
        const parseQty = parseInt(qty, 10)
        const parseValue = parseInt(value, 10)
        forms.setValue(`package_content[${index}].qty`, parseQty)
        forms.setValue(`package_content[${index}].value`, parseValue)
        forms.setValue(`package_content[${index}].subtotal`, parseQty * parseValue)
    }

    const [openCountry, setOpenCountry] = useState(false)
    const [filteredHSCodes, setFilteredHSCodes] = useState([]);

    const hsCode = forms.watch(`package_content[${index}].hs_code`)
    const [isHsOpen, setIsHsOpen] = useState(false)
    const [myQuery, setQuery] = useState("");
    console.log("🚀 ~ myQuery:", myQuery)

    useEffect(() => {
        setQuery(hsCode);
        if (hsCode?.length >= 5) {
            setIsHsOpen(true);
            const filterHS = () => {
                return hsCodeList.filter((item) => {
                    return item.htsno.includes(hsCode);
                });
            };
            setFilteredHSCodes(filterHS());
        } else if (hsCode?.length >= 10) {
            setIsHsOpen(false);
        } else {
            setIsHsOpen(false);
        }
    }, [myQuery, hsCodeList, hsCode]);

    console.log("🚀 ~ hsCode:", hsCode)

    return (
        <>
            <TableRow className="text-xs px-2 relative">
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
                                            autoComplete="off"
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
                                            autoComplete="off"
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
                                            autoComplete="off"
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
                        className="w-full flex flex-row justify-center items-end"
                        name={`package_content[${index}].hs_desc`}
                        control={forms.control}
                        disabled={true}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full text-sm">
                                    <FormControl>
                                        <Input
                                            autoComplete="off"
                                            className="text-xs h-[30px] py-1 px-2 focus:ring-offset-0"
                                            id="hs_desc" placeholder="HS Description" {...field} />
                                    </FormControl>
                                </FormItem>
                            </>
                        )}
                    />
                </TableCell >
                <TableCell className="p-0 h-8 px-2 py-2  w-[140px] relative">
                    <FormField
                        className="w-full flex flex-row justify-center items-end"
                        name={`package_content[${index}].hs_code`}
                        control={forms.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full text-xs">
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

                                        <div className={`hs fixed right-[180px] w-[300px] flex flex-col gap-1 bg-white rounded-sm z-30 px-2 py-2 shadow border
                                        ${isHsOpen ? "fixed" : "hidden"}
                                        `}>
                                            {/* <ScrollArea className="h-[200px]">
                                                {filteredHSCodes.map((item) => (
                                                    <div
                                                        key={item.id}
                                                        className="text-xs hover:bg-slate-100 cursor-pointer px-2 py-2"
                                                        onClick={() => {
                                                            field.onChange(item.hs_code);
                                                            setIsHsOpen(false);
                                                            forms.setValue(`package_content[${index}].hs_desc`, item.description);
                                                            forms.setValue(`package_content[${index}].hs_code`, item.htsno);
                                                        }}
                                                    >
                                                        {item.description}
                                                    </div>
                                                ))}
                                            </ScrollArea> */}
                                            <ScrollArea className={`min-h-min h-[200px] ${filteredHSCodes.length > 5 ? "h-[170px]" : "h-max"}`}>
                                                {filteredHSCodes.length > 0 ? (
                                                    filteredHSCodes.map((item) => (
                                                        <div
                                                            key={item.id}
                                                            className="text-xs hover:bg-slate-100 cursor-pointer px-2 py-2"
                                                            onClick={() => {
                                                                field.onChange(item.hs_code);
                                                                setIsHsOpen(false);
                                                                forms.setValue(`package_content[${index}].hs_desc`, item.description);
                                                                forms.setValue(`package_content[${index}].hs_code`, item.htsno);
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
                                    </div>
                                </FormItem>
                            </>
                        )}
                    />
                </TableCell>
                <TableCell className="p-0 h-8 px-2 py-2 w-[100px] ">
                    <FormField
                        className="w-full flex flex-row justify-center items-end"
                        name={`package_content[${index}].made_in`}
                        control={forms.control}
                        render={({ field }) => (
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
                                                                    forms.setValue(`${`package_content[${index}].made_in`}`, language.country_code)
                                                                    setOpenCountry(false)
                                                                }}
                                                            >
                                                                {language.country_code}
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
                                {/* <FormItem className="w-full text-sm">
                                    <FormControl>
                                        <Input
                                            max="3"
                                            className="text-xs h-[30px] py-1 px-2 focus:ring-offset-0 text-left uppercase"
                                            id="made_in" placeholder="CAN" {...field} />
                                    </FormControl>
                                </FormItem> */}
                            </>
                        )}
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
    )
}
