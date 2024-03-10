import React from 'react'

export const PackageStatus = ({ variant }) => {
    return (
        <>
            {
                variant === "Received" ? (
                    <>
                        <div className="h-[23px] px-2.5 py-[5px] bg-blueStatus-foreground rounded border border-blueStatus justify-center items-center gap-2.5 flex">
                            <div className="text-center text-blueStatus text-xs ">{variant}</div>
                        </div>
                    </>
                ) : (variant === "Complete" || variant === "Hold For Pickup") ? (
                    <>
                        <div className="h-[23px] px-2.5 py-[5px] bg-greenStatus-foreground rounded border border-greenStatus justify-center items-center gap-2.5 flex">
                            <div className="text-center text-greenStatus text-xs ">{variant}</div>
                        </div>
                    </>
                ) : (variant === "in transit" || variant === "Cleared Custom" || variant === "Verified") ? (
                    <>
                        <div className="h-[23px] px-2.5 py-[5px] bg-yellowStatus-foreground rounded border border-yellowStatus justify-center items-center gap-2.5 flex">
                            <div className="text-center text-yellowStatus text-xs ">{variant}</div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="h-[23px] px-2.5 py-[5px] bg-blueStatus-foreground rounded border border-blueStatus justify-center items-center gap-2.5 flex">
                            <div className="text-center text-blueStatus text-xs ">{variant}</div >
                        </div >
                    </>
                )
            }
        </>
    )
}
