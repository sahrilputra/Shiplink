import React from 'react'

export const SwitchButton = ({ isClicked }) => {

    return (
        <>
            <div className="p-0.5 rounded-md border border-neutral-200 justify-start items-start gap-2.5 inline-flex">
                <div className="px-2.5 py-[5px] justify-center items-center gap-2.5 flex">
                    <button className="text-black text-xs font-normal font-['Poppins'] leading-tight">Address Book</button>
                </div>
                <div className="h-[30px] px-2.5 py-[5px] bg-red-600 rounded justify-center items-center gap-2.5 flex">
                    <button className="text-white text-xs font-semibold font-['Poppins'] leading-tight">New Address</button>
                </div>
            </div>
        </>
    )
}
