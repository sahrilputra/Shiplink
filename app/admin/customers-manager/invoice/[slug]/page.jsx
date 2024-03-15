'use client'
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CustomerInvoiceTable } from '../../components/table/invoiceTable/CustomerInvoiceTable';
export default function UserInvoice({ params }) {
    const customerID = params.slug
    return (
        <>
            <CustomerInvoiceTable CustomerID={customerID} />
        </>
    );
}