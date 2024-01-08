import React from 'react'

export const SidebarMenu = ({ title, children }) => {
    return (
        <div className="flex flex-col">
            {title === 'setting' ? (
                <>
                    <div className="mx-4 px-2 py-[11px] flex-col justify-start items-start gap-[9px] flex">
                        <div className="text-black text-opacity-50 text-base font-normal font-['Poppins']">SETTINGS</div>
                        <div className="w-[223px] h-[0px] border border-neutral-200"></div>
                    </div>
                </>
            ) : (
                <> </>
            )}

            {children}
        </div>
    )
}
