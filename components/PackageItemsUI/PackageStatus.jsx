import React from 'react'

export const PackageStatus = ({ variant, status_id }) => {
    console.log("🚀 ~ PackageStatus ~ status_id:", status_id)
    return (
        <>
            {
                (status_id === 1) ? (
                    <>
                        <div className="h-[23px] px-2.5 py-[5px] bg-greenStatus-foreground rounded border border-greenStatus justify-center items-center gap-2.5 flex">
                            <div className="text-center text-greenStatus text-xs ">{variant}</div>
                        </div>
                    </>
                ) : (status_id === 12) ? (
                    <>
                        <div className="h-[23px] px-2.5 py-[5px] bg-yellowStatus-foreground rounded border border-yellowStatus justify-center items-center gap-2.5 flex">
                            <div className="text-center text-yellowStatus text-xs ">{variant}</div>
                        </div>
                    </>
                ) : (status_id === 2) ? (
                    <>
                        <div className="h-[23px] px-2.5 py-[5px] bg-yellowStatus-foreground rounded border border-yellowStatus justify-center items-center gap-2.5 flex">
                            <div className="text-center text-yellowStatus text-xs ">{variant}</div>
                        </div>
                    </>
                ) : (status_id === 13) ? (
                    <>
                        <div className="h-[23px] px-2.5 py-[5px] bg-slate-300 rounded border border-yellowStatus justify-center items-center gap-2.5 flex">
                            <div className="text-center text-slate-700 text-xs ">{variant}</div>
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
