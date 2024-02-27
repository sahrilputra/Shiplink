import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'
import { Checkbox } from '@/components/ui/checkbox'
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
import { Loaders } from '@/components/ui/loaders'
import axios from 'axios'

const formSchema = yup.object().shape({
    RoleName: yup.string().required(),
    RoleColor: yup.string().required(),
    RolePermission: yup.string(),
    action: yup.string(),

})

export const CreateNewRolesForms = ({ close, data = null }) => {
    const { toast } = useToast()

    const [selectedColor, setSelectedColor] = useState('#000000');
    const [loading, setLoading] = useState(false);
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            RoleName: "",
            RoleColor: "",
            RolePermission: "",
            action: "",

        },
        mode: "onChange",
    })
    const handleColorChange = (event) => {
        setSelectedColor(event.target.value);
    };

    const handleSave = async (formData) => {
        setLoading(true)
        console.log("dikirim", formData)
        formData.action = "add";
        try {
            const response = await axios.post(
                `/api/admin/user/role/setData`,
                formData
            );
            toast({
                title: `New Role ${formData.RoleName} is created!`,
                description: response.data.message,
                status: `Status : ${response.data.status}`,
            });
            setLoading(false)
            close()
        } catch (error) {
            console.log('Error', error);
            setLoading(false)
            toast({
                title: 'Error creating New Role!',
                description: `Error : ${error.message}`,
                status: `Status : ${error.status}`,
            });
        }
    };
    return (
        <>
            {loading && <Loaders />}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSave)}
                    className=''
                    action="">
                    <div className="profile flex flex-col gap-2 w-full text-xs">
                        <FormField
                            className="w-full"
                            name="RoleName"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-neutral-900">
                                        <FormLabel className="text-sm">Role Name</FormLabel>
                                        <FormControl>
                                            <Input id="RoleName" placeholder="Role" className="text-sm" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            className="w-full"
                            name="RoleColor"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-neutral-900">
                                        <FormLabel className="text-sm">Role Color Indicator</FormLabel>
                                        <FormControl>
                                            <>
                                                <div className="flex flex-row gap-3 items-center">
                                                    <Input
                                                        type="color"
                                                        id="RoleColor"
                                                        placeholder="Full Name"
                                                        className="text-sm"
                                                        onValueChange={(e) => handleColorChange(e)}
                                                        {...field}
                                                    />
                                                    <div className='text-sm'>{field.value}</div>
                                                </div>
                                            </>

                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                        {/* <FormField
                            className="w-full"
                            name="RolePermission"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-neutral-900">
                                        <FormLabel className="text-sm">Role Permission Template</FormLabel>
                                        <FormControl>
                                            <Input id="RolePe" placeholder="Full Name" className="text-sm" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        /> */}
                        {/* <FormField
                            className="w-full"
                            name="SelectWarehouse"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-neutral-900">
                                        <FormLabel className="text-sm">(Optional) Select Warehouse</FormLabel>
                                        <FormControl>
                                            <Input id="Email" placeholder="Global Warehouse" className="text-sm" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        /> */}

                        <div className=" flex flex-row justify-between py-3 gap-3">
                            <Button
                                variant="redOutline"
                                size="sm"
                                type="button"
                                className="text-xs w-full"
                                onClick={close}
                            >
                                <p className='text-xs'>Cancel</p>
                            </Button>

                            <Button
                                variant="destructive"
                                size="sm"
                                type="submit"
                                className="text-xs w-full"
                            >
                                <p className='text-xs'>Create New Role</p>
                            </Button>
                        </div>
                    </div>

                </form>
            </Form >
        </>
    )
}
