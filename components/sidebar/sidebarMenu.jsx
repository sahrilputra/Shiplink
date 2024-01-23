'use client'
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { Separator } from '../ui/separator'
import styles from './styles.module.scss'
export const SidebarMenu = ({ title, children }) => {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const isTable = useMediaQuery({ query: '(min-width: 1025px)' })
    const isDesktop = useMediaQuery({ query: '(min-width: 1440px)' })

    return (
        <div className="flex flex-col">
            {title === 'setting' ? (
                <>
                    <div className={`${styles.deskView} mx-4 w-[200px]  px-2 py-[11px] flex-col justify-start items-start gap-[9px] flex `}>
                        <p className="text-black text-opacity-50 text-sm font-normal ">SETTINGS</p>
                        <div className="w-full">
                            <Separator orientation="horizontal" className="h-[1px]" />
                        </div>
                    </div>
                </>
            ) : title === 'card' ? (
                <>
                    <div className="flex flex-col justify-center items-center px-2 mt-3">
                    </div>
                </>
            ) : (
                <>

                </>
            )}
            {children}
        </div>
    )
}
