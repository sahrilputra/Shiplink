/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useCallback, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { ArrivalForms } from './components/Forms'
import { Button } from '@/components/ui/button'
import { DeclareContet } from './components/Table/DeclareContet'
import { Separator } from '@/components/ui/separator'
import { RegisterDialog } from './components/Dialog/RegistedDialog'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { useForm, useFieldArray, useFormContext, FormProvider, FieldErrors } from 'react-hook-form'

import {
    Form,
} from "@/components/ui/form"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import axios from "axios";
import Image from 'next/image'
import { Loaders } from '@/components/ui/loaders'

const formSchema = yup.object().shape({
    customer_id: yup.string(),
    customer_name: yup.string(),
    customer_phone: yup.string(),
    customer_email: yup.string().email(),
    barcode_tracking: yup.string(),
    carrier_code: yup.string(),
    packageID: yup.string(),
    package_length: yup.number(),
    package_witdth: yup.number(),
    package_height: yup.number(),
    package_height_unit: yup.string(),
    package_weight: yup.number(),
    package_weight_unit: yup.string(),
    bin_location: yup.string(),
    total_price: yup.number(),
    package_content: yup.array().of(
        yup.object().shape({
            id: yup.string(),
            qty: yup.number().typeError('Error'),
            value: yup.number().typeError('Error'),
            desc: yup.string(),
            hs_desc: yup.string(),
            hs_code: yup.string(),
            made_in: yup.string(),
            subtotal: yup.number()
        })
    ),
    box_images: yup.array(),
    label_images: yup.array(),
    content_images: yup.array(),
})

export default function ArrivalScanPage() {
    const { toast } = useToast()

    const [open, setOpen] = useState(false);

    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            customer_id: "",
            customer_name: "",
            customer_phone: "",
            customer_email: "",
            barcode_tracking: "",
            carrier_code: "",
            packageID: "",
            package_length: "",
            package_witdth: "",
            package_height: "",
            package_height_unit: "in",
            package_weight: "",
            package_weight_unit: "Ibs",
            bin_location: "",
            total_price: 0,
            package_content: [
                {
                    itemID: "",
                    qty: 1,
                    value: 0,
                    desc: "",
                    hs_desc: "",
                    hs_code: "",
                    made_in: "",
                    subtotal: 0,
                }
            ],
            box_images: [

            ],
            label_images: [

            ],
            content_images: [

            ],

        },
        mode: "onChange",
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "package_content",
    });

    const boxImages = form.watch('box_images');
    const labelImages = form.watch('label_images');
    const contentImages = form.watch('content_images');
    const allImages = [...boxImages, ...labelImages, ...contentImages];
    const [loading, setLoading] = useState(false);
    const [rerender, setRerender] = useState(false);
    const [trackingId, setTrackingId] = useState("")
    const [userName, setUserName] = useState("")

    const handleSave = async (formData) => {
        setLoading(true);
        console.log("dikirim", formData)
        try {
            const response = await axios.post(
                `/api/admin/arrival_scan/register`,
                formData
            );
            setTrackingId(response.data.tracking_id);
            setLoading(false);
            setOpen(true);
            setUserName(formData.customer_name)
            toast({
                title: `New Package Has Register to ${formData.customer_name}!`,
                description: response.data.message,
                status: 'success',
            });
        } catch (error) {
            console.log('Error', error);
            setLoading(false);
            toast({
                title: 'Error Register New Package',
                description: 'An error occurred while creating the Package.',
                status: 'error',
            });
        }
    };

    const onError = (error) => {
        console.log("Form Errors", error)
    }
    const [total, setTotal] = useState(Number(0));

    const calculateTotal = () => {
        let totalPrice = 0;
        form.getValues().package_content.forEach((item) => {
            totalPrice += Number(item.qty) * Number(item.value);
        });
        console.log("Total Price : ", totalPrice)
        setTotal(Number(totalPrice));
        form.setValue("total_price", Number(totalPrice));
    }

    useEffect(() => {
        calculateTotal();
    }, [form.watch('package_content').map(item => `${item.qty}-${item.value}`)]);

    console.log("tracking from Page : ", trackingId)
    return (
        <>
            <div className={styles.forms}>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSave, onError)}
                        className='flex gap-2 flex-col text-zinc-600'
                        action=""
                    >
                        <ArrivalForms
                            emptyMessage="No resulsts."
                            placeholder="Find something"
                            forms={form}
                        />

                        <div className="w-full py-4">
                            <Separator className="h-[2px]" />
                        </div>

                        <div className="contentImage w-[100%] bg-blue-50 mx-auto">
                            <div className="flex flex-row justify-center items-center w-[50%] mx-auto">
                                <Carousel
                                    opts={{
                                        align: "start",
                                    }}
                                    className="w-full"
                                >
                                    <CarouselContent>
                                        {Array.from({ length: allImages.length }).map((_, index) => (
                                            <CarouselItem key={index} className="basis-1/3">
                                                <div className="p-1">
                                                    <Card>
                                                        <Image
                                                            src={allImages[index]}
                                                            width={200}
                                                            height={200}
                                                            alt={`Image ${index}`}
                                                            style={{ objectFit: "cover", width: '200px', height: '130px' }}
                                                        />
                                                    </Card>
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious type="button" />
                                    <CarouselNext type="button" />
                                </Carousel>
                            </div>
                        </div>

                        <div className="">
                            <p className='py-1 px-2 text-sm'>Optional Declare Content</p>
                            <DeclareContet
                                total={total}
                                fields={fields}
                                append={append}
                                remove={remove}
                                forms={form}
                            />
                            <RegisterDialog open={open} setOpen={setOpen} trackingID={trackingId} name={userName} />
                        </div>

                        {loading && <Loaders />}
                    </form>
                </Form>
            </div>
        </>
    )
}
