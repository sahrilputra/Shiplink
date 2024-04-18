'use client'

import React, { useEffect, useState } from 'react'
import { SearchIcon } from '@/components/icons/iconCollection'
import { CatergoryList } from './CatergoryList'
import { SearchBar } from '@/components/ui/searchBar'
import { ScrollArea } from '@/components/ui/scroll-area'
import axios from 'axios'

export const ServicesCategory = ({ selectedData, id }) => {

    const [data, setData] = useState([]);
    console.log("🚀 ~ ServicesCategory ~ data:", data)
    const fetchData = async () => {
        try {
            const response = await axios.get(
                `/api/admin/config/services/list`
            )
            const responseData = response.data;
            console.log("🚀 ~ ).then ~  response: ", responseData)
            setData(responseData.data);
        } catch (error) {
            console.log(error);
            fetchData();
        }
    }
    useEffect(() => {
        fetchData();
    }, [])



    const handleSearchChange = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredData = data.map((item) => ({
            ...item,
            subservice: item.subservice.filter((sub) =>
                sub.subservice.toLowerCase().includes(searchTerm)
            ),
        }));
        setData(filteredData);

        if(event.target.value === "") fetchData();
    };

    return (
        <>
            <div className="w-[300px] px-[15px] pt-5 pb-5 bg-white rounded border border-neutral-200 flex-col justify-start items-start inline-flex gap-[10px]">
                <div className="flex flex-col gap-2">
                    <p className='text-sm font-bold'>All Service Category</p>
                    <SearchBar className="w-full" handleSearch={handleSearchChange} />
                </div>
                <div className="w-full border bg-white flex flex-col px-2 py-3 gap-3 rounded h-max">
                    <ScrollArea className="h-[50vh]">
                        {
                            data?.map((item, index) => {
                                return (
                                    <CatergoryList key={index} Category={item.main} data={item.subservice} selectedData={selectedData} id={id} />
                                )
                            })
                        }
                    </ ScrollArea>
                </div>
            </div>
        </>
    )
}