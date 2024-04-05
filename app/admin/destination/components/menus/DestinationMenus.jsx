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
import { Dialog } from '@/components/ui/dialog'
import { UpdateStatusDialog } from '../Dialog/UpdateStatusDialog'
import NextLink from "next/link"
import { UpdateDialog } from '@/app/admin/custom-clearance/components/Menus/UpdateDialog'
import { AssignLotsToBin } from '../Dialog/AssignLotsToBin'
export const DestinationMenus = ({ dataID, reload, documents }) => {

    const [assignOpen, setAssignOpen] = useState(false)
    const [statusOpen, setStatusOpen] = useState(false)
    const lotsArray = Array.isArray(dataID) ? dataID : [dataID];
    return (
        <>
            <AssignLotsToBin open={assignOpen} setOpen={setAssignOpen} data={lotsArray} reload={reload} />
            <UpdateDialog open={statusOpen} setOpen={setStatusOpen} dataID={dataID} reload={reload} />
            <Dialog>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="tableBlue"
                            size="tableIcon"
                            className={`w-max px-[5px] h-[25px]`}
                        >
                            <MoreHorizontalIcon width={15} height={15} />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent side={"left"} sideOffset={2}>
                        <DropdownMenuItem
                            onClick={() => {
                                setAssignOpen(true)
                            }}
                        >
                            <p className="text-xs text-myBlue">Assign This Lots</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                setStatusOpen(true)
                            }}
                        >
                            <p className="text-xs">Update Lots Status</p>
                        </DropdownMenuItem>
                        <NextLink href={`/admin/destination/lots/${dataID}`}>
                            <DropdownMenuItem>
                                <p className="text-xs">Load Lots Details</p>
                            </DropdownMenuItem>
                        </NextLink>

                        <NextLink
                            href={`https://sla.webelectron.com/api/Package/getimages?fullName=/Assets/doc/lots/${documents}`}
                            passHref
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <DropdownMenuItem className="text-xs text-myBlue">
                                View Lots Documents
                            </DropdownMenuItem>
                        </NextLink>
                    </DropdownMenuContent>
                </DropdownMenu>

            </Dialog>
        </>
    );
}
