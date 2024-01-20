import React from 'react'
import { NewAddress } from './form/NewAddress'
export const EditAddressMenu = ({ close, data, keyProp }) => {
    console.log("edit address menu", data)
    return (
        <>
            <div key={keyProp}>
                <div className="container w-[378px] min-w-full py-[20px] rounded-[6px] h-screen bg-white">
                    <h1 className=' text-xl font-bold'>Edit Address</h1>
                    <div className="px-[5px] py-[10px]">
                        <NewAddress close={close} data={data} />
                    </div>
                </div>
            </div>
        </>
    )
}
