'use client'
import React, { Fragment, useState } from 'react'

import dynamic from 'next/dynamic'
import { InvoicePDF } from './components/InvoicePDF';
// Dynamic import PDFViewer component
const PDFViewer = dynamic(() => import('@react-pdf/renderer').then((module) => module.PDFViewer), {
    ssr: false // Set ssr option to false to prevent server-side rendering
});

export default function ViewInvoice({ params }) {

    console.log("params", params.slug)
    return (
        <div className="w-full h-full">
            <PDFViewer width="100%" height="100%" className="app">
                <InvoicePDF id={params.slug} />
            </PDFViewer>
        </div>
    );
}