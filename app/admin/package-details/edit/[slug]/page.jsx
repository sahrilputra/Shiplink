/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss'
import Image from 'next/image';
import { Edit } from 'lucide-react';
import * as yup from 'yup';
import {
    useForm,
    useFieldArray,
    useFormContext,
    FormProvider,
    FieldErrors
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    Form,
    FormField,
    FormControl,
    FormLabel,
} from "@/components/ui/form"
import axios from 'axios';
import { DeclareContentInputs } from './components/DeclareContentInputs';
import { DataForms } from './components/DataForms';
import { OtherField } from './components/OtherField';
import { Loaders } from '@/components/ui/loaders';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation'

export const formSchema = yup.object().shape({
    test: yup.string(),
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
            subTotal: yup.number()
        })
    ),
    box_images: yup.array(),
    label_images: yup.array(),
    content_images: yup.array(),
    lots_id: yup.string(),
    lots_name: yup.string(),
    manifest: yup.string(),
    entry_number: yup.string(),
    status: yup.string(),
    tracking_id: yup.string(),
    documents: yup.string().nullable(),

})


export const FormValidate = ({ data }) => {

    console.log("Form VALIDATE DATA : ", data)
    console.log("Form content DATA : ", data?.content)
    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            test: data?.customer_id || "",
            customer_id: data?.customer_id || "",
            customer_name: data?.customer_name || "",
            customer_phone: data?.customer_phone || "",
            customer_email: data?.customer_email || "",
            barcode_tracking: data?.barcode_tracking || "",
            carrier_code: data?.carrier_code || "",
            packageID: data?.packageID || "",
            package_length: data?.package_length || "",
            package_witdth: data?.package_witdth || "",
            package_height: data?.package_height || "",
            package_height_unit: data?.package_height_unit || "in",
            package_weight: data?.package_weight || "",
            package_weight_unit: data?.package_weight_unit || "Ibs",
            bin_location: data?.bin_location || "",
            total_price: data?.total_price || 0,
            package_content: Array.from({ length: data?.content?.length || 1 }, (_, index) => ({
                tracking_id: data?.tracking_id || "",
                qty: 0,
                value: 0,
                desc: "",
                hs_desc: "",
                hs_code: "",
                made_in: "",
                subtotal: 0,
            })),
            box_images: [

            ],
            label_images: [

            ],
            content_images: [

            ],
            lots_id: data?.lots_id || "",
            lots_name: data?.lots_name || "",
            manifest: data?.manifest || "",
            entry_number: data?.entry_number || "",
            status: data?.status || "",
            tracking_id: data?.tracking_id || "",
            documents: data?.documents || "",
        },
        mode: "onChange",
    })

    useEffect(() => {
        form.setValue('customer_id', data.customer_id || '');
        form.setValue('customer_name', data.customer_name || '');
        form.setValue('customer_phone', data.customer_phone || '');
        form.setValue('customer_email', data.customer_email || '');
        form.setValue('barcode_tracking', data.barcode_tracking || '');
        form.setValue('carrier_code', data.carrier_code || '');
        form.setValue('packageID', data.packageID || '');
        form.setValue('package_length', data.package_length || '');
        form.setValue('package_witdth', data.package_witdth || '');
        form.setValue('package_height', data.package_height || '');
        form.setValue('package_height_unit', data.package_height_unit || 'in');
        form.setValue('package_weight', data.package_weight || '');
        form.setValue('package_weight_unit', data.package_weight_unit || 'Ibs');
        form.setValue('bin_location', data.bin_location || '');
        form.setValue('total_price', data.total_price || 0);
        form.setValue('package_content', data.content || []);
        form.setValue('box_images', data.box_images || []);
        form.setValue('label_images', data.label_images || []);
        form.setValue('content_images', data.content_images || []);
        form.setValue('lots_id', data.lots_id || '');
        form.setValue('lots_name', data.lots_name || '');
        form.setValue('manifest', data.manifiest_number || '');
        form.setValue('entry_number', data.entry_number || '');
        form.setValue('status', data.status || '');
        form.setValue('documents', '');
        form.setValue('tracking_id', data.tracking_id || '');
    }, [data]);
    return form
}

export default function PackageDetails({ params }) {
    const { toast } = useToast()
    const router = useRouter();

    const [data, setData] = useState({});
    const [skeleton, setSkeleton] = useState(true);
    const [dataFetched, setDataFetched] = useState(false);
    const [declareContent, setDeclareContent] = useState([])
    const [query, setQuery] = useState({
        keyword: '',
        date_start: "",
        date_end: "",
        tracking_id: `${params.slug}`,
    });

    const fetchData = async () => {
        try {
            const response = await axios.post(
                `/api/admin/packages/list`,
                query
            );
            console.log(response)
            const responseData = await response.data.package_info[0];
            console.log("🚀 ~ fetchData ~ content:", responseData.content)
            setDeclareContent(responseData.content)
            console.log("RESPONSE PAKCKAGE :", responseData);
            setData(responseData);
            setDataFetched(true);
            setSkeleton(false)
        } catch (error) {
            setSkeleton(false)
            console.log('Error:', error);
        }
    };

    const [binQuery, setBinQuery] = useState({
        keyword: "",
        page: 1,
        limit: 0,
        index: 0
    });
    const [binData, setBinData] = useState([])
    const fetchBinData = async () => {
        try {
            const response = await axios.post(
                `/api/admin/bin_manager/list`,
                binQuery
            );
            // console.log("response from bin manager : ", response.data)
            const data = await response.data;
            setBinData(data.bins);
        } catch (error) {
            console.log('Error:', error);
        }
    }

    useEffect(() => {
        fetchData();
        fetchBinData();
    }, [query, binQuery]);


    console.log("data : ", data?.customer_name)

    const form = FormValidate({ data: data });
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'package_content'
    })


    // useEffect(() => {
    //     const calculateTotal = () => {
    //         let total = 0;
    //         form.watch('package_content').forEach(item => {
    //             total += item.subTotal;
    //         });
    //         form.setValue('total_price', total);
    //     };
    //     calculateTotal();
    // }, [form.watch('package_content')]);

    const [loading, setLoading] = useState(false);
    console.log("🚀 ~ calculateTotal ~ total_price:", form.getValues('total_price'))

    const handleSubmit = async (formData) => {
        console.log("ACEPETED", formData)
        setLoading(true)
        try {
            const response = await axios.post(
                `/api/admin/packages/edit`,
                {
                    customer_id: formData.customer_id,
                    customer_name: formData.customer_name,
                    customer_phone: formData.customer_phone,
                    customer_email: formData.customer_email,
                    barcode_tracking: formData.barcode_tracking,
                    carrier_code: formData.carrier_code,
                    package_length: formData.package_length,
                    package_witdth: formData.package_witdth,
                    package_height: formData.package_height,
                    package_height_unit: formData.package_height_unit,
                    package_weight: formData.package_weight,
                    package_weight_unit: formData.package_weight_unit,
                    bin_location: formData.bin_location,
                    total_price: formData.total_price,
                    package_content: formData.package_content,
                    box_images: formData.box_images,
                    label_images: formData.label_images,
                    content_images: formData.content_images,
                    manifiest_number: formData.manifest,
                    lots_id: formData.lots_id,
                    documents: formData.documents,
                    entry_number: formData.entry_number,
                    action: "edit",
                    status: formData.status,
                    tracking_id: formData.tracking_id,
                },
            )
            console.log("🚀 ~ POST ~ SENDER response:", response)
            console.log("🚀 ~ POST ~ SENDER response:", response.data.message)

            setLoading(false)
            if (response.data.message === "success" || response.data.message === "Success") {
                setLoading(false)
                toast({
                    title: `Sucess Edited Package for ${formData.tracking_id}`,
                    description: response.data.message,
                    status: 'success',
                });
                router.push(`/admin/package-details/${data.tracking_id}`)
            } else {
                setLoading(false)
                console.log('erorr', response.data.message)
                toast({
                    title: `Errors!`,
                    description: response.data.message,
                    status: 'success',
                });
            }
        } catch (error) {
            setLoading(false)
            console.log('Erorr', error)
            toast({
                title: `Errors!`,
                description: 'Something went wrong, please try again later.',
            });
        }
    }

    // Status
    const [statusList, setStatusList] = useState([]);
    console.log("🚀 ~ UpdateStatus ~ statusList:", statusList)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `/api/admin/packages/status`
                );
                console.log("🚀 ~ fetchData ~ response:", response)
                const data = await response.data;
                console.log("🚀 ~ Status ~ data:", data.data)
                setStatusList(data.data);
            } catch (error) {
                console.log('Error:', error);
            }
        };
        fetchData();
    }, [])

    console.log("documents : ", form.watch('documents'))
    console.log("ERRORS : ", form.formState.errors)

    const [total, setTotal] = useState(Number(0));
    const calculateTotal = () => {
        let totalPrice = 0;
        form.getValues().package_content.forEach((item) => {
            totalPrice += Number(item.qty) * Number(item.value);
        });
        console.log("Total Price : ", totalPrice)
        setTotal(Number(totalPrice));
        form.setValue("total_price", totalPrice);
    }

    useEffect(() => {
        calculateTotal();
    }, [form.watch('package_content').map(item => `${item.qty}-${item.value}`)]);

    return (
        <>

            {loading && <Loaders />}
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.configHeader}>
                        <div className={styles.banner}>
                            <div className={styles.icon}>
                                <Image
                                    src={"/backoffice/edit-blue.png"}
                                    width={40}
                                    height={40}
                                    alt='config icon'
                                />
                            </div>
                            <div className={`${styles.title} flex flex-col`}>
                                <h1 className=" text-zinc-900 text-sm font-bold ">Edit Package</h1>
                                <p className=" text-blue-900 text-xs font-normal">Package ID : #{params.slug}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.childContent}>
                        <Form {...form}>
                            <form
                                className='flex gap-2 flex-col text-zinc-600'
                                action=""
                                onSubmit={form.handleSubmit(handleSubmit)}
                            >
                                <DataForms
                                    emptyMessage="No resulsts."
                                    placeholder="Find something"
                                    forms={form}
                                />

                                <OtherField
                                    forms={form}
                                    binData={binData}
                                    statusList={statusList}
                                />

                                <DeclareContentInputs
                                    fields={fields}
                                    append={append}
                                    remove={remove}
                                    forms={form}
                                    total={total}
                                    binData={binData}
                                    data={declareContent}
                                    package_id={data?.tracking_id}
                                />
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}
