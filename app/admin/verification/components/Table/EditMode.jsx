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
                        className="px-4 h-7 py-3"
                    >
                        <p className='text-xs'>Add Other Content</p>
                    </Button>
                </div>

                <div className=" flex flex-row justify-center gap-2 items-center">
                    <Button
                        variant="softBlue"
                        size="sm"
                        onClick={cancel}
                        className="p-0 px-3 py-2 h-[35px] text-xs font-light"
                    >
                        <p className='text-xs font-light'>Cancel</p>
                    </Button>
                    <Button
                        variant="secondary"
                        size="sm"
                        className="p-0 px-3 py-2 h-[35px] text-xs font-light"
                    >
                        <p className='text-xs font-light'>Save</p>
                    </Button>
                </div>
            </div>

        </>
    )
}
