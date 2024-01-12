'use client'
import { React, useState } from 'react'
import { Button } from 'flowbite-react'
import styles from './styles.module.scss'
import { Select } from 'flowbite-react'
import { ArrowDownIcon } from '@/components/icons/iconCollection'
// import { ProvinceList } from './components/ProvinceList'
// import { TaxDetails } from './components/TaxDetails'
// import { NewType } from './components/NewType'

import { ProvinceList } from './components/ProvinceList'
import { TaxDetails } from './components/TaxDetails'
import { NewType } from './components/NewType'

export default function Tax() {
    const [clicked, setClicked] = useState(false);
    const handleClick = (isClicked) => { setClicked(isClicked) }
    return (
        <>
            <div className={styles.taxLayout}>

                <div className={styles.left}>
                    <div className="w-[100%]  p-5 bg-white rounded-md border border-neutral-200 flex-col justify-start items-start gap-[15px] inline-flex">
                        <div className="w-[201px] text-zinc-800 text-lg font-semibold font-['Poppins'] leading-tight">Tax Configuration</div>
                        <Select
                            className=" bg-stone-50 rounded-tl rounded-bl justify-start items-center gap-3 flex text-zinc-400 text-sm font-medium font-['Poppins'] leading-tight"
                            id="countries"
                            required
                            aria-placeholder='Select Country'
                        >
                            <option>United States</option>
                            <option>Canada</option>
                            <option>France</option>
                            <option>Germany</option>
                        </Select>
                        <div className="flex-col justify-start items-start gap-0.5 flex w-full">
                            <ProvinceList />
                        </div>
                    </div>
                </div>

                <div className={styles.right}>
                    <div className="w-[100%] p-5 bg-white rounded-md border border-neutral-200 flex-col justify-start items-start gap-[15px] inline-flex">
                        <div className="w-[201px] text-zinc-800 text-lg font-semibold font-['Poppins'] leading-tight">Tax Assignment</div>
                        <div className="py-[5px] flex-col justify-start items-start gap-2.5 flex">
                            <button
                                className="px-2.5 py-[5px] bg-sky-50 rounded border border-sky-700 justify-center items-center gap-2.5 inline-flex"
                                onClick={() => handleClick(true)}
                            >
                                <div className="text-sky-700 text-md font-medium font-['Poppins']">Create New Type</div>
                            </button>
                        </div>
                        {clicked && (
                            <>
                                <NewType />
                            </>
                        )}
                        <TaxDetails />
                    </div>
                </div>
            </div>
        </>
    )
}