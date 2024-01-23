import React from 'react'
import { NewSavedBox } from './form/NewSavedBoxForm'
export const SavedBoxFrame = ({ close, data, keyProp }) => {
    return (
        <>
            <div key={keyProp} className="container w-[378px] min-w-full py-[20px] rounded-[6px] h-screen bg-white">

                <h1 className=' text-xl font-bold'>{data ? "Edit Box" : "New Box"}</h1>
                <div className="px-[5px] py-[10px]">
                    <NewSavedBox close={close} data={data} />
                </div>
            </div>
        </>
    )
}
