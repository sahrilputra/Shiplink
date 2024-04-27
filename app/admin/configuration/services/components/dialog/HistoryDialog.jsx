import React, { useEffect, useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area';
import axios from 'axios';
import moment from 'moment';
import { useTimeFormat } from '@/context/TimeFormatProvider';

export const HistoryDialog = ({ open, setOpen, id }) => {
    const { timeFormat, dateFormat } = useTimeFormat();
    console.log("🚀 ~ HistoryDialog ~ id:", id)

    const onClose = () => {
        setOpen(false);
    }
    const [historyList, setHistoryList] = useState([]);
    console.log("🚀 ~ HistoryDialog ~ historyList:", historyList)

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.post(
                    `/api/admin/config/services/history`,
                    { id: id }
                )
                console.log("🚀 ~ fetchHistory ~ response:", response)
                const responseData = await response.data;
                setHistoryList(responseData.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchHistory();
    }, [id]);

    return (
        <>
            <AlertDialog open={open} onOpenChange={setOpen} modal={true}
                className="w-max"
            >
                <AlertDialogContent className="sm:max-w-md">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="font-bold text-center">
                            <p>Showing Service History</p>
                            <p className='text-[14px]'>#{id}</p>
                        </AlertDialogTitle>
                    </AlertDialogHeader>
                    <ScrollArea className="h-[300px] min-h-max w-[350px] flex flex-col gap-2">
                        <div className="flex mx-auto items-center justify-start flex-col gap-2 w-[350px]">
                            {
                                historyList?.length > 0 ?
                                    historyList?.map((item, index) => {
                                        return (
                                            <div key={index} className="w-full flex border border-zinc-200 rounded p-2 text-xs flex-col">
                                                <div className="text-myBlue text-[14px] font-semibold ">{item.action}</div>
                                                <div className="">ID {item.service_id}</div>
                                                <div className=" ">{item.status}</div>
                                                <div className=" ">{moment(item.updated_at).format(`${dateFormat}, ${timeFormat}`)}</div>
                                                <div className="w-1/3 ">{item.updated_by}</div>
                                            </div>
                                        )
                                    }) :
                                    (
                                        <div className="w-full flex items-center border border-zinc-200 rounded p-2">
                                            <div className="w-full text-center text-[14px]">No history available</div>
                                        </div>
                                    )
                            }
                        </div>
                    </ScrollArea>
                    <AlertDialogFooter>
                        <Button
                            className={"w-full mt-2 text-xs"}
                            variant="destructive"
                            type="button"
                            size="xs"
                            onClick={onClose}
                        >
                            Close
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog >
        </>
    )
}
