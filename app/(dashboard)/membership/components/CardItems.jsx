import React from 'react'
import { CheckIcon } from 'lucide-react'
export const CardItems = ({ title, type }) => {
    return (
        <>
            {type === 'landing' ? (
                <>
                    <div className="flex flex-row gap-4 justify-start">
                        <CheckIcon width={30} height={30} className='text-myBlue' />
                        <div className="text-zinc-600 text-base font-normal">{title}</div>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex flex-row gap-4 justify-start">
                        <CheckIcon width={20} height={20} className='text-myBlue' />
                        <div className="text-zinc-600 text-sm font-normal">{title}</div>
                    </div>
                </>
            )}


        </>
    )
}
