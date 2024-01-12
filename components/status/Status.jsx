import React from 'react'

export const Status = ({ status }) => {

    const getStatusMode = () => {
        switch (status.toLowerCase()) {
            case 'active':
                return 'bg-green-300';
            case 'disable':
                return 'bg-red-500';
            default:
                return 'bg-blue-500'
        }
    }

    console.log(getStatusMode());
    return (
        <>
            <div className="flex flex-row items-center gap-3">
                <div className={`${getStatusMode()} w-3 h-3 rounded-full`} />
                <div className="text-zinc-600 text-sm font-normal">{status}</div>
            </div>
        </>
    )
}
