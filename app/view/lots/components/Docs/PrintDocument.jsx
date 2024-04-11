import React from 'react'
import { PDFViewer } from '@react-pdf/renderer'
import { LotsPDF } from './LotsPDF'
// import { LotsPDF } from './LotsPDF'

export const PrintDocument = ({ data, lots_id }) => {
    return (
        <>
            <PDFViewer width="100%" height="100%" className="app">
                <LotsPDF data={data} lots_id={lots_id} />
            </PDFViewer>
        </>
    )
}
