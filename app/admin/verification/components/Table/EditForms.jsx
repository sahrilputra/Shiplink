'use client'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { TrashIcon } from 'lucide-react'
import { XIcon } from 'lucide-react'
import React from 'react'


export const EditForms = ({ counter, forms, data }) => {
    console.log("counters", counter)
   
    return (
        <>
            <div className=" flex flex-row gap-3 justify-start border-y-2 border-zinc-600/20 p-2">
                <div className="flex flex-col relative w-[80px] h-10 justify-center items-center">
                    <p className=' absolute top-0 left-0 text-myBlue text-xs h-[20px]'>Qty</p>
                    <div className="h-10 w-full flex justify-start items-end">
                        <>
                            <FormField
                                className="w-full flex flex-row justify-center items-end"
                                name={`qty`}
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
                                name={`value`}
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
                                name={`hsDescription`}
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
                                name={`description`}
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
                        <Input className=' text-sm font-light pl-2 h-8 focus-visible:ring-0' placeholder="8103.99.0000" />
                    </div>
                </div>
                <div className="flex flex-col relative w-[100px] h-10 justify-center items-center">
                    <p className=' absolute top-0 left-0 text-myBlue text-xs h-[20px]'>Made In</p>
                    <div className="h-10 w-full flex justify-start items-end">
                        <Input className=' text-sm font-light pl-2 h-8 outline-none focus-visible:ring-0' placeholder="CAN" />
                    </div>
                </div>
                <div className="flex flex-col relative h-10 justify-end items-end">
                    <Button
                        variant="softBlue"
                        size="icon"
                        className='w-[30px] h-[30px] rounded '
                    >
                        <XIcon width={20} height={20} />
                    </Button>
                </div>
            </div>
        </>
    )
}
