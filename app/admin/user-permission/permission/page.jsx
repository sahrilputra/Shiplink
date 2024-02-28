
'use client'
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { PermissionTable } from './components/PermissionTable'
import { CheckIcon } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import axios from 'axios';
import { NewRoleDialog } from '../components/dialog/NewRoleDialog'

export default function RolePermissionPage() {

    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [valueID, setValueID] = React.useState(0)
    const [openNewRole, setOpenNewRole] = useState(false)
    const [permissionList, setPermissionList] = useState([])

    const [resQuery, setResQuery] = useState({
        keyword: "",
        page: 1,
        limit: 0,
        index: 0
    });
    const fetchData = async () => {
        try {
            const responseRole = await axios.post(
                `/api/admin/user/role/list`,
                resQuery
            );
            console.log("Response Role :", responseRole)
            const permissionList = await responseRole.data.roles
            console.log("Permission List :", permissionList);
            setPermissionList(permissionList);
        } catch (error) {
            console.log('Error:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    console.log("Roles", permissionList)
    console.log("Selected Role", value)
    console.log("Selected Role ID", valueID)
    return (
        <>
            <NewRoleDialog open={openNewRole} setOpen={setOpenNewRole} />
            <div className="flex flex-col gap-4">
                <div className="flex flex-row gap-2 justify-between items-end">
                    <div className="Role flex flex-col gap-4 items-end">
                        <div className="flex flex-col text-xs gap-2 px-3">
                            <p className='font-bold text-xs'>Select Role</p>
                            <div className="flex flex-row gap-5 items-center">
                                <div className="">
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={open}
                                                className="w-[200px] justify-between shadow-none bg-slate-100 h-[35px] text-xs"
                                            >
                                                {value ? value : "Select Role"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Search Role..." className="h-9 text-xs" />
                                                <CommandEmpty className="text-xs">No Role Found.</CommandEmpty>
                                                <CommandGroup>
                                                    {permissionList?.map((item) => (
                                                        <CommandItem
                                                            key={item.id}
                                                            value={item.role_name}
                                                            className="text-xs"
                                                            onSelect={(currentValue) => {
                                                                setValueID(item.id)
                                                                setValue(currentValue === value ? "" : currentValue)
                                                                setOpen(false)
                                                            }}
                                                        >
                                                            {item.role_name}
                                                            <CheckIcon
                                                                className={cn(
                                                                    "ml-auto h-4 w-4",
                                                                    value.toLowerCase() === item.role_name.toLowerCase() ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                <div className="">
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="text-xs h-[35px]"
                                        onClick={() => setOpenNewRole(true)}
                                    >
                                        Create New Role
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="">
                    <PermissionTable roleID={valueID} />
                </div>
            </div>
        </>
    )
}
