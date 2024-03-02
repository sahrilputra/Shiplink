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
import { Loaders } from "@/components/ui/loaders";
import { useToast } from "@/components/ui/use-toast";

const formSchema = yup.object().shape({
    tax_assignment_name: yup.string(),
    abbreviation: yup.string().required(),
    tax_number: yup.string().required(),
    tax_rate: yup.string().required(),
});

export const NewType = ({ close, data = null, selected }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [clicked, isClicked] = useState(false);
    const [loading, setLoading] = useState(false);
    const toggleClicked = (clickedButtons) => {
        isClicked(clickedButtons);
    };
    const { toast } = useToast();
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            tax_assignment_name: "",
            abbreviation: "",
            tax_number: "",
            tax_rate: "",
        },
        mode: "onChange",
    });

    const handleSave = async (formData) => {
        console.log("data", formData)
        setLoading(true)
        formData.action = "add"
        formData.tax_assignment_id = ""
        try {
            const response = await axios.post(
                `/api/admin/config/tax/setData`,
                formData
            );

            setLoading(false)
            const responseData = await response.data;
            console.log("responseData", responseData)
            form.reset()
            toast({
                title: "Success",
                description: responseData.message,
                status: "success",
            })
        } catch (error) {
            setLoading(false)
            toast({
                title: "Error",
                description: error.message,
                status: "error",
            })
            console.log('Error:', error);
        }
    }
    console.log('Error:', form.formState.errors)
    return (
        <>
            {loading && <Loaders />
            }
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSave)}
                    className="flex gap-4 flex-col"
                    action="">
                    <div className="profile flex flex-row flex-wrap gap-2 w-full items-end text-xs justify-start">
                        <FormField
                            className="w-[300px]"
                            name="tax_assignment_name"
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
                            name="abbreviation"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-[150px]">
                                        <FormLabel className="font-bold ">abbreviation</FormLabel>
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
                            name="tax_number"
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
                            name="tax_rate"
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
