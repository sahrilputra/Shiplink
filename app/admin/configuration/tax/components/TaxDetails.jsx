import React, { useEffect, useState } from 'react'
import { TaxDetailsList } from './TaxDetailsList'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { DeleteDialog } from './dialog/DeleteDialog'
export const TaxDetails = ({ close }) => {
    const [change, setChange] = useState(false)
    const [taxList, setTaxList] = useState([])
    const [openDialog, setOpenDialog] = useState(false)
    const [deleteID, setDeleteID] = useState("")
    const [query, setQuery] = useState({
        keyword: "",
        page: 1,
        limit: 0,
        index: 0
    });
    const fetchData = async () => {
        try {
            const response = await axios.post(
                `/api/admin/config/tax/taxList`,
                query,
            );
            const responseData = response.data.taxassignment;
            console.log("response from api : ", responseData)
            setTaxList(responseData)

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

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
                    {
                        taxList.map((item, index) => {
                            return (
                                <TaxDetailsList key={index} setChange={setChange} data={item} handleClick={handleDeleteClicked}/>
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
