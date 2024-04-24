import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import NextLink from "next/link"
import { MoreHorizontalIcon } from "lucide-react"
import { useEffect, useState } from "react"
import axios from 'axios'
import { useToast } from "@/components/ui/use-toast"
export function CustomBrokerDropdownMenus({
    dataID,
    setIsSkeleton,
    reload,
    documents,
}) {
    console.log("🚀 ~ documents:", documents)
    // Menggunakan nilai awal langsung untuk useState
    const [documentsData, setDocumentsData] = useState(documents ? documents.split(',') : []);

    useEffect(() => {
        // Periksa apakah documents adalah string sebelum membaginya menjadi array
        if (typeof documents === 'string') {
            setDocumentsData(documents.split(','));
        }
    }, [documents]);

    const { toast } = useToast();
    console.log("DataID", dataID);
    const [statusList, setStatusList] = useState([]);

    const handleSave = async (id) => {
        console.log("dikirim", id);
        setIsSkeleton(true);
        try {
            const response = await axios.post(
                `/api/admin/custom_clearance/setLotsStatus`,
                {
                    lots_id: dataID,
                    status_id: id,
                }
            );
            toast({
                title: `Success New Status For ${dataID} !`,
                description: response.data.message,
                status: "success",
            });
            setIsSkeleton(false);
            reload();
        } catch (error) {
            setIsSkeleton(false);
            console.log("Error", error);
            toast({
                title: "Error While Assign Status!",
                description: `Error : ${error.message}`,
                status: "error",
            });
        }
    };

    console.log("StatusList", statusList);
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="tableBlue"
                    size="tableIcon"
                    className={`w-max px-[5px] h-[25px]`}
                    onClick={() => toggleOpenChange()}
                >
                    <MoreHorizontalIcon width={15} height={15} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-xs" side="left" align="left">
                <DropdownMenuGroup>
                    {
                        documentsData.map((item, index) => {
                            return (
                                <NextLink
                                    key={index}
                                    href={`https://sla.webelectron.com/api/Package/getimages?fullName=/Assets/doc/lots/${item}`}
                                    passHref
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <DropdownMenuItem className="text-xs text-myBlue">
                                        Lot Documents {index + 1}
                                    </DropdownMenuItem>
                                </NextLink>
                            )
                        })
                    }


                    <NextLink href={`/admin/Lots_Details/${dataID}`} passHref>
                        <DropdownMenuItem className="text-xs">
                            Lot Details
                        </DropdownMenuItem>
                    </NextLink>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
