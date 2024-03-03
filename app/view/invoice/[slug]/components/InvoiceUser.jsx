import React from 'react'
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import { InvoiceShippedTo } from './InvoiceShippedTo'
import { InvoiceBillled } from './InvoiceBillled'
export const InvoiceUser = () => {
    return (
        <View style={{ display: 'flex', flexDirection: 'row', fontSize: '12px', padding: '10px' }}>
            <InvoiceBillled />
            <InvoiceShippedTo />
        </View>
    )
}
