import React, { useEffect, useState } from 'react'
import { TaxDetailsList } from './TaxDetailsList'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { DeleteDialog } from './dialog/DeleteDialog'
import { Skeleton } from '@/components/ui/skeleton'
export const TaxDetails = ({ close, taxAssignID, countryCode }) => {
    console.log("🚀 ~ TaxDetails ~ countryCode:", countryCode)

    const [change, setChange] = useState(false)
    const [taxList, setTaxList] = useState([])
    const [openDialog, setOpenDialog] = useState(false)
    const [deleteID, setDeleteID] = useState("")
    const [isskeleton, setIsSkeleton] = useState(false)
    const [query, setQuery] = useState({
        keyword: "",
        page: 0,
        limit: 0,
        index: 0,
        country_code: countryCode,
    });

    useEffect(() => {
        const fetchData = async () => {
            setIsSkeleton(false)
            try {
                const response = await axios.post(
                    `/api/admin/config/tax/typeDetails`,
                    {
                        keyword: "",
                        page: 0,
                        limit: 0,
                        index: 0,
                        country_code: countryCode,
                    },
                );
                const responseData = response.data.taxassignment;
                console.log("response from api : ", responseData)
                setIsSkeleton(false)
                setTaxList(responseData)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [countryCode, query])

    const reloadData = () => {
        fetchData()
    }

    const handleDeleteClicked = (itemID) => {
        setOpenDialog(true)
        setDeleteID(itemID)
    }

    return (
        <>
            <DeleteDialog reloadData={reloadData} deleteID={deleteID} open={openDialog} setOpen={setOpenDialog} />
            <div className=" w-full p-5 bg-white rounded-md border flex-col justify-start items-start gap-[15px] flex">
                <div className="text-sm text-zinc-800 font-bold leading-tight">Tax Types Details</div>
                <div className="flex-col w-full justify-start items-start gap-1 flex">
                    <div className="w-full flex flex-col gap-2 items-center justify-center h-[30px]">
                        <Skeleton className={"w-[200px] h-[50px]"} />
                    </div>
                    {
                        isskeleton && (
                            <div className="w-full flex flex-col gap-2 items-center justify-center">
                                <Skeleton className={"w-full h-[30px]"} />
                            </div>
                        )
                    }
                    {
                        taxList.map((item, index) => {
                            return (
                                <TaxDetailsList key={index} setChange={setChange} data={item} handleClick={handleDeleteClicked} taxAssignID={taxAssignID} />
                            )
                        })
                    }

                </div>

                <div className={`flex flex-row gap-5 justify-end items-end w-full ${change ? "" : "hidden"}`}>
                    <Button
                        variant="redOutline"
                        size="xs"
                        className="w-[80px] text-xs"
                        onClick={() => setChange(false)}
                    >
                        <p>Cancel</p>
                    </Button>
                    <Button
                        variant="destructive"
                        size="xs"
                        className="w-[80px] text-xs"
                    >
                        <p>Save</p>
                    </Button>
                </div>
            </div>
        </>
    )
}
