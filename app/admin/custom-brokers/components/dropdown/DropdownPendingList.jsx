'use client'
import React, { useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontalIcon } from "lucide-react"
import { Dialog, DialogContent, } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { PackageDialogDetails } from '../dialog/PackageDialogDetails'
import NextLink from 'next/link'
export const DropdownPendingList = ({ data, images }) => {
    console.log("🚀 ~ DropdownPendingList ~ images:", images)
    console.log("🚀 ~ DropdownPendingList ~ data:", data)

    const [isDetailsOpen, setDetailsOpen] = useState(false);
    const render = () => {
        if (isDetailsOpen) {
            return <PackageDialogDetails open={isDetailsOpen} setOpen={setDetailsOpen} details={data} />
        }
    }

    const [filterInvoice, setVilterInvoice] = useState([]);
    console.log("🚀 ~ ExpandedTable ~ filterInvoice:", filterInvoice)
    useEffect(() => {
        const removeInvImage = () => {
            if (images) {
                const filtered = images.filter(image => isInvoiceImage(image.type));
                setVilterInvoice(filtered);
            }
        };

        removeInvImage();
    }, [images]);

    const isInvoiceImage = (type) => {
        return type.toLowerCase() === "invoices";
    };

    return (
        <>
            <Dialog>
                <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="tableBlue"
                            size="tableIcon"
                            className={` w-max px-[5px] h-[25px]`}
                        >
                            <MoreHorizontalIcon width={15} height={15} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side={"left"} sideOffset={2}>
                        {
                            filterInvoice.length > 0 ? (
                                <NextLink href={`https://sla.webelectron.com/api/Package/getimages?fullName=${filterInvoice[0].images}`} passHref target='_blank' rel='noopener noreferrer'>
                                    <DropdownMenuItem className="text-xs text-myBlue" value={0}>
                                        View invoice
                                    </DropdownMenuItem>
                                </NextLink>
                            ) : (
                                <DropdownMenuItem
                                    disabled={true}
                                    className="text-xs text-myBlue text-center">
                                    No Invoice
                                </DropdownMenuItem>
                            )
                        }
                        {/* <DropdownMenuItem>
                            <p className="text-xs text-myBlue">Download All Invoice</p>
                        </DropdownMenuItem> */}
                        <DropdownMenuItem
                            onClick={() => setDetailsOpen(true)}
                        >
                            <p className="text-xs">Show Package Details</p>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {render()}
            </Dialog>
        </>
    )
}
