import React, { useState, useEffect } from 'react'
import axios from 'axios'


export const ProvinceList = ({ countryName, handleSelect, isSelect, countryCode, setTaxID }) => {
    const [query, setQuery] = useState({
        keyword: "",
        country_code: "",
        page: 1,
        limit: 0,
        index: 0
    });
    const [provinceData, setProvinceData] = useState([]);
    const [filteredProvince, setFilteredProvince] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    `/api/admin/config/tax/list`,
                    query
                );
                const data = await response.data;
                setProvinceData(data.tax); // Menyimpan data mentah dari server
            } catch (error) {
                console.log('Error:', error);
            }
        };
        fetchData();
    }, [query]);

    useEffect(() => {
        // Melakukan filter setiap kali terjadi perubahan pada countryName atau data provinsi
        const filteredData = provinceData.filter(item => item.country_name.toLowerCase().includes(countryName.toLowerCase()));
        setFilteredProvince(filteredData);
    }, [provinceData, countryName]);

    console.log("ProvinceSElected : ", isSelect)
    return (
        <>
            <div className="w-full justify-start gap-1 flex flex-col">
                <div className="text-black text-sm font-bold ">Province : </div>

                {
                    filteredProvince?.map((item, index) => {
                        return (
                            <div key={index}
                                onClick={() => {
                                    handleSelect(item.province_name)
                                    setTaxID(item.tax_assignment_id)
                                }}
                                className={`w-full px-2.5 py-[10px]  rounded border border-zinc-300 flex-col justify-start items-start gap-3 flex cursor-pointer hover:bg-slate-100
                                ${isSelect.toLowerCase() === item.province_name.toLowerCase() ? "bg-blue-100" : "bg-white"}`}>
                                <div className="w-full justify-start items-center gap-2.5 inline-flex text-black text-xs ">
                                    <p>{item.province_name} :</p>
                                    <p className="text-black text-xs font-semibold font-['Poppins'] ">{item.tax_assignment_id} ( {item.tax_rate} % )</p>
                                </div>
                            </div>
                        )
                    })
                }
                {/* <div className="w-full px-2.5 py-[10px] bg-white rounded border border-zinc-300 flex-col justify-start items-start gap-3 flex">
                    <div className="w-full justify-start items-center gap-2.5 inline-flex text-black text-xs ">
                        <p>Alberta :</p>
                        <p className="text-black text-xs font-semibold font-['Poppins'] ">HST ( 13 % )</p></div>
                </div>
                <div className="w-full px-2.5 py-[10px] bg-white rounded border border-zinc-300 flex-col justify-start items-start gap-3 flex">
                    <div className="w-full justify-start items-center gap-2.5 inline-flex text-black text-xs ">
                        <p>Ohio :</p>
                        <p className="text-black text-xs font-semibold font-['Poppins'] ">HST ( 13 % )</p></div>
                </div>
                <div className="w-full px-2.5 py-[10px] bg-blue-50 rounded border border-zinc-300 flex-col justify-start items-start gap-3 flex">
                    <div className="w-full justify-start items-center gap-2.5 inline-flex text-black text-xs ">
                        <p>Quebec :</p>
                        <p className="text-black text-xs font-semibold font-['Poppins'] ">QST ( 9.96 % ) + HST 5 %</p></div>
                </div>
                <div className="w-full px-2.5 py-[10px] bg-white rounded border border-zinc-300 flex-col justify-start items-start gap-3 flex">
                    <div className="w-full justify-start items-center gap-2.5 inline-flex text-black text-xs ">
                        <p>Ontario  :</p>
                        <p className="text-black text-xs font-semibold font-['Poppins'] ">HST ( 11 % )</p>
                    </div>
                </div> */}
            </div>
        </>
    )
}
