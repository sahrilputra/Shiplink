import { Button } from '@/components/ui/button'
import { CommandEmpty, CommandItem, Command, CommandGroup, CommandInput, CommandArrival, CommandList } from '@/components/ui/command'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { PopoverClose } from '@radix-ui/react-popover'
import { Check, CheckIcon } from 'lucide-react'
import React, { useCallback, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Command as CommandPrimitive } from "cmdk"


export const Tester = ({ forms }) => {

    const [value, onValueChange] = useState(null)
    const inputRef = useRef(null)
    const [isOpen, setOpen] = useState(false)
    const [selected, setSelected] = useState(value)
    const [inputValue, setInputValue] = useState(value?.label || "")
    const handleKeyDown = useCallback(
        event => {
            const input = inputRef.current
            if (!input) {
                return
            }
            // Keep the options displayed when the user is typing
            if (!isOpen) {
                setOpen(true)
            }
            // This is not a default behaviour of the <input /> field
            if (event.key === "Enter" && input.value !== "") {
                const optionToSelect = data.find(option => option.value === input.value)
                if (optionToSelect) {
                    setSelected(optionToSelect)
                    onValueChange?.(optionToSelect)
                }
            }

            if (event.key === "Escape") {
                input.blur()
            }
        },
        [isOpen, onValueChange]
    )

    const handleBlur = useCallback(() => {
        setOpen(false)
        setInputValue(selected?.value)
    }, [selected])

    console.log(forms.getValues('carrier'))
    return (
        <FormField
            className="w-full text-sm"
            name="carrier"
            control={forms.control}
            render={({ field }) => (
                <>
                    <FormItem className="w-[50%] text-xs ">
                        <FormLabel className="font-bold">Select Carrier</FormLabel>
                        <FormControl className="w-full relative">
                            <CommandPrimitive className='border-b-0' onKeyDown={handleKeyDown}>
                                <div>
                                    <CommandArrival
                                        ref={inputRef}
                                        value={inputValue}
                                        onValueChange={setInputValue}
                                        onBlur={handleBlur}
                                        onFocus={() => setOpen(true)}
                                        placeholder={`${field.value || "Carrier"}`}
                                        className="text-xs border border-neutral-300 px-2"
                                        disableSearchIcon={true}
                                    />
                                </div>
                                <div className="mt-1 relative">
                                    {isOpen ? (
                                        <div className="absolute top-0 z-10 w-full rounded-xl bg-stone-50 outline-none animate-in fade-in-0 zoom-in-95">
                                            <CommandList className="ring-1 ring-slate-200 rounded-lg">
                                                <CommandGroup>
                                                    {data.map((item, index) => {
                                                        const isSelected = selected?.value === item.value
                                                        return (
                                                            <CommandItem
                                                                value={item.value}
                                                                onValueChange={field.onChange}
                                                                key={item.index}
                                                                className={cn(
                                                                    "flex items-center gap-2 w-full",
                                                                    !isSelected ? "pl-8" : null
                                                                )}
                                                                onMouseDown={event => {
                                                                    event.preventDefault()
                                                                    event.stopPropagation()
                                                                }}
                                                                onSelect={() => {
                                                                    forms.setValue("carrier", item.value)
                                                                    setOpen(false)
                                                                }}
                                                            >
                                                                <div className='text-xs w-full justify-between flex flex-row'>
                                                                    <p>{item.carrierName} </p>
                                                                </div>
                                                                <CheckIcon
                                                                    className={cn(
                                                                        "ml-auto h-4 w-4",
                                                                        item.value === field.value
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                            </CommandItem>
                                                        )
                                                    })}
                                                </CommandGroup>
                                                <CommandEmpty className="text-xs text-center py-2">No Customer Found.</CommandEmpty>
                                            </CommandList>
                                        </div>
                                    ) : null}
                                </div>
                            </CommandPrimitive>
                        </FormControl>
                    </FormItem>
                </>
            )}
        />
    )
}
