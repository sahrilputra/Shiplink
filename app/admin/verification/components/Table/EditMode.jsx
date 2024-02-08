import React from 'react'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export const EditMode = ({ cancel, increaseContent }) => {
    return (
        <>
            <div className="w-[100%] flex flex-row justify-between gap-2 items-center">
                <div className="flex flex-col justify-center items-start">
                    <Button
                        variant="softBlue"
                        size="sm"
                        type="button"
                        className=" h-[30px] rounded-sm px-4 py-0"
                    >
                        <p className='text-xs'>Add Other Content</p>
                    </Button>
                </div>
                <div className=" flex flex-row justify-center gap-2 items-center">
                    <Button
                        variant="softBlue"
                        type="button"
                        className=" h-[30px] rounded-sm px-4 py-0"
                        size="sm"
                        onClick={cancel}
                    >
                        <p className='text-xs font-light'>Cancel</p>
                    </Button>
                    <Button
                        variant="secondary"
                        type="button"
                        className=" h-[30px] rounded-sm px-4 py-0"
                        size="sm"
                    >
                        <p className='text-xs font-light'>Save</p>
                    </Button>

                </div>
            </div>

        </>
    )
}
