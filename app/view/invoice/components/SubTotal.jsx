import React from 'react'
import { Document, Page, View, Text } from '@react-pdf/renderer'

export const SubTotal = () => {
    return (
        <View style={{ display: 'flex', padding: 10, flexDirection: 'column', gap: '5', alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
            <View style={{ display: 'flex', gap: 3, flexDirection: 'column', justifyContent: 'space-between', alignContent: 'flex-end', width: "100%" }}>
                <View style={{ display: 'flex', justifyContent: "flex-start", gap: '3px', alignItems: 'center', flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: '10px', width: '130px' }}>Subtotal </Text>
                    <Text style={{ fontWeight: 'bold', fontSize: '10px' }}>:</Text>
                    <Text style={{ fontWeight: 'light', color: '#5A5A5A', fontSize: '10px' }}>$130.00</Text>
                </View>

                <View style={{ display: 'flex', justifyContent: "flex-start", gap: '3px', alignItems: 'center', flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'extrabold', fontSize: '10px', width: '130px' }}>TGS-RP 30% ($. 13.00)</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: '10px' }}>:</Text>
                    <Text style={{ fontWeight: 'extrabold', color: '#5A5A5A', fontSize: '10px' }}>$4.00</Text>
                </View>
                <View style={{ display: 'flex', justifyContent: "flex-start", gap: '3px', alignItems: 'center', flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'extrabold', fontSize: '10px', width: '130px' }}>TVQ/QST 5% ($. 15.00)</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: '10px' }}>:</Text>
                    <Text style={{ fontWeight: 'extrabold', color: '#5A5A5A', fontSize: '10px' }}>$10.00</Text>
                </View>
                <View style={{ display: 'flex', justifyContent: "flex-start", gap: '3px', alignItems: 'center', flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'extrabold', fontSize: '10px', width: '130px' }}>HST 7% ($, 2.00)</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: '10px' }}>:</Text>
                    <Text style={{ fontWeight: '500', color: '#5A5A5A', fontSize: '10px' }}>$2.00</Text>
                </View>
            </View>
            <View style={{ display: 'flex', gap: 3, flexDirection: 'column', height: 5, justifyContent: 'space-between', alignContent: 'flex-end', width: "100%", borderBottomWidth: 1, borderBottomColor: '#dedede', borderBottomStyle: 'solid' }}>
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignContent: 'flex-end', width: "100%" }}>
                <View style={{ display: 'flex', justifyContent: "flex-start", gap: '3px', alignItems: 'center', flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: '10px', width: '130px' }}>Total </Text>
                    <Text style={{ fontWeight: 'bold', fontSize: '10px' }}>:</Text>
                    <Text style={{ fontWeight: 'light', color: '#5A5A5A', fontSize: '10px' }}>$130.00</Text>
                </View>
            </View>
            <View style={{ display: 'flex', gap: 3, flexDirection: 'column', height: 5, justifyContent: 'space-between', alignContent: 'flex-end', width: "100%", borderBottomWidth: 1, borderBottomColor: '#dedede', borderBottomStyle: 'solid' }}>
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignContent: 'flex-end', width: "100%" }}>
                <View style={{ display: 'flex', justifyContent: "flex-start", gap: '3px', alignItems: 'center', flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: '10px', width: '130px', color: '#00509D', }}>Amount Due (CAD)  </Text>
                    <Text style={{ fontWeight: 'bold', fontSize: '10px' }}>:</Text>
                    <Text style={{ fontWeight: 'light', color: '#00509D', fontSize: '10px' }}> $130.00</Text>
                </View>
            </View>
        </View>
    )
}
