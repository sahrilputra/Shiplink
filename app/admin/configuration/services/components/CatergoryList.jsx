'use client'
import { React, useState } from 'react'
import { ArrowDownIcon } from '@/components/icons/iconCollection'
export const CatergoryList = ({ Category, isOpen }) => {
    isOpen = isOpen ? isOpen : false;

    const [selectedItem, setSelectedItem] = useState(null);

    const handleClick = () => {
        setSelectedItem(!selectedItem);
    };
    return (
        <>
            <div className="flex flex-col gap-2">
                <div className="w-full flex flex-row items-center gap-3 ">
                    <ArrowDownIcon />
                    <div className="w-full font-bold text-sm">{Category}</div>

                </div >
                {isOpen ? (
                    <>
                        <div
                            onClick={handleClick}
                            className={`items cursor-pointer w-full ${selectedItem ? 'bg-blue-200' : 'bg-white'
                                }`}
                        >
                            <div className="px-6 py-2 w-full font-medium text-sm">Child Items 1</div>
                        </div>
                        <div
                            onClick={handleClick}
                            className={`items cursor-pointer w-full ${selectedItem ? 'bg-white' : 'bg-blue-200'
                                }`}
                        >
                            <div className="px-6 py-2 w-full font-medium text-sm">Child Items 2</div>
                        </div>
                    </>
                ) : (
                    <> </>
                )}
            </div>
        </>
    )
}
