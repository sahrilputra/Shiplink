import React from 'react'
import { Badge } from '@/components/ui/badge'
export const VerifiedStatus = ({ param }) => {
    return (
        <>
            {/* <div className="flex flex-row gap-3 items-center">
                <div className={`${param === "Verified" ? "bg-green-400" : "bg-orange-300"} w-3 h-3 rounded-full `} />
                <p>{param}</p>
            </div> */}
            {
                param === "Received" ? (
                    <Badge variant="grayStatus">{"Pending"}</Badge>
                ) : param === "Verified" ? (
                    <Badge variant="verified">{"Verified"}</Badge>
                ) : param === "Declared" ? (
                    <Badge variant="unverified">{"Declared"}</Badge>
                ) : param === "Hold For Pickup" ? (
                    <Badge variant="lightGray">{"Pickup"}</Badge>
                ) : (
                    <>
                    </>
                )
            }
        </>
    )
}
