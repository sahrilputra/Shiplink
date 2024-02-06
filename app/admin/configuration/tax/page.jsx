'use client'
import { React, useState } from 'react'
import styles from './styles.module.scss'
import { Button } from '@/components/ui/button'
import { ProvinceList } from './components/ProvinceList'
import { TaxDetails } from './components/TaxDetails'
import { NewType } from './components/NewType'
import { FormControl } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function Tax() {
    const [clicked, setClicked] = useState(false);
    const handleClick = (isClicked) => { setClicked(isClicked) }
    return (
        <>
            <div className={styles.taxLayout}>

                <div className={styles.left}>
                    <div className="w-[100%]  p-5 bg-white rounded-md border border-neutral-200 flex-col justify-start items-start gap-[15px] inline-flex">
                        <div className=" text-zinc-700 text-sm font-bold" >Tax Configuration</div>

                        <Select className="text-xs w-[200px] rounded-sm px-1 py-0">
                            <div className="text-black text-sm font-bold ">Select Country : </div>
                            <SelectTrigger className='text-xs h-[35px] w-[200px] rounded-sm px-1 py-0'>
                                <SelectValue className='text-xs h-[30px] rounded-sm px-1 py-0' placeholder="United States" />
                            </SelectTrigger>
                            <SelectContent className="text-xs">
                                <SelectItem className="text-xs" value="Purolator">United States</SelectItem>
                                <SelectItem className="text-xs" value="Feedex">Canada</SelectItem>
                                <SelectItem className="text-xs" value="Amazon">Rusia</SelectItem>
                                <SelectItem className="text-xs" value="DHL">English</SelectItem>
                            </SelectContent>
                        </Select>
                        <div className="flex-col justify-start items-start gap-0.5 flex w-full">
                            <ProvinceList />
                        </div>
                    </div>
                </div>

                <div className={styles.right}>
                    <div className="w-[100%] p-5 bg-white rounded-md border border-neutral-200 flex-col justify-start items-start gap-1 inline-flex">
                        <div className=" text-zinc-700 text-sm font-bold" >Tax Assignment</div>
                        <div className="py-[5px] flex-col justify-start items-start gap-2.5 flex">
                            <Button
                                variant="softBlue"
                                size="xs"
                                className="px-3 py-1 rounded "
                                onClick={() => handleClick(true)}
                            >
                                <div className="text-sky-700 text-xs font-normal ">Create New Type</div>
                            </Button>
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