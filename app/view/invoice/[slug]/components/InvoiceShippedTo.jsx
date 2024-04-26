import React from 'react'
import { Text, View } from '@react-pdf/renderer'

export const InvoiceShippedTo = () => {
    return (
        <View style={{ display: 'flex', flexDirection: 'column', fontSize: '10px', padding: '10px' }}>
            <Text style={{ fontWeight: 'bold', width: '100px', borderBottomWidth: 1, borderBottomColor: '#dedede', borderBottomStyle: 'solid', marginBottom: 2 }}>
                Shipped To
            </Text>
            <Text style={{ fontWeight: 'bold' }}>
                James Smith
            </Text>
            <Text style={{ fontWeight: 'light', color: '#5a5a5a' }}>
                Nasuha, 473 Amherst St.
            </Text>
            <Text style={{ fontWeight: 'light', color: '#5a5a5a' }}>
                Unit 7193828, NH, 03063
            </Text>
            <Text style={{ fontWeight: 'light', color: '#5a5a5a' }}>
                USA
            </Text>
        </View>

    )
}
