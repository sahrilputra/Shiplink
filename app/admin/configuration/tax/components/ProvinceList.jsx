import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'

export const ProvinceList = ({ countryName, handleSelect, isSelect, countryCode, setTaxID, setProvinceCode }) => {
    console.log("🚀 ~ ProvinceList ~ countryCode:", countryCode)
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState({
        keyword: "",
        country_code: "",
        page: 1,
        limit: 0,
        index: 0
    });
    const [provinceData, setProvinceData] = useState([]);
    const [filteredProvince, setFilteredProvince] = useState([]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                `/api/admin/config/tax/tax_province`,
                {
                    ...query,
                    country_code: countryCode
                }
            );
            console.log("🚀 ~ fetchData ~ response:", response)
            const data = await response.data;
            setLoading(false);
            const groupProvince = Object.values(data.tax.reduce((acc, item) => {
                if (!acc[item.province_code]) {
                    acc[item.province_code] = {
                        province_code: item.province_code,
                        province_name: item.province_name,
                        data: []
                    };
                }
                acc[item.province_code].data.push(item);
                return acc;
            }, {}));

            console.log("🚀 ~ fetchData ~ groupProvince:", groupProvince);
            setProvinceData(groupProvince);
        } catch (error) {
            setLoading(false);
            console.log('Error:', error);
        }
    };
    useEffect(() => {

        fetchData();
    }, [query, countryCode]);

    if (!countryName) {
        return null;
    }
    console.log("ProvinceSElected : ", isSelect)
    return (
        <>
            <div className="w-full justify-start gap-1 flex flex-col">
                <div className="text-black text-sm font-bold ">Province : </div>
                {
                    loading ? (
                        <>
                            <Skeleton className={'w-full px-2.5 py-[10px] h-[35px] rounded '} />
                            <Skeleton className={'w-full px-2.5 py-[10px] h-[35px] rounded '} />
                            <Skeleton className={'w-full px-2.5 py-[10px] h-[35px] rounded '} />
                        </>
                    ) : (
                        provinceData.length > 0 ? (
                            provinceData.map((item, index) => {
                                return (
                                    <div key={index}
                                        onClick={() => {
                                            handleSelect(item.province_name)
                                            setTaxID([item.data])
                                            setProvinceCode(item.province_code)
                                        }}
                                        className={`w-full px-2.5 py-[10px]  rounded border border-zinc-300 flex-col justify-start items-start gap-3 flex cursor-pointer hover:bg-slate-100
                                ${isSelect.toLowerCase() === item.province_name.toLowerCase() ? "bg-blue-100" : "bg-white"}`}>
                                        <div className="w-full justify-start items-center gap-2.5 inline-flex text-black text-xs ">
                                            <p className='w-[70px] flex flex-row justify-between'>
                                                {item.province_name}
                                                <span>
                                                    :
                                                </span>
                                            </p>
                                            <div className="text-black text-xs font-semibold font-['Poppins']  flex flex-row w-full">
                                                {
                                                    item.data.map((tax, index) => {
                                                        return (
                                                            <div key={index} className="px-1">
                                                                {tax.tax_assignment_name} ( {tax.tax_rate} % )
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="w-full px-2.5 py-[10px]  rounded border border-zinc-300 flex-col justify-start items-start gap-3 flex ">
                                <div className="w-full justify-between items-center gap-1 inline-flex text-black text-xs ">
                                    <p>No Province Register On This Country</p>
                                    <Link
                                        href={`/admin/configuration/province`}
                                        className='text-myBlue text-xs underline' >
                                        Add Province
                                    </Link>
                                </div>
                            </div>
                        )
                    )
                }
            </div>
        </>
    )
}
