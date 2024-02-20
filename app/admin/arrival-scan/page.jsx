'use client'
import React, { useState } from 'react'
import styles from './styles.module.scss'
import { ArrivalForms } from './components/Forms'
import { Button } from '@/components/ui/button'
import { DeclareContet } from './components/Table/DeclareContet'
import { Separator } from '@/components/ui/separator'
import { RegisterDialog } from './components/Dialog/RegistedDialog'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, useFieldArray } from 'react-hook-form'
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
import Image from 'next/image'
const formSchema = yup.object().shape({
    customerID: yup.string(),
    fullName: yup.string(),
    trackingBarcode: yup.string(),
    phoneNumber: yup.number(),
    email: yup.string().email(),
    carrier: yup.string(),
    packageID: yup.string(),
    length: yup.number(),
    width: yup.number(),
    height: yup.number(),
    heightType: yup.string(),
    weight: yup.number(),
    weightType: yup.string(),
    box_images: yup.array().of(
        yup.object().shape({
        }),
    ),
    label_images: yup.array().of(
        yup.object().shape({
        }),
    ),
    content_images: yup.array().of(
        yup.object().shape({
        }),
    ),
    DeclareContet: yup.array().of(
        yup.object().shape({
            itemID: yup.string(),
            qty: yup.number().typeError('Error'),
            value: yup.number().typeError('Error'),
            description: yup.string(),
            hsDescription: yup.string(),
            hsCode: yup.string(),
            madeIn: yup.string(),
        })
    )
})

export default function ArrivalScanPage() {

    const generateRandomNumber = () => {
        const randomNumber = Math.floor(Math.random() * 1000);
        const formattedNumber = `SL${randomNumber.toString().padStart(6, '0')}`;
        return formattedNumber;
    };

    const [internalCode, setInternalCode] = useState(generateRandomNumber());
    const [open, setOpen] = useState(false);

    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            customerID: "",
            fullName: "",
            trackingBarcode: "",
            phoneNumber: "",
            email: "",
            carrier: "",
            packageID: internalCode || "",
            length: "",
            width: "",
            height: "",
            heightType: "",
            weight: "",
            weightType: "",
            box_images: [
                {}
            ],
            label_images: [
                {}
            ],
            content_images: [
                {}
            ],
            DeclareContet: [
                {
                    itemID: "",
                    qty: 0,
                    value: 0,
                    description: "",
                    hsDescription: "",
                    hsCode: "",
                    madeIn: "",
                }
            ],
        },
        mode: "onChange",
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "DeclareContet",
    });


    // const labelImg = form.getValues('label_images');
    // const wholeBoxImg = form.getValues('wholeBoxImg');
    // const contentImg = form.getValues('contentImg');
    // console.log("Box Image", form.watch('box_images'))
    // console.log("Label Image", form.watch('label_images'))
    // console.log("Content Image", form.watch('content_images'))

    const boxImages = form.watch('box_images');
    const labelImages = form.watch('label_images');
    const contentImages = form.watch('content_images');
    const allImages = [...boxImages, ...labelImages, ...contentImages];

    console.log("Semua Gambar", allImages);
    const IMAGE_SIZE = allImages.length;
    const OPTIONS = { loop: true };
    const [api, setApi] = useState({
        IMAGE_SIZE,
    });
    // const calculateTotal = () => {
    //     return form.watch('DeclareContet').reduce((acc, item) => acc + parseFloat(item.value || 0), 0);
    // };

    const calculateTotal = () => {
        const declareContent = form.watch('DeclareContet');
        const total = declareContent.reduce((acc, item) => acc + parseFloat(item.value || 0), 0);
        console.log('Total:', total);
        return total;
    };
    const Totals = calculateTotal();
    console.log("Totalssss : ", Totals)
    
    return (
        <>

            <div className={styles.forms}>
                <Form {...form}>
                    <form
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
                                <Carousel  >
                                    <CarouselContent className="flex items-center justify-center p-3 w-full">
                                        {allImages.length > 0 ? (
                                            allImages.map((image, index) => (
                                                <>
                                                    <CarouselItem key={index} className="basis-1/3">
                                                        <Image
                                                            src={image}
                                                            width={200}
                                                            height={200}
                                                            alt={`Image ${index}`}
                                                            style={{ objectFit: "contain", width: '200px', height: '130px' }}
                                                        />
                                                    </CarouselItem>
                                                </>
                                            ))
                                        ) : (
                                            <div className='text-xs'>No image to diplay here</div>
                                        )}
                                    </CarouselContent>
                                    <CarouselPrevious type="button" />
                                    <CarouselNext type="button" />
                                </Carousel>
                            </div>
                        </div>
                        <div className="">
                            <p className='py-1 px-2 text-sm'>Optional Declare Content</p>
                            <DeclareContet
                                total={Totals}
                                fields={fields}
                                append={append}
                                remove={remove}
                                forms={form}
                            />
                            <RegisterDialog open={open} setOpen={setOpen} trackingNumber={form.watch("packageID")} unitID={form.watch("customerID")} name={form.watch("fullName")} />
                        </div>
                    </form>
                </Form>
            </div>

        </>
    )
}
