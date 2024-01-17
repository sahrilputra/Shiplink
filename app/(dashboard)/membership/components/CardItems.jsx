import React from 'react'
import { CheckIcon } from 'lucide-react'
export const CardItems = ({ title }) => {
    return (
        <>
            <div className="flex flex-row gap-4 justify-start">
                <CheckIcon width={20} height={20} className='text-myBlue' />
                <div className="text-zinc-600 text-sm font-normal">{title}</div>
            </div>
          
        </>
    )
}
