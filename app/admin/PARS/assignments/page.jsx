import React from 'react'
import data from '../../../../data/admin/PARSData.json'
import { AssignmetnsTabled } from '../components/ListTable/AssignmentsTable'
export default function assignments() {
    return (
        <>
            <AssignmetnsTabled data={data} />
        </>
    )
}
