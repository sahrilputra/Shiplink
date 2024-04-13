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
import axios from 'axios';
export default function Services() {
    const [selectedDataID, setSelectedDataID] = useState(null)
    const [selectedData, setSelectedData] = useState("C001")

    const handleSelectedData = (id) => {
        setSelectedDataID(id)
    }

    // useEffect(() => {
    //     if (selectedDataID !== null) {
    //         const newData = data.find(item => item.service.some(service => service.id === selectedDataID));
    //         setSelectedData(newData);
    //     }
    // }, [selectedDataID]);

    // Cek jika selectedDataID adalah array sebelum memanggil map()
    console.log("Anda memilih data:", selectedDataID);
    // Cek jika selectedData tidak null sebelum mencetak deskripsi
    console.log("Deskripsi:", selectedData ? selectedData.description : "Tidak ada data yang dipilih");


    // const [tableData, setTableData] = useState([]);
    // console.log("🚀 ~ Services ~ tableData:", tableData)
    // useEffect(() => {
    //     const fetchDataListTable = async () => {
    //         try {
    //             const response = await axios.get(
    //                 `/api/admin/config/services/setting_list`,
    //                 { id: selectedDataID }
    //             )
    //             console.log("🚀 ~ fetchDataListTable ~ response:", response)
    //             const responseData = await response.data;
    //             setTableData(responseData);
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }

    //     fetchDataListTable();
    // }, [selectedDataID]);

    return (
        <div className={styles.container}>
            <div className={styles.category}>
                <ServicesCategory selectedData={handleSelectedData} id={selectedDataID} />
            </div>
            <div className={styles.content}>
                <ServicesTabled id={selectedDataID} />
            </div>
        </div>
    )
}
