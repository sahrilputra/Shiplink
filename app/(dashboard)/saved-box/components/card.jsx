import React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
export const SavedBoxCard = ({ variant, data, selected, onClick }) => {

    const handleSelect = () => {
        onClick(data.id);
        selected(data.id)
    }
    return (
        <>
            {variant === 'list' ? (
                <>
                    <div
                        onClick={handleSelect}
                        className="hover:bg-slate-200/30 container w-[100%] flex flex-row justify-between px-4 gap-2  py-[5px] bg-white rounded-sm shadow-md border border-zinc-600 border-opacity-50 items-center">
                        <div className="flex flex-col justify-start items-start">
                            <div className=" text-zinc-900 text-lg font-medium text-left ">{data?.boxName}</div>
                            <div className=" text-zinc-900 text-base font-medium ">{data?.boxLength} x {data?.boxWidth} x {data?.boxHeight} {data?.boxHeightType} <span className='font-bold text-black'>| </span> {data?.boxWeight} {data?.boxWeightType}</div>
                        </div>
                        <div className="flex flex-row items-start gap-3">
                            <div className="flex flex-col justify-start items-center">
                                <div className="edt text-red-700 text-md font-semibold flex flex-row gap-2">
                                    <p>Edit</p> Icon
                                </div>
                                <div className="text-right text-zinc-600 text-sm font-medium w-[100%] relative right-0 ">{data?.createAt}</div>
                            </div>
                            <Checkbox />
                        </div>
                    </div>

                </>


            ) : (
                <>
                    <div
                        onClick={handleSelect}
                        className="hover:bg-slate-200/30 w-[275px] px-[5px] py-5 bg-white rounded-lg shadow-md border border-zinc-600 border-opacity-50 flex-col justify-start items-start gap-2 inline-flex">
                        <div className="top flex flex-row justify-between items-center w-full px-4">
                            <div className="edt text-red-700 text-md font-semibold flex flex-row gap-2">
                                <p>Edit</p> Icon
                            </div>
                            <Checkbox />
                        </div>
                        <div className="justify-start px-4 items-start flex flex-col w-full">
                            <div className=" text-zinc-900 text-lg font-medium ">{data?.boxName}</div>
                            <div className=" text-zinc-900 text-base font-medium ">{data?.boxLength} x {data?.boxWidth} x {data?.boxHeight} {data?.boxHeightType} </div>
                            <div className=" text-zinc-900 text-base font-medium ">{data?.boxWeight} {data?.boxWeightType}</div>
                            <div className="text-right text-zinc-600 text-sm font-medium w-[100%] relative right-0 ">{data?.createAt}</div>
                        </div >
                    </div>

                </>
            )
            }

        </>
    )
}
