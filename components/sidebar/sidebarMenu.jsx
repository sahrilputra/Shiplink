import React from 'react'
import { Separator } from '../ui/separator'
import styles from './styles.module.scss'
export const SidebarMenu = ({ title, children }) => {
    return (
        <div className="flex flex-col">
            <>
                {title === 'setting' ? (

                    <div className={`${styles.deskView} mx-4 w-[200px]  px-2 py-[11px] flex-col justify-start items-start gap-[9px] flex `}>
                        <p className="text-black text-opacity-50 text-sm font-normal ">SETTINGS</p>
                        <div className="w-full">
                            <Separator orientation="horizontal" className="h-[1px]" />
                        </div>
                    </div>

                ) : title === 'card' ? (
                    <>
                        <div className="flex flex-col justify-center items-center px-2 mt-3" />

                    </>
                ) : (
                    <>

                    </>
                )}
                {children}
            </>
        </div>
    )
}
