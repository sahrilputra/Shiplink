'use client'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Button } from '@/components/ui/button'
import { ProvinceList } from './components/ProvinceList'
import { TaxDetails } from './components/TaxDetails'
import { NewType } from './components/NewType'
import { FormControl } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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
import { CheckIcon } from 'lucide-react'
import axios from 'axios'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'


export default function Tax() {
    const [clicked, setClicked] = useState(false);
    const handleClick = (isClicked) => { setClicked(isClicked) }
    const [value, setValue] = useState("")
    const [countryCode, setCountryCode] = useState("")
    const [open, setOpen] = useState(false)
    const [seletedProvince, setSeletedProvince] = useState("")
    const [taxAssignID, setTaxAssignID] = useState("")
    const [query, setQuery] = useState({
        keyword: "",
        page: 0,
        limit: 0,
        index: 0
    });
    const [country, setCountry] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    `/api/admin/config/countries/list`,
                    query
                );
                const data = await response.data;
                setCountry(data.country);
                if (data.country && data.country.length > 0) {
                    // Set initial value and countryCode to the first country in the list
                    setValue(data.country[0].country_name);
                    setCountryCode(data.country[0].country_code);
                }
            } catch (error) {
                fetchData();
                console.log('Error:', error);
            }
        };
        fetchData();
    }, [query]);

    const handleSelect = (item) => {
        setSeletedProvince(item);
    }
    const handleClose = () => {
        setClicked(false)
    }
    return (
        <>
            <div className={styles.taxLayout}>

                <div className={styles.left}>
                    <div className="w-[100%]  p-5 bg-white rounded-md border border-neutral-200 flex-col justify-start items-start gap-[15px] inline-flex">
                        <div className=" text-zinc-700 text-sm font-bold" >Tax Configuration</div>
                        <div className="">
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open}
                                        className="w-[200px] justify-between text-xs px-2 h-[35px] shadow-none capitalize"
                                    >
                                        {
                                            value ? value : "Select Country..."
                                        }
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search Country..." className="h-9 text-xs" />
                                        <CommandEmpty>No Country found.</CommandEmpty>
                                        <ScrollArea className="h-[200px]">
                                            <CommandGroup>
                                                {country.map((item) => (
                                                    <CommandItem
                                                        key={item.country_name}
                                                        value={item.country_name}
                                                        className="text-xs"
                                                        onSelect={(currentValue) => {
                                                            setCountryCode(item.country_code)
                                                            setValue(currentValue === value ? "" : currentValue)
                                                            setOpen(false)
                                                        }}
                                                    >
                                                        {item.country_name}
                                                        <CheckIcon
                                                            className={`ml-auto h-4 w-4 ${value.toLowerCase() === item.country_name.toLowerCase() ? "opacity-100" : "opacity-0"}`}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </ScrollArea>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="flex-col justify-start items-start gap-0.5 flex w-full">
                            <ProvinceList countryName={value} handleSelect={setSeletedProvince} isSelect={seletedProvince} countryCode={countryCode} setTaxID={setTaxAssignID} />
                        </div>
                    </div>
                </div>

                <div className={styles.right}>
                    <div className="w-[100%] p-5 bg-white rounded-md border border-neutral-200 flex-col justify-start items-start gap-1 inline-flex">
                        <div className=" text-zinc-700 text-sm font-bold" >Tax Assignment : {seletedProvince ? seletedProvince : ""}</div>
                        <div className="py-[5px] flex-col justify-start items-start gap-2.5 flex">
                            <Button
                                variant="softBlue"
                                size="xs"
                                className="px-3 py-1 rounded "
                                onClick={() => handleClick(true)}
                            >
                                <div className="text-sky-700 text-xs font-normal ">Create New Type</div>
                            </Button>
                        </div>
                        {clicked && (
                            <>
                                <NewType selected={seletedProvince} close={handleClose} countryCode={countryCode} />
                            </>
                        )}
                        <TaxDetails close={handleClose} taxAssignID={taxAssignID} countryCode={countryCode} />
                    </div>
                </div>
            </div>
        </>
    )
}