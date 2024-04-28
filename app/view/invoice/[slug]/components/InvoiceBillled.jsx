import React from 'react'
import { Text, View } from '@react-pdf/renderer'

export const InvoiceBillled = ({ data }) => {


    return (
        <View style={{ display: 'flex', flexDirection: 'column', fontSize: '10px', padding: '10px' }}>
            <Text style={{ fontWeight: 'bold', textDecoration: 'none', width: '100px', borderBottomWidth: 1, borderBottomColor: '#dedede', borderBottomStyle: 'solid', marginBottom: 2 }}>
                Billed To
            </Text>
            <Text style={{ fontWeight: 'bold' }}>
                {data?.billed_name || "-"}
            </Text>
            <Text style={{ fontWeight: 'light', color: '#5a5a5a' }}>
                {data?.billed_address || "-"}
            </Text>
            <Text style={{ fontWeight: 'light', color: '#5a5a5a' }}>
                {data?.billed_zip || "-"}
            </Text>
            <Text style={{ fontWeight: 'light', color: '#5a5a5a' }}>
                {data?.billed_country || "-"}
            </Text>
        </View>
    )
}
