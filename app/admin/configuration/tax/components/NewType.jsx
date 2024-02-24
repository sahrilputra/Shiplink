import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
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
import axios from 'axios'

const formSchema = yup.object().shape({
    TaxName: yup.string(),
    Abbreviation: yup.string().required(),
    TaxNumber: yup.string().required(),
    TaxRate: yup.number(),
});

export const NewType = ({ close, data = null, selected }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [clicked, isClicked] = useState(false);
    const toggleClicked = (clickedButtons) => {
        isClicked(clickedButtons);
    };
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            TaxName: "",
            Abbreviation: "",
            TaxNumber: "",
            TaxRate: "",
        },
        mode: "onChange",
    });

    const handleSave = async (data) => {
        console.log("data", data)
        try {
            const response = await axios.post(
                `/api/admin/config/tax/setData`,
                {
                    tax_assignment_id: "",
                    TaxName: data.TaxName,
                    Abbreviation: data.Abbreviation,
                    TaxNumber: data.TaxNumber,
                    TaxRate: data.TaxRate,
                    action: "add",
                }
            );
            const responseData = await response.data;
            console.log("responseData", responseData)
        } catch (error) {
            console.log('Error:', error);
        }
    }
    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSave)}
                    className="flex gap-4 flex-col"
                    action="">
                    <div className="profile flex flex-row flex-wrap gap-2 w-full items-end text-xs justify-start">
                        <FormField
                            className="w-[300px]"
                            name="TaxName"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-[240px]">
                                        <FormLabel className="font-bold">Tax Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                size="sm"
                                                id="SCAC"
                                                placeholder="AC 12312"
                                                className="px-1.5"
                                                {...field}
                                            />
                                        </FormControl>
                                      
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            name="Abbreviation"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-[150px]">
                                        <FormLabel className="font-bold ">Abbreviation</FormLabel>
                                        <FormControl>
                                            <Input
                                                size="sm"
                                                type="text"
                                                id="CodeStart"
                                                placeholder="0000001"
                                                className="px-1.5"
                                                {...field}
                                            />
                                        </FormControl>
                                  
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            name="TaxNumber"
                            className=""
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-[120px]">
                                        <FormLabel className="font-bold ">Tax Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                size="sm"
                                                type="text"
                                                id="CodeStart"
                                                placeholder="0000001"
                                                className="px-1.5"
                                                {...field}
                                            />
                                        </FormControl>
                            
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            name="TaxRate"
                            className=""
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="">
                                        <FormLabel className="font-bold">Tax Rate</FormLabel>
                                        <FormControl>
                                            <Input
                                                size="sm"
                                                type="number"
                                                id="Tax Rate"
                                                placeholder="0.00"
                                                className="px-1.5"
                                                {...field}
                                            />
                                        </FormControl>
                                      
                                    </FormItem>
                                </>
                            )}
                        />
                    </div>

                    <div className="flex flex-row gap-2 w-full flex-wrap justify-between items-center pb-2">
                        <div className=" flex flex-row gap-2">
                            <Checkbox />
                            <p className="text-xs">Show Tax Number on Invoice</p>
                        </div>
                        <div className="flex flex-row gap-2 justify-end">
                            <Button
                                variant="redOutline"
                                type="button"
                                size="xs"
                                className="w-[100px]"
                                onClick={() => close()}
                            >
                                <p className=" font-normal text-xs">Cancel</p>
                            </Button>
                            <Button
                                variant="destructive"
                                type="submit"
                                size="xs"
                                className="w-[100px]"
                            >
                                <p className=" font-normal text-xs">Save</p>
                            </Button>
                        </div>
                    </div>

                </form>
            </Form>
        </>
    );
};
