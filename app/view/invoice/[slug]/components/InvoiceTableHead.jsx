import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#B9B9B9'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#00509D',
        backgroundColor: '#00509D',
        color: '#FFFFFF',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
        fontSize: 10,
    },
    description: {
        width: '55%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    qty: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    rate: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 5,
    },
    amount: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 5,
    },
});

export const InvoiceTableHead = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.description}>Item Description</Text>
            <Text style={styles.qty}>Quantity</Text>
            <Text style={styles.rate}>Price</Text>
            <Text style={styles.amount}>Total</Text>
        </View>
    );
}
