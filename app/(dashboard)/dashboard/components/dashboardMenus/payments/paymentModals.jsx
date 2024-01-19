import { React, useState, useContext } from 'react'
import Image from 'next/image';
import { ArrowDownIcon } from '@/components/icons/iconCollection';
import { NewCard } from './NewCard';
import styles from './style.module.scss'
import { ModalContext } from '@/context/ModalContext';
export const PaymentModals = ({ isOpen, isClose }) => {
    console.log('modal is open', isOpen);
    console.log('modal is close', isClose);
    const { closeModal } = useContext(ModalContext);


    const [select, isSelected] = useState(false);
    const showModal = isOpen ? "block" : "hidden";
    const toggleSelect = (selectedButtons) => { isSelected(selectedButtons) }

    const handleClose = () => {
        closeModal(); // Close modal using the context function
    }

    return (
        <>
            <div className={showModal}>
                <div className={`${styles.modals} modals w-full h-full absolute top-[0] z-[100] bg-slate-500 bg-opacity-25`}>
                    <div className="container transform translate-x-[5%] translate-y-[25%]">

                        <div className="w-[594px] h-max px-5 pt-5 pb-[47px] bg-white rounded-lg shadow border border-neutral-200 flex-col justify-start items-center gap-[23px] inline-flex">
                            <div className="w-[476px] flex-col justify-between items-start flex">
                                <div className="p-2.5 rounded justify-center gap-[5px] inline-flex items-center mx-auto">
                                    <div className="text-center text-blue-900 text-2xl font-bold font-['Poppins']">Confirm Payments</div>
                                </div>
                                <div className="w-[215px] justify-between items-start inline-flex">
                                    <button className="flex-col justify-start items-center  inline-flex bg-none"
                                        onClick={() => toggleSelect(false)}>
                                        <div
                                            className={`text-center text-base font-Poppins 
                                ${select ? 'text-black font-medium'
                                                    : ' border-b-2 border-secondary font-semibold text-secondary'}`}
                                        >New Card</div>
                                    </button>
                                    <button
                                        className="flex-col justify-start items-center  inline-flex bg-none"
                                        onClick={() => toggleSelect(true)}>
                                        <div
                                            className={`text-center text-base font-Poppins 
                                ${select ?
                                                    ' border-b-2 border-secondary  font-semibold text-secondary'
                                                    : 'text-black font-medium'}`}
                                        >Saved Card</div>
                                    </button>
                                </div>
                                <NewCard />
                                <div className="h-10 justify-center items-start gap-[198px] mt-[15px] inline-flex">
                                    <button
                                        className="w-[137px] self-stretch px-8 bg-white rounded shadow border border-red-700 justify-center items-center gap-2 inline-flex"
                                        onClick={handleClose}
                                    >
                                        <div className="text-red-700 text-sm font-medium font-['Poppins']">Cancel</div>
                                    </button>
                                    <button className="w-[137px] self-stretch px-8 bg-red-700 rounded shadow justify-center items-center gap-2 inline-flex">
                                        <div className="text-white text-sm font-medium font-['Poppins']">Process</div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div >
                </div>
            </div>
        </>
    )
}
