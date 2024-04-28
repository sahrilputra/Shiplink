'use client'
import React, { useEffect, useState } from 'react'
import { Document, Page } from '@react-pdf/renderer'
import { InvoiceHead } from './InvoiceHead'
import { InvoiceUser } from './InvoiceUser'
import { InvoiceItemsTable } from './InvoiceItemsTable'

export const InvoicePDF = ({ data, invoice_id }) => {

    return (
        <>
            <Document>
                <Page size="A4" style={{ padding: 20 }}>
                    <InvoiceHead data={data} invoice_id={invoice_id} />
                    <InvoiceUser data={data} />
                    <InvoiceItemsTable data={data} />
                </Page>
            </Document>
        </>
    )
}
