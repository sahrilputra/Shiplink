import { Button } from '@/components/ui/button'
import React from 'react'
import { CountryMenus } from '../../../components/menus/CountryMenus'

export const RowAction = ({ row, handleEditClicked, handleDeleteClicked }) => {
    return (
        <>
            <div key={row.id} className="flex flex-row gap-2">
                <Button
                    variant="tableBlue"
                    size="tableIcon"
                    className={`rounded-[3px] w-max px-[6px] h-[25px]`}
                    onClick={() => handleEditClicked(row)}
                >
                    <p className="text-[11px]">Edit</p>
                </Button>
                <CountryMenus key={row.id} deleteHandler={handlerDelete} row={row} />
            </div>
        </>
    )
}
