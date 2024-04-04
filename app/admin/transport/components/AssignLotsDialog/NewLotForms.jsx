import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useToast } from '@/components/ui/use-toast'
import { Loaders } from '@/components/ui/loaders'
import Image from 'next/image'
import axios from 'axios'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { PopoverClose } from '@radix-ui/react-popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CalendarIcon, CheckIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'

const formSchema = yup.object().shape({
    LotsId: yup.string(),
    LotsLabel: yup.string().required(),
    Origin: yup.string().required(),
    Destination_country: yup.string().required(),
    TripNumber: yup.string().required(),
    Status: yup.number().required(),
    pickDate: yup.string().required(),
    Documents: yup.array().of(yup.string())
})

export const NewLotsFrom = ({ close, data = null }) => {
    const { toast } = useToast()
    const [popOverOpen, setPopOverOpen] = useState(false);
    const [openOrigin, setOpenOrigin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [statusList, setStatusList] = useState([]);
    const [countryList, setCountryList] = useState([])
    const [selectDestination, setSelectDestination] = useState("");
    const [selectOrigin, setSelectOrigin] = useState("");
    const [countryQuery, setCountryQuery] = useState({
        keyword: "",
        page: 0,
        limit: 0,
        index: 0,
    })


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `/api/admin/transport/lots/status/list`,
                );
                const responseCountry = await axios.post(
                    `/api/admin/config/countries/list`,
                    countryQuery
                )
                console.log(response)
                console.log("Country : ", responseCountry)
                const countryData = await responseCountry.data;
                setCountryList(countryData.country)


                const data = await response.data;
                setStatusList(data.data);

            } catch (error) {
                console.log('Error:', error);
            }
        };
        fetchData();
    }, [countryQuery]);

    const handleCommandChange = (e) => {
        console.log("🚀 ~ handleCommandChange ~ e:", e)
        setCountryQuery(e);
        setCountryQuery({ ...countryQuery, keyword: e });
    }
    const handleDestinationChange = (e) => {
        console.log("🚀 ~ handleCommandChange ~ e:", e)
        setCountryQuery({ ...countryQuery, keyword: e });
    }


    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            LotsId: data?.lots_id || "",
            LotsLabel: data?.label || "",
            Origin: data?.country_origin || "",
            Destination_country: data?.destination || "",
            TripNumber: data?.trip_number || "",
            Status: data?.status || "",
            pickDate: data?.pickup_schedule || "",
            Documents: data?.documents || "",
        },
        mode: "onChange",
    })
    const handleFileChange = (event) => {
        const files = event.target.files;
        const uploadedFiles = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1]; // Get the Base64 string excluding the data URL part
                uploadedFiles.push(base64String);

                if (uploadedFiles.length === files.length) {
                    form.setValue('Documents', uploadedFiles);
                }
            };

            reader.readAsDataURL(file);
        }
    };
    const handleSave = async (formData) => {
        setLoading(true)
        console.log("dikirim", formData)

        if (formData.Origin === formData.Destination_country) {
            setLoading(false);
            toast({
                title: 'Error',
                description: 'Origin and destination cannot be the same.',
                status: 'error',
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
                title: `New Lots ${formData.LotsLabel} ${data ? "Edited!" : "created!"}`,
                description: response.data.message,
                status: 'success',
            });
            setLoading(false)
            close();
        } catch (error) {
            console.log('Error', error);
            setLoading(false)
            toast({
                title: 'Error creating new Lots',
                description: 'An error occurred while creating the Lots.',
                status: 'error',
            });
        }
    };

    console.log("DATE SELLECTED : ", form.watch("pickDate"))
    const handleSelectDestination = (code, name) => {
        setSelectedCountry({
            Destination_country: code,
        });
    }
    console.log('error', form.formState.errors)

    console.log("origin, destination", form.watch("Origin"), form.watch("Destination_country"))
    return (
        <>
            {loading && <Loaders />}

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSave)}
                    className='flex gap-4 flex-col'
                    action=""

                >

                    <div className="profile flex flex-col gap-4 w-full">
                        {/* <FormField
                            className="w-full"
                            name="LotsId"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full flex flex-row gap-3 items-center justify-between">
                                        <FormLabel className="w-[40%]">Lots ID</FormLabel>
                                        <FormControl>
                                            <Input id="LotsId" placeholder="1231" {...field} />
                                        </FormControl>

                                    </FormItem>
                                </>
                            )}
                        /> */}
                        <FormField
                            name="LotsLabel"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full flex flex-row gap-3 items-center justify-between">
                                        <FormLabel className="w-[40%]">Lots Labels</FormLabel>
                                        <FormControl >
                                            <Input type="text" id="LotsLabel" placeholder="Regular Daily Move"  {...field} />
                                        </FormControl>

                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            name="Origin"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full flex flex-row gap-3 items-center justify-between">
                                        <FormLabel className="w-[40%]">Origin</FormLabel>
                                        <Popover className="w-full" open={openOrigin} onOpenChange={setOpenOrigin} modal={true}>
                                            <PopoverTrigger asChild>
                                                <FormControl className="w-full">
                                                    <Button
                                                        onClick={() => setOpenOrigin(true)}
                                                        variant="outline"
                                                        role="combobox"
                                                        type="button"
                                                        className={`text-xs flex flex-row shadow-none justify-start bg-slate-100 w-full px-2 gap-2 ${!field.value && "text-muted-foreground"}`}
                                                    >
                                                        <span className='text-xs px-2'>
                                                            {selectOrigin ? selectOrigin : "Select Origin"}
                                                        </span>
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[250px] p-0">
                                                <Command className="w-full">
                                                    <CommandInput
                                                        placeholder="Search Country..."
                                                        className="h-9 w-full text-xs"
                                                        onValueChange={(e) => handleCommandChange(e)}
                                                    />
                                                    <CommandEmpty
                                                        className="w-full text-xs text-center py-2"
                                                    >
                                                        No Country found.
                                                    </CommandEmpty>
                                                    <CommandGroup className="h-[200]">
                                                        <ScrollArea className="h-[150px]">
                                                            {console.log(field.value)}
                                                            {countryList.map((item) => (
                                                                <>
                                                                    <PopoverClose asChild>
                                                                        <CommandItem

                                                                            value={item.country_name}
                                                                            key={item.country_id}
                                                                            className="text-xs"
                                                                            onSelect={() => {
                                                                                setSelectOrigin(item.country_name)
                                                                                field.onChange(item.country_code); // Perbarui nilai field.value
                                                                                setOpenOrigin(false)
                                                                                setCountryQuery({
                                                                                    keyword: ""
                                                                                })
                                                                            }}
                                                                        >

                                                                            {item.country_name}
                                                                            <CheckIcon
                                                                                className={`ml-auto h-4 w-4 ${item.country_code === field.value ? "opacity-100" : "opacity-0"}`}
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
                            name="Destination_country"
                            className="w-full"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full flex flex-row gap-3 items-center justify-between">
                                        <FormLabel className="w-[40%]">Destination</FormLabel>
                                        <Popover className="w-full" open={popOverOpen} onOpenChange={setPopOverOpen} modal={true} >
                                            <PopoverTrigger asChild>
                                                <FormControl className="w-full">
                                                    <Button
                                                        onClick={() => setPopOverOpen(true)}
                                                        variant="outline"
                                                        role="combobox"
                                                        type="button"
                                                        className={`text-xs flex flex-row shadow-none justify-start bg-slate-100 w-full px-2 gap-2 ${!field.value && "text-muted-foreground"}`}
                                                    >
                                                        <span className='text-xs px-2'>
                                                            {selectDestination ? selectDestination : "Select Destination"}
                                                        </span>
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[250px] p-0" >
                                                <Command className="w-full">
                                                    <CommandInput
                                                        placeholder="Search Country..."
                                                        className="h-9 w-full text-xs"
                                                        onValueChange={(e) => handleDestinationChange(e)}
                                                    />
                                                    <CommandEmpty
                                                        className="w-full text-xs text-center py-2"
                                                    >
                                                        No Country found.
                                                    </CommandEmpty>
                                                    <CommandGroup className="h-[200]">
                                                        <ScrollArea className="h-[150px]">
                                                            {console.log(field.value)}
                                                            {countryList.map((item) => (
                                                                <>
                                                                    <PopoverClose asChild>
                                                                        <CommandItem

                                                                            value={item.country_name}
                                                                            key={item.country_id}
                                                                            className="text-xs"
                                                                            onSelect={() => {
                                                                                setSelectDestination(item.country_name)
                                                                                field.onChange(item.country_code); // Perbarui nilai field.value
                                                                                setCountryQuery({
                                                                                    keyword: ""
                                                                                })
                                                                                setPopOverOpen(false)

                                                                            }}
                                                                        >
                                                                            {item.country_name}
                                                                            <CheckIcon
                                                                                className={`ml-auto h-4 w-4 ${item.country_code === field.value ? "opacity-100" : "opacity-0"}`}
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
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={`pl-4 w-full text-xs px-4 shadow-none text-left font-normal ${!field.value && "text-muted-foreground"}`}
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
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date <= new Date(new Date().setHours(0, 0, 0, 0)) // Disable dates before or equal to today
                                                }
                                                initialFocus
                                            />
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
                                    <FormControl >
                                        <Input type="text" id="TripNumber" placeholder="ABC12345678" {...field} />
                                    </FormControl>
                                </FormItem>
                            </>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Status"
                        render={({ field }) => (
                            <FormItem className="w-full flex flex-row gap-3 items-center justify-between">
                                <FormLabel className="w-[40%]">Select Status</FormLabel>
                                <Select
                                    onValueChange={(value) => {
                                        const selectedStatus = statusList.find(item => item.status === value);
                                        field.onChange(selectedStatus ? selectedStatus.id_status : ''); // Set id_status as value if found, otherwise empty string
                                    }}
                                    defaultValue={field.value}
                                >
                                    <FormControl className='text-xs'>
                                        <SelectTrigger>
                                            <SelectValue className='text-xs' placeholder="Status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {
                                            statusList?.map((item, index) => (
                                                <SelectItem className='text-xs' key={index} value={item.status}>
                                                    {item.status}
                                                </SelectItem>
                                            ))
                                        }
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
                                    <FormControl >
                                        <Input
                                            multiple
                                            className=" file:w-[100px] file:text-xs  file:h-full file:p-0 text-center last:text-center last:w-full file:bg-myBlue  bg-zinc-400/50 px-0 pl-2 py-2 p-0 file:text-white"
                                            type="file" id="" placeholder="" accept="application/pdf" onChange={handleFileChange}
                                            capture="environment"
                                        />
                                    </FormControl>
                                </FormItem>
                            </>
                        )}
                    />

                    <div className="flex flex-row justify-between w-full gap-3 py-2">
                        <Button
                            type="button"
                            variant="redOutline"
                            className="w-full"
                            onClick={close}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="w-full"
                            variant="destructive"
                        >
                            <p>Save changes</p>
                        </Button>
                    </div>
                </form>
            </Form >
        </>
    )
}
