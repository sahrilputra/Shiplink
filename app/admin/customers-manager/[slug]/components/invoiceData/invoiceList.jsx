import React from 'react'
import { InvoiceItems } from './invoiceItem'
import { Button } from '@/components/ui/button'
export const InvoiceList = () => {
    return (
        <div className="bg-white rounded-lg shadow border border-neutral-200 border-opacity-90 w-full">
            <div className="">
                <p className='text-sm font-bold px-3 pt-3'>Invoice History</p>
                <div className="data">
                    <InvoiceItems
                        title='Invoice 1'
                        url='/'
                    />
                    <InvoiceItems
                        title='Invoice 1'
                        url='/'
                    />
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                >
                    <p className='text-xs'>See All Invoice</p>
                </Button>
            </div>
        </div>
    )
}
