import React from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import * as yup from 'yup'
import { Toast } from '@/components/ui/toast'
import { DetailsIcons } from '@/components/icons/iconCollection'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { CopyIcons } from '@/components/icons/iconCollection'

export const DetailsModals = () => {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        className="relative w-[40px] h-[40px] p-3 px-[5px] flex justify-center items-center"
                        variant="destructive"
                    >
                        <div className="w-[40px] h-[40px] p-3 relative">
                            <DetailsIcons width={30} height={30} className="w-[40px] h-[40px] px-2 absolute top-0 left-[-5px]" />
                        </div>
                    </Button>
                </DialogTrigger>
                <DialogContent className="w-max">
                  
                    <DialogDescription className="font-normal text-black flex flex-row flex-wrap justify-between gap-5 w-[700px]">
                        <div className="imageContainer w-[380px]">
                            <Image
                                src={"/assets/packageImage/packagePicture.png"}
                                width={500}
                                height={500}
                                alt='package Images'
                                className=' object-cover w-full h-full rounded-md'
                            />
                        </div>
                        <div className="Details w-[40%]">
                            <div className="wrap">
                                <h3 className=' text-[14px] text-lg'>Consolidate Package Request</h3>
                                <p className=' text-[14px]'>#2312-232131</p>
                                <p className='text-myBlue text-sm'>Shipping Mailbox</p>
                                <p className='text-red-700 flex flex-row gap-2 items-center justify-start'>832131231321 <CopyIcons className="cursor-pointer" width={12} height={12} /></p>
                            </div>

                            <div className="Information">
                                <h3 className=' text-[14px]'>Package Name</h3>
                                <p className=' text-[14px]'>12mm x 10mm x 10mm</p>
                                <p className='text-myBlue text-sm'>12 ibs</p>
                                <div className="wrap">
                                    <p className='text-xs text-zinc-500'>Shipped Date :</p>
                                    <p className='text-sm'>12 Jun, 2023</p>
                                    <p className='text-xs text-zinc-500'>Status :</p>
                                    <p className='text-sm'>Ready To Pickup</p>
                                    <p className='text-xs text-zinc-500'>Destination :</p>
                                    <p className='text-sm'>Boston, USA</p>
                                </div>
                            </div>

                            <div className="Action flex flex-row gap-3 mt-2">
                                <div className="flex flex-col justify-center gap-3 items-center">
                                    <p className='text-sm text-center'>Request More Images</p>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="w-[130px]"
                                    >
                                        Request
                                    </Button>
                                </div>
                                <div className=" w-2 h-[60px]">
                                    <Separator orientation="vertical" />
                                </div>
                                <div className="flex flex-col justify-center gap-3 items-center">
                                    <p className='text-sm text-center'>Consolidate Package</p>
                                    <Button
                                        variant="destructive"
                                        className="w-[130px]"
                                        size="sm"
                                    >
                                        Cancel Request
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </DialogDescription>
                    {/* <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter> */}
                </DialogContent>
            </Dialog>
        </>
    )
}
