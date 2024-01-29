import React from 'react'
import { Button } from '@/components/ui/button'
export const InvoiceItems = ({ title, url }) => {
    return (
        <div className="flex flex-row gap-3 w-full justify-between border-b border-zinc-300 items-center px-3 py-1">
            <p className='text-zinc-600 text-xs'>{title}</p>
            <Button
                variant="ghost"
                size="sm"
            >
                <p className='text-xs'>Download</p>
            </Button>
        </div>
    )
}
