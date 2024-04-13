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
export const HistoryDialog = ({ open, setOpen, id }) => {

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
                setHistoryList(responseData);
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
                    <ScrollArea className="h-max max-h-[300px]">
                        <div className="flex mx-auto w-full items-center justify-start flex-col gap-2">
                            <div className="border border-zinc-200 rounded p-2">
                                Edited
                            </div>
                        </div>
                    </ScrollArea>
                    <AlertDialogFooter>
                        <Button
                            className={"w-full mt-2 text-xs"}
                            variant="redOutline"
                            type="button"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            className={"w-full mt-2 text-xs"}
                        >
                            Add Service
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
