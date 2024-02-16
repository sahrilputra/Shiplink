'use client'
import React, { Fragment, useState } from 'react'

import dynamic from 'next/dynamic'

// Dynamic import PDFViewer component
const PDFViewer = dynamic(() => import('@react-pdf/renderer').then((module) => module.PDFViewer), {
    ssr: false // Set ssr option to false to prevent server-side rendering
});

// Import InvoicePDF component

import { InvoicePDF } from './components/InvoicePDF'

export default function ViewInvoice() {
    return (
        <div className="w-full h-full">
            <PDFViewer width="100%" height="100%" className="app">
                <InvoicePDF />
            </PDFViewer>
        </div>
    );
}