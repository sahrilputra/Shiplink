import React from 'react'
import { TableRowCell } from './TableRowCell';
import { InputNumber, InputNumberMoney, InputDescription, InputSearchHS, InputHSCode, SelectMadeIn } from '../form/dashboardForm';
import { IconButton } from '@mui/material';
import { DeleteIcons } from '../icons/iconCollection';
import { ButtonAddOtherContent } from '../buttons/ButtonGroup';

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
                    <IconButton aria-label="arrow" size='small' className='w-[30px] h-[30px] '>
                        <DeleteIcons className="outline fill-white" />
                    </IconButton>
                </td>
            </tr>
         
        </>

    );
}