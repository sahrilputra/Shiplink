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
    num: {
        width: '5%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
    },
    description: {
        width: '30%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 5,
    },
    qty: {
        width: '30%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 5,
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
export const PackageTableContent = ({ package_data }) => {
    console.log("🚀 ~ PackageTableContent ~ package_data:", package_data)
    const renderRow = package_data.map((item, index) => {
        return (
            <>
                <View style={styles.row}>
                    <Text style={styles.num}>{index + 1}</Text>
                    <Text style={styles.description}>{item.tracking_id}</Text>
                    <Text style={styles.qty}>{item.customer_name}</Text>
                    <Text style={styles.rate}>{item.warehouse_name_arrival} - {item?.country_code_arrival}</Text>
                    <Text style={styles.amount}>{item.warehouse_name_destination} - {item?.country_code_destination}</Text>
                </View>
            </>
        )
    })
    return (
        <>
            {renderRow}
        </>
    )
}
