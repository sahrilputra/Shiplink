import React from 'react'

export const TableHeader = ({ columns }) => {
    return (
        <>
            <th className="px-[10px] py-[11px] text-sky-700 text-sm font-semibold font-['Poppins']">{columns}</th>
        </>
    )
}
