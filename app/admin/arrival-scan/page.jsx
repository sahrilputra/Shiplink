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
import { v4 as uuidv4 } from 'uuid'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Tester } from './components/Tester'


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
    DeclareContet: yup.array().of(
        yup.object().shape({
            itemID: yup.string(),
            qty: yup.number().typeError('This Error'),
            value: yup.number().typeError('This Error'),
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

    const [trackingNumber, setTrackingNumber] = useState(generateRandomNumber());
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
            trackingBarcode: trackingNumber || "",
            phoneNumber: "",
            email: "",
            carrier: "",
            length: "",
            width: "",
            height: "",
            heightType: "",
            weight: "",
            weightType: "",
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


    const declareContent = form.watch("DeclareContet");
    const totalValue = Array.isArray(declareContent)
        ? declareContent.reduce((acc, item) => acc + parseFloat(item.value || 0), 0)
        : 0;
    return (
        <>
            <div className={styles.forms}>
                <Form {...form}>
                    <form
                        className='flex gap-2 flex-col text-zinc-600'
                        action="">
                        <ArrivalForms
                            emptyMessage="No resulsts."
                            placeholder="Find something"
                            forms={form}
                        />

                        <div className="w-full py-4">
                            <Separator className="h-[2px]" />
                        </div>
                        <div className="">
                            <p className='py-1 px-2 text-sm'>Optional Declare Content</p>
                            <DeclareContet
                                forms={form}
                                setOpen={setOpen}
                                addContent={addContent}
                                removeContent={removeContent}
                                inputCount={inputCount}
                                totalInput={totalValue}
                            />
                            <RegisterDialog open={open} setOpen={setOpen} trackingNumber={form.watch("trackingBarcode")} unitID={form.watch("customerID")} name={form.watch("fullName")} />
                        </div>
                    </form>
                </Form>
            </div>
        </>
    )
}
