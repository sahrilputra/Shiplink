import { SearchBar } from '@/components/ui/searchBar'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ListData } from './ListData';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
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
            <div className="w-[300px] px-[15px] pt-5 pb-5 bg-white rounded border border-neutral-200 flex-col justify-start items-start inline-flex gap-[10px]">
                <div className="flex flex-col gap-2">
                    <p className='text-sm font-bold'>List Category</p>
                    <SearchBar className="w-full" />
                    <Button
                        className="bg-black"
                        variant="outline"
                    >
                        <PlusIcon className="w-4 h-4" />
                    </Button>
                </div>
                <div className="w-full border bg-white flex flex-col px-2 py-3 gap-3 rounded h-max">
                    {
                        skeleton ?
                            (
                                <Skeleton className={'h-4 w-full rounded'} />
                            ) : (
                                category.map((item, index) => {
                                    return (
                                        <ListData key={index} data={item} />
                                    )
                                })
                            )
                    }
                </div>
            </div>
        </>
    )
}
