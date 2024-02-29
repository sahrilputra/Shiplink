'use client'
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { UserProfileForms } from './components/userForms';
import { CustomerPackageList } from './components/userPackageData/dataList';
import { Loaders } from '@/components/ui/loaders';
import { MoreAction } from './components/menus/MoreAction';
import { Skeleton } from '@/components/ui/skeleton';
import { PaymentCards } from './components/PaymentsCard';

export default function UserPage({ params }) {
    console.log("hello :", params.slug);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [skeleton, setSkeleton] = useState(true);
    const [disable, setDisable] = useState(true);

    const fetchUserData = async () => {
        try {
            const response = await axios.post(`/api/admin/customer_manager/list`, { keyword: params.slug });
            const responseData = response.data.customer[0];
            setData(responseData);
            setLoading(false);
            setSkeleton(false);
        } catch (error) {
            setSkeleton(false);
            setLoading(false);
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [params.slug]);

    const toggleMoreOpen = () => {
        setMoreOpen(!moreOpen);
    };

    const handleDisable = () => {
        setDisable(!disable)
    }

    return (
        <>
            {loading && <Loaders />}
            <div className="w-full">
                <div className="wrapper w-full flex flex-row justify-between gap-2 h-ful ">
                    <div className="left w-[30%] ">
                        <div className="content border bg-blue-200 border-neutral-200 rounded-md text-sm flex flex-col gap-1 justify-center items-center h-full">
                            <div className="rounded-full m-3 mb-2 text-sm">
                                {skeleton ? (
                                    <Skeleton className="w-[50px] h-[50px] rounded-full object-cover" />
                                ) : (
                                    <img
                                        src="https://source.boringavatars.com/beam"
                                        alt="avatar"
                                        className="w-[50px] h-[50px] rounded-full object-cover"
                                    />
                                )}
                            </div>
                            {skeleton ? (
                                <Skeleton className="w-[100px] h-[15px]" />
                            ) : (
                                <p className="font-bold text-sm">{data?.customer_name}</p>
                            )}
                            <p className="text-zinc-600 text-sm">#{data?.customer_id}</p>
                            <div className="text-xs text-zinc-600 text-center">
                                <p>{data?.email}</p>
                                <p>{data?.phone_number || "undefined"}</p>
                            </div>
                            <div className="bg-green-50 border border-green-200 rounded-sm text-xs mt-3">
                                <p className="px-3 py-2">{data?.customer_plans}</p>
                            </div>
                            <div className="ButtonGroup flex flex-col gap-2 py-3">
                                <Button
                                    variant="destructive"
                                    size="xs"
                                    className=""
                                    type="button"
                                    onClick={handleDisable}
                                >
                                    <p className="text-xs">Edit Profiles</p>
                                </Button>
                                <MoreAction />
                            </div>
                        </div>
                    </div>
                    <div className="center w-[100%]">
                        <UserProfileForms
                            data={data}
                            isDisable={disable}
                            handleDisable={handleDisable}
                            customerID={data?.customer_id}
                        />
                    </div>
                    <div className="right h-full w-[40%]">
                        <div className="flex flex-col gap-1">
                            <div className="payments flex flex-col">
                                <PaymentCards />
                                <PaymentCards />
                                <Button variant="tableBlue" size="sm" className="w-full">
                                    <p className="text-xs">Show All User Payment Method</p>
                                </Button>
                            </div>
                            <div className="Invoice">
                                {/* <InvoiceList /> */}
                                <Button variant="tableBlue" size="sm" className="w-full">
                                    <p className="text-xs">Show All User Invoice History</p>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="w-full">
                <CustomerPackageList dataID={params.slug} />
            </div> */}
        </>
    );
}