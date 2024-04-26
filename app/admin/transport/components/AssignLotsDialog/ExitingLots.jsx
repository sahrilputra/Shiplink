"use client"
import React, { useState, useEffect } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area"

export function ExitingLotsDialog({ close, selectedLotsID, lotsID, lotsName, IsFormError, form }) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [lots, setLots] = useState([]);
    const [status, setStatus] = useState([]);
    const [isSkeleton, setIsSkeleton] = useState(true);
    const [totalLots, setTotalLost] = useState(0);
    const [filteredLost, setFilteredLost] = useState([]);
    console.log("🚀 ~ ExitingLotsDialog ~ totalLots:", totalLots, "lots", lots.length)

    const [query, setQuery] = useState({
        keyword: "",
        date_start: "",
        date_end: "",
        tracking_id: "",
        status: "",
        page: 0,
        limit: 0,
        index: 0
    });

    const fetchData = async () => {
        try {
            const response = await axios.post(
                `/api/admin/transport/lots/list`,
                query
            );
            console.log(response)
            const data = await response.data;
            setTotalLost(data.total);
            setLots(data.lots);
            setFilteredLost(data.lots.filter((item) => item.status_id === 1 || item.status_id === 0))
            setIsSkeleton(false);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        if (lots.length <= totalLots) {
            console.log("🚀 ~ ExitingLotsDialog ~ totalLots:", true)
            setQuery({
                ...query,
                limit: totalLots
            })
        } else {
            null
        }
    }, [totalLots, lots.length]);


    useEffect(() => {
        // if (totalLots <= lots.length) {
        //     setQuery({
        //         ...query,
        //         limit: totalLots
        //     })
        // } else {
        //     null
        // }
        fetchData();
    }, [query]);
    return (
        <>
            <div className="w-full">
                <Popover open={open} onOpenChange={setOpen} modal={true}>
                    <p className={`${form.formState.errors.lots_id ? "text-red-500" : ""}`}>Select Lot</p>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[100%] justify-between"
                        >
                            {lotsName ? lotsName : "Select Lot..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px]  p-0">
                        <Command>
                            <CommandInput placeholder="Search Lots..." />
                            <CommandEmpty>No Lots Found.</CommandEmpty>
                            <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                                <CommandGroup>
                                    {filteredLost?.map((lots) => (
                                        <>
                                            <CommandItem
                                                key={lots.lots_id}
                                                value={lots.label}
                                                onSelect={(currentValue) => {
                                                    setValue(currentValue === value ? "" : currentValue)
                                                    setOpen(false)
                                                    selectedLotsID(lots.lots_id, lots.label)
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        value === lots.lots_id ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                <p className=" text-xs">{lots.lots_id} | {lots.label} </p>
                                            </CommandItem>
                                        </>
                                    ))}
                                </CommandGroup>
                            </ScrollArea>
                        </Command>
                    </PopoverContent>
                    {
                        form.formState.errors.lots_id ? <p className="text-red-500 text-xs mt-3">Please select a lot</p> : null
                    }
                </Popover>
                <div className="flex flex-row justify-between w-full gap-3 pt-4">
                    <Button
                        type="button"
                        variant="redOutline"
                        className="w-full"
                        onClick={() => {
                            close()
                            form.reset();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="w-full"
                        variant="destructive"
                    >Save changes
                    </Button>
                </div>
            </div>
        </>
    )
}