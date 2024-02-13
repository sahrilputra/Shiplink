import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import { Separator } from '@/components/ui/separator'
const formSchema = yup.object().shape({
    shipment_date: yup.string().required().max(50, "character is too long"),
    insurance: yup.string().required(),
    comodition: yup.string().required(),
    package: yup.string().required(),
    reference: yup.string().required(),
    savedBox: yup.string().required(),
    qty: yup.string().required(),
    dimesion_length: yup.string().required(),
    dimesion_width: yup.string().required(),
    dimesion_height: yup.string().required(),
    dimesion_weight: yup.string().required(),
})

export const BottomForm = () => {
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            shipment_date: "",
            insurance: "",
            comodition: "",
            package: "",
            reference: "",
            savedBox: "",
            qty: "",
            dimesion_length: "",
            dimesion_width: "",
            dimesion_height: "",
            dimesion_weight: "",
        },
        mode: "onChange",
    })

    const [clicked, isClicked] = useState(false);
    const [openCommand, setOpenCommand] = useState(false)
    const handleOpenCommand = (event) => {
        if (!event.target.value.trim() || event.target.value.length < 2) {
            setOpenCommand(false);
        } else {
            setOpenCommand(true);
        }
        setQuery({
            ...query,
            keyword: event.target.value
        });
    }
    const toggleClicked = (clickedButtons) => {
        isClicked(clickedButtons);
    }
    return (
        <Form {...form}>
            <form
                className='flex gap-2 flex-col'
                action="">
                <div className="profile flex flex-row gap-2 w-full">
                    <FormField
                        className="w-full"
                        name="shipment_date"
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full space-y-1">
                                    <FormLabel className="font-bold">Shipment Date *</FormLabel>
                                    <FormControl>
                                        <Input id="shipment_date" placeholder="john" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </>
                        )}
                    />
                    <FormField
                        className="w-full"
                        name="insurance"
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full space-y-1">
                                    <FormLabel className="font-bold">Insurance Amount CAD</FormLabel>
                                    <FormControl>
                                        <Input type='number' id="full_name" placeholder="john" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </>
                        )}
                    />
                    <FormField
                        name="comodition"
                        className="w-full"
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full space-y-1">
                                    <FormLabel className="font-bold">Comodition Type</FormLabel>
                                    <Select className="w-full" onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl className="w-full" >
                                            <SelectTrigger className="w-full text-xs">
                                                <SelectValue className="w-full" placeholder="Theme" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem className="text-xs" value="light">Light</SelectItem>
                                            <SelectItem className="text-xs" value="dark">Dark</SelectItem>
                                            <SelectItem className="text-xs" value="system">System</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            </>
                        )}
                    />
                </div>
                <div className="wrap flex flex-row items-center justify-between gap-2">
                    <FormField
                        name="type"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="space-y-3 w-full">
                                <FormLabel className="font-bold">Package</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex flex-row space-y-1 gap-2"
                                    >
                                        <FormItem className="flex items-center space-x-2 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Envelope" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Envelope
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-2 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Package" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Package
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-2 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="Pallete" />
                                            </FormControl>
                                            <FormLabel className="font-normal">Pallete</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="qty"
                        className="w-full"
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full space-y-1 flex flex-col items-center">
                                    <FormLabel className="font-bold text-center w-full">QTY</FormLabel>
                                    <FormControl >
                                        <>
                                            <div className="flex flex-row gap-1 items-center">
                                                <Button
                                                    variant="redOutline"
                                                    size="xs"
                                                    type="button"
                                                >
                                                    -
                                                </Button>
                                                <Button
                                                    size="xs"
                                                    variant="ghost"
                                                    type="button"
                                                >
                                                    1
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="xs"
                                                    type="button"
                                                >
                                                    +
                                                </Button>
                                            </div>
                                        </>
                                    </FormControl>
                                </FormItem>
                            </>
                        )}
                    />
                    <FormField
                        name="reference"
                        className="w-full"
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full space-y-1">
                                    <FormLabel className="font-bold">Reference Code</FormLabel>
                                    <FormControl >
                                        <Input type="text" id="reference" placeholder="State / Province"  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </>
                        )}
                    />
                </div>

                <div className="wrap flex flex-row items-end gap-2">
                    <div className="">
                        <div className="p-1 rounded-md border w-max border-neutral-200 justify-start items-start gap-2.5 inline-flex ">
                            <button
                                type="button"
                                id='savedAddress'
                                className={`font-normal px-2.5 py-[8px] w-[120px] text-nowrap justify-center items-center gap-2.5 flex rounded hover:bg-red-100
                            ${clicked ? 'bg-none' : 'bg-red-700 text-white font-semiBold hover:bg-red-800'}`}
                                onClick={() => toggleClicked(false)}
                            >
                                <p className=" text-[11px] font-['Poppins'] leading-tight">Address Book</p>
                            </button>
                            <button
                                type="button"
                                id='newAddress'
                                className={`font-normal px-2.5 py-[8px] w-[120px] text-nowrap justify-center items-center gap-2.5 flex rounded hover:bg-red-100
                            ${clicked ? 'bg-red-700 text-white font-semiBold hover:bg-red-800' : 'bg-none'}`}
                                onClick={() => toggleClicked(true)}
                            >
                                <p className=" text-[11px] font-['Poppins'] leading-tight">Custom Address</p>
                            </button>
                        </div>
                    </div>
                    <FormField
                        name="zipCode"
                        className="w-full"
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <div className="relative w-[100%]">
                                    <div className="flex flex-col gap-1 w-full">
                                        <p className="text-xs text-neutral-900 space-y-1 font-bold">Search Saved Box</p>
                                        <Input
                                            className="text-xs p-0 py-1 px-2 focus:ring-offset-0"
                                            id="country_code"
                                            type="text"
                                            placeholder="Search Country"
                                            onChange={handleOpenCommand}
                                        />
                                    </div>
                                    {openCommand && (
                                        <div className="absolute bottom-100 w-full p-2 shadow bg-white">
                                            <Command>
                                                <CommandEmpty>No Country Found.</CommandEmpty>
                                                <CommandGroup>
                                                    <CommandItem

                                                    >
                                                        helo
                                                    </CommandItem>

                                                </CommandGroup>
                                            </Command>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    />

                    <div className="flex flex-row gap-2 w-full items-end">
                        <div className="flex flex-row gap-2">
                            <FormField
                                className="w-full flex flex-row justify-center "
                                name="length"
                                control={form.control}
                                render={({ field, formState }) => (
                                    <>
                                        <FormItem className="w-full text-xs">
                                            <FormControl>
                                                <Input
                                                    id="length"
                                                    className={`text-xs  rounded-sm px-2 py-0 ${formState.errors.length && "border-red-500 focus:ring-red-700 text-red-800"}`}
                                                    type="number"
                                                    placeholder="length" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    </>
                                )}
                            />
                            <FormField
                                className="w-full flex flex-row justify-center "
                                name="width"
                                control={form.control}
                                render={({ field, formState }) => (
                                    <>
                                        <FormItem className="w-full text-xs">
                                            <FormControl>
                                                <Input
                                                    id="width"
                                                    className={`${formState.errors.width && "border-red-500 focus:ring-red-700 text-red-800"} text-xs  rounded-sm px-2 py-0`}
                                                    type="number"
                                                    placeholder="width" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    </>
                                )}
                            />
                            <FormField
                                className="w-full flex flex-row justify-center "
                                name="height"
                                control={form.control}
                                render={({ field, formState }) => (
                                    <>
                                        <FormItem className="w-full text-xs">
                                            <FormControl>
                                                <Input
                                                    id="height"
                                                    type="number"
                                                    className={`${formState.errors.height && "border-red-500 focus:ring-red-700 text-red-800"} text-xs  rounded-sm px-2 py-0`}
                                                    placeholder="height" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    </>
                                )}
                            />
                        </div>
                        <FormField
                            name="heightType"
                            className="w-full "
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-[40%] text-xs" >
                                        <Select
                                            onValueChange={field.onChange}
                                            control={form.control}
                                            defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="text-xs rounded-sm px-2 py-0">
                                                    <SelectValue placeholder="in" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem className="text-xs" value="in">in</SelectItem>
                                                <SelectItem className="text-xs" value="mm">mm</SelectItem>
                                                <SelectItem className="text-xs" value="cm">cm</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                </>
                            )}
                        />
                    </div>

                </div>

                <div className="w-full py-3">
                    <Separator className="h-[2px]" />
                </div>

                <div className="w-full flex flex-row gap-2 items-center">
                    <FormField
                        className="w-[40%]"
                        name="description"
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-[40%] space-y-1">
                                    <FormControl>
                                        <Input id="full_name" placeholder="Description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </>
                        )}
                    />
                    <FormField
                        className="w-[100px]"
                        name="qty"
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-[100px] space-y-1">
                                    <FormControl>
                                        <Input id="full_name" placeholder="Qty" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </>
                        )}
                    />
                    <FormField
                        className="w-[200px]"
                        name="value"
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-[200px] space-y-1">
                                    <FormControl>
                                        <Input id="full_name" placeholder="$0.00" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </>
                        )}
                    />
                    <FormField
                        className="w-[200px]"
                        name="from"
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-[200px] space-y-1">
                                    <FormControl>
                                        <Input id="CAD" placeholder="CAN" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </>
                        )}
                    />
                    <FormField
                        className="w-[50%]"
                        name="HSCode"
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-[50%] space-y-1">
                                    <FormControl>
                                        <Input id="" placeholder="HS Code" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </>
                        )}
                    />

                </div>
            </form>
        </Form >
    )
}
