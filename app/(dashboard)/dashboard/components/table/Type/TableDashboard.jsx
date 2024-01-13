import React from 'react'
import { TableBody } from '../TableBody'
import { TableHeader } from '../TableHeader'
import { TableRowCell } from '../TableRowCell'
import { data } from 'autoprefixer'
import { Button } from '@/components/ui/button'
import { PlusIcons } from '@/components/icons/iconCollection'
import { ButtonAddOtherContent, SelectBroker, ButtonUploadInvoice, ButtonPARS, ButtonEntryNumber, SelectWarehouse } from '@/components/buttons/ButtonGroup'
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
                <div className="px-[10px] py-1.5 text-blue-900 font-poppins font-semi-bold">
                    Totals
                </div>
                <Button
                    variant="tableBlue"
                    size="sm"
                    className="border-none flex flex-row gap-[10px] px-[15px]"
                >
                    <PlusIcons />
                    <div className="text-blue-800 text-sm font-normal">Add Other Content</div>
                </Button>
            </div>
            <div className='body w-full px-[5px] py-2.5 bg-white border border-neutral-200 gap-2.5 flex flex-row justify-between items-center'>
                <SelectBroker />
                <ButtonUploadInvoice />
                <ButtonPARS />
                <ButtonEntryNumber />
            </div>
            <div className='body w-full px-[5px] py-2.5 bg-white border border-neutral-200 gap-2.5 flex flex-row justify-between items-center'>
                <SelectWarehouse />
                <div className="flex flex-row gap-3">
                    <Button
                        variant="redOutline"
                        className="h-[35px] w-[100px] px-4 shadow"
                    >
                        <div className="text-red-700 text-sm  font-normal ">Cancel</div>
                    </Button>

                    <Button
                        variant="destructive"
                        className="h-[35px] w-[100px] px-4 bg-red-700 shadow "
                    >
                        <div className="text-white text-sm font-normal">Save</div>
                    </Button>
                </div>
            </div>
            <div className='body w-full px-[5px] py-2.5 bg-whit gap-2.5 flex flex-row justify-between items-center'>
                <div className="text-zinc-500 text-sm font-normal font-['Poppins']">Select your Broker option. If using ShipLinks Brokerage, please upload the purchase invoice. If using your own Broker, a PARS/PAPS number will be generated when you Save this form. Then register the Entry Number provided by your broker to clear this package for Transport.</div>
            </div>

        </>
    )

}

