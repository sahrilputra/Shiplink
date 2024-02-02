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
    UserFullName: yup.string(),
    Warehouse: yup.string(),
    Role: yup.string(),
    Email: yup.string(),
    Passowrd: yup.string(),
})



export const CreateNewUserForms = ({ close, data = null }) => {
    const { toast } = useToast()
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            UserFullName: "",
            Warehouse: "",
            Role: "",
            Email: "",
            Passowrd: "",
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
                            name="UserFullName"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-neutral-900">
                                        <FormLabel className="text-sm">Edit Selected Number</FormLabel>
                                        <FormControl>
                                            <Input id="UserFullName" placeholder="Full Name" className="text-sm" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            className="w-full"
                            name="Warehouse"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-neutral-900">
                                        <FormLabel className="text-sm">Warehouse</FormLabel>
                                        <FormControl>
                                            <Input id="Warehouse" placeholder="Full Name" className="text-sm" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            className="w-full"
                            name="Role"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-neutral-900">
                                        <FormLabel className="text-sm">Role</FormLabel>
                                        <FormControl>
                                            <Input id="Role" placeholder="Full Name" className="text-sm" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            className="w-full"
                            name="Email"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-neutral-900">
                                        <FormLabel className="text-sm">Email</FormLabel>
                                        <FormControl>
                                            <Input id="Email" placeholder="Full Name" className="text-sm" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                        <FormField
                            className="w-full"
                            name="Password"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-neutral-900">
                                        <FormLabel className="text-sm">Password</FormLabel>
                                        <FormControl>
                                            <Input id="Password" placeholder="Full Name" className="text-sm" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />

                        <div className=" flex flex-row justify-between py-3">
                            <Button
                                variant="redOutline"
                                size="sm"
                                className="text-xs"
                                onClick={close}
                            >
                                <p className='text-xs'>Cancel</p>
                            </Button>

                            <Button
                                variant="destructive"
                                size="sm"
                                className="text-xs"
                            >
                                <p className='text-xs'>Create New User</p>
                            </Button>
                        </div>
                    </div>

                </form>
            </Form >
        </>
    )
}
