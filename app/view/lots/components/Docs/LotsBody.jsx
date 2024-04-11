import React from 'react'
import { View, StyleSheet } from '@react-pdf/renderer';
import { PackageTableHead } from './PackageTableHead';
import { PackageTableContent } from './PackageTableContent';
const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 24,
        borderWidth: 1,
        borderColor: '#B9B9B9',
        margin: 10,
    },
});

export const LotsBody = ({ package_data }) => {
    return (
        <View style={styles.tableContainer}>
            <PackageTableHead />
            <PackageTableContent package_data={package_data} />
        </View>
    )
}
