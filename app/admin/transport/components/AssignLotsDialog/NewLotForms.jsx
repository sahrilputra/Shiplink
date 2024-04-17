import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToast } from "@/components/ui/use-toast";
import { Loaders } from "@/components/ui/loaders";
import Image from "next/image";
import axios from "axios";
import NextLink from "next/link";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarIcon, CheckIcon, XIcon } from "lucide-react";
import { Files, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format, set } from "date-fns";
import Router from "next/router";
const formSchema = yup.object().shape({
    LotsId: yup.string(),
    LotsLabel: yup.string().required(),
    Destination_country: yup.string().required(),
    TripNumber: yup.string().required(),
    Status: yup.number(),
    Status_name: yup.string(),
    pickDate: yup.string().required(),
    Documents: yup.array().of(yup.string()),
});
export const NewLotsFrom = ({ close, data = null, reload }) => {
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            LotsId: data?.lots_id || "",
            LotsLabel: data?.label || "",
            Destination_country: data?.warehouse_destination || "",
            TripNumber: data?.trip_number || "",
            Status: data?.status_id || 0,
            Status_name: data?.status || "",
            pickDate: data?.pickup_schedule || "",
            Documents: [],
        },
        mode: "onChange",
    });


    const useRouter = Router;
    console.log("🚀 ~ NewLotsFrom ~ data:", data);
    const { toast } = useToast();
    const [popOverOpen, setPopOverOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [statusList, setStatusList] = useState([]);
    const [countryList, setCountryList] = useState([]);
    const [selectDestination, setSelectDestination] = useState("");
    const [countryQuery, setCountryQuery] = useState({
        keyword: "",
        page: 0,
        limit: 0,
        index: 0,
    });

    const [originWarehouse, setOriginWarehouse] = useState([]);
    const [destinationWarehouse, setDestinationWarehouse] = useState([]);

    // Documents
    const [documentsData, setDocumentsData] = useState([]);
    console.log("🚀 ~ NewLotsFrom ~ documentsData:", documentsData)

    const fetchWarehouses = async () => {
        try {
            const response = await axios.post(`/api/admin/warehouse/list`, {
                keyword: "",
                page: 0,
                limit: 0,
                index: 0,
            });
            console.log("Warehouses:", response.data);
            setOriginWarehouse(response.data.warehouse);
            setDestinationWarehouse(response.data.warehouse);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchWarehouses();
        setSelectDestination(data?.warehouse_destination_name || "");
    }, []);

    console.log("🚀 ~ NewLotsFrom ~ countryQuery:", countryQuery);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `/api/admin/transport/lots/status/list`
                );
                const responseCountry = await axios.post(
                    `/api/admin/config/countries/list`,
                    countryQuery
                );
                console.log(response);
                console.log("Country : ", responseCountry);
                const countryData = await responseCountry.data;
                setCountryList(countryData.country);
                if (dataStatus) {
                    form.setValue("Status", dataStatus);
                }
                const data = await response.data;
                setStatusList(data.data);
            } catch (error) {
                console.log("Error:", error);
            }
        };
        fetchData();
    }, [countryQuery]);

    const handleDestinationChange = (e) => {
        console.log("🚀 ~ handleDestinationChange countryQuery~ e:", e);
        setCountryQuery({ keyword: e });
    };


    const fetchDocuments = async (data) => {
        console.log("🚀 ~ fetchDocuments ~ data:", data)
        try {
            const response = await axios.post(`/api/admin/transport/lots/get_documents`, {
                data: data
            });
            console.log("🚀 ~ fetchDocuments ~ response:", response)
            const documentsArray = Array.isArray(form.getValues("Documents")) ? form.getValues("Documents") : [];
            documentsArray.push(response.data.base64Document);
            setDocumentsData(documentsArray);
            // form.setValue("Documents", documentsArray);
            return response.data.base64Document;
        } catch (error) {
            console.log("🚀 ~ fetchDocuments ~ error:", error)
        }
    }

    useState(() => {
        if (data?.documents) {
            console.log("🚀 ~ useState ~ data?.documents:", data?.documents)
            data?.documents.split(",").forEach(async (document) => {
                await fetchDocuments(document);
            });
        }
    }, [])



    // useState(() => {
    //     if (data?.documents) {
    //         console.log("🚀 ~ useState ~ data?.documents:", data?.documents)
    //         setDocumentsData(data.documents.split(","))
    //     } else {
    //         setDocumentsData([]);
    //     }
    // }, [])

    // const fetchDocuments = async (data) => {
    //     console.log("🚀 ~ fetchDocuments ~ data:", data)
    //     try {
    //         const response = await axios.post(`/api/admin/transport/lots/get_documents`, {
    //             data: data
    //         });
    //         console.log("🚀 ~ fetchDocuments ~ response:", response)
    //         const documentsArray = Array.isArray(form.getValues("Documents")) ? form.getValues("Documents") : [];
    //         documentsArray.push(response.data.base64Document);
    //         form.setValue("Documents", documentsArray);
    //         return response.data.base64Document;
    //     } catch (error) {
    //         console.log("🚀 ~ fetchDocuments ~ error:", error)
    //     }
    // }


    const [dataStatus, setDataStatus] = useState(null);
    // const handleFileChange = (event) => {
    //     const files = event.target.files;
    //     const uploadedFiles = [];

    //     for (let i = 0; i < files.length; i++) {
    //         const file = files[i];
    //         const reader = new FileReader();

    //         reader.onloadend = () => {
    //             const base64String = reader.result.split(",")[1]; // Get the Base64 string excluding the data URL part
    //             uploadedFiles.push(base64String);

    //             if (uploadedFiles.length === files.length) {
    //                 form.setValue("Documents", uploadedFiles);
    //             }
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };
    const handleFileChange = (event) => {
        const files = event.target.files;
        const uploadedFiles = [...documentsData];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result.split(",")[1]; // Get the Base64 string excluding the data URL part
                uploadedFiles.push(base64String);
                setDocumentsData(uploadedFiles);
                form.setValue("Documents", uploadedFiles);
            };
            reader.readAsDataURL(file);
        }
    };
    const handlePreviewDocument = (document) => {
        const byteCharacters = atob(document);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        window.open(url, '_blank');
    };

    const handleSave = async (formData) => {
        setLoading(true);
        console.log("dikirim", formData);

        if (formData.Origin === formData.Destination_country) {
            setLoading(false);
            toast({
                title: "Error",
                description: "Origin and destination cannot be the same.",
                status: "error",
            });
            return; // Prevent form submission
        }
        formData.pickDate = format(new Date(formData.pickDate), "yyyy-MM-dd");

        try {
            formData.action = `${data === null ? "add" : "edit"}`;
            const response = await axios.post(
                `/api/admin/transport/lots/setData`,
                formData
            );
            toast({
                title: `New Lots ${formData.LotsLabel} ${data ? "Edited!" : "created!"
                    }`,
                description: response.data.message,
                status: "success",
            });
            setLoading(false);
            close();
            reload();
        } catch (error) {
            console.log("Error", error);
            setLoading(false);
            toast({
                title: "Error creating new Lots",
                description: "An error occurred while creating the Lots.",
                status: "error",
            });
        }
    };

    console.log("DATE SELLECTED : ", form.watch("pickDate"));
    const handleSelectDestination = (code, name) => {
        setSelectedCountry({
            Destination_country: code,
        });
    };
    console.log("error", form.formState.errors);

    console.log(
        "origin, destination",
        form.watch("Origin"),
        form.watch("Destination_country")
    );

    const removeDocuments = (index) => {
        const newDocuments = documentsData.filter((_, i) => i !== index);
        console.log("🚀 ~ removeDocuments ~ newDocuments:", newDocuments)
        setDocumentsData(newDocuments);
        if (newDocuments.length === 0) {
            form.setValue("Documents", [])
            document.getElementById("Documents").value = "";
        } else {
            form.setValue("Documents", newDocuments);
        }
    }

    console.log("DOCUMENTS", form.watch("Documents"))

    return (
        <>
            {loading && <Loaders />}

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSave)}
                    className="flex gap-4 flex-col"
                    action=""
                >
                    <div className="profile flex flex-col gap-4 w-full">
                        <FormField
                            name="LotsLabel"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full flex flex-row gap-3 items-center justify-between">
                                        <FormLabel className="w-[40%]">Lots Labels</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                id="LotsLabel"
                                                placeholder="Regular Daily Move"
                                                autoComplete="off"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            name="Destination_country"
                            className="w-full"
                            control={form.control}
                            render={({ field, formState }) => (
                                <>
                                    <FormItem className="w-full flex flex-row gap-3 items-center justify-between">
                                        <FormLabel className="w-[40%]">Destination</FormLabel>
                                        <Popover
                                            className="w-full"
                                            open={popOverOpen}
                                            onOpenChange={setPopOverOpen}
                                            modal={true}
                                        >
                                            <PopoverTrigger asChild>
                                                <FormControl className="w-full">
                                                    <Button
                                                        onClick={() => setPopOverOpen(true)}
                                                        variant="outline"
                                                        role="combobox"
                                                        type="button"
                                                        className={`text-xs flex flex-row shadow-none justify-start bg-slate-100 w-full px-2 gap-2 ${!field.value && "text-muted-foreground"
                                                            }`}
                                                    >
                                                        <span className="text-xs px-2">
                                                            {selectDestination
                                                                ? selectDestination
                                                                : "Select Destination"}
                                                        </span>
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[250px] p-0">
                                                <Command className="w-full">
                                                    <CommandInput
                                                        placeholder="Search Warehouse..."
                                                        className="h-9 w-full text-xs"
                                                        onValueChange={(e) => handleDestinationChange(e)}
                                                    />
                                                    <CommandEmpty className="w-full text-xs text-center py-2">
                                                        No Warehouse found.
                                                    </CommandEmpty>
                                                    <CommandGroup className="h-[200]">
                                                        <ScrollArea className="h-[150px]">
                                                            {console.log(field.value)}
                                                            {destinationWarehouse.map((item) => (
                                                                <>
                                                                    <PopoverClose asChild>
                                                                        <CommandItem
                                                                            value={item.warehouse_name}
                                                                            key={item.warehouse_id}
                                                                            className={`text-xs ${form.watch("Origin") ===
                                                                                item.warehouse_id
                                                                                ? "bg-slate-50 text-slate-200"
                                                                                : "text-xs"
                                                                                }`}
                                                                            disabled={
                                                                                form.watch("Origin") ===
                                                                                item.warehouse_id
                                                                            }
                                                                            onSelect={() => {
                                                                                setSelectDestination(
                                                                                    item.warehouse_name
                                                                                );
                                                                                field.onChange(item.warehouse_id); // Perbarui nilai field.value
                                                                                setCountryQuery({
                                                                                    keyword: "",
                                                                                });
                                                                                setPopOverOpen(false);
                                                                            }}
                                                                        >
                                                                            {item.warehouse_name} -{" "}
                                                                            {item.country_code}
                                                                            <CheckIcon
                                                                                className={`ml-auto h-4 w-4 ${item.warehouse_id === field.value
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0"
                                                                                    }`}
                                                                            />
                                                                        </CommandItem>
                                                                    </PopoverClose>
                                                                </>
                                                            ))}
                                                        </ScrollArea>
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="pickDate"
                            render={({ field }) => (
                                <FormItem className="w-full flex flex-row gap-3 items-center justify-between">
                                    <FormLabel className="w-[40%]">Pickup Date</FormLabel>
                                    <Popover >
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={`pl-4 w-full text-xs px-4 shadow-none text-left font-normal ${!field.value && "text-muted-foreground"
                                                        }`}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "yyyy-MM-dd")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <PopoverClose>
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={
                                                        (date) =>
                                                            date < new Date(new Date().setHours(0, 0, 0, 0)) // Disable dates before today
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverClose>
                                        </PopoverContent>
                                    </Popover>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        name="TripNumber"
                        className="w-full"
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full flex flex-row gap-3 items-center justify-between">
                                    <FormLabel className="w-[40%]">Trip Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            id="TripNumber"
                                            placeholder="ABC12345678"
                                            {...field}
                                            autoComplete="off"
                                        />
                                    </FormControl>
                                </FormItem>
                            </>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Status_name"
                        render={({ field }) => (
                            <FormItem className="w-full flex flex-row gap-3 items-center justify-between">
                                <FormLabel className="w-[40%]">Select Status</FormLabel>
                                <Select
                                    onValueChange={(value) => {
                                        const selectedStatus = statusList.find(
                                            (item) => item.status === value
                                        );
                                        field.onChange(
                                            selectedStatus ? selectedStatus.id_status : ""
                                        ); // Set id_status as value if found, otherwise empty string
                                        form.setValue("Status", selectedStatus.id_status);
                                    }}
                                    defaultValue={field.value}
                                >
                                    <FormControl className="text-xs">
                                        <SelectTrigger>
                                            <SelectValue className="text-xs" placeholder="Status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <ScrollArea className="h-[150px]">
                                            {statusList?.map((item, index) => (
                                                <SelectItem
                                                    className="text-xs"
                                                    key={index}
                                                    value={item.status}
                                                    onSelect={() => {
                                                        form.setValue("Status", item.id_status);
                                                    }}
                                                >
                                                    {item.status}
                                                </SelectItem>
                                            ))}
                                        </ScrollArea>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />

                    <div className="w-full">
                        <Separator className="h-[2px]" />
                    </div>
                    <FormField
                        name="Documents"
                        className="w-full"
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full flex flex-col gap-1">
                                    <FormLabel className="text-xs">Upload Documents</FormLabel>
                                    <FormControl>
                                        <Input
                                            multiple
                                            className=" file:w-[100px] file:text-xs  file:h-full file:p-0 text-center last:text-center last:w-full file:bg-myBlue  bg-zinc-400/50 px-0 pl-2 py-2 p-0 file:text-white cursor-pointer hover:bg-zinc-200"
                                            type="file"
                                            id="Documents"
                                            placeholder=""
                                            accept="application/pdf"
                                            onChange={handleFileChange}
                                            capture="environment"
                                        />
                                    </FormControl>
                                </FormItem>
                            </>
                        )}
                    />


                    <div className="flex flex-col gap-2">
                        {
                            documentsData.length > 0 ?
                                (documentsData.map((document, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-row gap-2 justify-between text-xs items-center p-1 border border-zinc-200 rounded"
                                    >
                                        <div className="flex flex-row gap-2 items-center justify-between w-full">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="flex flex-row gap-2 w-full text-xs justify-start h-[30px]"
                                                type="button"
                                                onClick={() => handlePreviewDocument(document)}
                                            >
                                                <Files className="h-5 w-5 text-myBlue" />
                                                <p className="">
                                                    Document {index + 1}
                                                </p>
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                type="button"
                                                className="h-[30px] w-[30px] p-1"
                                                onClick={() => removeDocuments(index)}
                                            >
                                                <XIcon className="w-5 h-5 text-white" />
                                            </Button>
                                        </div>
                                    </div>
                                ))
                                ) : (
                                    <p className="text-xs text-center text-slate-200">No documents uploaded</p>
                                )
                        }
                    </div>

                    {/* <div className="flex flex-col gap-2">
                        {form.getValues("Documents") &&
                            form.getValues("Documents").length > 0 &&
                            form
                                .getValues("Documents")
                                .split(",")
                                .map((document, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-row gap-2 justify-between text-xs items-center p-1.5 border border-zinc-200 rounded"
                                    >
                                        <div className="flex flex-row gap-2 items-center justify-between w-full">
                                            <div className="flex flex-row gap-2">
                                                <Files className="h-5 w-5 text-myBlue" />
                                                <NextLink
                                                    href={`https://sla.webelectron.com/api/Package/getimages?fullName=/Assets/doc/lots/${document}`}
                                                    passHref
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <p className="hover:underline hover:text-myBlue">
                                                        {document}
                                                    </p>
                                                </NextLink>
                                            </div>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                className="p-1"
                                            >
                                                <XIcon className="w-5 h-5 text-white" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                    </div> */}

                    <div className="flex flex-row justify-between w-full gap-3 py-2">
                        <Button
                            type="button"
                            variant="redOutline"
                            size="sm"
                            className="w-full text-xs"
                            onClick={close}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            size="sm"
                            className="w-full text-xs"
                            variant="destructive"
                        >
                            <p>Save changes</p>
                        </Button>
                    </div>
                </form>
            </Form >
        </>
    );
};
