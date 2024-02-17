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
import { useForm } from 'react-hook-form'
import { ImageTable } from '../verification/components/Table/ImageTable'
import { v4 as uuidv4 } from 'uuid'
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
import { DeclareContentProvider } from './components/Context/DeclareContentContext'

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
    wholeBoxImg: yup.string(),
    labelImg: yup.string(),
    contentImg: yup.string(),
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

    const [inputCount, setInputCount] = useState(1);


    const removeContent = (index) => {
        return () => {
            setInputCount((prevCount) => prevCount - 1);
            form.setValue('DeclareContet', (prevDeclareContent) => {
                return prevDeclareContent.filter((_, i) => i !== index);
            });
        }
    }
    const addContent = () => {
        setInputCount((prevCount) => prevCount + 1);
        const uniqueId = uuidv4();
        form.setValue('DeclareContet', (prevDeclareContent) => [
            ...prevDeclareContent,
            {
                itemID: uniqueId,
                qty: "",
                value: "",
                description: "",
                hsDescription: "",
                hsCode: "",
                madeIn: "",
            },
        ]);

    }

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
            wholeBoxImg: "",
            labelImg: "",
            contentImg: "",
            DeclareContet: Array.from({ length: inputCount }, () => ({
                itemID: "",
                qty: "",
                value: "",
                description: "",
                hsDescription: "",
                hsCode: "",
                madeIn: "",
            })),
        },
        mode: "onChange",
    })

    const handleSubmit = () => {
        console.log("Form Submitted!");

    }

    console.log(form.watch.customerID, 'watched value')
    console.log(form.getValues('customerID'), 'getValues value')
    console.log(form.getValues('labelImg'), 'getValues value')
    const labelImg = form.getValues('labelImg');
    const wholeBoxImg = form.getValues('wholeBoxImg');
    const contentImg = form.getValues('contentImg');
    console.log("labelImg", labelImg)
    const images = [labelImg, wholeBoxImg, contentImg].filter(image => image !== null);

    console.log("images", images)
    // const images = [form.getValues('labelImg'), form.getValues('wholeBoxImg'), form.getValues('contentImg')].filter(image => image !== null);
    // console.log(images, 'images')
    const declareContent = form.watch("DeclareContet");
    const totalValue = Array.isArray(declareContent)
        ? declareContent.reduce((acc, item) => acc + parseFloat(item.value || 0), 0)
        : 0;

    return (
        <>
            <DeclareContentProvider>
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
                                    <Carousel>
                                        <CarouselContent className="flex items-center justify-center p-3">
                                            {images.length > 0 ? (
                                                images.map((image, index) => (
                                                    <CarouselItem
                                                        key={index}
                                                        className="basis-1/3"
                                                    >
                                                        <Image
                                                            src={image}
                                                            width={200}
                                                            height={200}
                                                            alt={`Image ${index}`}
                                                            style={{ objectFit: "cover", width: '200px', height: '130px' }}
                                                        />
                                                    </CarouselItem>
                                                ))
                                            ) : (
                                                <div className='text-xs'>No image to diplay here</div>
                                            )}
                                        </CarouselContent>
                                        <CarouselPrevious />
                                        <CarouselNext />
                                    </Carousel>
                                </div>
                            </div>
                            <div className="">
                                <p className='py-1 px-2 text-sm'>Optional Declare Content</p>
                                <DeclareContet
                                    forms={form}
                                    addContent={addContent}
                                    removeContent={removeContent}
                                    inputCount={inputCount}
                                    totalInput={totalValue}
                                />
                                <RegisterDialog open={open} setOpen={setOpen} trackingNumber={form.watch("packageID")} unitID={form.watch("customerID")} name={form.watch("fullName")} />
                            </div>
                        </form>
                    </Form>
                </div>
            </DeclareContentProvider>
        </>
    )
}
