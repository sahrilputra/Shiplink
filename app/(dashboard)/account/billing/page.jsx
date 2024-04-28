'use client'
import React, { useEffect, useState } from 'react'
import styles from '../styles.module.scss'
import { AddressForms } from '../components/forms/AddressForm'
import { Separator } from '@/components/ui/separator'
import { CardForms } from '../components/forms/CardForms'
import { PaymentCards } from '../components/payments/PaymentCards'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'


export default function Page() {

    const { data: session } = useSession()
    const [userCode, setUserCode] = useState(session?.user.code)

    const [cardList, setCardList] = useState([]);
    console.log("Session ID", session?.user.code)

    const [skeleton, setSkeleton] = useState(true);
    const [query, setQuery] = useState({
        keyword: "",
        page: 0,
        customer_id: `${session?.user.code}`,
        limit: 0,
        index: 0
    });

    useEffect(() => {
        const fetchCardList = async () => {
            axios.post(
                `/api/customerAPI/payments/cardList`,
                query
            ).then((response) => {
                console.log("🚀 ~ fetchCardList ~ response", response)
                setCardList(response.data.credit_card)
                setSkeleton(false)
            }).catch((error) => {
                console.log("🚀 ~ fetchCardList ~ error", error)
            })
        }

        fetchCardList();
    }, [query])
    console.log("🚀 ~ Page ~ cardList:", cardList)
    return (
        <>
            <div className={styles.content}>
                <div className="header p-5 flex flex-col gap-2">
                    <h1 className='text-zinc-900 text-base font-bold'>Billing Details</h1>
                </div>
                <div className="tableWrapper w-[90%] mx-auto">
                    <AddressForms
                        userCode={userCode}
                    />
                </div>
                {/* <div className="separator py-3 px-5">
                    <Separator className="py-[1px]" />
                </div> */}

                {/* Issues 16 Hidding Credit Details */}
                {/* <div className="creditDetails p-5 flex flex-row gap-5 w-full justify-between">
                    <div className="w-full p-3">
                        <h1 className='text-zinc-900 text-base font-bold py-2'>New Credit Cards</h1>
                        <CardForms />
                    </div>
                    <div className="separator">
                        <Separator orientation="vertical" className="px-[1px]" />
                    </div>

                    <div className="w-full p-3">
                        <h1 className='text-zinc-900 text-base font-bold py-2'>Saved Credit Cards</h1>
                        <div className="flex flex-col gap-3">
                            {
                                cardList?.map((item, index) => (
                                    <PaymentCards item={item} key={index} />
                                ))
                            }
                        </div>
                    </div>
                </div> */}
            </div>

        </>
    )
}
