
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
import { PermissionTableComponents } from './components/PermissionTableComponents'
import axios from 'axios';
export default function Permission({ params }) {
    console.log("params : ", params.slug)
    const [loading, setLoading] = useState(false)
    const [skleton, setSkleton] = useState(true)
    const [permissionList, setPermissionList] = useState([])
    const [user, setUser] = useState({})
    const [userPermsission, setUserPermission] = useState(null)
    const [query, setQuery] = useState({
        data: params.slug,
    });
    const fetchData = async () => {
        setSkleton(true)
        try {
            const response = await axios.post(
                `/api/admin/user/permission/getUser`,
                query
            );

            const permissionResponse = await axios.get(
                `/api/admin/user/permission/list`,
                null
            );
            const permissionList = await permissionResponse.data.data
            console.log("Permission List :", permissionList);
            setPermissionList(permissionList);


            const user = await response.data
            // console.log("Users :", user.data.permissions);
            // console.log("Response : ", user)
            setUser(user.data.user);
            setUserPermission(user.data.permissions);
            setSkleton(false);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // const reloadData = () => {
    //     fetchData();
    // }
    // fetchData();


    console.log("User Data", user)
    console.log("User Pemission", userPermsission)
    return (
        <>
            <div className="flex flex-col gap-4">


                <div className="flex flex-row gap-2 justify-between items-end">
                    <div className="profiles flex flex-row gap-4 px-2 py-2 justify-items-start items-center w-full">
                        <div className="w-[70px]">
                            <img src="https://source.boringavatars.com/beam"
                                alt="avatar"
                                className='w-[50px] h-[50px] rounded-full object-cover'
                            />
                        </div>
                        <div className="info text-sm w-[200px]">
                            <p className='font-bold'>{user?.name}</p>
                            <p className=' text-zinc-600'>#{user.user_code ? user.user_code : ""}</p>
                            <p className=' text-zinc-600'>{user.email ? user.email : ''}</p>
                            <p className=' text-zinc-600'>(+1) 781-491-0874 </p>
                            <p className=' text-zinc-600'>Warehouse : {user.warehouse_name ? user.warehouse_name : ""}</p>
                        </div>
                    </div>
                    <div className="Role flex flex-col gap-4 items-end">
                        {/* <div className="flex flex-col text-xs gap-2">
                            <p className='font-bold text-xs'>Select Role</p>
                            <Select className="text-xs bg-slate-400">
                                <SelectTrigger className="w-[180px] text-xs h-[40px] bg-slate-300/40">
                                    <SelectValue placeholder="Theme" />
                                </SelectTrigger>
                                <SelectContent className="text-xs">
                                    <SelectItem className="text-xs" value="light">Light</SelectItem>
                                    <SelectItem className="text-xs" value="dark">Dark</SelectItem>
                                    <SelectItem className="text-xs" value="system">System</SelectItem>
                                </SelectContent>
                            </Select>
                        </div> */}
                    </div>
                </div>

                <div className="">
                    <PermissionTableComponents data={permissionList} userData={userPermsission} userDataID={params.slug} />
                </div>
            </div>
        </>
    )
}
