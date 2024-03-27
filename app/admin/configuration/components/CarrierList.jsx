'use client'
import { React, useEffect, useState } from 'react'
import Image from 'next/image'
import { ToggleSwitch } from 'flowbite-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
export const CarrierList = ({ data }) => {
    const [toggled, setToggled] = useState(data?.status === "active");

    return (
        <>
            <div className="w-[100%] h-[50px] px-2.5 py-[5px] bg-white rounded-md border border-neutral-200 justify-between items-center inline-flex font-poppins">
                <div className="px-10 justify-start items-center gap-[100px] flex">
                    <div className="w-[105px] p-2.5 flex-col justify-start items-start gap-2.5 inline-flex">
                        <Image
                            src={'/assets/courrier/feedex.png'}
                            width={60}
                            height={20}
                            alt='feedex icon'
                        />
                    </div>
                    <div className="justify-start items-center gap-[54px] flex">
                        <div className="justify-center items-center gap-[41px] flex">
                            <div className="h-[21px] justify-start items-end gap-[120px] flex">
                                <div className="text-zinc-600 w-[150px] text-xs font-medium font-poppins text-bold">{data?.carrier_name || "undefined"}</div>
                            </div>
                        </div>
                        <div className="justify-center items-center gap-[41px] flex">
                            <div className="h-[21px] justify-start items-end gap-[120px] flex">
                                <div className="text-zinc-600 text-xs font-normal font-poppins">{data?.country_code || "undefined"}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" justify-between items-center flex flex-row gap-5">
                    <Switch
                        checked={toggled}
                        onChange={() => setToggled(!toggled)}
                    />
                    <Button
                        variant="tableBlue"
                        size="xs"
                        className="p-0 px-4 py-[3px] border-none  ">
                        <p className="text-blue-800  font-normal text-xs ">Edit</p>
                    </Button>

                </div>
            </div>
        </>
    )
}
