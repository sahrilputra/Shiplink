import React from 'react'

export const VerifiedStatus = ({ param }) => {
    return (
        <>
            <div className="flex flex-row gap-3 items-center">
                <div className={`${param === "Verified" ? "bg-green-400" : "bg-orange-300" } w-3 h-3 rounded-full `} />
                <p>{param}</p>
            </div>
        </>
    )
}
