import React from 'react'
import { Document, Page } from '@react-pdf/renderer'
import { InvoiceHead } from './InvoiceHead'
import { InvoiceUser } from './InvoiceUser'
import { InvoiceItemsTable } from './InvoiceItemsTable'


export const InvoicePDF = () => {
    return (
        <>
            <Document>
                <Page size="A4" style={{ padding: 20 }}>
                    <InvoiceHead />
                    <InvoiceUser />
                    <InvoiceItemsTable />
                </Page>
            </Document>
        </>
    )
}
