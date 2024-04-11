import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/tableDashboard'
import { Button } from '@/components/ui/button'
import axios from "axios";
import { useToast } from '@/components/ui/use-toast';
import NextLink from 'next/link'
export const ExpandedLotsData = ({ data, lotsID, setExpandedRows }) => {
    const { toast } = useToast()
    const handleDepartLots = async () => {
        setExpandedRows([])
        const response = await axios.post(
            `/api/admin/transport/lots/status/departLots`,
            {
                LotsId: lotsID,
            }
        );
        if (response.data.status === false) {
            toast({
                title: "Error",
                message: response.data.message,
            })
        } else {
            toast({
                title: "Success",
                message: response.data.message,
            })
        }
    }
    return (
        <>
            <Table>
                <TableHeader className="bg-sky-50 ">
                    <TableHead className=" text-myBlue font-bold text-xs p-0 h-7 px-5 py-2">Last Update</TableHead>
                    <TableHead className=" text-myBlue font-bold text-xs p-0 h-7 px-5 py-2">Trip Number</TableHead>
                    <TableHead className="text-myBlue font-bold text-xs p-0 h-7 px-5 py-2">Documents</TableHead>
                    <TableHead className="text-myBlue font-bold text-xs p-0 h-7 px-5 py-2 w-[150px]"></TableHead>
                </TableHeader>
                <TableBody>
                    <TableRow className="text-xs bg-white">
                        <TableCell className="font-medium text-xs p-0 h-7 px-5 py-2">
                            <p>{data?.updated_at || "-"}</p>
                        </TableCell>
                        <TableCell className="font-medium text-xs p-0 h-7 px-5 py-2">
                            <p>{data?.trip_number || "-"}</p>
                        </TableCell>
                        <TableCell className="font-medium text-xs p-0 h-7 px-5 py-2">
                            {
                                data.documents ?
                                    (
                                        <NextLink
                                            href={`https://sla.webelectron.com/api/Package/getimages?fullName=/Assets/doc/lots/${data.documents}`}
                                            passHref
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <p className="text-xs underline text-myBlue">
                                                View
                                            </p>
                                        </NextLink>
                                    ) : (
                                        <p>No Documents</p>
                                    )
                            }


                        </TableCell>
                        <TableCell className="font-medium text-xs p-0  px-5 py-2 w-max flex-row flex justify-between gap-3">
                            <NextLink passHref href={`/admin/Lots_Details/${lotsID}`}>
                                <Button
                                    variant="secondary"
                                    size="xs"
                                    className="h-[25px] px-5 text-xs"
                                >
                                    <p>View Packages</p>
                                </Button>
                            </NextLink>
                            <Button
                                variant="destructive"
                                type="button"
                                onClick={handleDepartLots}
                                size="xs"
                                className="h-[25px] px-5 text-xs"
                            >
                                <p>Depart</p>
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table ></>
    )
}
