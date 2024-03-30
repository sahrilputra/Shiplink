'use client'
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, use, useCallback } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { UserProfileForms } from './components/userForms';
import { CustomerPackageList } from './components/userPackageData/dataList';
import { Loaders } from '@/components/ui/loaders';
import { MoreAction } from './components/menus/MoreAction';
import { Skeleton } from '@/components/ui/skeleton';
import { PaymentCards } from './components/PaymentsCard';
import { NewPasswordDialog } from './components/menus/dialog/NewPasswordDialog';
import { DeleteCustomer } from '../components/dialog/DeleteCustomer';
import { SuspendUser } from './components/menus/dialog/SuspendUser';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { MembershipTag } from '@/components/membership/MembershipTag';
import { ActivateUser } from './components/menus/dialog/ActivateUser';
import { CustomerPackageTabled } from './components/userPackageData/dataList';
import { ChangeMembership } from './components/menus/dialog/ChangeMembership';
// import { CustomerInvoiceTable } from '../components/table/invoiceTable/CustomerInvoiceTable';
export default function UserPage({ params }) {
    const router = useRouter();
    const userID = params.slug;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [userPackage, setUserPackage] = useState([]);
    const [isSkeleton, setIsSkeleton] = useState(true);
    const [disable, setDisable] = useState(true);
    const [openPassword, setOpenPassword] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openSuspend, setOpenSuspend] = useState(false);
    const [openActivate, setOpenActivate] = useState(false);
    const [openMembership, setOpenMembership] = useState(false);
    const fetchData = useCallback(async () => {
        try {
            const userDataResponse = await axios.post(`/api/admin/customer_manager/list`, { keyword: userID });
            const userData = userDataResponse.data.customer[0];
            console.log("🚀 ~ fetchData ~ userData:", userData)
            setData(userData);
            setLoading(false);
            setIsSkeleton(false);
        } catch (error) {
            console.error("Error:", error);
            setLoading(false);
            setIsSkeleton(false);
        }
    }, [userID]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleDisable = () => {
        setDisable(!disable);
    };

    const reloadData = () => {
        setLoading(true);
        fetchData();
    };

    // const fetchData = async () => {
    //     try {
    //         const [userDataResponse, packageDataResponse] = await Promise.all([
    //             axios.post(`/api/admin/customer_manager/list`, { keyword: userID }),
    //             axios.post(`/api/admin/packages/list`, {
    //                 keyword: userID,
    //                 date_start: "",
    //                 date_end: "",
    //                 tracking_id: "",
    //                 status: "",
    //                 page: 0,
    //                 limit: 0,
    //                 index: 0,
    //             })
    //         ]);

    //         const userData = userDataResponse.data.customer[0];
    //         setData(userData);
    //         setLoading(false);
    //         setIsSkeleton(false);

    //         if (!userData) {
    //             router.push("/admin/customers-manager");
    //         }

    //         const packageData = packageDataResponse.data.package_info;
    //         const filteredPackageData = packageData.filter(item => item.customer_id === userID);
    //         setUserPackage(filteredPackageData);
    //     } catch (error) {
    //         console.error("Error:", error);
    //         setLoading(false);
    //         setIsSkeleton(false);
    //     }
    // };

    return (
        <>
            {/* {loading && <Loaders />} */}

            <ChangeMembership setOpen={setOpenMembership} open={openMembership} data={data} />
            <ActivateUser open={openActivate} setOpen={setOpenActivate} deleteID={data?.customer_id} reloadData={reloadData} />
            <SuspendUser deleteID={data?.customer_id} open={openSuspend} setOpen={setOpenSuspend} reloadData={reloadData} />
            <NewPasswordDialog open={openPassword} setOpen={setOpenPassword} data={data} reload={reloadData} />
            <DeleteCustomer open={openDelete} setOpen={setOpenDelete} reloadData={reloadData} deleteID={data?.customer_id} />
            <div className="w-full">
                <div className="wrapper w-full flex flex-row justify-between gap-2 h-ful ">
                    <div className="left w-[30%] ">
                        <div className="content border bg-blue-200 border-neutral-200 rounded-md text-sm flex flex-col gap-1 justify-center items-center h-full">
                            <div className="rounded-full m-3 mb-2 text-sm">
                                {isSkeleton ? (
                                    <Skeleton className="w-[50px] h-[50px] rounded-full object-cover" />
                                ) : (
                                    <img
                                        src="../../assets/user-holder.svg"
                                        alt="avatar"
                                        className="w-[50px] h-[50px] rounded-full object-cover"
                                    />
                                )}
                            </div>
                            {isSkeleton ? (
                                <Skeleton className="w-[100px] h-[15px]" />
                            ) : (
                                <p className="font-bold text-sm">{data?.customer_name}</p>
                            )}
                            <p className="text-zinc-600 text-sm">Unit : {data?.customer_id}</p>
                            <div className="text-xs text-zinc-600 text-center">
                                <p>{data?.email}</p>
                                <p>{data?.phone_number || "Phone"}</p>
                            </div>
                            <MembershipTag plans={data?.customer_plans || "Free"} />
                            <div className="ButtonGroup flex flex-col gap-2 py-3">
                                <Button
                                    variant="destructive"
                                    size="xs"
                                    className=""
                                    type="button"
                                    onClick={handleDisable}
                                >
                                    <p className="text-xs">Edit Profile</p>
                                </Button>
                                <MoreAction
                                    setOpenPassword={setOpenPassword}
                                    setOpenDelete={setOpenDelete}
                                    setOpenSuspend={setOpenSuspend}
                                    setOpenActivate={setOpenActivate}
                                    setOpenMembership={setOpenMembership}
                                    customerID={data?.customer_id}
                                    isDisable={disable}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="center w-[100%]">
                        <UserProfileForms
                            data={data}
                            isDisable={disable}
                            handleDisable={handleDisable}
                            customerID={data?.customer_id}
                            reloadData={reloadData}
                        />
                    </div>
                    <div className="right h-full w-[40%] hidden">
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

                {/* <div className="invoiceTable w-full">
                    <CustomerInvoiceTable UserID={data?.customer_name}/>
                </div> */}
            </div>
            <div className="w-full">
                <CustomerPackageTabled customerID={data?.customer_id} customerName={data?.customer_name} />
            </div>
        </>
    );
}