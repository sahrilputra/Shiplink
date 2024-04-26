import React from 'react'
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer'

export const InvoiceHead = () => {
    const styles = StyleSheet.create({
    });
    return (
        <View style={{ padding: '10px', fontFamily: 'Helvetica', }}>
            <Image
                src={'/logo.png'}
                style={{ width: 100, height: 25, marginBottom: '10px' }}
                alt="logo"
            />
            <View style={{ display: 'flex', flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: 'flex-end' }}>
                <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: "3px" }}>
                    <Text style={{ fontWeight: 'bold', fontSize: '11px' }}>1234 Main Street</Text>
                    <Text style={{ fontWeight: 'light', color: '#5A5A5A', fontSize: '10px' }}>Nasuha, 473 Amherst St.</Text>
                    <Text style={{ fontWeight: 'light', color: '#5A5A5A', fontSize: '10px' }}>Unit 7193828, NH, 03063, USA</Text>
                    <Text style={{ fontWeight: 'bold', color: '#5A5A5A', fontSize: '10px' }}>contact@shiplink.ca</Text>
                    <Text style={{ fontWeight: 'bold', color: '#5A5A5A', fontSize: '10px' }}>shiplink.ca</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: "3px" }}>
                    <View style={{ display: 'flex', justifyContent: "flex-start", gap: '3px', alignItems: 'center', flexDirection: 'row' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: '10px', width: '80px' }}>Invoice No </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: '10px' }}>:</Text>
                        <Text style={{ fontWeight: 'light', color: '#5A5A5A', fontSize: '10px' }}>13672</Text>
                    </View>
                    <View style={{ display: 'flex', justifyContent: "flex-start", gap: '3px', alignItems: 'center', flexDirection: 'row' }}>
                        <Text style={{ fontWeight: 'extrabold', fontSize: '10px', width: '80px' }}>Invoice Date</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: '10px' }}>:</Text>
                        <Text style={{ fontWeight: 'extrabold', color: '#5A5A5A', fontSize: '10px' }}>13 May 2023</Text>
                    </View>
                    <View style={{ display: 'flex', justifyContent: "flex-start", gap: '3px', alignItems: 'center', flexDirection: 'row' }}>
                        <Text style={{ fontWeight: 'extrabold', fontSize: '10px', width: '80px' }}>Due Date</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: '10px' }}>:</Text>
                        <Text style={{ fontWeight: 'extrabold', color: '#5A5A5A', fontSize: '10px' }}>13 May 2023</Text>
                    </View>
                    <View style={{ display: 'flex', justifyContent: "flex-start", gap: '3px', alignItems: 'center', flexDirection: 'row' }}>
                        <Text style={{ fontWeight: 'extrabold', fontSize: '10px', width: '80px' }}>Amount Due</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: '10px' }}>:</Text>
                        <Text style={{ fontWeight: '500', color: '#5A5A5A', fontSize: '10px' }}>$ 52.79</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}
