import { React, useEffect, useState } from 'react'
import Image from 'next/image'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { DeleteIcons } from '@/components/icons/iconCollection'
import { Select } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import axios from 'axios'
import { useToast } from '@/components/ui/use-toast'

export const TaxDetailsList = ({ setChange, data, handleClick, taxAssignID }) => {
    console.log("🚀 ~ TaxDetailsList ~ data:", data)

    console.log("🚀 ~ TaxDetailsList ~ taxAssignID:", taxAssignID)

    const { toast } = useToast()
    // Menginisialisasi array status checked dengan nilai false
    const [checkedItems, setCheckedItems] = useState(Array(data.length).fill(false));
    useEffect(() => {
        const updatedCheckedItems = data.map((item) => {
            return item.status === 1;
        });
        setCheckedItems(updatedCheckedItems);
    }, [data])

    const handleCheck = (index) => {
        // Mendapatkan status checked terkini
        const updatedCheckedItems = [...checkedItems];
        updatedCheckedItems[index] = !updatedCheckedItems[index];
        setCheckedItems(updatedCheckedItems);

        // Memperbarui status change jika diperlukan
        const changeStatus = updatedCheckedItems.some(checked => checked);
        setChange(changeStatus);

        try {
            // Mengirim data ke server
            axios.post('/api/admin/config/tax/setStatus', {
                data: data[index].tax_assignment_id,
                status: updatedCheckedItems[index] ? 1 : 0
            }).then((response) => {
                toast({
                    title: response.data.message,
                    description: response.data.status,
                    status: response.data.status === true ? 'success' : 'error',
                })
            })
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <>
            {
                data.map((item, index) => (
                    <div
                        key={item.tax_assignment_id}
                        className={`w-full px-4 py-2 rounded border border-zinc-300 justify-between items-center inline-flex
                        ${checkedItems[index] ? 'bg-blue-100' : 'bg-white'}`}
                    >
                        <div className="flex flex-row gap-4 justify-start items-center w-[80%]">
                            <Switch
                                checked={checkedItems[index]}
                                onCheckedChange={() => handleCheck(index)}
                            />
                            <div className="text-black text-[13px] font-semibold ">{item?.abbreviation} : {'%'}{item?.tax_rate}</div>
                        </div>
                        <div className="inline-flex gap-3 justify-center items-center">
                            <div className="text-zinc-600 text-xs leading-tight">{item?.tax_assignment_id}</div>
                            <Button
                                variant="tableBlue"
                                size="tableIcon"
                                className={`rounded-[3px] w-max px-[5px] h-[25px]`}
                                onClick={() => { handleClick(item?.tax_assignment_id) }}
                            >
                                <DeleteIcons width={15} height={15} className={` text-myBlue outline-myBlue fill-myBlue rounded-sm  `} />
                            </Button>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
