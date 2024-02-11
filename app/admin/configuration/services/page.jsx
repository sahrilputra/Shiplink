'use client'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { ServicesCategory } from './components/ServicesCategory'
import data from '../../../../data/admin/ConfigurationServices.json'
import { TextInput } from 'flowbite-react'
import { SearchIcon, OptionIcons } from '@/components/icons/iconCollection'
import { Status } from '@/components/status/Status'
import { SearchBar } from '@/components/ui/searchBar'
import { Button } from '@/components/ui/button'
import { ServicesTabled } from './components/ServicesTabled'
export default function Services() {
    const [selectedDataID, setSelectedDataID] = useState(null)
    const [selectedData, setSelectedData] = useState(null)

    const handleSelectedData = (id) => {
        setSelectedDataID(id)
    }

    useEffect(() => {
        if (selectedDataID !== null) {
            const newData = data.find(item => item.service.some(service => service.id === selectedDataID));
            setSelectedData(newData);
        }
    }, [selectedDataID]);

    // Cek jika selectedDataID adalah array sebelum memanggil map()
    console.log("Anda memilih data:", Array.isArray(selectedDataID) ? selectedDataID.map(item => item.id) : selectedDataID);
    // Cek jika selectedData tidak null sebelum mencetak deskripsi
    console.log("Deskripsi:", selectedData ? selectedData.description : "Tidak ada data yang dipilih");

    return (
        <div className={styles.container}>
            <div className={styles.category}>
                <ServicesCategory data={data} selectedData={handleSelectedData} />
            </div>
            <div className={styles.content}>
                <ServicesTabled data={selectedData} />
            </div>
        </div>
    )
}
