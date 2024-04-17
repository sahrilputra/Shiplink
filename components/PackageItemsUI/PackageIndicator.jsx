import React from 'react'

export const PackageIndicator = ({ status, status_forcustomer, packageID, status_id }) => {
    return (
        <>
            {
                status_id === 1 ? (
                    <div className="justify-start items-start gap-[5px] inline-flex">
                        <div className="w-[30px] h-[5px] bg-green-400 rounded-full" />
                        <div className="w-[30px] h-[5px] bg-neutral-200  rounded-full" />
                        <div className="w-[30px] h-[5px] bg-neutral-200 bg-opacity-95 rounded-full" />
                    </div>
                ) : (status_id === 21) ? (
                    <div className="justify-start items-start gap-[5px] inline-flex">
                        <div className="w-[30px] h-[5px] bg-green-400 rounded-full" />
                        <div className="w-[30px] h-[5px] bg-green-400  rounded-full" />
                        <div className="w-[30px] h-[5px] bg-green-400  rounded-full" />
                    </div>
                ) : (status_id === 2 || status_id === 12) ? (
                    <div className="justify-start items-start gap-[5px] inline-flex">
                        <div className="w-[30px] h-[5px] bg-green-400 rounded-full" />
                        <div className="w-[30px] h-[5px] bg-green-400  rounded-full" />
                        <div className="w-[30px] h-[5px] bg-green-400  rounded-full" />
                    </div>
                ) : (
                    <div className="justify-start items-start gap-[5px] inline-flex">
                        <div className="w-[30px] h-[5px] bg-green-400 rounded-full" />
                        <div className="w-[30px] h-[5px] bg-green-400  rounded-full" />
                        <div className="w-[30px] h-[5px] bg-neutral-200 bg-opacity-95 rounded-full" />
                    </div>
                )
            }
            {/* <div className="justify-start items-start gap-[5px] inline-flex">
                <div className="w-[30px] h-[5px] bg-green-400 rounded-full" />
                <div className="w-[30px] h-[5px] bg-green-400  rounded-full" />
                <div className="w-[30px] h-[5px] bg-green-400  rounded-full" />
                <div className="w-[30px] h-[5px] bg-neutral-200 bg-opacity-95 rounded-full" />
            </div> */}
        </>
    )
}
