"use client"

import * as React from "react"
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

import data from '../../../../../data/admin/TransportLotsData.json'

export function ExitingLotsDialog() {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    return (
        <>
            <div className="w-full">
                <Popover open={open} onOpenChange={setOpen}>
                    <p>Select Lots</p>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[100%] justify-between"
                        >
                            {value
                                ? data.find((lots) => lots.LotsID === value)?.LotsLabel
                                : "Select Lots..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[100%]  p-0">
                        <Command>
                            <CommandInput placeholder="Search Lots..." />
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                                {data.map((lots) => (
                                    <CommandItem
                                        key={lots.LotsID}
                                        value={lots.LotsID}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue)
                                            setOpen(false)
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === lots.LotsID ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        <p className=" text-xs">{lots.LotsID} | {lots.LotsLabel} | {lots.LotsContainer}</p>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
        </>
    )
}