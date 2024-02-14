'use client'
import React, { Fragment, useState } from 'react'
import { PDFViewer } from '@react-pdf/renderer'
import { InvoicePDF } from './components/InvoicePDF'
export default function ViewInvoice() {
    return (
        <>
            <div className="w-full h-full">
                <PDFViewer width="100%" height="100%" className="app" >
                    <InvoicePDF />
                </PDFViewer>
            </div>

        </>
    )
}
