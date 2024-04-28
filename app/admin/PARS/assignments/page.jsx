'use client'
import React, { useState } from 'react'
// import data from '../../../../data/admin/PARSData.json'
import { AssignmetnsTabled } from '../components/ListTable/AssignmentsTable'
import axios from 'axios'


export default function Assignments() {
    const [select, selectedMenus] = useState(null);
    const [selectedID, setSelectedID] = useState(null);
    const [open, setOpen] = useState(false);
    const [renderKey, setRenderKey] = useState(0);
    const [openEdit, setOpenEdit] = useState(false)


    const selectedIDHandler = (id) => {
        setSelectedID(id)
    }
    const menuItemClickHandler = (item) => {
        selectedMenus(item);
        setOpen(true); // Ensure the dialog is open when a menu item is clicked
        setRenderKey((prevKey) => prevKey + 1);
    };
    console.log('setRenderKey', renderKey)



    return (
        <>
            <AssignmetnsTabled
                selectedMenus={select}
                selectedMenusState={menuItemClickHandler}
                selectedIDHandler={selectedIDHandler}
            />
        </>
    )
}
