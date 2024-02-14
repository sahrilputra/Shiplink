import React from 'react'
import { InvoiceTableRow } from './InvoiceTableRow'
import { InvoiceTableHead } from './InvoiceTableHead'
import { View, StyleSheet } from '@react-pdf/renderer';
import { TableFooter } from './TableFooter';

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
export const InvoiceItemsTable = () => {
    return (
        <View style={styles.tableContainer}>
            <InvoiceTableHead />
            <InvoiceTableRow />
            <InvoiceTableRow />
            <TableFooter />
        </View>
    )
}
