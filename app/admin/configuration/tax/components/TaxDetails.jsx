import React, { useEffect, useState } from "react";
import { TaxDetailsList } from "./TaxDetailsList";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { DeleteDialog } from "./dialog/DeleteDialog";
import { RefreshCcw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
export const TaxDetails = ({ close, taxAssignID, countryCode, province_code }) => {
    console.log("🚀 ~ TaxDetails ~ province_code:", province_code)
    console.log("🚀 ~ TaxDetails ~ countryCode:", countryCode);

    const [change, setChange] = useState(false);
    const [taxList, setTaxList] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleteID, setDeleteID] = useState("");
    const [isskeleton, setIsSkeleton] = useState(false);
    const [query, setQuery] = useState({
        keyword: "",
        page: 0,
        limit: 0,
        index: 0,
        country_code: countryCode,
        province_code: province_code,
    });

    const fetchData = async () => {
        setIsSkeleton(true);
        try {
            const response = await axios.post(`/api/admin/config/tax/typeDetails`, {
                keyword: "",
                page: 0,
                limit: 0,
                index: 0,
                country_code: countryCode,
                province_code: province_code,
            });
            const responseData = response.data.taxassignment;
            console.log("response from api : ", responseData);
            const filterByCode = responseData.filter(
                (item) => item.country_code === countryCode
            );
            setIsSkeleton(false);
            setTaxList(filterByCode);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [countryCode, province_code, query]);

    const reloadData = () => {
        fetchData();
    };

    const handleDeleteClicked = (itemID) => {
        setOpenDialog(true);
        setDeleteID(itemID);
    };

    const handleSave = async () => {
        try {
            const response = await axios.get(
                `/api/admin/config/tax/setStatus`,

            )


        } catch (e) {
            console.error(e)
        }
    }
    return (
        <>
            <DeleteDialog
                reloadData={reloadData}
                deleteID={deleteID}
                open={openDialog}
                setOpen={setOpenDialog}
            />
            <div className=" w-full px-3 py-2 bg-white rounded-md border flex-col justify-start items-start gap-[15px] flex">
                <div className="w-full flex flex-row justify-between items-center">
                    <p className="text-sm text-zinc-800 font-bold leading-tight">
                        Tax Types Details
                    </p>
                    <div className="">
                        <Button
                            variant="ghost"
                            size="icon"
                            className=" w-[30px] h-[30px] text-xs active:transition-transform "
                            onClick={reloadData}
                        >
                            <RefreshCcw
                                width={14}
                                height={14}
                                className={`text-red-600 refresh-icon ${isskeleton ? "animate-spin" : ""}`}
                            />
                        </Button>
                    </div>
                </div>
                <div className="flex-col w-full justify-start items-start gap-1 flex">
                    {isskeleton ? (
                        <div className="w-full flex flex-col gap-2 items-center justify-center">
                            <Skeleton className={"w-[100%] h-[35px]"} />
                            <Skeleton className={"w-[100%] h-[35px]"} />
                            <Skeleton className={"w-[100%] h-[35px]"} />
                        </div>
                    ) : (
                        <TaxDetailsList
                            setChange={setChange}
                            data={taxList}
                            handleClick={handleDeleteClicked}
                            taxAssignID={taxAssignID}
                        />


                    )}
                </div>

                {/* <div
                    className={`flex flex-row gap-5 justify-end items-end w-full ${change ? "" : "hidden"
                        }`}
                >
                    <Button
                        variant="redOutline"
                        size="xs"
                        className="w-[80px] text-xs"
                        onClick={() => setChange(false)}
                    >
                        <p>Cancel</p>
                    </Button>
                    <Button variant="destructive" size="xs" className="w-[80px] text-xs">
                        <p>Save</p>
                    </Button>
                </div> */}
            </div>
        </>
    );
};
