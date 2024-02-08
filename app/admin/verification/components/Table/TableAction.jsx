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
                <div className="flex flex-col w-[300px]">
                    <p className='text-myBlue text-xs'>Package Dimension</p>
                    <p className='font-light text-xs'>12 mm x 10 mm x 10 mm | 10 Ibs</p>
                </div>
                <div className="">
                    <Select>
                        <SelectTrigger className="w-[180px] text-xs h-[30px] rounded-sm px-2 py-0" >
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
                        type="button"
                        className=" h-[30px] rounded-sm px-4 py-0"
                        size="sm"
                        onClick={edit}
                    >
                        <p className='text-xs font-light'>Edit</p>
                    </Button>
                    <Button
                        variant="secondary"
                        type="button"
                        className=" h-[30px] rounded-sm px-4 py-0"
                        size="sm"

                    >
                        <p className='text-xs font-light'>Mark As Verified</p>
                    </Button>
                </div>
            </div>

        </>
    )
}
