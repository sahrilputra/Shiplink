'use client'
import { React, useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { ArrowDownIcon } from '@/components/icons/iconCollection'
export const CatergoryList = ({ Category, data, selectedData, id = "C001" }) => {
    console.log("🚀 ~ CatergoryList ~ id:", id)
    const [open, setOpen] = useState(false)
    const [isSelected, setIsSelected] = useState(false)
    const handleClick = () => {
        setOpen(!open)
    }
    const handleSelect = (index) => {
        setIsSelected(index === isSelected ? false : true)
    }

    useEffect(() => {
        if (id === "C001") {
            setOpen(true)
            setIsSelected(true)
            handleSelect("C001");
            selectedData("C001");
        }
    }, [])
    return (
        <>
            <div className="flex flex-col gap-1">
                <div className="w-full flex flex-row items-center gap-3 px-2 py-2 cursor-pointer hover:bg-slate-50"
                    onClick={() => handleClick()}>
                    <ChevronDown className={`${open ? "transform rotate-180" : ""} w-[20px] h-[20px]`} />
                    <div className="w-full font-bold text-xs">{Category}</div>
                </div >
                {open && (
                    <>
                        {
                            data.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            handleSelect(item.idconf);
                                            selectedData(item.idconf);
                                        }}
                                        className={`${id === item.idconf ? "bg-blue-100" : null} items cursor-pointer w-full hover:bg-blue-50 rounded transition duration-75`}
                                    >
                                        <div className="px-6 py-2 w-full font-medium text-xs">
                                            {item.subservice}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </>
                )}
            </div >
        </>
    )
}
