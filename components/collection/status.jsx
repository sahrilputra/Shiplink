import React from 'react'

export const StatusInfo = ({ text }) => {
    return (
        <>
            <div className="justify-start items-center gap-[37px] flex">
                <div className="w-[88px] h-[23px] px-2.5 py-[5px] bg-blue-200 rounded border border-blue-500 justify-center items-center gap-2.5 flex">
                    <div className="text-center text-blue-500 text-xs font-medium font-['Poppins']">{text}</div>
                </div>
            </div>
        </>
    )
}


export const StatusSuccess = ({ text }) => {
    return (
        <>
            <div className="justify-start items-center gap-[37px] flex">
                <div className="w-[88px] h-[23px] px-2.5 py-[5px] bg-blue-200 rounded border border-blue-500 justify-center items-center gap-2.5 flex">
                    <div className="text-center text-blue-500 text-xs font-medium font-['Poppins']">text</div>
                </div>
            </div>
        </>
    )
}
