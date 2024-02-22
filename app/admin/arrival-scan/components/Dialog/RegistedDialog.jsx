import React, { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Barcode from 'react-jsbarcode';
import { usePDF } from 'react-to-pdf';
import ReactToPrint, { useReactToPrint } from "react-to-print"
import axios from "axios";

export function RegisterDialog({ open, setOpen }) {
    const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const [isSkeleton, setIsSkeleton] = useState(true);
    const [data, setData] = useState([]);

    const [query, setQuery] = useState({
        keyword: "",
        date_start: "",
        date_end: "",
        tracking_id: "",
        status: "",
        page: 0,
        limit: 0,
        index: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    `/api/admin/verification/list`,
                    query
                );
                console.log(response)
                const data = await response.data;
                setData(data.package_info);
                setIsSkeleton(false);
            } catch (error) {
                setIsSkeleton(false);
                console.log('Error:', error);
            }
        };

        fetchData();
    }, [query]);



    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-max">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold">Package Registered!</DialogTitle>
                </DialogHeader>

                <div className="w-max" ref={componentRef}>
                    <div className="border border-neutral-500/50 rounded-sm p-5 " ref={targetRef}>
                        <Image
                            src={"/logo.png"}
                            width={100}
                            height={100}
                            objectFit="contain"
                            alt="Shiplink Logo"
                            style={{ width: 100, height: 30, objectFit: "contain" }}
                        />

                        <div className="flex justify-between w-full flex-row text-sm">
                            {/* <p>{name}</p>
                            <p>{`#${unitID}`}</p> */}
                        </div>
                        <div className="w-full flex justify-center items-center p-1">
                            {/* <Barcode value={`${trackingNumber}`}
                                options={{ format: 'code128', width: '3', lineColor: "#2d2d2d", textMargin: 10, fontSize: 16, height: 70 }}
                                renderer="svg" className="tracking-wider "
                            /> */}
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        variant="redOutline"
                        className="w-full"
                        type="submit"
                    >
                        Print
                    </Button>
                    <Button
                        variant="destructive"
                        className="w-full"
                        type="submit"
                        onClick={() => toPDF()}
                    >
                        Download
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}