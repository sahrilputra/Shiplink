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
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { Loaders } from "@/components/ui/loaders";
export function PermissionTable({ roleID = 0 }) {

    // const [checkedPermission, setCheckedPermission] = useState([]);

    // useEffect(() => {
    //     // Inisialisasi checkedPermission dengan ID izin dari userData
    //     const initialCheckedPermission = userData?.map(user => user.permission_id);
    //     setCheckedPermission(initialCheckedPermission);
    // }, [userData]);
    const { toast } = useToast();
    const [skleton, setSkleton] = useState(true)
    const [permissionList, setPermissionList] = useState([]);
    const [checkedPermission, setCheckedPermission] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [checkedSkeleton, setCheckedSkeleton] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setSkleton(true);
            try {
                const permissionResponse = await axios.get(
                    `/api/admin/user/permission/list`,
                    null
                );
                const permissionList = permissionResponse.data.data;
                setPermissionList(permissionList);
                setSkleton(false);
            } catch (error) {
                console.log('Error:', error);
            }
        };
        fetchData();
    }, []);


    useEffect(() => {
        const fetchGetData = async () => {
            setCheckedSkeleton(true);
            try {
                const response = await axios.post(
                    `/api/admin/user/role/getData`,
                    { "data": roleID }
                );
                const permissionData = response.data.data.permissions.map(permission => permission.permission_id);
                setCheckedPermission(permissionData);
                setCheckedSkeleton(false)
            } catch (error) {
                setCheckedSkeleton(false)
                console.log('Error:', error);
            }
        };
        if (roleID !== 0) {
            fetchGetData();
        }
    }, [roleID]);

    const handleCheck = (permissionId) => {
        const isChecked = checkedPermission.includes(permissionId);

        if (isChecked) {
            setCheckedPermission(prevState => prevState.filter(id => id !== permissionId));
        } else {
            setCheckedPermission(prevState => [...prevState, permissionId]);
        }
    };

    const handleSave = async () => {
        setIsLoading(true)
        try {
            const response = await axios.post(
                `/api/admin/user/role/setPermission`,
                {
                    id_role: roleID,
                    permission_id: checkedPermission
                }
            );
            setIsLoading(false)
            if (response.status === 200) {
                toast({
                    title: "Success",
                    message: response.data.message,
                    type: "success",
                });
            } else {
                toast({
                    title: "Error",
                    message: response.data.message,
                    type: "error",
                });
            }
        } catch (error) {
            setIsLoading(false)
            console.log('Error:', error);
            toast({
                title: "Error",
                message: "Internal Server Error",
                type: "error",
            });
        }
    }

    console.log("My Permission :", checkedPermission)
    return (
        <>
            {isLoading && (<Loaders />)}
            <Table className="border border-zinc-300 rounded-sm">
                <TableHeader className="text-sm">
                    <TableHead className=" text-left">Manage Permission</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                </TableHeader>
                <TableBody className="text-xs">
                    {
                        skleton ? (
                            <>
                                <TableRow  >
                                    <TableCell colSpan={2} className="font-medium p-1 px-[20px] py-[10px]">
                                        <Skeleton className={"w-full h-[30px]"} />
                                    </TableCell>
                                </TableRow>
                                <TableRow  >
                                    <TableCell colSpan={2} className="font-medium p-1 px-[20px] py-[10px]">
                                        <Skeleton className={"w-full h-[30px]"} />
                                    </TableCell>
                                </TableRow>
                            </>
                        ) : (
                            permissionList?.map((item, index) => (
                                <>
                                    <TableRow  >
                                        <TableCell key={index} className="font-medium p-1 px-[20px] py-[10px]">
                                            <div className="flex flex-col gap-1">
                                                <p className="text-sm font-semibold">{item.permission_name}</p>
                                                <p className="text-xs font-regular text-zinc-500">{item.permission_description}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell className="w-[80px]">
                                            {checkedSkeleton ?
                                                (
                                                    <Skeleton className={"w-full h-[30px]"} />
                                                )
                                                : (
                                                    <Checkbox
                                                        onCheckedChange={() => handleCheck(item.permission_id)}
                                                        checked={checkedPermission?.includes(item.permission_id)}
                                                    />
                                                )
                                            }
                                        </TableCell>
                                    </TableRow>
                                </>
                            ))
                        )
                    }
                    <TableRow  >
                        <TableCell colSpan={2} className="font-medium p-1 px-[20px] py-[10px]">
                            <div className="flex flex-row gap-3 justify-end items-end">
                                <Link href={`/admin/user-permission`} >
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
