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
                        className="px-4 h-7 py-4"
                    >
                        <p className='text-xs'>Add Other Conten</p>
                    </Button>
                </div>

                <div className=" flex flex-row justify-center gap-2 items-center">
                    <Button
                        variant="softBlue"
                        size="sm"
                        onClick={cancel}
                    >
                        <p className='text-xs font-light'>Cancel</p>
                    </Button>
                    <Button
                        variant="secondary"
                        size="sm"
                    >
                        <p className='text-xs font-light'>Save</p>
                    </Button>
                </div>
            </div>

        </>
    )
}
