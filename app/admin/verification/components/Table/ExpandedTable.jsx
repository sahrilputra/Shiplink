import React from 'react'
import { ImageTable } from './ImageTable'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { TrashIcon } from 'lucide-react'
export const ExpandedTable = ({ type }) => {
    return (
        <>
            <div className="w-[80%] flex justify-center items-center mx-auto">
                <ImageTable />
            </div>
            {type === "edit" ? (
                <>
                    <div className=" flex flex-row gap-3 justify-start border-b-2 border-zinc-600/20 p-2">
                        <div className="flex flex-col relative w-[80px] h-10 justify-center items-center">
                            <p className=' absolute top-0 left-0 text-myBlue text-xs h-[20px]'>Qty</p>
                            <div className="h-10 w-full flex justify-start items-end">
                                <Input className=' text-sm font-light pl-2 h-8 focus-visible:ring-0' placeholder="1" />
                            </div>
                        </div>
                        <div className="flex flex-col relative w-[150px] h-10 justify-center items-center">
                            <p className=' absolute top-0 left-0 text-myBlue text-xs h-[20px]'>Value</p>
                            <div className="h-10 w-full flex justify-start items-end">
                                <Input className=' text-sm font-light pl-2 h-8 focus-visible:ring-0' placeholder="$120.00" />
                            </div>
                        </div>
                        <div className="flex flex-col relative w-[50%] h-10 justify-center items-center">
                            <p className=' absolute top-0 left-0 text-myBlue text-xs h-[20px]'>User Description</p>
                            <div className="h-10 w-full flex justify-start items-end">
                                <Input className=' text-sm font-light pl-2 h-8 focus-visible:ring-0' placeholder="Description" />
                            </div>
                        </div>

                        <div className="flex flex-col relative  w-[50%] h-10 justify-center items-center">
                            <p className=' absolute top-0 left-0 text-myBlue text-xs h-[20px]'>HS Description</p>
                            <div className="h-10 w-full flex justify-start items-end">
                                <Input className=' text-sm font-light pl-2 h-8 focus-visible:ring-0' placeholder="HS Description" />
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
                                className='w-[30px] h-[30px] '
                            >
                                <TrashIcon width={20} height={20} />
                            </Button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="">
                    <div className=" flex flex-row gap-3 justify-start border-b-2 border-zinc-600/20 p-2">
                        <div className="flex flex-col relative w-[80px] h-10 justify-center items-center">
                            <p className=' absolute top-0 left-0 text-myBlue text-xs h-[20px]'>Qty</p>
                            <div className="h-10 w-full flex justify-start items-end">
                                <p className=' text-sm font-light pl-2'>1</p>
                            </div>
                        </div>
                        <div className="flex flex-col relative w-[150px] h-10 justify-center items-center">
                            <p className=' absolute top-0 left-0 text-myBlue text-xs h-[20px]'>Value</p>
                            <div className="h-10 w-full flex justify-start items-end">
                                <p className=' text-sm font-light'>$ 120.00</p>
                            </div>
                        </div>
                        <div className="flex flex-col relative w-[50%] h-10 justify-center items-center">
                            <p className=' absolute top-0 left-0 text-myBlue text-xs h-[20px]'>User Description</p>
                            <div className="h-10 w-full flex justify-start items-end">
                                <p className=' text-sm font-light'>Description</p>
                            </div>
                        </div>

                        <div className="flex flex-col relative  w-[50%] h-10 justify-center items-center">
                            <p className=' absolute top-0 left-0 text-myBlue text-xs h-[20px]'>HS Description</p>
                            <div className="h-10 w-full flex justify-start items-end">
                                <p className=' text-sm font-light'>HS Description</p>
                            </div>
                        </div>
                        <div className="flex flex-col relative w-[200px] h-10 justify-center items-center">
                            <p className=' absolute top-0 left-0 text-myBlue text-xs h-[20px]'>HS Code</p>
                            <div className="h-10 w-full flex justify-start items-end">
                                <p className=' text-sm font-light'>8103.99.0000</p>
                            </div>
                        </div>
                        <div className="flex flex-col relative w-[100px] h-10 justify-center items-center">
                            <p className=' absolute top-0 left-0 text-myBlue text-xs h-[20px]'>Made In</p>
                            <div className="h-10 w-full flex justify-start items-end">
                                <p className=' text-sm font-light'>CAN</p>
                            </div>
                        </div>
                    </div>
                    <div className=" flex flex-row gap-3 justify-start border-b-2 border-zinc-600/20 p-2">
                        <div className="flex flex-col relative w-[80px] h-10 justify-center items-center">
                            <p className=' absolute top-0 left-0 text-myBlue text-xs h-[20px]'>Qty</p>
                            <div className="h-10 w-full flex justify-start items-end">
                                <p className=' text-sm font-light pl-2'>1</p>
                            </div>
                        </div>
                        <div className="flex flex-col relative w-[150px] h-10 justify-center items-center">
                            <p className=' absolute top-0 left-0 text-myBlue text-xs h-[20px]'>Value</p>
                            <div className="h-10 w-full flex justify-start items-end">
                                <p className=' text-sm font-light'>$ 120.00</p>
                            </div>
                        </div>
                        <div className="flex flex-col relative w-[50%] h-10 justify-center items-center">
                            <p className=' absolute top-0 left-0 text-myBlue text-xs h-[20px]'>User Description</p>
                            <div className="h-10 w-full flex justify-start items-end">
                                <p className=' text-sm font-light'>Description</p>
                            </div>
                        </div>

                        <div className="flex flex-col relative  w-[50%] h-10 justify-center items-center">
                            <p className=' absolute top-0 left-0 text-myBlue text-xs h-[20px]'>HS Description</p>
                            <div className="h-10 w-full flex justify-start items-end">
                                <p className=' text-sm font-light'>HS Description</p>
                            </div>
                        </div>
                        <div className="flex flex-col relative w-[200px] h-10 justify-center items-center">
                            <p className=' absolute top-0 left-0 text-myBlue text-xs h-[20px]'>HS Code</p>
                            <div className="h-10 w-full flex justify-start items-end">
                                <p className=' text-sm font-light'>8103.99.0000</p>
                            </div>
                        </div>
                        <div className="flex flex-col relative w-[100px] h-10 justify-center items-center">
                            <p className=' absolute top-0 left-0 text-myBlue text-xs h-[20px]'>Made In</p>
                            <div className="h-10 w-full flex justify-start items-end">
                                <p className=' text-sm font-light'>CAN</p>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </>
    )
}
