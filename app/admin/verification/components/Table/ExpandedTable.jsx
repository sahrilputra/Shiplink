import React, { useEffect, useState } from 'react'
import { ImageTable } from './ImageTable'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { TrashIcon } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/tableDashboard"
import axios from 'axios'
export const ExpandedTable = ({ content, edit, item, trackingID, reloadData, image, setExpandedRows }) => {
    console.log("🚀 ~ ExpandedTable ~ image:", image)

    const [filterInvoice, setVilterInvoice] = useState([]);
    useEffect(() => {
        const removeInvImage = () => {
            if (image) {
                const filtered = image.filter(image => isInvoiceImage(image.type));
                setVilterInvoice(filtered);
            }
        };

        removeInvImage();
    }, [image]);

    const isInvoiceImage = (type) => {
        return type.toLowerCase() === "invoices";
    };
    const height_unit = item?.package_height_unit || "cm"
    const handleSave = async (data) => {
        console.log("data : ", data)
        setExpandedRows({})
        try {
            const response = await axios.post(
                `/api/admin/verification/setVerified`,
                {
                    data: trackingID,
                }
            );
            console.log(response)
            reloadData()
        } catch (error) {
            console.log('Error:', error);
        }
    }

    return (
        <>
            <div className="w-full">
                {
                    content.map((item, index) => (
                        <>
                            <div
                                key={index}
                                className=" flex flex-row gap-3 justify-start border-y-2 border-zinc-600/20 p-2">
                                <div className="flex flex-col relative w-[80px] h-10 justify-start items-start">
                                    <p className=' top-0 left-0 text-myBlue text-xs h-[20px]'>Qty</p>
                                    <div className="h-5 w-full flex justify-start items-end">
                                        <p className=' text-xs font-light pl-2'>{item.qty}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col relative w-[150px] h-10 justify-start items-start">
                                    <p className=' top-0 left-0 text-myBlue text-xs h-[20px]'>Value</p>
                                    <div className="h-5 w-full flex justify-start items-end">
                                        <p className=' text-xs font-light'>$ {item.value}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col relative w-[50%] h-10 justify-start items-start">
                                    <p className=' top-0 left-0 text-myBlue text-xs h-[20px]'>User Description</p>
                                    <div className="h-5 w-full flex justify-start items-end">
                                        <p className=' text-xs font-light'>{item.desc ? item.desc : "-"}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col relative  w-[50%] h-max justify-start items-start">
                                    <p className=' top-0 left-0 text-myBlue text-xs h-[20px]'>HS Description</p>
                                    <div className=" w-full flex justify-start items-end h-max">
                                        <p className=' text-xs font-light'>{item.hs_desc ? item.hs_desc : "-"}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col relative w-[200px] h-10 justify-start items-start">
                                    <p className=' top-0 left-0 text-myBlue text-xs h-[20px]'>HS Code</p>
                                    <div className="h-5 w-full flex justify-start items-end">
                                        <p className=' text-xs font-light'>{item.hs_code ? item.hs_code : "-"}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col relative w-[100px] h-10 justify-start items-start">
                                    <p className=' top-0 left-0 text-myBlue text-xs h-[20px]'>Made In</p>
                                    <div className="h-5 w-full flex justify-start items-end">
                                        <p className=' text-sm font-light'>{item.made_in ? item.made_in : "-"}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))
                }

                <div className="font-medium p-0 px-5 py-2 bg-blue-100 hover:bg-blue-100 w-full" >
                    <div className="w-[100%] flex flex-row justify-between gap-2 items-center">
                        <div className="flex flex-col w-[300px]">
                            <p className='text-myBlue text-xs'>Package Dimension</p>
                            <p className='font-light text-xs'>{item?.package_length || "0"} {height_unit} x {item?.package_width || "0"} {height_unit} x  {item?.package_height || "0"} {height_unit} | {item?.package_weight || "0"}  {item?.package_weight_unit || "0"}</p>
                        </div>
                        <div className="">
                            <Select>
                                <SelectTrigger className="w-[180px] text-xs h-[30px] rounded-sm px-2 py-0" >
                                    <SelectValue placeholder="Invoice" />
                                </SelectTrigger>
                                <SelectContent className="text-xs">
                                    {
                                        filterInvoice.map((item, index) => (
                                            <SelectItem key={index} className="text-xs text-myBlue" value={index}>invoice {index + 1}</SelectItem>
                                        ))
                                    }

                                </SelectContent>
                            </Select>
                        </div>
                        <div className=" flex flex-row justify-center gap-2 items-center">
                            <Button
                                variant="secondary"
                                type="button"
                                className=" h-[30px] rounded-sm px-4 py-0"
                                size="sm"
                                onClick={edit}
                            >
                                <p className='text-xs font-light'>Edit</p>
                            </Button>
                            <Button
                                variant="secondary"
                                type="button"
                                className=" h-[30px] rounded-sm px-4 py-0"
                                size="sm"
                                onClick={() => {
                                    handleSave(trackingID)

                                }}
                            >
                                <p className='text-xs font-light'>Mark As Verified</p>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
