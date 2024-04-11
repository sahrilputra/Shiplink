import React from 'react'
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
    num: {
        width: '5%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    description: {
        width: '30%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    qty: {
        width: '30%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    rate: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        paddingRight: 5,
    },
    amount: {
        width: '20%',
        textAlign: 'center',
        paddingRight: 5,
    },
});

export const PackageTableHead = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.num}>#</Text>
            <Text style={styles.description}>Tracking ID</Text>
            <Text style={styles.qty}>Customer Name</Text>
            <Text style={styles.rate}>Origin</Text>
            <Text style={styles.amount}>Destination</Text>
        </View>
    )
}
