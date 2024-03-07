import { SearchBar } from '@/components/ui/searchBar'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ListData } from './ListData';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { TableOfCategories } from './Categories/TableOfCategories';
export const CategoryList = () => {
    const [category, setCategory] = useState([]);
    const [skeleton, setSkeleton] = useState(true)
    const [query, setQuery] = useState({
        keyword: '',
        page: 0,
        limit: 0,
        index: 0
    })

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.post(
                '/api/admin/product/categories',
                query
            )
            const responseData = await response.data.product_categories;
            console.log("🚀 ~ fetchData ~ responseData:", responseData)
            setCategory(responseData)
            setSkeleton(false)
        }
        fetchData();
    }, [query]);

    console.log("🚀 ~ CategoryList ~ setCategory:", category)
    return (
        <>
            <div className="w-[400px] px-[15px] pt-2 pb-5 bg-white rounded border border-neutral-200 flex-col justify-start items-start inline-flex gap-[10px]">
                <div className={` flex flex-row gap-[15px]`}>
                    <div className="">
                        <button
                            className={` text-sm  h-[25px] flex-col justify-center items-center gap-1 inline-flex`}
                        >
                            Product
                        </button>
                    </div>
                    <div className="">
                        <button
                            className={` text-sm  h-[25px] flex-col justify-center items-center gap-1 inline-flex`}
                        >
                            Services
                        </button>
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full justify-between">
                    <div className="w-full flex flex-wrap gap-3">
                        <SearchBar className="w-full" />
                        <Button
                            className="w-9 h-[35px] p-1"
                            variant="secondary"
                        >
                            <PlusIcon className="text-white" width={20} height={20} />
                        </Button>
                    </div>
                </div>
                <div className="w-full ">
                    <TableOfCategories data={category} />
                </div>
            </div>
        </>
    )
}
// <ListData key={index} data={item} />