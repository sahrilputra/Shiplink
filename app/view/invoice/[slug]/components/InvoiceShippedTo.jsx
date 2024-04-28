import React from 'react'
import { Text, View } from '@react-pdf/renderer'

export const InvoiceShippedTo = ({ data }) => {
    return (
        <View style={{ display: 'flex', flexDirection: 'column', fontSize: '10px', padding: '10px' }}>
            <Text style={{ fontWeight: 'bold', width: '100px', borderBottomWidth: 1, borderBottomColor: '#dedede', borderBottomStyle: 'solid', marginBottom: 2 }}>
                Shipped To
            </Text>
            <Text style={{ fontWeight: 'bold' }}>
                {data?.shipped_name || "-"}
            </Text>
            <Text style={{ fontWeight: 'light', color: '#5a5a5a' }}>
                {data?.shipped_address || "-"}
            </Text>
            <Text style={{ fontWeight: 'light', color: '#5a5a5a' }}>
                {data?.shipped_zip || "-"}
            </Text>
            <Text style={{ fontWeight: 'light', color: '#5a5a5a' }}>
                {data?.shipped_country || "-"}
            </Text>
        </View>

    )
}
