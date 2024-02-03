import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TableCell, TableRow } from '@/components/ui/tableDashboard'
import { CheckIcon, XIcon } from 'lucide-react'
import React from 'react'

export const DeclareContentInput = ({ index, remove }) => {
    return (
        <>
            <TableRow className="text-xs">
                <TableCell className="p-0 h-8 px-5 py-2 font-medium">
                    <Input id="value" className="text-xs h-9 py-0" placeholder="0" type="number" />
                </TableCell>
                <TableCell className="p-0 h-8 px-5 py-2 ">
                    <Input id="value" className="text-xs h-9 py-0" placeholder="0" type="number" />
                </TableCell>
                <TableCell className="p-0 h-8 px-5 py-2 ">
                    <Input id="value" className="text-xs h-9 py-0" placeholder="Description" />
                </TableCell >
                <TableCell className="p-0 h-8 px-5 py-2 ">
                    <Input id="value" className="text-xs h-9 py-0" placeholder="Search" />
                </TableCell >
                <TableCell className="p-0 h-8 px-5 py-2 ">
                    <Input id="value" className="text-xs h-9 py-0" placeholder="0" type="number" />
                </TableCell>
                <TableCell className="p-0 h-8 px-5 py-2 ">
                    <Input id="value" className="text-xs h-9 py-0" placeholder="CAD" />
                </TableCell>
                <TableCell className="text-right w-[70px] p-0 h-8 px-5 py-2 ">
                    {
                        index > 0 ? (
                            <div className="flex flex-row justify-between gap-2 w-full">
                                <Button
                                    variant="softBlue"
                                    size="tableIcon"
                                    onClick={remove}
                                    className="px-1 py-1 w-6 h-6"
                                >
                                    <XIcon className="w-4 h-4" />
                                </Button>
                            </div>
                        ) : (
                            <></>
                        )
                    }
                </TableCell>
            </TableRow>
        </>
    )
}
