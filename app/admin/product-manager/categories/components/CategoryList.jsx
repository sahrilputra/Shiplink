/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { TableOfCategories } from './Categories/TableOfCategories';

export const CategoryList =
    ({
        setSelected,
        selected,
        setItemID,
        itemID,
        setCategoryName
    }) => {
        console.log("🚀 ~ CategoryList ~ selected:", selected)
        const [category, setCategory] = useState([]);
        const [skeleton, setSkeleton] = useState(true)
        const [query, setQuery] = useState({
            keyword: '',
            page: 0,
            limit: 0,
            index: 0,
            category_type: selected,
        })

        const fetchData = async () => {
            const response = await axios.post(
                '/api/admin/product/categories',
                {
                    ...query,
                    category_type: selected,
                }
            )
            const responseData = await response.data.product_categories;
            console.log("🚀 ~ fetchData ~ responseData:", responseData)
            setCategory(responseData)
            setSkeleton(false)
        }
        useEffect(() => {
            fetchData();
        }, [query, selected]);

        const reload = () => {
            setSkeleton(true)
            setQuery({
                category_type: selected,
            })
        }
        useEffect(() => {
            setSkeleton(true)
            reload();
        }, [selected]);

        console.log("🚀 ~ CategoryList ~ setCategory:", category)
        return (
            <>
                <div className="w-[400px] px-[15px] pt-2 pb-5 bg-white rounded border border-neutral-200 flex-col justify-start items-start inline-flex gap-[10px]">
                    <div className={` flex flex-row gap-[15px]`}>
                        <div className="">
                            <button
                                className={`${selected === "Product"
                                    ? "text-myBlue border-b border-myBlue"
                                    : "text-black border-none"
                                    } text-sm  h-[25px] flex-col justify-center items-center gap-1 inline-flex`}
                                onClick={() => {
                                    setSelected("Product");

                                    reload();
                                }}
                            >
                                Product
                            </button>
                        </div>
                        <div className="">
                            <button
                                className={`${selected === "Services"
                                    ? "text-myBlue border-b border-myBlue"
                                    : "text-black border-none"
                                    } text-sm  h-[25px] flex-col justify-center items-center gap-1 inline-flex`}
                                onClick={() => {
                                    setSelected("Services");
                                    reload();
                                }}
                            >
                                Services
                            </button>
                        </div>
                    </div>
                    {/* <div className="flex flex-col gap-2 w-full justify-between">
                    <div className="w-full flex flex-wrap gap-3">
                        <SearchBar className="w-full" />
                 
                    </div>
                </div> */}
                    <div className="w-full ">
                        <TableOfCategories
                            data={category}
                            setItemID={setItemID}
                            setCategoryName={setCategoryName}
                            itemID={itemID}
                            reload={reload}
                            isSkeleton={skeleton}
                        />
                    </div>
                </div>
            </>
        );
    }
// <ListData key={index} data={item} />