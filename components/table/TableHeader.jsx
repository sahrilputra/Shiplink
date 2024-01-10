import React from 'react'

export const TableHeader = ({ columns }) => {
    return (
        <>
            <th className="px-4 py-[11px] text-sky-700 text-sm font-semibold font-['Poppins']">{columns}</th>
        </>
    )
}
