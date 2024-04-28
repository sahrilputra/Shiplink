import React from 'react'
import { Document, Page, View } from '@react-pdf/renderer'
import { SubTotal } from './SubTotal'

export const TableFooter = ({ data }) => {
    return (
        <View style={{ width: "100%" }}>
            <SubTotal data={data} />
        </View >
    )
}
