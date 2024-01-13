import React from 'react'
import { TableRowCell } from './TableRowCell';
import { InputNumber, InputNumberMoney, InputDescription, InputSearchHS, InputHSCode, SelectMadeIn } from '../form/dashboardForm';
// import { DeleteIcons } from '../icons/iconCollection';
import Image from 'next/image';
import { ButtonAddOtherContent } from '@/components/buttons/ButtonGroup';
import { Button } from 'flowbite-react';
import { DeleteIcons } from '@/components/icons/iconCollection';

export const TableBody = ({ body }) => {
    return (
        <>
            <tr className='body px-[15px] py-2.5 bg-white border border-neutral-200 gap-2.5 '>
                <td className='px-[10px] py-2.5 bg-white  gap-2.5'>
                    <InputNumber />
                </td>
                <td className='px-[5px] py-2.5 bg-white  gap-2.5'>
                    <InputNumberMoney />
                </td>
                <td className='px-[5px] py-2.5 bg-white  gap-2.5'>
                    <InputDescription />
                </td>
                <td className='px-[5px] py-2.5 bg-white  gap-2.5'>
                    <InputSearchHS />
                </td>
                <td className='px-[5px] py-2.5 bg-white  gap-2.5'>
                    <InputHSCode />
                </td>
                <td className='px-[5px] py-2.5 bg-white  gap-2.5'>
                    <SelectMadeIn />
                </td>
                <td className='px-[15px] py-2.5 bg-white  gap-2.5'>
                    <Button color='bg-blue-100' aria-label="arrow" size='small' className='w-[30px] h-[30px] bg-blue-100 rounded-md border border-black border-opacity-20'>
                        <DeleteIcons fill="#00509D" width='20px' height='20px' />
                    </Button>
                </td>
            </tr>

        </>

    );
}