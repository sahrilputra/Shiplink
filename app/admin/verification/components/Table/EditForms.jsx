'use client'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { TrashIcon } from 'lucide-react'
import { XIcon } from 'lucide-react'
import React from 'react'
import InputMask from 'react-input-mask';

export const EditForms = ({ counter, forms, data, removeContent }) => {


    const handlingDataValue = () => {
        data.map((item, index) => {
            console.log("Looping Items ", item)
            forms.setValue(`package_content[${index}].qty`, item.qty)
            forms.setValue(`package_content[${index}].value`, item.value)
            forms.setValue(`package_content[${index}].desc`, item.desc)
            forms.setValue(`package_content[${index}].hs_desc`, item.hs_desc)
            forms.setValue(`package_content[${index}].hs_code`, item.hs_code)
            forms.setValue(`package_content[${index}].made_in`, item.made_in)
        })
    }
    handlingDataValue();
    return (
        <>
            {data.map((item, index) => (
                <>
                    <div
                    key={item.id}
                    className=" flex flex-row gap-3 justify-start border-y-2 border-zinc-600/20 p-2">
                        <div className="flex flex-col relative w-[80px] h-10 justify-center items-center">
                            <p className=' absolute top-0 left-0 text-myBlue text-xs h-[20px]'>Qty</p>
                            <div className="h-10 w-full flex justify-start items-end">
                                <>
                                    <FormField
                                        className="w-full flex flex-row justify-center items-end"
                                        name={`package_content[${index}].qty`}
                                        control={forms.control}
                                        render={({ field }) => (
                                            <>
                                                <FormItem className="w-full text-sm">
                                                    <FormControl>
                                                        <Input id="width"
                                                            className=' text-sm font-light pl-2 h-8 focus-visible:ring-0'
                                                            type="number"
                                                            placeholder="0" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </>
                                        )}
                                    />
                                </>
                            </div>
                        </div>
                        <div className="flex flex-col relative w-[150px] h-10 justify-center items-center">
                            <p className=' absolute top-0 left-0 text-myBlue text-xs h-[20px]'>Value</p>
                            <div className="h-10 w-full flex justify-start items-end">
                                <>
                                    <FormField
                                        className="w-full flex flex-row justify-center items-end"
                                        name={`package_content[${index}].value`}
                                        control={forms.control}
                                        render={({ field }) => (
                                            <>
                                                <FormItem className="w-full text-sm">
                                                    <FormControl>
                                                        <Input id="width"
                                                            className=' text-sm font-light pl-2 h-8 focus-visible:ring-0'
                                                            type="number"
                                                            placeholder="0" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </>
                                        )}
                                    />
                                </>

                            </div>
                        </div>
                        <div className="flex flex-col relative w-[50%] h-10 justify-center items-center">
                            <p className=' absolute top-0 left-0 text-myBlue text-xs h-[20px]'>User Description</p>
                            <div className="h-10 w-full flex justify-start items-end">
                                <>
                                    <FormField
                                        className="w-full flex flex-row justify-center items-end"
                                        name={`package_content[${index}].desc`}
                                        control={forms.control}
                                        render={({ field }) => (
                                            <>
                                                <FormItem className="w-full text-sm">
                                                    <FormControl>
                                                        <Input id="width"
                                                            className=' text-sm font-light pl-2 h-8 focus-visible:ring-0'
                                                            type="number"
                                                            placeholder="HS Description" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </>
                                        )}
                                    />
                                </>
                            </div>
                        </div>

                        <div className="flex flex-col relative  w-[50%] h-10 justify-center items-center">
                            <p className=' absolute top-0 left-0 text-myBlue text-xs h-[20px]'>HS Description</p>
                            <div className="h-10 w-full flex justify-start items-end">
                                <>
                                    <FormField
                                        className="w-full flex flex-row justify-center items-end"
                                        name={`package_content[${index}].hs_desc`}
                                        control={forms.control}
                                        render={({ field }) => (
                                            <>
                                                <FormItem className="w-full text-sm">
                                                    <FormControl>
                                                        <Input id="width"
                                                            className=' text-sm font-light pl-2 h-8 focus-visible:ring-0'
                                                            type="number"
                                                            placeholder="Description" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            </>
                                        )}
                                    />
                                </>
                            </div>
                        </div>
                        <div className="flex flex-col relative w-[200px] h-10 justify-center items-center">
                            <p className=' absolute top-0 left-0 text-myBlue text-xs h-[20px]'>HS Code</p>
                            <div className="h-10 w-full flex justify-start items-end">
                                <FormField
                                    className="w-full flex flex-row justify-center items-end"
                                    name={`package_content[${index}].hs_code`}
                                    control={forms.control}
                                    render={({ field }) => (
                                        <>
                                            <FormItem className="w-full text-xs">
                                                <FormControl>
                                                    <InputMask
                                                        mask="9999.99.9999" // Format yang diinginkan
                                                        maskPlaceholder="0000.00.0000"
                                                        className='text-sm font-light pl-2 h-8 outline-none focus-visible:ring-0'
                                                        {...field}
                                                    >
                                                        {(inputProps) => (
                                                            <Input
                                                                className="text-sm font-light pl-2 h-8 focus-visible:ring-0"
                                                                id="hs_code"
                                                                type="text"
                                                                placeholder="0000.00.0000"
                                                                {...inputProps}
                                                            />
                                                        )}
                                                    </InputMask>

                                                </FormControl>
                                            </FormItem>
                                        </>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col relative w-[100px] h-10 justify-center items-center">
                            <p className=' absolute top-0 left-0 text-myBlue text-xs h-[20px]'>Made In</p>
                            <div className="h-10 w-full flex justify-start items-end">
                                <>
                                    <FormField
                                        className="w-full flex flex-row justify-center items-end"
                                        name={`package_content[${index}].made_in`}
                                        control={forms.control}
                                        render={({ field }) => (
                                            <>
                                                <FormItem className="w-full text-sm">
                                                    <FormControl>
                                                        <Input
                                                            max="3"
                                                            className="text-sm font-light pl-2 h-8 outline-none focus-visible:ring-0 uppercase"
                                                            id="made_in" placeholder="CAN" {...field} />
                                                    </FormControl>
                                                </FormItem>
                                            </>
                                        )}
                                    />
                                </>
                            </div>
                        </div>
                        <div className="flex flex-col relative h-10 justify-end items-end">
                            {
                                index > 0 ? (
                                    <div className="flex flex-row justify-between gap-2 w-full">
                                        <Button
                                            variant="softBlue"
                                            size="icon"
                                            type="button"
                                            className='w-[30px] h-[30px] rounded '
                                            onClick={()=> removeContent(index)}
                                        >
                                            <XIcon width={20} height={20} />
                                        </Button>
                                    </div>
                                ) : (
                                    <></>
                                )
                            }
                        </div>
                    </div>
                </>
            ))}

        </>
    )
}
