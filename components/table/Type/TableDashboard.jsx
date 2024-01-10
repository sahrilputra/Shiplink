import React from 'react'
import { TableBody } from '../TableBody'
import { TableHeader } from '../TableHeader'
import { TableRowCell } from '../TableRowCell'
import { data } from 'autoprefixer'
import { ButtonAddOtherContent } from '@/components/buttons/ButtonGroup'

export const TableDashboard = ({ header, body, columns }) => {
    return (
        <>
            <table className='w-full'>
                <tr className='w-full px-1.5 py-2.5 bg-sky-50 rounded-tl rounded-md border border-neutral-200 text-left  '>
                    <TableHeader columns={"Qty"} />
                    <TableHeader columns={"Value"} />
                    <TableHeader columns={"Description"} />
                    <TableHeader columns={"HS Description"} />
                    <TableHeader columns={"HS Code"} />
                    <TableHeader columns={"Made in"} />
                    <TableHeader columns={""} />
                </tr>
                <tbody>
                    <TableBody />
                    <TableBody />
                </tbody>
            </table>
            <div className='body w-full px-[5px] py-1.5 bg-white border border-neutral-200 gap-2.5 flex flex-row justify-between items-center'>
                <div className="px-[10px] py-1.5 text-secondary font-medium">
                    Totals
                </div>
                <ButtonAddOtherContent />
            </div>

        </>
    )

}

