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

const formSchema = yup.object().shape({
    RoleName: yup.string(),
    RoleColor: yup.string(),
    RolePermission: yup.string(),
    SelectWarehouse: yup.string(),
})



export const CreateNewRolesForms = ({ close, data = null }) => {
    const { toast } = useToast()
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            RoleName: "",
            RoleColor: "",
            RolePermission: "",
            SelectWarehouse: "",

        },
        mode: "onChange",
    })
    return (
        <>
            <Form {...form}>
                <form
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
                                            <Input id="RoleColor" placeholder="Full Name" className="text-sm" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
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
                        />
                        <FormField
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
                        />

                        <div className=" flex flex-row justify-between py-3 gap-3">
                            <Button
                                variant="redOutline"
                                size="sm"
                                className="text-xs w-full"
                                onClick={close}
                            >
                                <p className='text-xs'>Cancel</p>
                            </Button>

                            <Button
                                variant="destructive"
                                size="sm"
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
