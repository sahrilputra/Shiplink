'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontalIcon } from "lucide-react"
import { EditLotsDialog } from '../AssignLotsDialog/EditLotsDialog'
import { Dialog } from '@/components/ui/dialog'

import NextLink from "next/link"
export const LotsMoreMenusDropDrown = ({
    getSelectedItem,
    dataIDhandler,
    data,
    dataID,
    lots_docs,
    handleDeleteLost,
}) => {
    const handleItemClick = (item) => {
        getSelectedItem(item);
        dataIDhandler(data);
    };

    // https://sla.webelectron.com/api/Package/getimages?fullName=/Assets/doc/lots/doc-240226092117490001-0.pdf
    const [editModalOpen, setEditModalOpen] = useState(false);

    const render = () => {
        if (editModalOpen) {
            return (
                <EditLotsDialog
                    open={editModalOpen}
                    setOpen={setEditModalOpen}
                    data={data}
                />
            );
        }
    };
    return (
        <>
            <Dialog>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="tableBlue"
                            size="tableIcon"
                            className={`rounded-sm w-max px-[5px] h-[25px]`}
                        >
                            <MoreHorizontalIcon width={15} height={15} />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent side={"left"} sideOffset={2}>
                        {/* <DropdownMenuItem>
                            <p className="text-xs text-myBlue">Download Package List</p>
                        </DropdownMenuItem> */}
                        <DropdownMenuItem>
                            <NextLink href={`/admin/transport/lots/${dataID}`} passHref>
                                <p className="text-xs">View Lot Details</p>
                            </NextLink>
                        </DropdownMenuItem>
                        <NextLink
                            href={`https://sla.webelectron.com/api/Package/getimages?fullName=/Assets/doc/lots/${lots_docs}`}
                            passHref
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <DropdownMenuItem>
                                <p
                                    className="text-xs"
                                // onClick={() => setIsDownload(true)}
                                >
                                    Download Document
                                </p>
                            </DropdownMenuItem>
                        </NextLink>

                        <DropdownMenuItem onClick={() => handleDeleteLost(dataID)}>
                            <p className="text-xs text-red-700">Delete Lot</p>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                {render()}
            </Dialog>
        </>
    );
};
