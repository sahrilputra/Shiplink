"use client";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PopoverClose } from "@radix-ui/react-popover";
import { CheckIcon } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import React from 'react'
import { cn } from "@/lib/utils"
import data from '../../../../data/admin/UserData.json'

export const Tester = ({ forms }) => {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [selected, setSelected] = useState("");

    

    return (
        <FormField
            name="customerID"
            className="w-[60%] text-xs"
            control={forms.control}
            render={({ field }) => (
                <>
                    <FormItem className="w-full text-xs">
                        <FormLabel className=" font-bold">Customer ID</FormLabel>
                        <FormControl>
                            <Input
                                id="customerID"
                                className={`text-xs h-[30px] rounded-sm px-2 py-0`}
                                placeholder="Find Customer ID"
                                {...field}
                            />
                        </FormControl>
                        <Popover className="w-full" open={open} onOpenChange={setOpen}>
                            <PopoverContent className=" p-0 h-[200px] w-[100%]">
                                <ScrollArea className="h-[200px] w-[100%]">
                                    <Command className="w-full">
                                        <CommandInput
                                            placeholder="Find User..."
                                            className="h-9 shadow-none text-xs"
                                        />
                                        <CommandEmpty className="text-xs text-center py-2">No Customer Found.</CommandEmpty>
                                        <PopoverClose>
                                            <CommandGroup className="w-full">
                                                {data.map((item) => (
                                                    <CommandItem
                                                        value={item.id}
                                                        key={item.id}
                                                        className="w-full"
                                                        onSelect={() => {
                                                            forms.setValue("customerID", item.id)
                                                            handleDataChange({ target: { value: item.id } })
                                                        }}
                                                    >
                                                        <div className='text-xs w-full justify-between flex flex-row'>
                                                            <p>{item.id} | </p>
                                                            <p>{item.full_name}</p>
                                                        </div>
                                                        <CheckIcon
                                                            className={cn(
                                                                "ml-auto h-4 w-4",
                                                                item.id === field.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </PopoverClose>
                                    </Command>
                                </ScrollArea>
                            </PopoverContent>
                        </Popover>
                    </FormItem>

                </>
            )}
        />

    );
};
