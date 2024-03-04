import React from 'react'
import { NewAddress } from './form/NewAddress'
export const NewAdressMenus = ({close, reload}) => {
    return (
        <>
            <div className="container w-[378px] min-w-full py-[20px] rounded-[6px] h-screen bg-white">
                <h1 className=' text-xl font-bold'>New Address</h1>
                <div className="px-[5px] py-[10px]">
                    <NewAddress close={close} reload={reload}/>
                </div>
            </div>
        </>
    )
}
