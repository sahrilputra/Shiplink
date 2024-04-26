import React from 'react'
import { Document, Page, View } from '@react-pdf/renderer'
import { SubTotal } from './SubTotal'

export const TableFooter = () => {
    return (
        <View style={{ width: "100%" }}>
            <SubTotal />
        </View >
    )
}
