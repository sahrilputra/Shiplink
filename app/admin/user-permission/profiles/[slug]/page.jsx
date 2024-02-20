
'use client'
import { MoreAction } from '@/app/admin/customers-manager/[slug]/components/menus/MoreAction'
import { MemberList } from '@/app/admin/warehouse-manager/components/other/MemberList'
import { UserPermissionForms } from '../../components/forms/UserForms'
import { Button } from '@/components/ui/button'
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { MoreUserMenus } from '../../components/menus/MoreUserMenus'
import { Skeleton } from '@/components/ui/skeleton'
import axios from 'axios';

export default function Profiles({ params }) {
    const [loading, setLoading] = useState(false)
    const [skleton, setSkleton] = useState(true)
    const [disable, setDisable] = useState(true)

    const [user, setUser] = useState({})
    const [query, setQuery] = useState({
        keyword: "",
        page: 1,
        limit: 0,
        index: 0
    });
    const fetchData = async () => {
        setSkleton(true)
        try {
            const response = await axios.post(
                `/api/admin/user/list`,
                query
            );
            const user = await response.data.users.find(user => user.user_code === params.slug);
            console.log(user);
            console.log(response)
            setUser(user);
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
    const handleDisable = () => {
        setDisable(!disable)
    }


    console.log(params.slug)
    return (
        <>
            <div className="w-full h-full">
                <div className="wrapper w-full flex flex-row justify-between gap-2 h-full">
                    <div className="left w-[30%]  ">
                        <>
                            {
                                skleton ? (
                                    <div className="content py-3  bg-blue-50 border border-neutral-200 rounded-md text-sm flex flex-col gap-1 justify-center items-center h-full" >
                                        <div className="rounded-full m-3 mb-2">
                                            <Skeleton className={'w-[50px] h-[50px] rounded-full object-cover bg-white'} />
                                        </div>
                                        <Skeleton className={'bg-white font-bold text-sm h-[20px] w-[50%]'} />
                                        <Skeleton className={'bg-white font-bold text-sm h-[20px] w-[50%]'} />
                                        <Skeleton className={'bg-white font-bold text-sm h-[20px] w-[50%]'} />
                                        <Skeleton className={'bg-white font-bold mt-2 text-sm h-[15px] w-[30%]'} />
                                        <Skeleton className={'bg-white font-bold text-sm h-[20px] w-[30%] mt-3 '} />

                                        <Skeleton className={'bg-white font-bold text-sm h-[30px] w-[50%] mt-3'} />
                                        <Skeleton className={'bg-white font-bold text-sm h-[30px] w-[50%]'} />
                                    </div>
                                ) : (
                                    <div className="content py-3  bg-blue-50 border border-neutral-200 rounded-md text-sm flex flex-col gap-1 justify-center items-center h-full" >
                                        <div className="rounded-full m-3 mb-2">
                                            <img src="https://source.boringavatars.com/beam"
                                                alt="avatar"
                                                className='w-[50px] h-[50px] rounded-full object-cover'
                                            />
                                        </div>
                                        <p className='font-bold text-sm'>{user.email ? user.email : ''}</p>
                                        <p className=' text-zinc-600'>{user.user_code ? user.user_code : ""}</p>
                                        <div className="text-xs text-zinc-600 text-center">
                                            <p>{user.role ? user.role : ""}</p>
                                            <p>{user.type ? user.type : ""}</p>
                                            <p>{user.warehouse_name ? user.warehouse_name : ""}</p>
                                        </div>

                                        <div className="ButtonGroup flex flex-col gap-2 py-3">

                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                disabled={disable ? false : true}
                                                onClick={handleDisable}
                                            >
                                                <p className='text-xs'>Edit Profiles</p>
                                            </Button>
                                            <MoreUserMenus params={params.slug} />
                                        </div>
                                    </div>
                                )
                            }
                        </>
                    </div>
                    <div className="center w-[100%]">
                        <UserPermissionForms data={user} isDisable={disable} handleDisable={handleDisable} isSkleton={skleton} />
                    </div>
                    <div className="right w-[40%]">
                        <div className="flex flex-col gap-1 h-full">
                            <MemberList />
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full">
            </div>
        </>
    )
}
