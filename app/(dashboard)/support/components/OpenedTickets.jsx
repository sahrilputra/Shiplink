import React from 'react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { XIcon } from 'lucide-react'
import { ArrowIcon, SendIcons } from '@/components/icons/iconCollection'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Link2Icon } from 'lucide-react'
export const OpenedTickets = ({ close }) => {
    return (
        <>

            <div className="wrapper relative h-screen overflow-hidden">
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-[10px] right-[10px]"
                    onClick={close}
                >
                    <XIcon width={20} height={20} fill='#dedede' />
                </Button>
                <div className="header w-full flex flex-col px-[20px] pt-[20px]">
                    <div className="w-[130px] h-[18px] justify-start items-center gap-1 inline-flex">
                        <div className="w-[13px] h-[13px] bg-green-400 bg-opacity-30 rounded-[66px] border border-green-400" />
                        <div className="text-zinc-600 text-xs font-normal font-['Poppins']">Active</div>
                    </div>
                    <div><span className="text-black text-xs font-normal font-['Poppins']">John Doe | </span><span className="text-zinc-600 text-xs font-normal font-['Poppins']">JohnDoe@gmail.com</span></div>
                    <div><span className="text-zinc-600 text-xs font-normal font-['Poppins']">27/3/2023</span><span className="text-black text-xs font-normal font-['Poppins']"> 22:22:30</span></div>
                    <div className="text-black text-lg font-normal font-['Poppins']">Subject Goes Here</div>
                    <div className="flex justify-end">
                        <Button
                            variant="destructive"
                            size="sm"
                        >
                            <p className='text-xs'>Close Tickets</p>
                        </Button>
                    </div>
                </div>

                <div className=" w-full p-3">
                    <Separator className="py-[2px]" />
                </div>

                <ScrollArea className="box w-[90%] h-[50%] mx-auto ">
                    <div className="flex flex-col gap-4">
                        <div className="px-[10px] py-[8px] h-max rounded-md border border-neutral-200 flex-col flex">
                            <div className="top py-3 px-4">
                                <div className="text-black text-base font-medium font-['Poppins']">(You) Re : Hosting terkelola yang didukung Jetpack</div>
                                <div className="text-sky-700 text-xs font-light font-['Poppins']">adminShipLink@gmail.com</div>
                            </div>

                            <div className="break w-[90%] flex flex-row gap-3 justify-between items-center mx-auto py-[5px]">
                                <Separator className="py-[2px] w-[90%]" />
                                <ArrowIcon width={15} height={15} className="w-[15px] h-[15px]" />
                            </div>

                            <div className="chat px-4 py-3 text-sm font-normal">
                                <p className=''>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente vel qui quo fugiat officiis vitae voluptatibus repellat quos perferendis explicabo!</p>
                            </div>
                        </div>
                        <div className="px-[10px] py-[8px] rounded-md border border-neutral-200 flex-col flex">
                            <div className="top py-3 px-4">
                                <div className="text-black text-base font-medium font-['Poppins']">(You) Re : Hosting terkelola yang didukung Jetpack</div>
                                <div className="text-sky-700 text-xs font-light font-['Poppins']">adminShipLink@gmail.com</div>
                            </div>

                            <div className="break w-[90%] flex flex-row gap-3 justify-between items-center mx-auto py-[5px]">
                                <Separator className="py-[2px] w-[90%]" />
                                <ArrowIcon width={15} height={15} className="w-[15px] h-[15px]" />
                            </div>

                            <div className="chat px-4 py-3 text-sm font-normal">
                                <p className=''>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente vel qui quo fugiat officiis vitae voluptatibus repellat quos perferendis explicabo!</p>
                            </div>
                        </div>
                        <div className="px-[10px] py-[8px] rounded-md border border-neutral-200 flex-col flex">
                            <div className="top py-3 px-4">
                                <div className="text-black text-base font-medium font-['Poppins']">(You) Re : Hosting terkelola yang didukung Jetpack</div>
                                <div className="text-sky-700 text-xs font-light font-['Poppins']">adminShipLink@gmail.com</div>
                            </div>

                            <div className="break w-[90%] flex flex-row gap-3 justify-between items-center mx-auto py-[5px]">
                                <Separator className="py-[2px] w-[90%]" />
                                <ArrowIcon width={15} height={15} className="w-[15px] h-[15px]" />
                            </div>

                            <div className="chat px-4 py-3 text-sm font-normal">
                                <p className=''>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente vel qui quo fugiat officiis vitae voluptatibus repellat quos perferendis explicabo!</p>
                            </div>
                        </div>
                        <div className="break h-[40%] py-[30px] contents ">
                        </div>
                    </div>


                </ScrollArea>

                <div className="message absolute bottom-[100px] h-[80px]  w-full left-0 right-0 ">
                    <div className="flex w-full h-max mx-auto flex-row justify-between items-center px-[15px]">
                        <div className="w-[90%]">
                            < Textarea
                                className="resize-none w-[100%] h-[20px] shadow-md  border-[2px]"
                            />
                        </div>
                        <div className="w-[10%] px-[10px] gap-4">
                            <Button
                                variant="destructive"
                                size="icon"
                                className="w-[35px] h-[30px] flex items-center justify-center"
                            >
                                <SendIcons width={15} height={15} className="text-white " />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="w-[35px] h-[30px] flex items-center justify-center"
                            >
                                <Link2Icon width={15} height={15} className="text-black " />
                            </Button>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}