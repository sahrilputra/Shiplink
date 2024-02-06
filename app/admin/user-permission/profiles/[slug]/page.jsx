
'use client'
import { MoreAction } from '@/app/admin/customers-manager/[slug]/components/menus/MoreAction'
import { MemberList } from '@/app/admin/warehouse-manager/components/other/MemberList'
import { UserPermissionForms } from '../../components/forms/UserForms'
import { Button } from '@/components/ui/button'
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import { MoreUserMenus } from '../../components/menus/MoreUserMenus'
export default function Profiles({ params }) {
    console.log(params.slug)
    return (
        <>
            <div className="w-full h-full">

                <div className="wrapper w-full flex flex-row justify-between gap-2 h-full">
                    <div className="left w-[30%]  ">
                        <div className="content py-3  bg-blue-50 border border-neutral-200 rounded-md text-sm flex flex-col gap-1 justify-center items-center h-full" >
                            <div className="rounded-full m-3 mb-2">
                                <img src="https://source.boringavatars.com/beam"
                                    alt="avatar"
                                    className='w-[50px] h-[50px] rounded-full object-cover'
                                />
                            </div>
                            <p className='font-bold text-sm'>Jemth Smith</p>
                            <p className=' text-zinc-600'>#1234567</p>
                            <div className="text-xs text-zinc-600 text-center">
                                <p>Jhonsmith@gmail.com</p>
                                <p>(+1) 781-491-0874</p>
                            </div>

                            <div className="bg-green-50 border border-green-200 rounded-sm text-xs mt-3">
                                <p className='px-3 py-2'>Free</p>
                            </div>

                            <div className="ButtonGroup flex flex-col gap-2 py-3">

                                <Button
                                    variant="destructive"
                                    size="sm"
                                >
                                    <p className='text-xs'>Edit Profiles</p>
                                </Button>
                                <MoreUserMenus params={params.slug}/>
                            </div>
                        </div>
                    </div>
                    <div className="center w-[100%]">
                        <UserPermissionForms />
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
