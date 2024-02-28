'use client'
import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/tableDashboard"
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { set } from "date-fns";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
export function PermissionTableComponents({ data, userData, isOpen, setOpen, userDataID }) {
    const [checkedPermission, setCheckedPermission] = useState([]);
    const { toast } = useToast();
    useEffect(() => {
        // Inisialisasi checkedPermission dengan ID izin dari userData
        const initialCheckedPermission = userData?.map(user => user.permission_id);
        setCheckedPermission(initialCheckedPermission);
    }, [userData]);

    const handleCheck = (permissionId) => {
        const isChecked = checkedPermission.includes(permissionId);

        if (isChecked) {
            setCheckedPermission(prevState => prevState.filter(id => id !== permissionId));
        } else {
            setCheckedPermission(prevState => [...prevState, permissionId]);
        }
    }
    console.log("CHECKED PERMISSION : ", checkedPermission)

    const handleSave = () => {
        // Kirim data ke API
        axios.post('/api/admin/user/permission/setData', {
            user_code: userDataID,
            permission_id: checkedPermission
        })
            .then(response => {
                console.log("response : ", response);
                toast({
                    title: "Success",
                    message: "Permission has been updated",
                    type: "success",
                })
            })
            .catch(error => {
                console.error("error : ", error);
                toast({
                    title: "Error",
                    message: "Failed to update permission",
                    type: "error",
                })
            })
    }

    return (
        <>
            <Table className="border border-zinc-300 rounded-sm">
                <TableHeader className="text-sm">
                    <TableHead className=" text-left">Manage Permission</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                </TableHeader>
                <TableBody className="text-xs">
                    {
                        data?.map((item, index) => (
                            <>
                                <TableRow  >
                                    <TableCell key={index} className="font-medium p-1 px-[20px] py-[10px]">
                                        <div className="flex flex-col gap-1">
                                            <p className="text-sm font-semibold">{item.permission_name}</p>
                                            <p className="text-xs font-regular text-zinc-500">{item.permission_description}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell className="w-[80px]">
                                        <Checkbox
                                            onCheckedChange={() => handleCheck(item.permission_id)}
                                            checked={checkedPermission?.includes(item.permission_id)}
                                        />
                                    </TableCell>
                                </TableRow>
                            </>
                        ))
                    }
                    <TableRow  >
                        <TableCell colSpan={2} className="font-medium p-1 px-[20px] py-[10px]">
                            <div className="flex flex-row gap-3 justify-end items-end">
                                <Link href={`/admin/user-permission/profiles/${userDataID}`} >
                                    <Button
                                        variant="redOutline"
                                        size="sm"
                                        className="w-[80px]"

                                    >
                                        <p>Cancel</p>
                                    </Button>
                                </Link>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    className="w-[80px]"
                                    onClick={handleSave}
                                >
                                    <p>Save</p>
                                </Button>
                            </div>
                        </TableCell>

                    </TableRow>
                </TableBody>
            </Table>
        </>
    )
}
