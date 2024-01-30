'use client'
import React, { useState } from 'react'
import data from '../../../../data/admin/PARSData.json'
import { AssignmetnsTabled } from '../components/ListTable/AssignmentsTable'
import { SequencesDetails } from './components/dialog/SequencesDetails'

const RenderComponent = ({ select, open, setOpen }) => {
    return (
        <>
            {select === "SequenceDetails" ? (
                <>
                    <p>Helo</p>
                    <SequencesDetails open={open} onOpen={setOpen} />
                </>
            ) : select === "data" ? (
                <></>
            ) : (
                <p></p>
            )}
        </>
    )
}
export default function Assignments() {
    const [select, selectedMenus] = useState(null);
    const [open, setOpen] = useState(false);

    const toggleDetails = () => {
        setOpen(!open)
    }
    console.log('select', select)



    return (
        <>
            <AssignmetnsTabled data={data} selectedMenus={select} selectedMenusState={selectedMenus} />
            <RenderComponent select={select} open={open} setOpen={setOpen} />
        </>
    )
}
