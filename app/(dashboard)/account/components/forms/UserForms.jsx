'use-client'
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'
import { Edit } from 'lucide-react'
import axios from 'axios'
import InputMask from 'react-input-mask';
import { useToast } from '@/components/ui/use-toast'
import { Loaders } from '@/components/ui/loaders'
import { useRouter } from 'next/navigation'

const formSchema = yup.object().shape({
    name: yup.string().required().min(5, "min 5 character").max(25, "max 25 character"),
    email: yup.string().email().required(),
    password: yup.string().required().min(8, "min 8 character"),
    confirmPassword: yup.string().required().oneOf([yup.ref('password'), null], 'Passwords must match'),
    phoneNumber: yup.string().required(),
    image: yup.string(),
    customer_id: yup.string(),
})

export const UserForms = ({ data = null }) => {
    const [disable, setDisable] = useState(true);
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()
    const router = useRouter()
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            name: data?.name || "",
            email: data?.email || "",
            password: data?.password || "",
            confirmPassword: "",
            phoneNumber: data?.phone_number || "",
            image: data?.profile_picture || "",
            customer_id: "",
        },
        mode: "onChange",
        disabled: disable,
    })

    useEffect(() => {
        form.setValue('name', data?.name || "")
        form.setValue('email', data?.email || "")
        form.setValue('password', data?.password || "")
        form.setValue('phoneNumber', data?.phone_number || "")
        form.setValue('image', data?.profile_picture || "")
    }, [data, form])

    const handleSave = async (formData) => {
        console.log("🚀 ~ handleSave ~ formData:", formData)
        setLoading(true)
        try {
            const response = await axios.post(
                `/api/customerAPI/account/seettings`,
                {
                    name: formData.name,
                    email: formData.email,
                    country_code: "",
                    password: formData.password,
                    user_plan: "",
                    profile_picture: formData.image,
                    phoneNumber: formData.phoneNumber,
                }
            )
            console.log("🚀 ~ handleSave ~ response:", response)
            setLoading(false)
            setDisable(true)
            if (response.status === 200) {
                toast({
                    title: "Success",
                    description: response.data.message,
                    status: "success",
                })
                router.refresh()
                // reload()

            } else {
                toast({
                    title: "Error",
                    description: response.data.message,
                    status: "error",
                })
            }

        } catch (error) {
            console.log("🚀 ~ handleSave ~ error:", error)
            setLoading(false)
            toast({
                title: "Error 500",
                description: "Internal Server Error",
                status: "error",
            })
        }
    }


    return (
        <>
            {loading && <Loaders />}
            <Form {...form}>
                <form
                    className='flex gap-3 flex-col'
                    action=""
                    onSubmit={form.handleSubmit(handleSave, error => console.log(error))}
                >
                    <div className="Image w-full flex justify-center py-[20px]">
                        <FormField
                            className="w-full"
                            name="image"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-[80px] text-sm">
                                        <div className="relative">
                                            <Avatar className="w-[80px] h-[80px]">
                                                <AvatarImage src={field.value || "https://source.boringavatars.com/beam"} />
                                                <AvatarFallback>SP</AvatarFallback>
                                            </Avatar>
                                            <FormControl>
                                                <Input
                                                    id="file-upload"
                                                    type="file"
                                                    disabled={disable}
                                                    accept="image/*"
                                                    className={`absolute inset-0 opacity-0  w-full h-full cursor-pointer  ${disable ? "hidden" : ""}`}
                                                    onChange={(e) => {
                                                        const file = e.target.files[0];
                                                        const reader = new FileReader();
                                                        reader.onload = (e) => {
                                                            const base64Image = e.target.result;
                                                            field.onChange(base64Image);
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }}
                                                />
                                            </FormControl>
                                            <div
                                                className="absolute p-2 rounded-full bg-slate-100 border border-myBlue text-myBlue bottom-0 right-0">
                                                <Edit width={15} height={15} />
                                            </div>
                                        </div>
                                    </FormItem>
                                </>
                            )}
                        />
                    </div>

                    <div className="nameWrapper flex flex-row gap-4 w-full text-sm">
                        <FormField
                            className="w-full"
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <>
                                    <FormItem className="w-full text-sm">
                                        <FormLabel className="text-sm">First Name</FormLabel>
                                        <FormControl>
                                            <Input id="name" className="text-sm" placeholder="john" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </>
                            )}
                        />
                    </div>

                    <FormField
                        name="password"
                        className="w-full"
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full">
                                    <FormLabel>Password</FormLabel>
                                    <FormControl >
                                        <Input type="password" id="password"  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </>
                        )}
                    />

                    <FormField
                        name="confirmPassword"
                        className="w-full"
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full">
                                    <FormLabel>Repeat Password</FormLabel>
                                    <FormControl >
                                        <Input type="password" id="confirmPassword"  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </>
                        )}
                    />

                    <FormField
                        name="email"
                        className="w-full"
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl >
                                        <Input type="email" id="email"  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            </>
                        )}
                    />

                    <FormField
                        name="phoneNumber"
                        className="w-full text-sm"
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <FormItem className="w-full">
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl >
                                        <InputMask
                                            mask="+9.999.999.9999"
                                            maskChar={null}
                                            maskPlaceholder="0000.00.0000"
                                            {...field}
                                            disabled={disable}
                                        >
                                            {(inputProps) => (
                                                <Input
                                                    className="text-xs"
                                                    id="phoneNumber"
                                                    type="text"
                                                    placeholder="+1.000.000.0000"
                                                    {...inputProps}
                                                    disabled={disable}
                                                />
                                            )}
                                        </InputMask>
                                    </FormControl>
                                </FormItem>
                            </>
                        )}
                    />
                    <div className=" flex justify-end items-end py-[20px] gap-5">
                        {
                            disable ? (
                                <Button
                                    variant="destructive"
                                    type="button"
                                    size="sm"
                                    onClick={() => setDisable(false)}
                                >
                                    <p className=' font-normal text-xs'>Edit</p>
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        variant="redOutline"
                                        size="sm"
                                        type="button"
                                        onClick={() => {
                                            setDisable(true)
                                        }
                                        }
                                    >
                                        <p className=' font-normal text-xs'>Cancel</p>
                                    </Button>

                                    <Button
                                        variant="destructive"
                                        type="submit"
                                        size="sm"
                                    >
                                        <p className=' font-normal text-xs'>Save Change</p>
                                    </Button>
                                </>
                            )
                        }

                    </div>

                </form>
            </Form >
        </>
    )
}
