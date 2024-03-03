import React from 'react'
import { Text, View, StyleSheet } from '@react-pdf/renderer';
const borderColor = '#B9B9B9'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#B9B9B9',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontSize: 10,
        fontStyle: 'bold',
    },
    description: {
        width: '55%',
        textAlign: 'left',
        borderRightColor: borderColor,
        wordWrap: 'break-word',
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    qty: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        paddingRight: 8,
    },
    rate: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    amount: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
});

export const InvoiceTableRow = () => {
    return (
        <View style={styles.row}>
            <Text style={styles.description}>Product 1</Text>
            <Text style={styles.qty}>2</Text>
            <Text style={styles.rate}>$12</Text>
            <Text style={styles.amount}>$123</Text>
        </View>
    )
}
