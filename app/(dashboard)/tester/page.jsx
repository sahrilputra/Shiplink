import React from 'react'
import { TableHeader } from '@/components/table/TableHeader'
import { TableDashboard } from '@/components/table/Type/TableDashboard';
export default function tester() {

    const data = [
        { Qty: 1, Value: '$100', Description: 'My Description', 'HS Description': 'My HS Description', 'HS Code': '8103.99.0000', 'Made in': 'CAN' },
        { Qty: 1, Value: '$100', Description: 'My Description', 'HS Description': 'My HS Description', 'HS Code': '8103.99.0000', 'Made in': 'CAN' },
        { Qty: 1, Value: '$100', Description: 'My Description', 'HS Description': 'My HS Description', 'HS Code': '8103.99.0000', 'Made in': 'CAN' },
        { Qty: 1, Value: '$100', Description: 'My Description', 'HS Description': 'My HS Description', 'HS Code': '8103.99.0000', 'Made in': 'CAN' },
    ];
    const columns = Object.keys(data[0]);
    return (
        <>
            <TableDashboard data={data} columns={columns} />
            <div>tester</div>
        </>
    )
}
