import React from 'react'
import { TableRowCell } from './TableRowCell';
import { InputNumber, InputNumberMoney, InputDescription, InputSearchHS, InputHSCode, SelectMadeIn } from '../form/dashboardForm';
// import { DeleteIcons } from '../icons/iconCollection';
import Image from 'next/image';
import { ButtonAddOtherContent } from '@/components/buttons/ButtonGroup';
import { Button } from '@/components/ui/button';
// import { Button } from 'flowbite-react';
import { DeleteIcons } from '@/components/icons/iconCollection';

export const TableBody = ({ id, onDelete }) => {
    const handleDelete = () => {
        onDelete(id);
    }
    return (
        <>
            <tr className='w-[90%] px-[15px] py-2.5 bg-white border border-neutral-200 gap-2.5 '>
                <td className='w-[65px] px-[10px]  py-2.5 bg-white  gap-2.5'>
                    <InputNumber />
                </td>
                <td className='w-[200px] px-[5px] py-2.5 bg-white  gap-2.5'>
                    <InputNumberMoney />
                </td>
                <td className='w-[50%] px-[5px] py-2.5 bg-white  gap-2.5'>
                    <InputDescription />
                </td>
                <td className='w-[50%]  px-[5px] py-2.5 bg-white  gap-2.5'>
                    <InputSearchHS />
                </td>
                <td className='w-[100px] px-[5px] py-2.5 bg-white  gap-2.5'>
                    <InputHSCode className="" />
                </td>
                <td className='w-[60px] px-[5px] py-2.5 bg-white  gap-2.5'>
                    <SelectMadeIn />
                </td>
                <td className=' w-full px-[15px] py-2.5 bg-white  gap-2.5'>
                    {id !== 1 && (
                        <Button
                            className="w-[30px] h-[30px]"
                            variant="tableBlue"
                            size="icon"
                            onClick={handleDelete}
                        >
                            <DeleteIcons fill="#00509D" width='15px' height='15px' />
                        </Button>
                    )}
                </td>
            </tr >

        </>

    );
}