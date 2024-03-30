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
import axios from 'axios'
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
import hsCodeList from '@/data/hsCode/hsCode.json'
export const DeclareContentInput = ({
    forms,
    index,
    handleRemoveContent,
    itemID,
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

    const [rootCategory, setRootCategory] = useState("");

    const [hsDesc, setHSDesc] = useState("");

    const [countryList, setCountryList] = useState([]);
    const [countryQuery, setCountryQuery] = useState({
        keyword: "",
        page: 0,
        limit: 0,
        index: 0,
    });
    const handleDescChange = (desc) => {
        setHSDesc(desc);
    }

    const [commandQuery, setCommandQuery] = useState("");
    const handleCommandChange = (e) => {
        console.log("🚀 ~ handleCommandChange ~ e:", e)
        setCommandQuery(e);
        setCountryQuery({ ...countryQuery, keyword: e });
    }



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    `/api/admin/config/countries/list`,
                    countryQuery
                );
                console.log("🚀 ~ response:", response);
                setCountryList(response.data.country);
            } catch (error) {
                console.log("🚀 ~ error:", error);
                fetchData();
            }
        };
        fetchData();
    }, [countryQuery])


    // HS DESC
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

    // useEffect(() => {
    //     forms.setValue(`package_content[${index}].hs_desc`, hsDesc);
    // }, [hsDesc, forms])


    console.log('HS CODE', forms.watch(`package_content[${index}].hs_desc`))
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
                                            min="1"
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
                                            min="1"
                                            className="text-xs h-[30px] py-1 px-2 focus:ring-offset-0"
                                            id="value"
                                            plac
                                            type="number"
                                            onChange={() =>
                                                countingSubtotal({ value: field })
                                            }
                                            placeholder="1"
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
                                            placeholder="Description"
                                            {...field}
                                        />
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
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full text-sm">
                                    <FormControl>
                                        <Input
                                            autoComplete="off"
                                            className="text-xs h-[30px] py-1 px-2 focus:ring-offset-0"
                                            id="hs_desc" placeholder="HS Description"
                                            disabled={true}
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
                                                    onInput={(e) => handleValueChange(e)}
                                                >
                                                    {(inputProps) => (
                                                        <Input
                                                            autoComplete="off"
                                                            className="text-xs h-[30px] py-1 w-[105px] px-2 focus:ring-offset-0"
                                                            id="hs_code"
                                                            type="text"
                                                            placeholder="0000.00.00.00"
                                                            {...inputProps}
                                                        />
                                                    )}
                                                </InputMask>
                                            </FormControl>
                                        </div>
                                        {isHsOpen && (
                                            <div
                                                className={`hs absolute  w-[300px] flex right-0  flex-col gap-1 bg-white rounded-md px-2 py-2 shadow border z-[1000] overflow-visible`}>
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
                <TableCell className="p-0 h-8 px-2 py-2 w-[100px] ">
                    <FormField
                        className="w-full flex flex-row justify-center items-end"
                        name={`package_content[${index}].made_in`}
                        control={forms.control}
                        render={({ field }) => {
                            // const defaultValue = countryList.length > 0 ? countryList[0].country_code : "CAN"; // Nilai default dari country list

                            // // Jika nilai field.value belum terisi (null atau undefined), atur nilai default
                            // if (!field.value) {
                            //     forms.setValue(`${`package_content[${index}].made_in`}`, defaultValue);
                            // }
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
                                                            : "Country"
                                                        }
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
