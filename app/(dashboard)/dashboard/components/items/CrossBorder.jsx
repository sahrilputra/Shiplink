import React from 'react'
import { TableDashboard } from '../table/Type/TableDashboard'

export const CrossBorderTable = ({ toggleExpanded, tracking_id, reload, arrivalCode }) => {
    return (
        <>
            <div className="my-[10px] ">
                <div className="left-[3px] top-0 text-zinc-900 text-[14px] font-semiBold">Declare Content</div>
                <TableDashboard toggleExpanded={toggleExpanded} tracking_id={tracking_id} reload={reload} arrivalCode={arrivalCode}/>
            </div>
        </>
    )
}