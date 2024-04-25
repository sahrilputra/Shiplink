"use client";
import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from '../ui/button';
import { CopyIcon } from 'lucide-react';

export const LocationCard = () => {
    const [clicked, isClicked] = useState(true);
    const [query, setQuery] = useState({
        keyword: "",
        page: 0,
        limit: 0,
        index: 0,
    })
    const [warehouse, setWarehouse] = useState({
        warehouseA: {},
        warehouseB: {},
    })

    console.log("🚀 ~ LocationCard ~ warehouse:", warehouse)

    useEffect(() => {
        const fetchWarehouse = async () => {
            try {
                const responseCAD = await axios.post(
                    `/api/admin/warehouse/list`,
                    {
                        ...query,
                        keyword: "FXL",
                    }
                );
                const responseUSA = await axios.post(
                    `/api/admin/warehouse/list`,
                    {
                        ...query,
                        keyword: "D30",
                    }
                );
                console.log("response from api : ", responseCAD.data); // Log the response data
                const responseUSAData = responseUSA.data;
                const responseData = responseCAD.data;

                setWarehouse({
                    warehouseA: responseData.warehouse[0],
                    warehouseB: responseUSAData.warehouse[0],
                })
            } catch (error) {
                console.log(error);
            }
        }
        fetchWarehouse();

    }, [query])



    const toggleClicked = (clickedButtons) => {
        isClicked(clickedButtons);
    }

    const handleCopy = (textToCopy) => {
        navigator.clipboard.writeText(textToCopy);
    };

    return (
        <>
            <div className="w-[80%] mx-auto flex flex-col p-1 rounded-md border border-neutral-200 justify-center items-center my-3 relative">
                <div className="p-1 rounded-md border border-neutral-200 justify-start items-start gap-2.5 inline-flex">
                    <button
                        id='savedAddress'
                        className={`w-[75px] font-normal px-2.5 py-[8px] justify-center items-center gap-2.5 flex rounded
                            ${clicked ? 'bg-none' : 'bg-red-700 text-white font-semibold text-xs'}`}
                        onClick={() => toggleClicked(false)}
                    >
                        <p className=" text-xs font-['Poppins'] leading-tight">USA</p>
                    </button>
                    <button
                        id='newAddress'
                        className={`w-[75px] font-normal px-2.5 py-[8px] justify-center items-center gap-2.5 flex rounded
                            ${clicked ? 'bg-red-700 text-white font-semibold' : 'bg-none'}`}
                        onClick={() => toggleClicked(true)}
                    >
                        <p className=" text-xs font-['Poppins'] leading-tight">Canada</p>
                    </button>
                </div>

                <div className="w-full p-3">
                    {clicked ? (
                        <div className="flex flex-col justify-start w-[178px] px-2">
                            <p className='font-normal text-sm text-black '>{warehouse.warehouseA?.warehouse_name}</p>
                            <div className="font-regular text-xs px-2">
                                <p>{warehouse.warehouseA?.address || ""}</p>
                                {/* <p>{warehouse.warehouseA?.city}, {warehouse.warehouseA?.province_name}, {warehouse.warehouseA?.postal_code}</p> */}
                                <p>{warehouse.warehouseA?.country_name}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col justify-start w-[178px] px-2">
                            <p className='font-normal text-sm text-black'>{warehouse.warehouseB?.warehouse_name}</p>
                            <div className="font-regular text-xs px-2">
                                <p>{warehouse.warehouseB?.address || ""} </p>
                                {/* <p>{warehouse.warehouseB?.city || "-"}, {warehouse.warehouseB?.province_name || "-"}, {warehouse.warehouseB?.postal_code || "-"}</p> */}
                                <p>{warehouse.warehouseB?.country_name}</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="right-0 w-full ">
                    <Button
                        variant="ghost"
                        size="icon"
                        className='absolute right-0 bottom-0 w-[30px] h-[30px] rounded-full'
                        onClick={() => handleCopy(clicked ? warehouse.warehouseA.address : warehouse.warehouseB.address)}
                    >
                        <CopyIcon width={14} height={14} className='text-red-700' />
                    </Button>
                </div>
            </div>
        </>
    )
}

