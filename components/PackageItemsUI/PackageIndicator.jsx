import React from 'react'

export const PackageIndicator = ({ status }) => {
    return (
        <>
            {
                status === 'Received' ? (
                    <div className="justify-start items-start gap-[5px] inline-flex">
                        <div className="w-[30px] h-[5px] bg-green-400 rounded-full" />
                        <div className="w-[30px] h-[5px] bg-neutral-200  rounded-full" />
                        <div className="w-[30px] h-[5px] bg-neutral-200 bg-opacity-95 rounded-full" />
                    </div>
                ) : status === 'in transit' ? (
                    <div className="justify-start items-start gap-[5px] inline-flex">
                        <div className="w-[30px] h-[5px] bg-green-400 rounded-full" />
                        <div className="w-[30px] h-[5px] bg-green-400  rounded-full" />
                        <div className="w-[30px] h-[5px] bg-neutral-200 bg-opacity-95 rounded-full" />
                    </div>
                ) : status === 'Complete' ? (

                    <div className="justify-start items-start gap-[5px] inline-flex">
                        <div className="w-[30px] h-[5px] bg-green-400 rounded-full" />
                        <div className="w-[30px] h-[5px] bg-green-400  rounded-full" />
                        <div className="w-[30px] h-[5px] bg-green-400  rounded-full" />
                    </div>
                ) : (
                    <div className="justify-start items-start gap-[5px] inline-flex">
                        <div className="w-[30px] h-[5px] bg-green-400 rounded-full" />
                        <div className="w-[30px] h-[5px] bg-neutral-200  rounded-full" />
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
