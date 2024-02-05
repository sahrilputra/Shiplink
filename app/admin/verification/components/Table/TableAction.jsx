import React from 'react'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export const TableAction = ({ edit }) => {
    return (
        <>
            <div className="w-[100%] flex flex-row justify-between gap-2 items-center">
                <div className="flex flex-col relative w-[300px] h-10 justify-center items-center">
                    <p className=' absolute top-0 left-0 text-myBlue text-xs h-[20px]'>Package Dimension</p>
                    <div className="h-10 w-full flex justify-start items-end">
                        <p className='font-light pl-2 text-xs'>12 mm x 10 mm x 10 mm | 10 Ibs</p>
                    </div>
                </div>
                <div className="">
                    <Select>
                        <SelectTrigger className="w-[180px] text-xs p-0 px-3 py-1 h-[35px]" >
                            <SelectValue placeholder="Invoice" />
                        </SelectTrigger>
                        <SelectContent className="text-xs">
                            <SelectItem className="text-xs text-myBlue " value="invoice1">Download Invoice 1</SelectItem>
                            <SelectItem className="text-xs text-myBlue" value="invoice2">Download Invoice 2</SelectItem>
                            <SelectItem className="text-xs text-myBlue" value="invoice3">Download Invoice 3</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className=" flex flex-row justify-center gap-2 items-center">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={edit}
                        className="p-0 px-3 py-2 h-[35px] text-xs font-light"
                    >
                        <p className='text-xs font-light'>Edit</p>
                    </Button>
                    <Button
                        variant="secondary"
                        size="sm"
                        className="p-0 px-3 py-2 h-[35px] text-xs font-light"
                    >
                        <p className='text-xs font-light'>Mark As Verified</p>
                    </Button>
                </div>
            </div>

        </>
    )
}
