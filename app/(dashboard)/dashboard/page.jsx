'use client'
import React, { useState } from 'react'
import { Sidebar } from '@/components/sidebar/sidebar'
import ItemsPackage from '@/components/items/itemsPackage'
import Image from 'next/image'
import styles from './styles.module.scss'
import { SelectBroker, ButtonUploadInvoice, ButtonPARS, ButtonEntryNumber, SelectWarehouse } from '@/components/buttons/ButtonGroup'
import { Inter } from 'next/font/google'
import { Navbar } from '@/components/navbar/Navbar';
import { PromoOne } from '@/components/ads/promoOne';
import { Button } from '@mui/material';
import { SearchIcon } from '@/components/icons/iconCollection';
import { PromoTwo } from '@/components/ads/promoTwo';
import { ForwadPakage } from '@/components/dashboardMenus/ForwadPakage';
import { PaymentModals } from '@/components/dashboardMenus/payments/paymentModals';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material'
import Typography from '@mui/material/Typography';


export default function dashboard() {

    return (
        <>

            <div className={styles.item_container}>

                <div className={styles.items}>
                    <ItemsPackage />
                    <ItemsPackage />
                    <ItemsPackage />
                </div>
            </div>

        </>
    )
}
