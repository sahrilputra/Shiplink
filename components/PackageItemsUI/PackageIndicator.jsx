import React from 'react'

export const PackageIndicator = ({ status, status_forcustomer, packageID }) => {
    console.log("🚀 ~ PackageIndicator ~ packageID:", packageID)
    console.log("🚀 ~ PackageIndicator ~ status:", status)
    console.log("🚀 ~ PackageIndicator ~ status_forcustomer:", status_forcustomer)
    return (
        <>
            {
                status === 'Received' ? (
                    <div className="justify-start items-start gap-[5px] inline-flex">
                        <div className="w-[30px] h-[5px] bg-green-400 rounded-full" />
                        <div className="w-[30px] h-[5px] bg-neutral-200  rounded-full" />
                        <div className="w-[30px] h-[5px] bg-neutral-200 bg-opacity-95 rounded-full" />
                    </div>
                ) : (status === 'in transit' || status === 'Cleared Custom' || status === "Verified" || status_forcustomer === "Process" || status === "Declared") ? (
                    <div className="justify-start items-start gap-[5px] inline-flex">
                        <div className="w-[30px] h-[5px] bg-green-400 rounded-full" />
                        <div className="w-[30px] h-[5px] bg-green-400  rounded-full" />
                        <div className="w-[30px] h-[5px] bg-neutral-200 bg-opacity-95 rounded-full" />
                    </div>
                ) : (status === 'Complete' || status === 'Hold For Pickup') ? (

                    <div className="justify-start items-start gap-[5px] inline-flex">
                        <div className="w-[30px] h-[5px] bg-green-400 rounded-full" />
                        <div className="w-[30px] h-[5px] bg-green-400  rounded-full" />
                        <div className="w-[30px] h-[5px] bg-green-400  rounded-full" />
                    </div>
                ) : (status === 'Delivered' || status_forcustomer === 'Delivered') ? (
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
